import { FreshContext, Handlers } from "$fresh/server.ts";
import cvData from "../../data/cv.json" with { type: "json" };

interface Stat {
  value: string;
  label: string;
}

interface Profile {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  stats: Stat[];
}

interface ProfessionalSummary {
  description: string;
}

type TechStack = Record<string, string[]>;

interface Skills {
  coreExpertise: string[];
  techStack: TechStack;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  technologies?: string[];
}

interface PersonalProject {
  name: string;
  url: string;
  description: string;
  technologies: string[];
}

interface Reference {
  company: string;
  companyUrl: string;
  person: string;
  title: string;
  url: string;
  quote: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

interface CVData {
  profile: Profile;
  professionalSummary: ProfessionalSummary;
  skills: Skills;
  experience: Experience[];
  personalProjects: PersonalProject[];
  references: Reference[];
  education: Education[];
}

const typedCvData = cvData as unknown as CVData;

export const handler: Handlers = {
  async GET(_req: Request, _ctx: FreshContext) {
    try {
      const { jsPDF } = await import("https://esm.sh/jspdf@2.5.1");

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      doc.setFont("helvetica");

      const margin = 14;
      const pageWidth = 210;
      const pageHeight = 297;
      const contentWidth = pageWidth - margin * 2;
      const bottom = 282;
      let yPosition = 16;

      const ensurePage = (requiredSpace = 12) => {
        if (yPosition + requiredSpace > bottom) {
          doc.addPage();
          yPosition = 16;
        }
      };

      const addText = (
        text: string,
        fontSize = 9,
        fontStyle = "normal",
        indent = 0,
        extraAfter = 1.5,
      ) => {
        doc.setFont("helvetica", fontStyle);
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(text, contentWidth - indent);
        const textHeight = lines.length * (fontSize * 0.46) + extraAfter;
        ensurePage(textHeight);
        doc.text(lines, margin + indent, yPosition);
        yPosition += textHeight;
      };

      const estimateTextHeight = (
        text: string,
        fontSize = 9,
        indent = 0,
        extraAfter = 1.5,
      ) => {
        const lines = doc.splitTextToSize(text, contentWidth - indent);
        return lines.length * (fontSize * 0.46) + extraAfter;
      };

      const addSection = (title: string, requiredSpace = 28) => {
        ensurePage(requiredSpace);
        yPosition += yPosition === 16 ? 0 : 4;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(title.toUpperCase(), margin, yPosition);
        yPosition += 2.5;
        doc.setDrawColor(190, 190, 190);
        doc.setLineWidth(0.2);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 5;
      };

      const addLink = (
        text: string,
        url: string,
        fontSize = 8.5,
        fontStyle = "normal",
        extraAfter = 1.4,
      ) => {
        const linkY = yPosition;
        addText(text, fontSize, fontStyle, 0, extraAfter);
        doc.link(
          margin,
          linkY - 3,
          Math.min(doc.getTextWidth(text), contentWidth),
          4,
          {
            url,
          },
        );
      };

      const { profile, professionalSummary, skills, experience } = typedCvData;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(profile.name, margin, yPosition);
      yPosition += 7;

      addText(profile.title, 11, "normal", 0, 1);
      addText(
        `${profile.email} | ${profile.phone} | ${profile.website} | ${profile.location}`,
        9,
        "normal",
        0,
        2,
      );

      addSection("Professional Summary", 30);
      addText(professionalSummary.description, 9);

      addSection("Core Skills", 42);
      addText(`Core expertise: ${skills.coreExpertise.join(", ")}`, 9);
      Object.entries(skills.techStack).forEach(([category, items]) => {
        addText(`${category}: ${items.join(", ")}`, 9);
      });
      addText(
        "Additional keywords: backend engineering, platform engineering, distributed systems, live commerce, auctions, payments, shipping, logistics, event-driven architecture, API design, observability, AI coding tools, autonomous agents, safe credential handling, production reliability.",
        8,
      );

      addSection("Professional Experience", 48);
      experience.forEach((role) => {
        ensurePage(28);
        addText(
          `${role.title} | ${role.company} | ${role.period}`,
          10,
          "bold",
          0,
          2.2,
        );
        role.achievements.forEach((achievement) => {
          addText(`- ${achievement}`, 8.6, "normal", 2, 1.6);
        });
        if (role.technologies?.length) {
          addText(
            `Technologies: ${role.technologies.join(", ")}`,
            8,
            "normal",
            0,
            2,
          );
        }
        yPosition += 2;
      });

      addSection("Selected Projects", 44);
      typedCvData.personalProjects.forEach((project) => {
        ensurePage(20);
        addText(`${project.name} | ${project.url}`, 9.2, "bold", 0, 1.5);
        addText(project.description, 8.6, "normal", 0, 1.4);
        addText(
          `Technologies: ${project.technologies.join(", ")}`,
          8,
          "normal",
          0,
          2.4,
        );
      });

      addSection("Education", 34);
      typedCvData.education.forEach((entry) => {
        addText(
          `${entry.degree} | ${entry.institution} | ${entry.period}`,
          9,
          "normal",
          0,
          1.6,
        );
        entry.details.forEach((detail) =>
          addText(`- ${detail}`, 8.5, "normal", 2, 1.4)
        );
      });

      addSection("References", 50);
      addText(
        "Written recommendations from engineering leaders and founders I have worked with.",
        9,
        "normal",
        0,
        2.2,
      );
      typedCvData.references.forEach((reference) => {
        const referenceHeight =
          estimateTextHeight(reference.person, 9.2, 0, 0.8) +
          estimateTextHeight(reference.title, 8.3, 0, 0.8) +
          estimateTextHeight(`LinkedIn: ${reference.url}`, 8, 0, 0.8) +
          estimateTextHeight(
            `Company: ${reference.company} - ${reference.companyUrl}`,
            8,
            0,
            1.2,
          ) +
          estimateTextHeight(
            `Recommendation: "${reference.quote}"`,
            8.6,
            0,
            3,
          );
        ensurePage(referenceHeight);
        addText(reference.person, 9.2, "bold", 0, 0.8);
        addText(reference.title, 8.3, "normal", 0, 0.8);
        addLink(`LinkedIn: ${reference.url}`, reference.url, 8, "normal", 0.8);
        addLink(
          `Company: ${reference.company} - ${reference.companyUrl}`,
          reference.companyUrl,
          8,
          "normal",
          1.2,
        );
        addText(`Recommendation: "${reference.quote}"`, 8.6, "normal", 0, 3);
      });

      const pageCount = doc.getNumberOfPages();
      for (let page = 1; page <= pageCount; page += 1) {
        doc.setPage(page);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(120, 120, 120);
        doc.text(
          `Hrvoje Pavlinovic - Resume - Page ${page} of ${pageCount}`,
          margin,
          pageHeight - 8,
        );
      }

      const pdfBuffer = doc.output("arraybuffer");

      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition":
            'attachment; filename="Hrvoje_Pavlinovic_Resume.pdf"',
          "Cache-Control": "no-cache",
        },
      });
    } catch (error) {
      console.error("Error generating ATS PDF:", error);
      return new Response("Error generating ATS PDF", { status: 500 });
    }
  },
};
