import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_company_info",
  title: "Get AmigoXcel company info",
  description: "Returns AmigoXcel's positioning, contact email, website, and social links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "AmigoXcel",
      positioning: "Growth Partner — the engine behind talent, technology, training, and media.",
      tagline: "Not Just Services. The Engine Behind Your Growth.",
      website: "https://amigo-xcel-global-careers.lovable.app",
      contactEmail: "careers@amigoxcel.com",
      markets: ["AU", "US", "UK", "CA", "IN", "NP", "SG", "PH"],
      social: {
        instagram: "https://www.instagram.com/amigoxcel/",
        linkedin: "https://www.linkedin.com/company/108184787/",
      },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
