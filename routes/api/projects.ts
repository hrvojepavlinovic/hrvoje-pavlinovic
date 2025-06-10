import { HandlerContext, Handlers } from "$fresh/server.ts";

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  technologies?: string[];
  completion: number;
  featured: boolean;
  accent?: string;
}

interface ProjectsData {
  description: string;
  projects: Project[];
}

export const handler: Handlers = {
  async GET(_req: Request, _ctx: HandlerContext) {
    try {
      const projectsText = await Deno.readTextFile("./data/projects.json");
      const projectsData: ProjectsData = JSON.parse(projectsText);
      
      return new Response(JSON.stringify(projectsData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Error loading projects data:", error);
      
      // Fallback data
      const fallbackData: ProjectsData = {
        description: "Unable to load projects data.",
        projects: []
      };
      
      return new Response(JSON.stringify(fallbackData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
      });
    }
  },
}; 