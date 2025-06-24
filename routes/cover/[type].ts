import { FreshContext, Handlers } from "$fresh/server.ts";
import cvData from "../../data/cv.json" with { type: "json" };

interface CoverLetterTemplate {
  opening: string;
  body: string[];
  closing: string;
  skills: string[];
}

const coverLetterTemplates: Record<string, CoverLetterTemplate> = {
  web3: {
    opening: "I am writing to express my strong interest in the {position} position at {companyName}. With over 12 years of software engineering experience and specialized expertise in blockchain technologies, I am excited about the opportunity to contribute to your innovative Web3 initiatives.",
    body: [
      "My experience at ReneVerse.io has given me deep hands-on experience with blockchain development, where I architected serverless infrastructure supporting interoperable gaming assets across multiple blockchain networks. I successfully scaled systems to handle 1.7B+ ad impressions while maintaining 99.9% uptime, demonstrating my ability to build robust Web3 applications at scale.",
      "At CryptoToday, I built Ethereum-based decentralized voting engine with zero downtime and integrated TON and ETH payment processing systems. My technical stack includes Ethereum, Bitcoin, Smart Contracts, TonConnect, Ethers, and Wagmi, making me well-equipped to tackle complex Web3 challenges.",
      "Beyond technical skills, I bring leadership experience mentoring teams of 4+ developers and establishing development standards that improve deployment frequency by 3x. My combination of deep blockchain knowledge, scalability expertise, and team leadership makes me an ideal candidate for driving Web3 innovation at {companyName}."
    ],
    closing: "I am eager to discuss how my Web3 expertise and proven track record of scaling blockchain applications can contribute to {companyName}'s continued success in the decentralized ecosystem.",
    skills: ["Ethereum", "Bitcoin", "Smart Contracts", "Web3 Architecture", "Blockchain Scalability", "System Design"]
  },
  bitcoin: {
    opening: "I am excited to apply for the {position} position at {companyName}. As a dedicated Bitcoin enthusiast since 2017 and seasoned software engineer with 12+ years of experience, I am passionate about contributing to Bitcoin's mission of financial sovereignty and innovation.",
    body: [
      "My journey with Bitcoin began in 2017, and since then I have been deeply involved in the ecosystem both professionally and personally. At ReneVerse.io, I developed blockchain infrastructure that handles massive scale, processing 1.7B+ ad impressions while maintaining sub-200ms response times, demonstrating my ability to build robust systems that Bitcoin applications require.",
      "I founded XXI Today, a comprehensive Bitcoin portal tracking the historic journey to 21 million coins, showcasing my commitment to Bitcoin education and community building. This project reflects my deep understanding of Bitcoin's fundamentals and my dedication to making Bitcoin accessible to everyone from beginners to experts.",
      "My technical expertise spans the full spectrum needed for Bitcoin development: backend architecture, performance optimization, security best practices, and scalability solutions. Having led development teams and established coding standards across multiple organizations, I bring both the technical depth and leadership experience necessary to drive Bitcoin innovation at {companyName}."
    ],
    closing: "I would welcome the opportunity to discuss how my Bitcoin passion, technical expertise, and commitment to sound money principles align with {companyName}'s mission in the Bitcoin ecosystem.",
    skills: ["Bitcoin Protocol", "Lightning Network", "UTXO Management", "Bitcoin Security", "Payment Processing", "Financial Infrastructure"]
  },
  backend: {
    opening: "I am writing to apply for the {position} position at {companyName}. With 12+ years of experience developing scalable serverless and event-driven architecture and a proven track record of optimizing systems for thousands of concurrent requests, I am confident I can make significant contributions to your backend infrastructure.",
    body: [
      "My expertise lies in building robust, scalable backend systems that handle massive traffic loads. At ReneVerse.io, I architected serverless infrastructure that scales to 1.7B+ monthly ad impressions with 99.9% uptime and sub-200ms response times. This experience has given me deep knowledge of performance optimization, caching strategies, and load balancing techniques essential for modern backend systems.",
      "I excel in database optimization and concurrent request handling, having optimized PostgreSQL databases for real-time data processing from 50+ sources with 70% query speed improvements. My technical stack includes Node.js, TypeScript, Express, Nest.js, GraphQL, REST APIs, and extensive experience with AWS infrastructure including CDK, Lambda, and ECS.",
      "Beyond technical implementation, I bring strong leadership skills, having mentored teams of 4+ developers and established development standards that improved deployment frequency by 3x. My experience conducting 15+ technical interviews and reducing time-to-hire by 30% demonstrates my ability to build and scale engineering teams effectively."
    ],
    closing: "I am excited about the opportunity to bring my backend expertise and passion for scalable architecture to help {companyName} build robust, high-performance systems that drive business growth.",
    skills: ["Serverless Architecture", "Database Optimization", "API Development", "AWS Infrastructure", "Performance Optimization", "System Scalability"]
  },
  fullstack: {
    opening: "I am interested in the {position} position at {companyName}. With 12+ years of comprehensive software development experience spanning backend architecture, frontend development, and everything in between, I am well-positioned to contribute across your entire technology stack.",
    body: [
      "My full-stack expertise is demonstrated through projects like Memoato, where I'm developing an AI-powered life tracking platform that replaces 5+ productivity apps with intelligent automation. This involves backend APIs with GPT Turbo and Whisper integration, real-time analytics dashboards, and modern frontend interfaces using React and Tailwind CSS.",
      "At ReneVerse.io, I built complete solutions from backend services handling 1.7B+ ad impressions to frontend SDKs for Unity and Unreal Engine integration. My technical versatility spans Node.js, TypeScript, React, Next.js, PostgreSQL, AWS infrastructure, and modern development practices including CI/CD and Infrastructure as Code.",
      "I bring both technical depth and product thinking, having founded HILLS Lab where I deliver custom full-stack solutions for enterprise clients across multiple industries. My experience leading development standards across organizations and mentoring teams demonstrates my ability to architect solutions that scale both technically and organizationally."
    ],
    closing: "I would love to discuss how my full-stack expertise and product-focused approach can help {companyName} deliver exceptional user experiences backed by robust, scalable technology.",
    skills: ["Full Stack Development", "React/Next.js", "Backend APIs", "Database Design", "UI/UX Implementation", "End-to-End Architecture"]
  },
  lead: {
    opening: "I am writing to express my interest in the {position} position at {companyName}. With 12+ years of software engineering experience and a proven track record of leading technical teams, establishing development standards, and scaling systems to handle billions of requests, I am excited about the opportunity to drive technical excellence at your organization.",
    body: [
      "My leadership experience spans multiple organizations where I have successfully built and mentored high-performing engineering teams. At ReneVerse.io, I mentor a team of 4 developers and conduct technical interviews, contributing to a 50% reduction in time-to-productivity for new hires. I established development standards that improved deployment frequency by 3x while maintaining 99.9% system uptime.",
      "At Profico, I led development standards meetings with C-level executives, establishing company-wide coding practices adopted by 20+ developers. I mentored 3 junior developers who achieved promotion to mid-level positions within 12 months and reduced system downtime by 80% through strategic architecture decisions and proactive monitoring implementation.",
      "My technical leadership is backed by deep engineering expertise in scalable architecture, having built systems that handle 1.7B+ ad impressions and optimized databases for thousands of concurrent requests. I combine hands-on technical skills with strategic thinking, balancing technical debt management, team growth, and delivery excellence to achieve both short-term goals and long-term architectural vision."
    ],
    closing: "I am eager to discuss how my technical leadership experience and passion for building high-performing teams can help {companyName} achieve its engineering goals and scale its technology organization.",
    skills: ["Technical Leadership", "Team Mentoring", "Architecture Design", "Development Standards", "Performance Optimization", "Strategic Planning"]
  },
  staff: {
    opening: "I am writing to express my strong interest in the {position} position at {companyName}. With 12+ years of software engineering experience, extensive experience in scalable architecture design, and a proven track record of leading technical initiatives across multiple organizations, I am excited about the opportunity to drive technical excellence and innovation at {companyName}.",
    body: [
      "As a senior technical contributor, I have consistently delivered high-impact solutions that scale to massive traffic loads. At ReneVerse.io, I architected serverless and event-driven infrastructure supporting 1.7B+ monthly ad impressions with 99.9% uptime and sub-200ms response times. My expertise spans distributed systems engineering, AWS infrastructure, and performance optimization strategies that handle thousands of concurrent requests.",
      "My technical influence extends beyond individual contributions to shaping engineering culture and practices. I've established development standards adopted by 20+ developers, reduced system downtime by 80% through strategic architecture decisions, and mentored engineering teams while conducting 15+ technical interviews. My experience consolidating legacy systems by unifying 6 repositories into a monorepo reduced build times by 40%.",
      "I bring a unique combination of deep technical expertise in modern technologies (Node.js, TypeScript, GraphQL, Serverless, Kubernetes, PostgreSQL, DynamoDB) and strategic thinking necessary for Staff-level impact. My experience with Web3/blockchain technologies, distributed systems, and security best practices positions me to tackle complex technical challenges while maintaining focus on business outcomes and team productivity."
    ],
    closing: "I am eager to discuss how my technical depth, architectural expertise, and proven ability to drive large-scale technical initiatives can contribute to {companyName}'s continued growth and technical excellence.",
    skills: ["Staff-level Engineering", "Distributed Systems", "Technical Strategy", "Architecture Design", "Performance at Scale", "Technical Leadership"]
  }
};

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext) {
    try {
      const { type } = ctx.params;
      const url = new URL(req.url);
      const companyName = url.searchParams.get("company") || url.searchParams.get("companyName") || "[Company Name]";
      const position = url.searchParams.get("position") || `${type.charAt(0).toUpperCase() + type.slice(1)} Position`;
      
      // Validate cover letter type
      if (!coverLetterTemplates[type]) {
        return new Response("Invalid cover letter type", { status: 400 });
      }

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

      const template = coverLetterTemplates[type];
      
      // Header with contact information
      yPosition = addText(cvData.profile.name, margin, yPosition, contentWidth, 16, 'bold');
      yPosition = addText(cvData.profile.title, margin, yPosition, contentWidth, 12, 'normal', [60, 60, 60]);
      yPosition += 4;
      
      // Contact info in a more compact format
      const contactInfo = `${cvData.profile.email} | ${cvData.profile.phone} | ${cvData.profile.website}`;
      yPosition = addText(contactInfo, margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition = addText(cvData.profile.location, margin, yPosition, contentWidth, 10, 'normal', [60, 60, 60]);
      yPosition += 8;

      // Date
      const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      yPosition = addText(currentDate, margin, yPosition, contentWidth, 10, 'normal');
      yPosition += 8;

      // Company address placeholder
      yPosition = addText(`${companyName} Team`, margin, yPosition, contentWidth, 10, 'bold');
      yPosition += 8;

      // Subject line
      const subjectLine = `Subject: Application for ${position}`;
      yPosition = addText(subjectLine, margin, yPosition, contentWidth, 10, 'bold');
      yPosition += 6;

      // Salutation
      yPosition = addText(`Dear ${companyName} Team,`, margin, yPosition, contentWidth, 10, 'normal');
      yPosition += 6;

      // Opening paragraph
      const openingText = template.opening.replace(/{companyName}/g, companyName).replace(/{position}/g, position);
      yPosition = addText(openingText, margin, yPosition, contentWidth, 10, 'normal');
      yPosition += 6;

      // Body paragraphs
      template.body.forEach((paragraph) => {
        checkNewPage(20);
        const bodyText = paragraph.replace(/{companyName}/g, companyName).replace(/{position}/g, position);
        yPosition = addText(bodyText, margin, yPosition, contentWidth, 10, 'normal');
        yPosition += 6;
      });

      // Key Skills section
      checkNewPage(15);
      yPosition = addText("Key Relevant Skills:", margin, yPosition, contentWidth, 10, 'bold');
      yPosition += 2;
      const skillsText = template.skills.join(" • ");
      yPosition = addText(`• ${skillsText}`, margin, yPosition, contentWidth, 10, 'normal');
      yPosition += 6;

      // Closing paragraph
      checkNewPage(15);
      const closingText = template.closing.replace(/{companyName}/g, companyName).replace(/{position}/g, position);
      yPosition = addText(closingText, margin, yPosition, contentWidth, 10, 'normal');
      yPosition += 6;

      // Sign-off
      yPosition = addText("Thank you for your time and consideration.", margin, yPosition, contentWidth, 10, 'normal');
      yPosition += 8;
      yPosition = addText("Sincerely,", margin, yPosition, contentWidth, 10, 'normal');
      yPosition = addText(cvData.profile.name, margin, yPosition, contentWidth, 10, 'bold');

      // Generate PDF buffer
      const pdfBuffer = doc.output('arraybuffer');

      const fileName = `Hrvoje_Pavlinovic_Cover_Letter.pdf`;

      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${fileName}"`,
          "Cache-Control": "no-cache",
        },
      });
    } catch (error) {
      console.error("Error generating cover letter PDF:", error);
      return new Response("Error generating cover letter PDF", { status: 500 });
    }
  },
}; 