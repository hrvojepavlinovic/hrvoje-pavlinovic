import { trackEvent } from "../utils/track.ts";
import { renderTemplateWithComponents } from "../utils/contentTokens.tsx";
import { HomeData } from "../types/home.ts";
import { Reference } from "../types/cv.ts";
import { MemoatoPublicStats } from "../utils/memoatoStats.ts";
import { AIUsageSummary } from "../types/aiUsage.ts";

export interface HomeArticlePreview {
  title: string;
  slug: string;
  shortDescription: string;
  tag: string;
  createdAt: string;
  readingTime: number;
}

export interface HomePageProps {
  data: HomeData;
  memoatoStats?: MemoatoPublicStats | null;
  aiUsage: AIUsageSummary;
  latestArticles: HomeArticlePreview[];
  references: Reference[];
}

const handleTrackedLink = (target: string) => {
  trackEvent({ type: "click", clickType: "link", target });
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

const referenceOrder = [
  "Rimac Automobili",
  "ReneVerse",
  "Tilt",
  "Povio",
  "Profico",
  "Ericsson Nikola Tesla",
];

export default function HomePage({
  data,
  memoatoStats,
  aiUsage,
  latestArticles,
  references,
}: HomePageProps) {
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Europe/Zagreb",
  });
  const numberFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  });
  const tokenFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const orderedReferences = [...references].sort((a, b) =>
    referenceOrder.indexOf(a.company) - referenceOrder.indexOf(b.company)
  );
  const snapshotDate = dateFormatter.format(new Date(aiUsage.generatedAt));
  const snapshotStale = Date.now() - Date.parse(aiUsage.generatedAt) >
    2 * 24 * 60 * 60 * 1000;
  const allTimeUsage = aiUsage.periods.find((period) =>
    period.label === "All time"
  );
  const categories = (memoatoStats?.categories ?? []).filter((category) =>
    ["weight", "push-ups", "pull-ups"].includes(category.slug) &&
    category.year !== null && Number.isFinite(category.year)
  );

  return (
    <div class="site-canvas home-profile">
      <div class="home-content">
        <section class="home-intro" aria-labelledby="home-title">
          <div class="home-intro-copy">
            <h1 id="home-title">
              {data.title.split("\n").map((line) => (
                <span key={line}>{`${line} `}</span>
              ))}
            </h1>
            <p class="home-experience">{data.heroStat}</p>
            <div class="home-intro-description">
              {data.heroParagraphs.map((paragraph) => (
                <p key={paragraph}>{renderTemplateWithComponents(paragraph)}</p>
              ))}
            </div>
            <div class="home-actions">
              {data.ctaLinks.slice(0, 2).map((cta) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  class={cta.variant === "primary"
                    ? "home-contact"
                    : "home-link"}
                  onClick={() => handleTrackedLink(cta.trackingTarget)}
                >
                  {cta.label}
                  <Arrow />
                </a>
              ))}
            </div>
            <div class="home-socials" aria-label="Social profiles">
              {data.socialLinks.filter((link) =>
                link.trackingTarget !== "email"
              )
                .map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleTrackedLink(link.trackingTarget ?? link.label)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={link.icon} />
                    </svg>
                    {link.label === "X (Twitter)" ? "X" : link.label}
                  </a>
                ))}
            </div>
          </div>
          <img
            class="home-portrait"
            src="/pfptbs.png"
            alt={data.avatar.alt}
            width="512"
            height="512"
            loading="eager"
            decoding="async"
          />
        </section>

        <section
          id="selected-work"
          class="home-section home-work"
          aria-labelledby="home-work-title"
        >
          <div class="home-section-heading">
            <div>
              <h2 id="home-work-title">Things I’m building.</h2>
              <p>My own products, alongside the work I do with client teams.</p>
            </div>
            <a
              class="home-link"
              href="/projects"
              onClick={() => handleTrackedLink("home-projects")}
            >
              All projects<Arrow />
            </a>
          </div>
          <div class="home-project-grid">
            {data.selectedWork.map((project) => (
              <article key={project.name}>
                <a
                  class="home-project-image"
                  href={project.href}
                  onClick={() =>
                    handleTrackedLink(`home-project-${project.name}`)}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={project.width}
                    height={project.height}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <h3>
                  <a
                    href={project.href}
                    onClick={() =>
                      handleTrackedLink(`home-project-${project.name}`)}
                  >
                    {project.name}
                    <Arrow diagonal />
                  </a>
                </h3>
                <p>{project.description}</p>
                <small>{project.detail}</small>
              </article>
            ))}
          </div>
        </section>

        <section
          id="recommendations"
          class="home-section home-recommendations"
          aria-labelledby="home-recommendations-title"
        >
          <div class="home-section-heading">
            <div>
              <h2 id="home-recommendations-title">People I’ve worked with.</h2>
              <p>Recommendations from engineering leaders and founders.</p>
            </div>
          </div>
          <div class="home-reference-grid">
            {orderedReferences.map((reference, index) => (
              <figure
                key={reference.company}
                class={index < 2
                  ? "home-reference home-reference-featured"
                  : "home-reference"}
              >
                <blockquote>
                  <p>{reference.quote}</p>
                </blockquote>
                <figcaption>
                  <a
                    class="home-reference-person"
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleTrackedLink(`recommendation-${reference.person}`)}
                  >
                    {reference.person}
                    <Arrow diagonal />
                  </a>
                  <p>{reference.title}</p>
                  <a
                    class="home-reference-company"
                    href={reference.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleTrackedLink(
                        `recommendation-company-${reference.company}`,
                      )}
                  >
                    {reference.company}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          class="home-section home-writing"
          aria-labelledby="home-writing-title"
        >
          <div class="home-section-heading">
            <div>
              <h2 id="home-writing-title">Notes from the work.</h2>
              <p>Engineering, products, and the life around them.</p>
            </div>
            <a
              class="home-link"
              href="/blog"
              onClick={() => handleTrackedLink("home-all-blog-posts")}
            >
              All writing<Arrow />
            </a>
          </div>
          <div class="home-article-list">
            {latestArticles.map((article) => (
              <article key={article.slug}>
                <div class="home-article-meta">
                  <time dateTime={article.createdAt}>
                    {dateFormatter.format(new Date(article.createdAt))}
                  </time>
                  <span>{article.readingTime} min read</span>
                </div>
                <div>
                  <h3>
                    <a
                      href={`/blog/${article.slug}`}
                      onClick={() =>
                        handleTrackedLink(`home-blog-${article.slug}`)}
                    >
                      {article.title}
                      <Arrow diagonal />
                    </a>
                  </h3>
                  <p>{article.shortDescription}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          class="home-section home-personal"
          aria-labelledby="home-personal-title"
        >
          <div>
            <h2 id="home-personal-title">Away from the keyboard.</h2>
            <p>{data.personalNote}</p>
            <a
              class="home-link"
              href="/about"
              onClick={() => handleTrackedLink("home-about")}
            >
              A little more about me<Arrow />
            </a>
          </div>
          <div class="home-personal-data">
            {categories.length > 0 && (
              <details>
                <summary>Personal stats from Memoato</summary>
                <dl>
                  {categories.map((category) => (
                    <div key={category.slug}>
                      <dt>
                        {category.title}
                        {category.slug === "weight"
                          ? " · latest log"
                          : " · this year"}
                      </dt>
                      <dd>
                        {category.url
                          ? (
                            <a
                              href={category.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                handleTrackedLink(
                                  `memoato-category-${category.slug}`,
                                )}
                            >
                              {numberFormatter.format(category.year!)}
                              {category.unit ? ` ${category.unit}` : ""}
                            </a>
                          )
                          : (
                            <span>
                              {numberFormatter.format(category.year!)}
                              {category.unit ? ` ${category.unit}` : ""}
                            </span>
                          )}
                      </dd>
                    </div>
                  ))}
                </dl>
                {memoatoStats?.generatedAt && (
                  <p class="home-data-note">
                    Data retrieved{" "}
                    {dateFormatter.format(new Date(memoatoStats.generatedAt))}.
                  </p>
                )}
                <a
                  class="home-link"
                  href="https://app.memoato.com/u/0xhp10"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleTrackedLink("memoato-profile-stats")}
                >
                  View public profile<Arrow diagonal />
                </a>
              </details>
            )}
            <details>
              <summary>Codex usage · {snapshotDate}</summary>
              <p class="home-data-note">
                Manually updated snapshot.{snapshotStale
                  ? " This is historical data, not a live activity counter."
                  : ""}
              </p>
              {allTimeUsage && (
                <p>
                  {tokenFormatter.format(allTimeUsage.totalTokens)}{" "}
                  tokens across {numberFormatter.format(allTimeUsage.requests)}
                  {" "}
                  calls, recorded up to {snapshotDate}.
                </p>
              )}
            </details>
          </div>
        </section>

        <section
          class="home-contact-close home-section"
          aria-labelledby="home-contact-title"
        >
          <h2 id="home-contact-title">Have something in mind?</h2>
          <a
            href="mailto:hrvoje@pavlinovic.com"
            class="home-email"
            onClick={() => handleTrackedLink("home-contact-close")}
          >
            hrvoje@pavlinovic.com<Arrow diagonal />
          </a>
          <p>
            For work with the studio, visit{" "}
            <a
              href="https://hills-lab.hr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrackedLink("hills_lab")}
            >
              HILLS Lab
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
