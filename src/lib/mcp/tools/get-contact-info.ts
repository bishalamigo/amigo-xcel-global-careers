import { defineTool } from "@lovable.dev/mcp-js";

const CONTACT = {
  company: "AmigoXcel",
  positioning:
    "A growth partner bringing together talent, technology, training and creative media so businesses can build faster and scale smarter.",
  email: "careers@amigoxcel.com",
  website: "https://www-amigoxcel-com.lovable.app/",
  resumeTailor: "https://www-amigoxcel-com.lovable.app/resume-tailor",
  linkedin: "https://www.linkedin.com/company/108184787/",
  instagram: "https://www.instagram.com/amigoxcel/",
  responseTime: "Replies within 24 hours from careers@amigoxcel.com",
  basedIn: "Nepal, serving clients globally",
};

export default defineTool({
  name: "get_contact_info",
  title: "Get contact information",
  description:
    "Get AmigoXcel's public contact details, website links and social profiles, plus how quickly enquiries are answered.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACT, null, 2) }],
    structuredContent: CONTACT,
  }),
});
