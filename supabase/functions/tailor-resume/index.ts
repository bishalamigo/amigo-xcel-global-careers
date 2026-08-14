// Builds a complete tailored resume from the candidate's real resume + a job description.
import { streamText } from "npm:ai";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";

const API_KEY = Deno.env.get("LOVABLE_API_KEY");
const MODEL = "google/gemini-3.6-flash";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 20;
}

class PubError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const clean = (v: unknown) =>
  String(v || "").replace(/\u0000/g, "").replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();

const str = (v: unknown, max = 400) => String(v ?? "").trim().slice(0, max);
const arr = (v: unknown, max: number, len = 400) =>
  Array.isArray(v) ? v.map((x) => str(x, len)).filter(Boolean).slice(0, max) : [];

function buildPrompt(resume: string, job: string) {
  return `You are an expert resume writer and ATS specialist.

Rewrite the candidate's resume so it targets the supplied job description as closely as HONESTLY possible.

HARD RULES (never break):
- Use ONLY facts present in the supplied resume: employers, titles, dates, education, certifications, tools, metrics.
- Never invent skills, employers, dates, degrees, numbers or achievements.
- Never claim a job-description skill that the resume does not evidence.
- You MAY reorder, reframe, re-prioritise, and rewrite wording to mirror the job's language.
- You MAY surface genuinely relevant existing experience earlier and de-emphasise irrelevant items.
- Keep every dated fact identical to the source resume.
- Use strong action verbs and, where the resume already contains numbers, keep them.
- Mirror keywords from the job description ONLY where the resume supports them.

HONESTY CHECK (run on every line you write):
- Ask: "could the candidate defend this sentence under interview questioning using only facts in the source resume?"
- If the answer is no, DO NOT write that line. Record the requirement in "gapsToAddress" instead.
- Never imply exposure to a tool, ATS, platform, certification or domain the resume does not evidence.
- Adjacent experience may be described accurately as adjacent (for example LinkedIn Recruiter sourcing), but never renamed as the requested tool.

Return ONLY valid JSON in this exact shape:
{
  "name": "",
  "headline": "",
  "contact": { "email": "", "phone": "", "location": "", "links": [] },
  "summary": "",
  "coreSkills": [],
  "experience": [ { "title": "", "company": "", "location": "", "dates": "", "bullets": [] } ],
  "projects": [ { "name": "", "description": "", "bullets": [] } ],
  "education": [ { "degree": "", "institution": "", "dates": "", "details": "" } ],
  "certifications": [],
  "additional": [],
  "keywordsUsed": [],
  "notAdded": [],
  "gapsToAddress": [],
  "changeNotes": []
}

Rules:
- name/contact: copy exactly from the resume; use "" when absent (never invent).
- headline: a short job-aligned title supported by real experience.
- summary: 3-4 sentences, first person implied, no pronouns, factual.
- coreSkills: 8-14 skills, all evidenced by the resume, ordered by job relevance.
- experience: every real role from the resume, most recent first, 3-5 tailored bullets each.
- projects: only if the resume has them, else [].
- notAdded: job requirements deliberately NOT claimed because the resume lacks evidence.
- gapsToAddress: edits that were rejected by the honesty check, each phrased as the gap the candidate should close or address honestly in the application.
- changeNotes: max 6 short notes explaining what was reframed and why.
- No markdown, no commentary, JSON only.


RESUME:
<<<RESUME_START>>>
${resume}
<<<RESUME_END>>>

JOB DESCRIPTION:
<<<JOB_START>>>
${job}
<<<JOB_END>>>`;
}

async function runModel(prompt: string) {
  const gateway = createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": API_KEY! },
  });
  try {
    const result = streamText({
      model: gateway(MODEL),
      temperature: 0.2,
      system: "You are a factual resume writer. Never invent candidate information. Reply with JSON only.",
      prompt,
    });
    return (await result.text).trim();
  } catch (e) {
    // deno-lint-ignore no-explicit-any
    const err = e as any;
    const status = Number(err?.statusCode ?? err?.status ?? 0);
    console.error("AI gateway error:", status, String(err?.message || err));
    if (status === 429) throw new PubError(429, "AI service is busy right now. Please try again shortly.");
    if (status === 402) throw new PubError(402, "AI credits are exhausted. Please add credits to continue.");
    throw new PubError(502, "Resume builder service returned an error.");
  }
}

// deno-lint-ignore no-explicit-any
function parseJson(text: string): any {
  const x = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");
  try { return JSON.parse(x); } catch { /* fall through */ }
  const a = x.indexOf("{"), b = x.lastIndexOf("}");
  if (a >= 0 && b > a) {
    try { return JSON.parse(x.slice(a, b + 1)); } catch { /* fall through */ }
  }
  throw new PubError(502, "The AI returned an invalid resume format.");
}

// deno-lint-ignore no-explicit-any
function normalize(x: any) {
  return {
    name: str(x?.name, 120),
    headline: str(x?.headline, 140),
    contact: {
      email: str(x?.contact?.email, 120),
      phone: str(x?.contact?.phone, 60),
      location: str(x?.contact?.location, 120),
      links: arr(x?.contact?.links, 4, 160),
    },
    summary: str(x?.summary, 1200),
    coreSkills: arr(x?.coreSkills, 16, 60),
    experience: Array.isArray(x?.experience)
      // deno-lint-ignore no-explicit-any
      ? x.experience.slice(0, 10).map((r: any) => ({
        title: str(r?.title, 120),
        company: str(r?.company, 120),
        location: str(r?.location, 100),
        dates: str(r?.dates, 60),
        bullets: arr(r?.bullets, 6, 400),
      }))
      : [],
    projects: Array.isArray(x?.projects)
      // deno-lint-ignore no-explicit-any
      ? x.projects.slice(0, 6).map((p: any) => ({
        name: str(p?.name, 120),
        description: str(p?.description, 400),
        bullets: arr(p?.bullets, 4, 300),
      }))
      : [],
    education: Array.isArray(x?.education)
      // deno-lint-ignore no-explicit-any
      ? x.education.slice(0, 6).map((e: any) => ({
        degree: str(e?.degree, 160),
        institution: str(e?.institution, 160),
        dates: str(e?.dates, 60),
        details: str(e?.details, 300),
      }))
      : [],
    certifications: arr(x?.certifications, 12, 160),
    additional: arr(x?.additional, 10, 200),
    keywordsUsed: arr(x?.keywordsUsed, 20, 60),
    notAdded: arr(x?.notAdded, 10, 200),
    changeNotes: arr(x?.changeNotes, 6, 240),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (!API_KEY) throw new PubError(500, "AI service is not configured yet.");

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) throw new PubError(429, "Too many requests. Please try again later.");

    const body = await req.json().catch(() => ({}));
    const resume = clean(body?.resumeText);
    const job = clean(body?.jobText);

    if (resume.length < 80) throw new PubError(400, "Your resume text is too short.");
    if (job.length < 80) throw new PubError(400, "Your job description is too short.");
    if (resume.length > 30000) throw new PubError(413, "Resume is too large. Please provide a concise text version.");
    if (job.length > 20000) throw new PubError(413, "Job description is too large.");

    const text = await runModel(buildPrompt(resume, job));
    if (!text) throw new PubError(502, "The AI returned an empty resume.");

    return new Response(JSON.stringify({ resume: normalize(parseJson(text)) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    const status = e instanceof PubError ? e.status : 500;
    const message = e instanceof PubError ? e.message : "Unable to build the tailored resume right now.";
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
