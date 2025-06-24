import { FreshContext, Handlers } from "$fresh/server.ts";
import cvData from "../../data/cv.json" with { type: "json" };
import projectsData from "../../data/projects.json" with { type: "json" };

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

interface CVData {
  hero: Hero;
  profile: Profile;
  professionalSummary: ProfessionalSummary;
  skills: Skills;
  experience: Experience[];
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
const typedProjectsData = projectsData as unknown as ProjectsData;

export const handler: Handlers = {
  async GET(_req: Request, _ctx: FreshContext) {
    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import("https://esm.sh/jspdf@2.5.1");
      
      // Create new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Set modern professional font
      doc.setFont("helvetica");
      
      let yPosition = 20;
      const pageWidth = 210;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      const lineHeight = 4.5;

      // Helper function to check if we need a new page
      const checkNewPage = (requiredSpace = 25) => {
        if (yPosition + requiredSpace > 270) {
          doc.addPage();
          yPosition = 20;
          return true;
        }
        return false;
      };

      // Helper function to add text with proper spacing
      const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10, fontStyle = 'normal', color = [0, 0, 0]) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", fontStyle);
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return y + (lines.length * lineHeight);
      };

      // Helper function to add section header with bitcoin orange styling
      const addSectionHeader = (title: string, y: number) => {
        checkNewPage(20);
        // Add extra space before section headers
        y += 4;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text(title.toUpperCase(), margin, y);
        
        // Add bitcoin orange line under header
        doc.setDrawColor(247, 147, 26);
        doc.setLineWidth(0.5);
        doc.line(margin, y + 2, pageWidth - margin, y + 2);
        
        return y + 8;
      };

      // Header Section - Professional layout (no photo)
      yPosition = addText(typedCvData.profile.name, margin, yPosition, contentWidth, 20, 'bold');
      yPosition = addText(typedCvData.profile.title, margin, yPosition + 2, contentWidth, 12, 'normal', [60, 60, 60]);

      yPosition += 8;

      // Contact Info on separate lines
      yPosition = addText(`Email: ${typedCvData.profile.email}`, margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition = addText(`Phone: ${typedCvData.profile.phone}`, margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition = addText(`Website: ${typedCvData.profile.website}`, margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition = addText(`Location: ${typedCvData.profile.location}`, margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition += 6;

      // Professional stats layout with B2B override
      const statsWithOverride = typedCvData.profile.stats.map(stat => {
        if (stat.value.toLowerCase().includes('remote') || stat.label.toLowerCase().includes('remote')) {
          return 'Remote (B2B)';
        }
        return `${stat.value} ${stat.label}`;
      });
      const statsText = statsWithOverride.join('  |  ');
      yPosition = addText(statsText, margin, yPosition, contentWidth, 10, 'normal', [100, 100, 100]);
      yPosition += 8;

      // Professional Summary Section
      yPosition = addSectionHeader("Professional Summary", yPosition);
      
      // Professional summary description
      yPosition = addText(typedCvData.professionalSummary.description, margin, yPosition, contentWidth, 10, 'normal', [40, 40, 40]);
      yPosition += 8;

      // Technical Skills Section
      yPosition = addSectionHeader("Technical Skills", yPosition);
      
      // Core Expertise
      const coreExpertiseText = "Core Expertise: " + typedCvData.skills.coreExpertise.join(", ");
      yPosition = addText(coreExpertiseText, margin, yPosition, contentWidth, 10, 'normal', [40, 40, 40]);
      yPosition += 6;

      // Tech Stack in professional format
      Object.entries(typedCvData.skills.techStack).forEach(([category, technologies]) => {
        checkNewPage(10);
        yPosition = addText(`${category}: ${technologies.join(", ")}`, margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
        yPosition += 2;
      });

      yPosition += 4;
      
      // Experience Section
      yPosition = addSectionHeader("Professional Experience", yPosition);

      yPosition += 2;
      
      typedCvData.experience.forEach((job) => {
        checkNewPage(20);
        
        // Job header
        yPosition = addText(job.title, margin, yPosition, contentWidth - 40, 12, 'bold');
        
        // Company name with link and period
        const companyText = `${job.company} | ${job.period}`;
        yPosition = addText(companyText, margin, yPosition, contentWidth, 12, 'normal', [247, 147, 26]);
        
        // Add clickable link for company if URL exists
        if (job.companyUrl) {
          const companyTextWidth = doc.getTextWidth(job.company);
          doc.link(margin, yPosition - 7, companyTextWidth, 4, { url: job.companyUrl });
        }
        
        yPosition += 2;
        
        job.achievements.forEach((achievement) => {
          checkNewPage(6);
          yPosition = addText(`• ${achievement}`, margin, yPosition, contentWidth, 10, 'normal', [40, 40, 40]);
          yPosition += 1;
        });
        
        // Add technologies if they exist
        if (job.technologies) {
          yPosition += 2;
          yPosition = addText(`Technologies: ${job.technologies.join(", ")}`, margin, yPosition, contentWidth, 9, 'normal', [100, 100, 100]);
        }
        
        yPosition += 4;
      });

      // Personal Projects Section
      yPosition = addSectionHeader("Personal Projects", yPosition);

      yPosition += 2;
      
      typedProjectsData.projects.forEach((project, index) => {
        // Only check for new page if we have enough content to display
        if (index > 0) {
          checkNewPage(25);
        }
        
        // Project header
        yPosition = addText(project.name, margin, yPosition, contentWidth - 30, 12, 'bold');
        
        // Add clickable project link in orange
        yPosition = addText(project.url, margin, yPosition, contentWidth, 9, 'normal', [247, 147, 26]);
        const linkWidth = doc.getTextWidth(project.url);
        doc.link(margin, yPosition - 6, linkWidth, 4, { url: project.url });
        yPosition += 2;
        
        // Add description
        yPosition = addText(project.description, margin, yPosition, contentWidth, 10, 'normal');
        yPosition += 2;
        
        yPosition = addText(`Technologies: ${project.technologies.join(", ")}`, margin, yPosition, contentWidth, 9, 'normal', [100, 100, 100]);
        
        yPosition += 6;
      });

      // Education Section
      yPosition = addSectionHeader("Education", yPosition);

      yPosition += 2;
      
      typedCvData.education.forEach((edu, index) => {
        // Better page break logic for education section
        const totalDetailsHeight = edu.details.length * 5;
        const requiredSpace = 20 + totalDetailsHeight;
        
        if (index > 0 || yPosition + requiredSpace > 270) {
          checkNewPage(requiredSpace);
        }
        
        yPosition = addText(edu.degree, margin, yPosition, contentWidth - 30, 12, 'bold');
        yPosition = addText(`${edu.institution} | ${edu.period}`, margin, yPosition, contentWidth, 10, 'normal', [247, 147, 26]);
        yPosition += 2;
        
        edu.details.forEach((detail) => {
          yPosition = addText(`• ${detail}`, margin, yPosition, contentWidth, 10, 'normal', [40, 40, 40]);
          yPosition += 1;
        });
        
        yPosition += 4;
      });

      // Generate PDF buffer
      const pdfBuffer = doc.output('arraybuffer');

      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=\"Hrvoje_Pavlinovic_Resume.pdf\"",
          "Cache-Control": "no-cache",
        },
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      return new Response("Error generating PDF", { status: 500 });
    }
  },
}; 