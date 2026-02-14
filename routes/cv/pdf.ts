import { FreshContext, Handlers } from "$fresh/server.ts";
import cvData from "../../data/cv.json" with { type: "json" };

// CV Data Types
interface Stat {
  value: string;
  label: string;
}

interface Hero {
  title: string;
  subtitle: string;
}

interface Profile {
  name: string;
  title: string;
  photo: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  stats: Stat[];
}

interface ProfessionalSummary {
  description: string;
}

interface TechStack {
  Backend: string[];
  Infrastructure: string[];
  Databases: string[];
  Security: string[];
  "Web3/Blockchain": string[];
  Frontend: string[];
}

interface Skills {
  coreExpertise: string[];
  techStack: TechStack;
}

interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  achievements: string[];
  technologies?: string[];
  isHighlight: boolean;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

interface PersonalProject {
  name: string;
  url: string;
  description: string;
  technologies: string[];
}

interface CVData {
  hero: Hero;
  profile: Profile;
  professionalSummary: ProfessionalSummary;
  skills: Skills;
  experience: Experience[];
  personalProjects: PersonalProject[];
  education: Education[];
}

// Projects Data Types
interface Project {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

interface ProjectsData {
  projects: Project[];
}

// Type the imported data
const typedCvData = cvData as unknown as CVData;

export const handler: Handlers = {
  async GET(_req: Request, _ctx: FreshContext) {
    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import("https://esm.sh/jspdf@2.5.1");

      // Create new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Set modern professional font
      doc.setFont("helvetica");

      let yPosition = 15;
      const pageWidth = 210;
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      const lineHeight = 3.8;

      // Helper function to check if we need a new page
      const checkNewPage = (requiredSpace = 20) => {
        if (yPosition + requiredSpace > 275) {
          doc.addPage();
          yPosition = 15;
          return true;
        }
        return false;
      };

      // Helper function to add text with proper spacing
      const addText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        fontSize = 9,
        fontStyle = "normal",
        color = [0, 0, 0],
      ) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", fontStyle);
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return y + (lines.length * lineHeight);
      };

      // Helper function to add section header with consistent styling
      const addSectionHeader = (
        title: string,
        y: number,
        shouldCheckNewPage: boolean = true,
      ) => {
        if (shouldCheckNewPage) {
          checkNewPage(15);
        }

        // Consistent spacing before section headers
        y += 3;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text(title.toUpperCase(), margin, y);

        // Add bitcoin orange line under header
        doc.setDrawColor(247, 147, 26);
        doc.setLineWidth(0.4);
        doc.line(margin, y + 1.5, pageWidth - margin, y + 1.5);

        return y + 6;
      };

      // Header Section - Compact professional layout
      yPosition = addText(
        typedCvData.profile.name,
        margin,
        yPosition,
        contentWidth,
        18,
        "bold",
      );
      yPosition = addText(
        typedCvData.profile.title,
        margin,
        yPosition + 1,
        contentWidth,
        11,
        "normal",
        [60, 60, 60],
      );

      yPosition += 5;

      // Contact Info in compact format
      const contactInfo = [
        `${typedCvData.profile.email}  |  ${typedCvData.profile.phone}  |  ${typedCvData.profile.website}  |  ${typedCvData.profile.location}`,
      ];

      contactInfo.forEach((line) => {
        yPosition = addText(
          line,
          margin,
          yPosition,
          contentWidth,
          9,
          "normal",
          [60, 60, 60],
        );
      });

      yPosition += 2;

      // Professional stats in compact format
      const statsWithOverride = typedCvData.profile.stats.map((stat) => {
        if (
          stat.value.toLowerCase().includes("remote") ||
          stat.label.toLowerCase().includes("remote")
        ) {
          return "Remote (B2B)";
        }
        return `${stat.value} ${stat.label}`;
      });
      const statsText = statsWithOverride.join("  |  ");
      yPosition = addText(
        statsText,
        margin,
        yPosition,
        contentWidth,
        9,
        "normal",
        [100, 100, 100],
      );
      yPosition += 5;

      // Professional Summary Section
      yPosition = addSectionHeader("Professional Summary", yPosition);
      yPosition = addText(
        typedCvData.professionalSummary.description,
        margin,
        yPosition,
        contentWidth,
        9,
        "normal",
        [40, 40, 40],
      );
      yPosition += 4;

      // Technical Skills Section
      yPosition = addSectionHeader("Technical Skills", yPosition);

      // Core Expertise
      const coreExpertiseText = "Core Expertise: " +
        typedCvData.skills.coreExpertise.join(", ");
      yPosition = addText(
        coreExpertiseText,
        margin,
        yPosition,
        contentWidth,
        8,
        "normal",
        [40, 40, 40],
      );
      yPosition += 3;

      // Tech Stack in compact format
      Object.entries(typedCvData.skills.techStack).forEach(
        ([category, technologies]) => {
          checkNewPage(8);
          yPosition = addText(
            `${category}: ${technologies.join(", ")}`,
            margin,
            yPosition,
            contentWidth,
            8,
            "normal",
            [60, 60, 60],
          );
          yPosition += 1;
        },
      );

      yPosition += 3;

      // Experience Section
      yPosition = addSectionHeader("Professional Experience", yPosition);

      yPosition += 1;

      typedCvData.experience.forEach((job) => {
        checkNewPage(18);

        // Job header
        yPosition = addText(
          job.title,
          margin,
          yPosition,
          contentWidth - 40,
          10,
          "bold",
        );

        // Company name with link and period
        const companyText = `${job.company} | ${job.period}`;
        yPosition = addText(
          companyText,
          margin,
          yPosition,
          contentWidth,
          10,
          "normal",
          [247, 147, 26],
        );

        // Add clickable link for company if URL exists
        if (job.companyUrl) {
          const companyTextWidth = doc.getTextWidth(job.company);
          doc.link(margin, yPosition - 6, companyTextWidth, 3, {
            url: job.companyUrl,
          });
        }

        yPosition += 1;

        job.achievements.forEach((achievement) => {
          checkNewPage(5);
          yPosition = addText(
            `• ${achievement}`,
            margin,
            yPosition,
            contentWidth,
            9,
            "normal",
            [40, 40, 40],
          );
        });

        // Add technologies if they exist - more compact
        if (job.technologies) {
          yPosition += 1;
          yPosition = addText(
            `Technologies: ${job.technologies.join(", ")}`,
            margin,
            yPosition,
            contentWidth,
            8,
            "normal",
            [100, 100, 100],
          );
        }

        yPosition += 2.5;
      });

      // Personal Projects Section
      yPosition = addSectionHeader("Personal Projects", yPosition);

      yPosition += 1;

      typedCvData.personalProjects.forEach((project) => {
        // Project header
        yPosition = addText(
          project.name,
          margin,
          yPosition,
          contentWidth - 30,
          10,
          "bold",
        );

        // Add clickable project link in orange
        yPosition = addText(
          project.url,
          margin,
          yPosition,
          contentWidth,
          8,
          "normal",
          [247, 147, 26],
        );
        const linkWidth = doc.getTextWidth(project.url);
        doc.link(margin, yPosition - 5, linkWidth, 3, { url: project.url });
        yPosition += 1;

        // Add description
        yPosition = addText(
          project.description,
          margin,
          yPosition,
          contentWidth,
          9,
          "normal",
        );
        yPosition += 1;

        yPosition = addText(
          `Technologies: ${project.technologies.join(", ")}`,
          margin,
          yPosition,
          contentWidth,
          8,
          "normal",
          [100, 100, 100],
        );

        yPosition += 2.5;
      });

      // Education Section
      // Ensure enough space for header + content to avoid orphan headers
      checkNewPage(45);
      yPosition = addSectionHeader("Education", yPosition, false);

      yPosition += 1;

      typedCvData.education.forEach((edu, index) => {
        const requiredSpace = 12 + (edu.details.length * 4);

        if (index > 0 || yPosition + requiredSpace > 275) {
          checkNewPage(requiredSpace);
        }

        yPosition = addText(
          edu.degree,
          margin,
          yPosition,
          contentWidth - 30,
          10,
          "bold",
        );
        yPosition = addText(
          `${edu.institution} | ${edu.period}`,
          margin,
          yPosition,
          contentWidth,
          9,
          "normal",
          [247, 147, 26],
        );
        yPosition += 1;

        edu.details.forEach((detail) => {
          yPosition = addText(
            `• ${detail}`,
            margin,
            yPosition,
            contentWidth,
            9,
            "normal",
            [40, 40, 40],
          );
        });

        yPosition += 2;
      });

      // Generate PDF buffer
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
      console.error("Error generating PDF:", error);
      return new Response("Error generating PDF", { status: 500 });
    }
  },
};
