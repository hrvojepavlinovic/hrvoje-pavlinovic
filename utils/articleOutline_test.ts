import { assertEquals } from "$std/assert/mod.ts";
import {
  activeArticleSection,
  articleReadingProgress,
  buildArticleOutline,
} from "./articleOutline.ts";

Deno.test("outline preserves authored markup and existing anchors, avoids collisions", () => {
  const source =
    '<div id="section-deja-vu"></div><h2 class="intro">Déjà <em>vu</em> &amp; &#x41;I</h2><h3 id="kept">Keep &quot;this&quot;</h3><h2>Déjà vu</h2><h2>Déjà vu</h2>';
  const result = buildArticleOutline(source);
  assertEquals(result.sections, [
    { id: "section-deja-vu-ai", title: "Déjà vu & AI", level: 2 },
    { id: "kept", title: 'Keep "this"', level: 3 },
    { id: "section-deja-vu-2", title: "Déjà vu", level: 2 },
    { id: "section-deja-vu-3", title: "Déjà vu", level: 2 },
  ]);
  assertEquals(
    result.html.replace(/ id="section-[^"]+"(?=>Déjà)/g, ""),
    source,
  );
});

Deno.test("outline ignores literal examples and handles empty or Unicode headings", () => {
  const ignored =
    '<!-- <h2>comment</h2> --><pre><code><h2>example</h2></code></pre><script>"<h2>hidden</h2>"</script>';
  assertEquals(buildArticleOutline(ignored), { html: ignored, sections: [] });
  assertEquals(
    buildArticleOutline("<h2> </h2><h2>日本語</h2><h3>&#128161;</h3>").sections,
    [
      { id: "section-日本語", title: "日本語", level: 2 },
      { id: "section-note", title: "💡", level: 3 },
    ],
  );
});

Deno.test("progress follows article bounds and clamps overscroll and short articles", () => {
  assertEquals(articleReadingProgress(500, 2000, 900, 100), 0);
  assertEquals(articleReadingProgress(100, 2000, 900, 100), 0);
  assertEquals(articleReadingProgress(-500, 2000, 900, 100), 50);
  assertEquals(articleReadingProgress(-1100, 2000, 900, 100), 100);
  assertEquals(articleReadingProgress(-3000, 2000, 900, 100), 100);
  assertEquals(articleReadingProgress(1200, 400, 900, 100), 0);
  assertEquals(articleReadingProgress(200, 400, 900, 100), 100);
  assertEquals(articleReadingProgress(0, 0, 0, 100), 100);
});

Deno.test("active section reaches a short final section when the article end is visible", () => {
  const headings = [{ id: "first", top: -500 }, { id: "last", top: 620 }];
  assertEquals(activeArticleSection(headings, -600, 850, 900, 100), "last");
  assertEquals(activeArticleSection(headings, -600, 1000, 900, 100), "first");
  assertEquals(activeArticleSection(headings, 200, 850, 900, 100), "first");
  assertEquals(
    activeArticleSection([{ id: "intro", top: 300 }], 200, 850, 900, 100),
    "",
  );
  assertEquals(activeArticleSection([], -600, 850, 900, 100), "");
});
