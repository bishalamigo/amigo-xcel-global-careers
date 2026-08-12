// Resume Tailor analysis endpoint. The AI key stays server-side.
import { streamText } from "npm:ai";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";

const API_KEY = Deno.env.get("LOVABLE_API_KEY");
const MODEL = "google/gemini-3.6-flash";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Simple in-memory rate limit (per instance): 20 requests / 15 min per IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
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
  String(v || "")
    .replace(/\u0000/g, "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

function buildPrompt(resume: string, job: string) {
  return `You are an expert technical recruiter and resume screening specialist for Amigoxcel.

Compare the supplied resume against the supplied job description.

FACTUAL SAFETY RULES:
- Never invent skills, employers, titles, dates, education, certifications, achievements, metrics, responsibilities or technologies.
- Never claim a job-description skill merely because the job asks for it.
- Only state that a skill is confirmed when the resume provides evidence.
- If evidence is ambiguous, mark it partial.
- Missing means "not established by the supplied resume", not necessarily "candidate cannot do it".
- Rewritten bullets must preserve the factual meaning of the source resume.
- Improve wording and relevance, but never fabricate.
- Every rewritten statement must be defensible by the candidate in an interview.

SCORING:
Technical skills 35
Relevant experience 25
Qualifications 20
Responsibilities 10
Keywords 10
Total 100.

Status values: confirmed, partial, missing.

Verdicts:
90-100 Excellent match
75-89 Strong match
60-74 Moderate match
40-59 Needs significant improvement
0-39 Weak match

Recommendations:
90-100 Strongly shortlist
75-89 Shortlist
60-74 Consider after targeted edits
40-59 Do not shortlist yet
0-39 Weak fit

Return ONLY valid JSON matching this exact shape:
{
  "matchScore": 0,
  "verdict": "",
  "recommendation": "",
  "scoreBreakdown": { "skills": 0, "experience": 0, "qualifications": 0, "responsibilities": 0, "keywords": 0 },
  "requirements": [ { "requirement": "", "status": "confirmed", "evidence": "" } ],
  "matchedKeywords": [],
  "missingKeywords": [],
  "strengths": [],
  "fixes": [],
  "rewrittenSummary": "",
  "rewrittenBullets": [],
  "caution": ""
}

Rules:
- requirements: max 12 important requirements
- matchedKeywords: max 10
- missingKeywords: max 10
- strengths: exactly 3
- fixes: max 6
- rewrittenBullets: 3-5
- Keep evidence specific.
- Keep everything concise.

RESUME:
<<<RESUME_START>>>
${resume}
<<<RESUME_END>>>

JOB DESCRIPTION:
<<<JOB_START>>>
${job}
<<<JOB_END>>>`;
}

async function runModel(prompt: string): Promise<string> {
  const gateway = createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": API_KEY! },
  });

  try {
    const result = streamText({
      model: gateway(MODEL),
      temperature: 0,
      system:
        "You are a factual resume screening engine. Never invent candidate information. Reply with JSON only.",
      prompt,
    });
    return (await result.text).trim();
  } catch (e) {
    // deno-lint-ignore no-explicit-any
    const err = e as any;
    const status = Number(err?.statusCode ?? err?.status ?? 0);
    console.error("AI gateway error:", status, String(err?.message || err));
    if (status === 429) {
      throw new PubError(429, "AI service is busy right now. Please try again shortly.");
    }
    if (status === 402) {
      throw new PubError(402, "AI credits are exhausted. Please add credits to continue.");
    }
    throw new PubError(502, "AI analysis service returned an error.");
  }
}


// deno-lint-ignore no-explicit-any
function parseJson(text: string): any {
  const x = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");
  try {
    return JSON.parse(x);
  } catch { /* fall through */ }
  const a = x.indexOf("{"), b = x.lastIndexOf("}");
  if (a >= 0 && b > a) {
    try {
      return JSON.parse(x.slice(a, b + 1));
    } catch { /* fall through */ }
  }
  throw new PubError(502, "The AI returned an invalid analysis format.");
}

const clampNum = (v: unknown, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(Math.max(0, Math.min(max, n))) : 0;
};

const arr = (v: unknown, max: number) =>
  Array.isArray(v) ? v.map((x) => String(x || "").trim()).filter(Boolean).slice(0, max) : [];

const verdictFor = (s: number) =>
  s >= 90 ? "Excellent match" : s >= 75 ? "Strong match" : s >= 60 ? "Moderate match" : s >= 40 ? "Needs significant improvement" : "Weak match";

const recommendationFor = (s: number) =>
  s >= 90 ? "Strongly shortlist" : s >= 75 ? "Shortlist" : s >= 60 ? "Consider after targeted edits" : s >= 40 ? "Do not shortlist yet" : "Weak fit";

// deno-lint-ignore no-explicit-any
function normalize(x: any) {
  const b = {
    skills: clampNum(x?.scoreBreakdown?.skills, 35),
    experience: clampNum(x?.scoreBreakdown?.experience, 25),
    qualifications: clampNum(x?.scoreBreakdown?.qualifications, 20),
    responsibilities: clampNum(x?.scoreBreakdown?.responsibilities, 10),
    keywords: clampNum(x?.scoreBreakdown?.keywords, 10),
  };
  const score = b.skills + b.experience + b.qualifications + b.responsibilities + b.keywords;
  return {
    matchScore: score,
    verdict: x?.verdict || verdictFor(score),
    recommendation: x?.recommendation || recommendationFor(score),
    scoreBreakdown: b,
    requirements: Array.isArray(x?.requirements)
      // deno-lint-ignore no-explicit-any
      ? x.requirements.slice(0, 12).map((r: any) => ({
        requirement: String(r?.requirement || "Unspecified requirement"),
        status: ["confirmed", "partial", "missing"].includes(r?.status) ? r.status : "missing",
        evidence: String(r?.evidence || "No supporting evidence found in the supplied resume."),
      }))
      : [],
    matchedKeywords: arr(x?.matchedKeywords, 10),
    missingKeywords: arr(x?.missingKeywords, 10),
    strengths: arr(x?.strengths, 3),
    fixes: arr(x?.fixes, 6),
    rewrittenSummary: String(x?.rewrittenSummary || "No tailored summary was generated."),
    rewrittenBullets: arr(x?.rewrittenBullets, 5),
    caution: String(x?.caution || "Review every rewritten statement against the original resume before submitting it."),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (!API_KEY) throw new PubError(500, "AI service is not configured yet.");

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) throw new PubError(429, "Too many analyses. Please try again later.");

    const body = await req.json().catch(() => ({}));
    const resume = clean(body?.resumeText);
    const job = clean(body?.jobText);

    if (resume.length < 80) throw new PubError(400, "Your resume text is too short.");
    if (job.length < 80) throw new PubError(400, "Your job description is too short.");
    if (resume.length > 30000) throw new PubError(413, "Resume is too large. Please provide a concise text version.");
    if (job.length > 20000) throw new PubError(413, "Job description is too large.");

    const text = await runModel(buildPrompt(resume, job));

    if (!text) throw new PubError(502, "The AI returned an empty analysis.");

    return new Response(JSON.stringify({ result: normalize(parseJson(text)) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    const status = e instanceof PubError ? e.status : 500;
    const message = e instanceof PubError ? e.message : "Unable to analyze the resume right now.";
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
