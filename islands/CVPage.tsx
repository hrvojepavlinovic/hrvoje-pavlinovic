import cvData from "../data/cv.json" with { type: "json" };
import type { CVData } from "../types/cv.ts";
import ProjectArrow from "../components/ProjectArrow.tsx";

const cv = cvData as unknown as CVData;

export default function CVPage() {
  const {
    hero,
    profile,
    professionalSummary,
    experience,
    skills,
    personalProjects,
    education,
    references,
  } = cv;
  return (
    <div class="site-canvas profile-page cv-page">
      <div class="profile-content">
        <header class="profile-intro">
          <div class="cv-identity">
            <img
              src={profile.photo}
              alt={profile.name}
              width="88"
              height="88"
              loading="eager"
            />
            <div>
              <h1>{hero.title}.</h1>
              <p class="profile-identity">{profile.name} · {profile.title}</p>
              <p class="profile-muted">{profile.location}</p>
            </div>
          </div>
          <p class="profile-lead">{hero.subtitle}.</p>
          <div class="profile-actions">
            <a class="profile-primary" href="/cv/pdf">
              Download PDF<ProjectArrow />
            </a>
            <a class="profile-link" href="/cv/ats">
              ATS PDF<ProjectArrow />
            </a>
            <a class="profile-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <dl class="cv-facts">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <section class="cv-summary" aria-labelledby="cv-summary-title">
            <h2 id="cv-summary-title">Professional summary</h2>
            <p>{professionalSummary.description}</p>
          </section>
          <nav class="profile-jump-links" aria-label="On this page">
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#personal-projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#references">References</a>
          </nav>
        </header>
        <section
          id="experience"
          class="profile-section"
          aria-labelledby="experience-title"
        >
          <h2 id="experience-title">Experience.</h2>
          <div class="cv-roles">
            {experience.map((role) => (
              <article key={`${role.company}-${role.period}`} class="cv-role">
                <p class="profile-period">{role.period}</p>
                <div>
                  <h3>
                    {role.companyUrl
                      ? (
                        <a
                          href={role.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {role.company}
                        </a>
                      )
                      : role.company}
                  </h3>
                  <p class="cv-role-title">{role.title}</p>
                  <ul class="profile-bullets">
                    {role.achievements.map((item) => <li key={item}>{item}
                    </li>)}
                  </ul>
                  {role.technologies?.length
                    ? (
                      <p class="profile-stack">
                        {role.technologies.join(" · ")}
                      </p>
                    )
                    : null}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          id="skills"
          class="profile-section profile-split"
          aria-labelledby="skills-title"
        >
          <h2 id="skills-title">Skills.</h2>
          <div>
            <ul class="cv-expertise">
              {skills.coreExpertise.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <dl class="profile-definition">
              {Object.entries(skills.techStack).map(([group, items]) => (
                <div key={group}>
                  <dt>{group}</dt>
                  <dd>{items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section
          id="personal-projects"
          class="profile-section profile-split"
          aria-labelledby="projects-title"
        >
          <div>
            <h2 id="projects-title">My own work.</h2>
            <a href="/projects" class="profile-link">
              Project case studies<ProjectArrow />
            </a>
          </div>
          <div class="cv-projects">
            {personalProjects.map((project) => (
              <article key={project.name}>
                <h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                    <ProjectArrow diagonal />
                  </a>
                </h3>
                <p>{project.description}</p>
                <p class="profile-stack">{project.technologies.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="education"
          class="profile-section profile-split"
          aria-labelledby="education-title"
        >
          <h2 id="education-title">Education.</h2>
          <div class="cv-education">
            {education.map((entry) => (
              <article key={entry.degree}>
                <p class="profile-period">{entry.period}</p>
                <h3>{entry.degree}</h3>
                <p>{entry.institution}</p>
                {entry.details.length > 0 && (
                  <ul class="profile-bullets">
                    {entry.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
        <section
          id="references"
          class="profile-section"
          aria-labelledby="references-title"
        >
          <h2 id="references-title">References.</h2>
          <p class="profile-section-note">
            In the words of people I’ve worked with.
          </p>
          <div class="cv-references">
            {references.map((reference) => (
              <figure key={`${reference.company}-${reference.person}`}>
                <blockquote>
                  <p>{reference.quote}</p>
                </blockquote>
                <figcaption>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${reference.person} on LinkedIn`}
                  >
                    {reference.person}
                    <ProjectArrow diagonal />
                  </a>
                  <p>{reference.title}</p>
                  <a
                    class="cv-reference-company"
                    href={reference.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {reference.company}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <footer class="profile-close">
          <p>Have something in mind?</p>
          <a class="profile-link" href={`mailto:${profile.email}`}>
            Let’s talk<ProjectArrow />
          </a>
        </footer>
      </div>
    </div>
  );
}
