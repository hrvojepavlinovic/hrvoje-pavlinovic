// Run with: deno run -A scripts/generate-social-images.mjs
// Source Sans 3 is licensed under static/fonts/SourceSans3-OFL.txt.
import { Resvg } from "npm:@resvg/resvg-js@2.6.2";
import { Buffer } from "node:buffer";
import sharp from "npm:sharp@0.34.3";

const root = new URL("../", import.meta.url);
const output = new URL("static/social/", root);
await Deno.mkdir(output, { recursive: true });
const fontResponse = await fetch(
  "https://raw.githubusercontent.com/google/fonts/main/ofl/sourcesans3/SourceSans3%5Bwght%5D.ttf",
);
if (!fontResponse.ok) {
  throw new Error(`Font download failed: ${fontResponse.status}`);
}
const font = Buffer.from(await fontResponse.arrayBuffer());
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const image = async (src) => {
  let bytes = await Deno.readFile(new URL(`static${src}`, root));
  if (src.endsWith(".webp")) bytes = await sharp(bytes).png().toBuffer();
  const type = "png";
  return `data:image/${type};base64,${Buffer.from(bytes).toString("base64")}`;
};
const wrap = (s, limit) => {
  const lines = [];
  for (const word of s.split(/\s+/)) {
    const last = lines.length - 1;
    if (last < 0 || lines[last].length + word.length + 1 > limit) {
      lines.push(word);
    } else lines[last] += ` ${word}`;
  }
  return lines;
};
const text = (lines, x, y, size, fill, weight = 400, leading = size * 1.15) =>
  lines.map((line, i) =>
    `<text x="${x}" y="${
      y + i * leading
    }" font-size="${size}" font-weight="${weight}" fill="${fill}">${
      escape(line)
    }</text>`
  ).join("");
const portrait = await image("/pfptbs.png");
const pages = [
  {
    id: "home",
    title: ["Hrvoje", "Pavlinovic"],
    subtitle: ["Senior Backend & Product Engineer"],
    detail: "Split, Croatia",
    portrait: true,
  },
  {
    id: "about",
    title: ["About me."],
    subtitle: ["The work, the journey,", "and life away from the keyboard."],
    detail: "Hrvoje Pavlinovic",
    portrait: true,
  },
  {
    id: "cv",
    title: ["Experience", "& CV."],
    subtitle: [
      "13+ years building software.",
      "Backend systems. Product engineering.",
    ],
    detail: "Hrvoje Pavlinovic",
    portrait: true,
  },
  {
    id: "projects",
    title: ["Products", "I’m building."],
    subtitle: ["PLAYGRND, Memoato and PLAYGRND Draft."],
    detail: "Hrvoje Pavlinovic",
  },
  {
    id: "blog",
    title: ["Field notes."],
    subtitle: ["Backend engineering, products,", "and life around the work."],
    detail: "Hrvoje Pavlinovic",
  },
];
const projects =
  JSON.parse(await Deno.readTextFile(new URL("data/projects.json", root)))
    .projects;
for (const project of projects) {
  pages.push({
    id: `project-${project.id}`,
    title: wrap(project.name, 20),
    subtitle: wrap(project.description, project.screenshot ? 42 : 60),
    detail: "A project by Hrvoje Pavlinovic",
    screenshot: project.screenshot?.src,
    project: true,
  });
}
for (const page of pages) {
  const hasImage = page.portrait || page.screenshot;
  const titleSize = page.project ? 64 : 88;
  const subtitleY = page.project
    ? 190 + page.title.length * 78
    : 230 + page.title.length * 94;
  const art = page.portrait
    ? `<image href="${portrait}" x="825" y="152" width="318" height="318"/>`
    : page.screenshot
    ? `<rect x="672" y="159" width="474" height="316" fill="#f5f6f4" rx="4"/><image href="${await image(
      page.screenshot,
    )}" x="680" y="167" width="458" height="300" preserveAspectRatio="xMidYMid meet"/>`
    : "";
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#090b0a"/><g font-family="Source Sans 3">${
      text(["HRVOJE PAVLINOVIC"], 58, 70, 20, "#ffae6e", 600)
    }${
      text(page.title, 58, page.project ? 194 : 225, titleSize, "#f3f5f3", 600)
    }${
      text(page.subtitle, 58, subtitleY, hasImage ? 27 : 30, "#b8c1ba", 400, 36)
    }${
      text([page.detail], 58, 510, 23, "#ffae6e", 500)
    }${art}<path d="M58 560H1142" stroke="#343b36"/>${
      text(["hrvoje.pavlinovic.com"], 58, 603, 21, "#b8c1ba")
    }</g></svg>`;
  const png = new Resvg(svg, {
    font: {
      fontBuffers: [font],
      loadSystemFonts: false,
      defaultFontFamily: "Source Sans 3",
    },
  }).render().asPng();
  const path = new URL(`${page.id}-20261016.png`, output);
  await Deno.writeFile(path, png);
  console.log(`${page.id}: ${Math.round(png.length / 1024)} KiB`);
}
