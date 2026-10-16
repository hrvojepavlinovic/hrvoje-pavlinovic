import { trackEvent } from "../utils/track.ts";
import { AboutData } from "../types/about.ts";
import { MemoatoPublicStats } from "../utils/memoatoStats.ts";
import ProjectArrow from "../components/ProjectArrow.tsx";

interface AboutPageProps {
  data: AboutData;
  memoatoStats?: MemoatoPublicStats | null;
}

function tracked(target: string) {
  trackEvent({ type: "click", clickType: "link", target });
}

export default function AboutPage({ data, memoatoStats }: AboutPageProps) {
  const categories = ["weight", "push-ups", "pull-ups"].flatMap((slug) => {
    const category = memoatoStats?.categories.find((item) =>
      item.slug === slug
    );
    return category ? [category] : [];
  });
  const periods = [
    { key: "today", label: "Today" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "year", label: "Year" },
  ] as const;
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Europe/Zagreb",
  });
  return (
    <div class="site-canvas profile-page about-page">
      <div class="profile-content">
        <header class="profile-intro about-intro">
          <div>
            <h1>{data.pageTitle}.</h1>
            <p class="profile-lead">{data.intro.summary}</p>
            <div class="profile-prose">
              {data.intro.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div class="profile-actions">
              <a
                href="/cv"
                class="profile-primary"
                onClick={() => tracked("cv-from-about")}
              >
                My experience<ProjectArrow />
              </a>
              <a
                href="/projects"
                class="profile-link"
                onClick={() => tracked("projects-from-about")}
              >
                What I’m building<ProjectArrow />
              </a>
            </div>
          </div>
          <img
            class="about-portrait"
            src="/pfptbs.png"
            alt="Hrvoje Pavlinovic"
            width="512"
            height="512"
            loading="eager"
          />
        </header>
        <section
          class="profile-section profile-split"
          aria-labelledby="about-work-title"
        >
          <h2 id="about-work-title">{data.work.heading}</h2>
          <div>
            <p class="profile-section-lead">{data.work.description}</p>
            <div class="about-current-work">
              {data.work.highlightedWork.map((work) => (
                <article key={work.name}>
                  <h3>
                    <a
                      href={work.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        tracked(work.trackingTarget ?? work.name.toLowerCase())}
                    >
                      {work.name}
                      <ProjectArrow diagonal />
                    </a>
                  </h3>
                  <p>{work.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          class="profile-section profile-split"
          aria-labelledby="about-approach-title"
        >
          <h2 id="about-approach-title">How I work.</h2>
          <dl class="about-approach">
            {data.work.capabilityAreas.map((area) => (
              <div key={area.title}>
                <dt>{area.title}</dt>
                <dd>{area.intro}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section
          class="profile-section profile-split"
          aria-labelledby="about-journey-title"
        >
          <h2 id="about-journey-title">{data.journey.heading}</h2>
          <div class="about-journey">
            {data.journey.stops.map((stop) => (
              <article key={stop.period}>
                <p class="profile-period">{stop.period}</p>
                <h3>{stop.headline}</h3>
                <p>{stop.summary}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          class="profile-section profile-split"
          aria-labelledby="about-life-title"
        >
          <h2 id="about-life-title">{data.life.heading}</h2>
          <div>
            <div class="about-life">
              {data.life.focusAreas.map((area) => (
                <article key={area.title}>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
            <details class="about-stats">
              <summary>Personal stats from Memoato</summary>
              {categories.length > 0 && (
                <div class="about-stats-scroll">
                  <table>
                    <caption>Public activity logs by period</caption>
                    <thead>
                      <tr>
                        <th scope="col">Log</th>
                        {periods.map((p) => (
                          <th scope="col" key={p.key}>{p.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.slug}>
                          <th scope="row">
                            {category.url
                              ? (
                                <a
                                  href={category.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() =>
                                    tracked(
                                      `memoato-category-${category.slug}`,
                                    )}
                                >
                                  {category.title}
                                </a>
                              )
                              : category.title}
                          </th>
                          {periods.map((p) => (
                            <td key={p.key}>
                              {category[p.key] == null
                                ? "–"
                                : `${formatter.format(category[p.key]!)}${
                                  category.unit ? ` ${category.unit}` : ""
                                }`}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {memoatoStats?.generatedAt && (
                <p class="profile-small">
                  Data retrieved{" "}
                  {dateFormatter.format(new Date(memoatoStats.generatedAt))}.
                  Weight shows the latest log in each period; exercise values
                  are period totals.
                </p>
              )}
              <a
                class="profile-link"
                href="https://app.memoato.com/u/0xhp10"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => tracked("memoato-profile-stats")}
              >
                View public profile<ProjectArrow diagonal />
              </a>
            </details>
          </div>
        </section>
        <section
          class="profile-section profile-split"
          aria-labelledby="about-principles-title"
        >
          <h2 id="about-principles-title">{data.principles.heading}</h2>
          <ul class="profile-bullets">
            {data.principles.items.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </section>
        <footer class="profile-close">
          <p>More from the work itself.</p>
          <a
            href="/blog"
            class="profile-link"
            onClick={() => tracked("writing-from-about")}
          >
            Read my field notes<ProjectArrow />
          </a>
        </footer>
      </div>
    </div>
  );
}
