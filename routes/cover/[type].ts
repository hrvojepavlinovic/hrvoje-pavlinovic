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
    opening:
      "I am interested in the {position} position at {companyName}. I bring 13+ years of software engineering experience, with recent work across backend platforms, GraphQL APIs, AWS infrastructure, Web2/Web3 service boundaries, and product systems that need to keep working under real production load.",
    body: [
      "At ReneVerse, I worked on core Web2 and Web3 backend services for an in-game advertising and gaming assets platform. The work combined AWS CDK, GraphQL, serverless services, background processing, and integration-heavy product delivery for a small team.",
      "I am strongest where blockchain or wallet-facing features still need normal production engineering discipline: clear data models, reliable APIs, observability, careful rollout paths, and pragmatic trade-offs between product goals and operational risk.",
      "I also bring recent experience from Tilt's live commerce platform, where payments, shipping, auctions, and real-time workflows require the same kind of careful backend ownership that complex Web3 products need once they reach real users.",
    ],
    closing:
      "I would be happy to discuss how my backend, infrastructure, and integration experience could help {companyName} ship reliable Web3 product work without losing sight of the practical engineering details.",
    skills: [
      "Backend Architecture",
      "GraphQL",
      "AWS CDK",
      "Wallet-aware Product Flows",
      "Integration Design",
      "System Design",
    ],
  },
  bitcoin: {
    opening:
      "I am excited to apply for the {position} position at {companyName}. I have 13+ years of software engineering experience and a long-standing personal interest in Bitcoin, sound money, and products that make complex systems understandable to real users.",
    body: [
      "My professional background is strongest in backend systems: live commerce at Tilt, ad engagement infrastructure at ReneVerse, healthcare workflows at Povio, and telemetry systems at Rimac. That experience transfers well to Bitcoin products where reliability, data correctness, security boundaries, and clear user flows matter.",
      "Outside client work, I have built and experimented with Bitcoin-oriented products and writing, including interfaces around education, identity, and payments. I care about making the technology useful without hiding the trade-offs or overstating what a system can do.",
      "For {companyName}, I would bring pragmatic backend engineering, strong product judgment, and genuine alignment with the long-term values behind Bitcoin.",
    ],
    closing:
      "I would welcome the chance to discuss how my backend experience and long-term Bitcoin conviction align with {companyName}'s product and engineering goals.",
    skills: [
      "Backend Systems",
      "Payments",
      "Security Boundaries",
      "Product Engineering",
      "Bitcoin",
      "Reliable Delivery",
    ],
  },
  ai: {
    opening:
      "I am interested in the {position} position at {companyName}. I bring 13+ years of software engineering experience and practical day-to-day use of modern AI tooling inside real engineering workflows, especially where speed has to stay balanced with production judgment.",
    body: [
      "At Tilt, I use modern AI tooling with connected operational context from Linear, Slack, Sentry, Stripe, Shippo, and AWS to shorten implementation and debugging cycles while keeping credential scopes and production actions explicit.",
      "In my own products, including Memoato, I have worked on natural-language capture, structured memory, search, categorization, and insight workflows. I am interested in the context layer around AI: what source is current, what is allowed, what changed, and how the output can be reviewed.",
      "My advantage is not treating AI as magic. I bring backend engineering, operational discipline, and a careful approach to where AI tools should accelerate work and where human review must stay in control.",
    ],
    closing:
      "I would be glad to discuss how I could help {companyName} apply AI tooling in ways that improve delivery speed while preserving reliability, security, and engineering judgment.",
    skills: [
      "Modern AI Tooling",
      "Repository Context",
      "Safe Tool Access",
      "Backend Engineering",
      "Search and Memory",
      "Evaluation Mindset",
      "Operational Workflows",
    ],
  },
  backend: {
    opening:
      "I am writing to apply for the {position} position at {companyName}. With 13+ years of experience building backend platforms, distributed systems, and production workflows, I can contribute quickly to teams that need reliable systems and clear technical trade-offs.",
    body: [
      "My current work at Tilt spans live commerce, auctions, payments, shipping, seller tooling, product inventory, and real-time buyer workflows inside a large TypeScript backend monorepo.",
      "Before Tilt, I built backend and infrastructure at ReneVerse, Povio, Rimac, Profico, and Ericsson across ad engagement data, healthcare workflows, telemetry systems, search, and internal tooling. The recurring pattern is domain-heavy backend work where the system has to remain understandable after release.",
      "My technical stack includes Node.js, TypeScript, NestJS, Express, GraphQL, Hasura, PostgreSQL, Redis, AWS CDK, ECS, Lambda, SNS/SQS, Docker, and CI/CD. I also bring strong communication and ownership habits, which matter as much as code in ambiguous backend work.",
    ],
    closing:
      "I would be happy to discuss how my backend experience could help {companyName} build systems that are reliable, operable, and easier for the team to evolve.",
    skills: [
      "Backend Platforms",
      "API Development",
      "AWS Infrastructure",
      "PostgreSQL",
      "Event-driven Systems",
      "Production Reliability",
    ],
  },
  fullstack: {
    opening:
      "I am interested in the {position} position at {companyName}. I am backend-first, but I have 13+ years of experience shipping across the stack when the product needs it.",
    body: [
      "PLAYGRND is the clearest personal example: I own a full product path from a Postgres source-of-truth model and private Go API to SSR SvelteKit pages, Redis-backed hot reads, WhatsApp onboarding, player claims, admin review flows, deployment, and operations. Memoato, PLAYGRND Draft, and this website add more examples of full-stack product ownership.",
      "Professionally, my deepest experience is backend-heavy product work: Tilt live commerce, ReneVerse ad engagement infrastructure, Povio healthcare workflows, and Rimac telemetry systems. That gives me a strong foundation for full-stack roles where backend quality still drives product reliability.",
      "I work comfortably with TypeScript, Node.js, React, Next.js, SvelteKit, Fresh/Deno, PostgreSQL, Redis, AWS, Docker, and CI/CD, and I care about making product decisions explicit instead of hiding complexity behind implementation details.",
    ],
    closing:
      "I would be glad to discuss how my backend depth and product-minded full-stack experience could help {companyName} ship practical, dependable product work.",
    skills: [
      "Full Stack Development",
      "React/Next.js",
      "Backend APIs",
      "Database Design",
      "UI/UX Implementation",
      "End-to-End Architecture",
    ],
  },
  lead: {
    opening:
      "I am writing to express my interest in the {position} position at {companyName}. With 13+ years of software engineering experience, I bring a senior hands-on approach to technical leadership: clarify the problem, design the system, ship carefully, and leave the team with healthier defaults.",
    body: [
      "At Tilt, I work in a fast-moving distributed team across live commerce, payments, shipping, auctions, seller tooling, and operational fixes. That environment rewards clear communication, ownership, and the ability to move without making production behavior vague.",
      "Across Profico, ReneVerse, Rimac, and Povio, I have mentored developers, led standards discussions, conducted technical interviews, and helped small teams turn ambiguous requirements into maintainable systems.",
      "My leadership style is pragmatic and close to the code. I like teams that communicate plainly, review trade-offs honestly, and treat reliability, documentation, and operational ownership as part of delivery rather than cleanup after the fact.",
    ],
    closing:
      "I would welcome the opportunity to discuss how my hands-on technical leadership could help {companyName} deliver reliably while keeping the engineering system healthy.",
    skills: [
      "Technical Leadership",
      "Team Mentoring",
      "Architecture Design",
      "Development Standards",
      "Performance Optimization",
      "Strategic Planning",
    ],
  },
  staff: {
    opening:
      "I am writing to express my interest in the {position} position at {companyName}. I bring 13+ years of engineering experience across backend platforms, distributed systems, infrastructure, and complex product domains where strong technical judgment matters more than ceremony.",
    body: [
      "My recent work at Tilt is a good example of the kind of systems I enjoy: a large TypeScript backend monorepo, many services, commerce and logistics constraints, real-time workflows, and production integrations with Stripe, Shippo, Sentry, AWS, and related operational tools.",
      "At ReneVerse, I helped architect backend and data systems for ad engagement and targeting. At Rimac, I worked on telemetry and OTA update systems. At Povio, I worked in healthcare/clinical-trials workflows. Those domains are different, but the useful pattern is the same: make the system legible, reliable, and evolvable.",
      "For a Staff-level role, I would bring hands-on backend depth, careful architecture, communication across product and engineering, and a bias toward solving the real constraint rather than adding process or abstraction prematurely.",
    ],
    closing:
      "I would be happy to discuss where {companyName} needs senior technical leverage and whether my background fits the systems, team shape, and product pressure you are facing.",
    skills: [
      "Staff-level Engineering",
      "Distributed Systems",
      "Technical Strategy",
      "Architecture Design",
      "Performance at Scale",
      "Technical Leadership",
    ],
  },
};

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext) {
    try {
      const { type } = ctx.params;
      const url = new URL(req.url);
      const companyName = url.searchParams.get("company") ||
        url.searchParams.get("companyName") || "[Company Name]";
      const position = url.searchParams.get("position") ||
        `${type.charAt(0).toUpperCase() + type.slice(1)} Position`;

      // Validate cover letter type
      if (!coverLetterTemplates[type]) {
        return new Response("Invalid cover letter type", { status: 400 });
      }

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
      const addText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        fontSize = 10,
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

      const template = coverLetterTemplates[type];

      // Header with contact information
      yPosition = addText(
        cvData.profile.name,
        margin,
        yPosition,
        contentWidth,
        16,
        "bold",
      );
      yPosition = addText(
        cvData.profile.title,
        margin,
        yPosition,
        contentWidth,
        12,
        "normal",
        [60, 60, 60],
      );
      yPosition += 4;

      // Contact info in a more compact format
      const contactInfo =
        `${cvData.profile.email} | ${cvData.profile.phone} | ${cvData.profile.website}`;
      yPosition = addText(
        contactInfo,
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
        [60, 60, 60],
      );
      yPosition = addText(
        cvData.profile.location,
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
        [60, 60, 60],
      );
      yPosition += 8;

      // Date
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      yPosition = addText(
        currentDate,
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
      );
      yPosition += 8;

      // Company address placeholder
      yPosition = addText(
        `${companyName} Team`,
        margin,
        yPosition,
        contentWidth,
        10,
        "bold",
      );
      yPosition += 8;

      // Subject line
      const subjectLine = `Subject: Application for ${position}`;
      yPosition = addText(
        subjectLine,
        margin,
        yPosition,
        contentWidth,
        10,
        "bold",
      );
      yPosition += 6;

      // Salutation
      yPosition = addText(
        `Dear ${companyName} Team,`,
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
      );
      yPosition += 6;

      // Opening paragraph
      const openingText = template.opening.replace(
        /{companyName}/g,
        companyName,
      ).replace(/{position}/g, position);
      yPosition = addText(
        openingText,
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
      );
      yPosition += 6;

      // Body paragraphs
      template.body.forEach((paragraph) => {
        checkNewPage(20);
        const bodyText = paragraph.replace(/{companyName}/g, companyName)
          .replace(/{position}/g, position);
        yPosition = addText(
          bodyText,
          margin,
          yPosition,
          contentWidth,
          10,
          "normal",
        );
        yPosition += 6;
      });

      // Key Skills section
      checkNewPage(15);
      yPosition = addText(
        "Key Relevant Skills:",
        margin,
        yPosition,
        contentWidth,
        10,
        "bold",
      );
      yPosition += 2;
      const skillsText = template.skills.join(" • ");
      yPosition = addText(
        `• ${skillsText}`,
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
      );
      yPosition += 6;

      // Closing paragraph
      checkNewPage(15);
      const closingText = template.closing.replace(
        /{companyName}/g,
        companyName,
      ).replace(/{position}/g, position);
      yPosition = addText(
        closingText,
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
      );
      yPosition += 6;

      // Sign-off
      yPosition = addText(
        "Thank you for your time and consideration.",
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
      );
      yPosition += 8;
      yPosition = addText(
        "Sincerely,",
        margin,
        yPosition,
        contentWidth,
        10,
        "normal",
      );
      yPosition = addText(
        cvData.profile.name,
        margin,
        yPosition,
        contentWidth,
        10,
        "bold",
      );

      // Generate PDF buffer
      const pdfBuffer = doc.output("arraybuffer");

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
