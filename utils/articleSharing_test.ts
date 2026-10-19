import { assert, assertEquals } from "$std/assert/mod.ts";
import { articleShareLinks, articleUrl } from "./articleSharing.ts";
import { articleSocialImage } from "./articleSeo.ts";
import blog from "../data/blog.json" with { type: "json" };

Deno.test("section and share URLs preserve Unicode and reserved characters", () => {
  const url = articleUrl("a-note", "section-čemu-&-zašto");
  assertEquals(
    decodeURIComponent(new URL(url).hash.slice(1)),
    "section-čemu-&-zašto",
  );
  const title = "Što & why? #1 + more";
  const links = articleShareLinks(title, url);
  assertEquals(new URL(links.x).searchParams.get("text"), title);
  assertEquals(new URL(links.x).searchParams.get("url"), url);
  assertEquals(new URL(links.linkedin).searchParams.get("url"), url);
  assertEquals(new URL(links.email).searchParams.get("subject"), title);
  assertEquals(new URL(links.email).searchParams.get("body"), url);
  assert(!links.email.includes("+")); // Mail clients must receive spaces as %20.
});

Deno.test("all current articles have image dimensions and keep their custom covers", () => {
  for (const article of blog.articles) {
    const image = articleSocialImage(article);
    assert(image.width && image.height && image.mimeType);
    assertEquals(new URL(image.src).protocol, "https:");
    if (!article.seo.image.endsWith("/blog.png")) {
      assertEquals(image.src, article.seo.image);
    } else {
      assert(new URL(image.src).pathname.startsWith("/social/articles/"));
      assertEquals([image.width, image.height], [1200, 630]);
    }
  }
});

Deno.test("new and retitled articles use a valid fallback until covers regenerate", () => {
  const article = {
    ...blog.articles[0],
    slug: "new-note",
    title: "A new note",
  };
  assertEquals(
    articleSocialImage(article).src,
    "https://hrvoje.pavlinovic.com/social/blog-20261016.png",
  );
  const retitled = { ...blog.articles[0], title: "A different title" };
  assertEquals(
    articleSocialImage(retitled).src,
    articleSocialImage(article).src,
  );
  assertEquals(
    articleSocialImage({ ...article, seo: { image: "/new-cover.webp" } }).src,
    "https://hrvoje.pavlinovic.com/new-cover.webp",
  );
});
