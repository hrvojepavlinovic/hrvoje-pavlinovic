// deno run -A scripts/generate-article-social-images.mjs
// Source Sans 3: static/fonts/SourceSans3-OFL.txt.
import { Resvg } from "npm:@resvg/resvg-js@2.6.2";
import { Buffer } from "node:buffer";
import sharp from "npm:sharp@0.34.3";
import blog from "../data/blog.json" with { type: "json" };

const site = "https://hrvoje.pavlinovic.com";
const root = new URL("../", import.meta.url);
const output = new URL("static/social/articles/", root);
await Deno.mkdir(output, { recursive: true });
const fonts = await Promise.all(["Regular", "Semibold"].map(async (weight) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/adobe-fonts/source-sans/release/TTF/SourceSans3-${weight}.ttf`,
  );
  if (!response.ok) throw new Error(`Font download failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}));
const fontOptions = {
  fontBuffers: fonts,
  loadSystemFonts: false,
  defaultFontFamily: "Source Sans 3",
};
const measure = (value, size) => {
  const probe =
    `<svg xmlns="http://www.w3.org/2000/svg" width="10000" height="240"><text x="0" y="120" font-family="Source Sans 3" font-size="${size}" font-weight="600">${
      escape(value)
    }</text></svg>`;
  const bounds = new Resvg(probe, { font: fontOptions }).innerBBox();
  if (!bounds) throw new Error(`Cannot measure title: ${value}`);
  return bounds.width;
};
const escape = (text) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(
    '"',
    "&quot;",
  );
const manifest = {};
for (const article of blog.articles) {
  const record = { source: article.seo.image, title: article.title };
  if (article.seo.image && !article.seo.image.endsWith("/blog.png")) {
    const src = new URL(article.seo.image, site);
    if (src.origin !== site) {
      throw new Error(
        `Inspect external cover before generating metadata: ${src}`,
      );
    }
    const metadata = await sharp(
      await Deno.readFile(new URL(`static${src.pathname}`, root)),
    ).metadata();
    manifest[article.slug] = {
      ...record,
      src: src.href,
      width: metadata.width,
      height: metadata.height,
      mimeType: `image/${
        metadata.format === "jpeg" ? "jpeg" : metadata.format
      }`,
    };
    continue;
  }
  const wrap = (size) => {
    const lines = [];
    for (const word of article.title.split(/\s+/)) {
      const last = lines.at(-1);
      const candidate = last ? `${last} ${word}` : word;
      if (last && measure(candidate, size) > 1060) lines.push(word);
      else if (last) lines[lines.length - 1] = candidate;
      else lines.push(word);
    }
    return lines;
  };
  let size = 76;
  let lines = wrap(size);
  while (
    size > 52 &&
    (lines.length > 4 || lines.some((line) => measure(line, size) > 1060))
  ) {
    size -= 6;
    lines = wrap(size);
  }
  if (lines.length > 4 || lines.some((line) => measure(line, size) > 1060)) {
    throw new Error(`Title needs a different composition: ${article.title}`);
  }
  const title = lines.map((line, index) =>
    `<text x="64" y="${
      184 + index * size * 1.14
    }" font-size="${size}" font-weight="600" fill="#f3f5f3">${
      escape(line)
    }</text>`
  ).join("");
  const topic = article.tags.slice(0, 2).join(" / ");
  const date = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(article.createdAt));
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#191d21"/><g font-family="Source Sans 3"><text x="64" y="70" font-size="23" fill="#a8b0b5">Field notes / ${
      escape(topic)
    }</text><rect x="1100" y="46" width="22" height="22" rx="3" fill="#ff9847" transform="rotate(45 1111 57)"/>${title}<path d="M64 498H1136" stroke="#42484e"/><text x="64" y="548" font-size="29" font-weight="600" fill="#f3f5f3">Hrvoje Pavlinovic</text><text x="1136" y="548" text-anchor="end" font-size="23" fill="#ffae6e">${
      escape(date)
    }</text><text x="64" y="588" font-size="23" fill="#a8b0b5">hrvoje.pavlinovic.com</text></g></svg>`;
  const renderer = new Resvg(svg, {
    font: {
      fontBuffers: fonts,
      loadSystemFonts: false,
      defaultFontFamily: "Source Sans 3",
    },
  });
  const png = renderer.render().asPng();
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", png),
  );
  const hash = Array.from(
    digest.slice(0, 5),
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("");
  const name = `${article.slug}-${hash}.png`;
  await Deno.writeFile(new URL(name, output), png);
  manifest[article.slug] = {
    ...record,
    src: `${site}/social/articles/${name}`,
    width: 1200,
    height: 630,
    mimeType: "image/png",
  };
  console.log(
    `${article.slug}: ${lines.length} lines, ${
      Math.round(png.length / 1024)
    } KiB`,
  );
}
await Deno.writeTextFile(
  new URL("data/article-social-images.json", root),
  JSON.stringify(manifest, null, 2) + "\n",
);
