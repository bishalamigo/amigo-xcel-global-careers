import { defineTool } from "@lovable.dev/mcp-js";

const COURSE = {
  name: "Become Job Ready in 30 Days",
  format: "Live online sessions with mentor feedback and practical assignments",
  duration: "30 days",
  overview:
    "A focused program that takes candidates from unclear job search to interview-ready, covering positioning, resume and profile work, interview practice and outreach.",
  curriculum: [
    "Week 1: Career positioning, target roles and market research",
    "Week 2: Resume, LinkedIn and portfolio built for real job descriptions",
    "Week 3: Interview practice, technical and behavioural preparation",
    "Week 4: Outreach, applications and offer conversations",
  ],
  outcomes: [
    "A tailored resume and profile matched to target roles",
    "A repeatable application and outreach routine",
    "Interview confidence with practised answers",
    "A clear 90-day plan after the program",
  ],
  enrollment: {
    howToApply: "Send an enquiry through the site or email careers@amigoxcel.com",
    email: "careers@amigoxcel.com",
    page: "https://www-amigoxcel-com.lovable.app/#courses",
  },
};

export default defineTool({
  name: "get_course_details",
  title: "Get training program details",
  description:
    "Get details of the AmigoXcel 'Become Job Ready in 30 Days' training program: overview, weekly curriculum, outcomes and how to enroll.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(COURSE, null, 2) }],
    structuredContent: COURSE,
  }),
});
