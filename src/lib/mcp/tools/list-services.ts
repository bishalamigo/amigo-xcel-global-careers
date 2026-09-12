import { defineTool } from "@lovable.dev/mcp-js";

const SERVICES = [
  {
    pillar: "Talent",
    summary: "Build the right team before you build anything else.",
    offerings: ["Recruitment and staffing", "Offshore hiring", "White-label recruitment support"],
  },
  {
    pillar: "Technology",
    summary: "Turn ideas into scalable products.",
    offerings: ["Web and app development", "Enterprise systems", "Product and platform builds"],
  },
  {
    pillar: "Training",
    summary: "Upgrade skills, unlock speed.",
    offerings: ["Industry-focused programs", "Team upskilling", "Become Job Ready in 30 Days program"],
  },
  {
    pillar: "Media",
    summary: "Attention is the new currency.",
    offerings: ["Video editing for Reels, YouTube and ads", "Personal brand content", "Creative campaigns"],
  },
];

const AUDIENCES = [
  "Startups building from scratch",
  "Founders and personal brands",
  "IT and recruitment companies",
  "Agencies needing white-label support",
  "E-commerce and digital-first brands",
];

const MARKETS = [
  "Australia",
  "United States",
  "United Kingdom",
  "Canada",
  "Singapore",
  "India",
  "Nepal",
  "Philippines",
];

export default defineTool({
  name: "list_services",
  title: "List AmigoXcel services",
  description:
    "List the four AmigoXcel service pillars (Talent, Technology, Training, Media), who they are built for, and the markets served.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = { services: SERVICES, builtFor: AUDIENCES, marketsServed: MARKETS };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
