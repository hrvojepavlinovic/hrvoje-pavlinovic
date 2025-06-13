import { FreshContext, Handlers } from "$fresh/server.ts";
import cvData from "../../data/cv.json" with { type: "json" };

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

      // Load and add profile photo (avoiding HTTP 508 loop detection)
      try {
        let photoData: Uint8Array | null = null;
        
        // Try to read the file directly from the file system
        try {
          photoData = await Deno.readFile("./static/pfptbs.png");
          console.log("Photo loaded from static directory");
        } catch {
          try {
            photoData = await Deno.readFile("./pfptbs.png");
            console.log("Photo loaded from current directory");
          } catch {
            console.log("Could not read photo file from filesystem");
          }
        }
        
        if (photoData) {
          // Convert to base64
          let binary = '';
          const chunkSize = 8192;
          for (let i = 0; i < photoData.length; i += chunkSize) {
            const chunk = photoData.slice(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, Array.from(chunk));
          }
          const photoBase64 = btoa(binary);
          
          // Add photo
          const photoSize = 25;
          const photoX = pageWidth - margin - photoSize;
          const photoY = yPosition;
          
          doc.addImage(`data:image/png;base64,${photoBase64}`, 'PNG', photoX, photoY, photoSize, photoSize);
          console.log("Photo added successfully to PDF");
        }
      } catch (error) {
        console.log("Could not load profile photo:", error);
        // Continue without photo - don't let this break the PDF generation
      }

      // Header Section - Professional layout
      yPosition = addText(cvData.profile.name, margin, yPosition, contentWidth - 30, 20, 'bold');
      yPosition = addText(cvData.profile.title, margin, yPosition + 2, contentWidth - 30, 12, 'normal', [60, 60, 60]);

      yPosition += 8;

      // Contact Info on separate lines
      yPosition = addText("Email: hrvoje@pavlinovic.com", margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition = addText("Website: https://hrvoje.pavlinovic.com", margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition = addText("Location: Croatia (EU)", margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition += 6;

      // Professional stats layout with B2B override
      const statsWithOverride = cvData.profile.stats.map(stat => {
        if (stat.value.toLowerCase().includes('remote')) {
          return 'Remote (B2B)';
        }
        return `${stat.value} ${stat.label}`;
      });
      const statsText = statsWithOverride.join('  |  ');
      yPosition = addText(statsText, margin, yPosition, contentWidth, 10, 'normal', [100, 100, 100]);
      yPosition += 8;

      // About Section
      yPosition = addSectionHeader("About", yPosition);
      
      // Personal Info in clean format
      const personalInfoText = cvData.about.personalInfo.map(info => info.text).join('  |  ');
      yPosition = addText(personalInfoText, margin, yPosition, contentWidth, 9, 'normal', [100, 100, 100]);
      yPosition += 6;

      // Description with professional formatting
      cvData.about.description.forEach((paragraph) => {
        checkNewPage(15);
        yPosition = addText(paragraph, margin, yPosition, contentWidth, 10, 'normal', [40, 40, 40]);
        yPosition += 3;
      });

      yPosition += 6;

      // Skills Section
      yPosition = addSectionHeader("Technical Skills", yPosition);
      
      // Top Skills inline format
      const topSkillsText = "Top skills: " + cvData.skills.topSkills.map(skill => skill.name).join(", ");
      yPosition = addText(topSkillsText, margin, yPosition, contentWidth, 10, 'normal', [40, 40, 40]);
      yPosition += 6;

      // Tech Stack in professional format
      Object.entries(cvData.skills.techStack).forEach(([category, technologies]) => {
        checkNewPage(10);
        const isBackend = category === 'Backend';
        const categoryText = isBackend ? 'Backend/Frontend' : category;
        const skills = isBackend ? technologies.map(skill => skill.replace(' & ', ', ')).concat(['React', 'Tailwind']) : technologies;
        yPosition = addText(`${categoryText}: ${skills.join(", ")}`, margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
        yPosition += 2;
      });

      yPosition += 4;
      // Experience Section
      yPosition = addSectionHeader("Professional Experience", yPosition);
      
      cvData.experience.forEach((job) => {
        checkNewPage(20);
        
        // Job header
        yPosition = addText(job.title, margin, yPosition, contentWidth - 40, 12, 'bold');
        yPosition = addText(`${job.company} | ${job.period}`, margin, yPosition, contentWidth, 10, 'normal', [247, 147, 26]);
        yPosition += 2;
        
        job.achievements.forEach((achievement) => {
          checkNewPage(6);
          yPosition = addText(`• ${achievement}`, margin, yPosition, contentWidth, 10, 'normal', [40, 40, 40]);
          yPosition += 1;
        });
        
        yPosition += 4;
      });

      // Projects Section
      yPosition = addSectionHeader("Personal Projects", yPosition);
      
      cvData.projects.forEach((project, index) => {
        // Only check for new page if we have enough content to display
        if (index > 0) {
          checkNewPage(25);
        }
        
        // Project header
        yPosition = addText(project.name, margin, yPosition, contentWidth - 30, 12, 'bold');
        yPosition = addText(project.description, margin, yPosition, contentWidth, 10, 'normal', [247, 147, 26]);
        yPosition += 2;
        
        yPosition = addText(project.details, margin, yPosition, contentWidth, 10, 'normal', [40, 40, 40]);
        yPosition += 2;
        
        yPosition = addText(`Technologies: ${project.technologies.join(", ")}`, margin, yPosition, contentWidth, 9, 'normal', [100, 100, 100]);
        yPosition = addText(`${project.urlLabel}: ${project.url}`, margin, yPosition + 1, contentWidth, 9, 'normal', [100, 100, 100]);
        yPosition += 6;
      });

      // Education Section
      yPosition = addSectionHeader("Education", yPosition);
      
      cvData.education.forEach((edu, index) => {
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
          "Content-Disposition": "attachment; filename=\"Hrvoje_Pavlinovic_CV.pdf\"",
          "Cache-Control": "no-cache",
        },
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      return new Response("Error generating PDF", { status: 500 });
    }
  },
}; 