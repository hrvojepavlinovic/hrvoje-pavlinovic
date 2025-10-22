import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    try {
      const formData = await req.formData();
      const template = formData.get("template") as string;
      const company = formData.get("company") as string;
      const position = formData.get("position") as string;

      // Validate required fields
      if (!template || !company || !position) {
        return new Response("Missing required fields", { status: 400 });
      }

      // Validate template type
      const validTemplates = [
        "web3",
        "bitcoin",
        "ai",
        "backend",
        "fullstack",
        "lead",
        "staff",
      ];
      if (!validTemplates.includes(template)) {
        return new Response("Invalid template type", { status: 400 });
      }

      // Redirect to the existing cover letter endpoint with parameters
      const url = new URL(`/cover/${template}`, req.url);
      url.searchParams.set("company", company);
      url.searchParams.set("position", position);

      return Response.redirect(url.toString());
    } catch (error) {
      console.error("Error processing cover letter request:", error);
      return new Response("Error processing request", { status: 500 });
    }
  },
};
