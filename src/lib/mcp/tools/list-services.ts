import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_services",
  title: "List AmigoXcel services",
  description: "Returns AmigoXcel's four growth pillars: Talent, Technology, Training, and Media.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const pillars = [
      {
        pillar: "Talent",
        summary: "Global recruitment and career placement for grads, migrants, and tech professionals.",
      },
      {
        pillar: "Technology",
        summary: "Product engineering, web/app development, and technical consulting for startups and growing businesses.",
      },
      {
        pillar: "Training",
        summary: "Job-oriented training and upskilling programs for tech and career readiness.",
      },
      {
        pillar: "Media",
        summary: "Brand storytelling, video production, and creative media to help businesses stand out.",
      },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(pillars, null, 2) }],
      structuredContent: { pillars },
    };
  },
});
