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

Compare the supplied resume against the supplied job description using SEMANTIC matching, not literal keyword matching.

STEP 1 - REQUIREMENT EXTRACTION
Extract the real requirements from the job description and label each one:
- priority "must": explicitly required (words like required, must have, essential, minimum, X+ years of, or clearly core to the role).
- priority "preferred": nice to have, bonus, desirable, plus, advantageous.
Extract 6-14 requirements. Do not invent requirements the job description does not state.

STEP 2 - SEMANTIC MATCHING (this is the important part)
For each requirement decide how the resume covers it. Judge MEANING, not wording.
Match types:
- "direct": the resume evidences the same skill, tool or responsibility, even if worded differently.
  Examples of direct equivalence: "candidate screening" = "shortlisting" = "CV filtering"; "stakeholder management" = "client relationship management"; "React.js" = "React".
- "semantic": the resume evidences a closely related activity that covers most of the requirement but not all of it.
  Example: "email outreach coordination" partially covers "candidate communication".
  Do NOT mark a distinct technical skill as semantic just because it lives in the same domain: "LinkedIn sourcing" is NOT "Boolean search"; "Excel" is NOT "SQL".
- "transferable": the resume shows real depth in an adjacent skill and the specific requirement is a learnable gap.
  Example: 5 years of LinkedIn Recruiter sourcing when the job asks for Naukri, or Workday ATS when the job asks for Greenhouse. Adjacent tool in the SAME category with demonstrated depth = transferable, not absent, and not a full match.
- "absent": no evidence and nothing genuinely adjacent. Being able to learn something quickly is not evidence.

Set "coverage" to exactly: 1 for direct, 0.7 for semantic, 0.45 for transferable, 0 for absent.
Set "status": confirmed (direct), partial (semantic or transferable), missing (absent).
"evidence": quote or paraphrase the specific resume proof. For absent, say what is missing.
"gapNote": for semantic, transferable and absent only, one short line on what would close the gap. "" otherwise.

FACTUAL SAFETY RULES:
- Never invent skills, employers, titles, dates, education, certifications, achievements, metrics, responsibilities or technologies.
- Never credit a job-description skill merely because the job asks for it.
- Missing means "not established by the supplied resume".
- Rewritten bullets must preserve the factual meaning of the source resume and be defensible in an interview.
- If a rewrite would require the candidate to overstate, do not write it. List it under "gapsToAddress" instead.

STEP 3 - SUPPORTING JUDGEMENTS (0 to 10 each, integers)
- experienceDepth: seniority, years and scope versus what the job asks for.
- responsibilities: overlap between day to day duties in the resume and in the job.
- keywordAlignment: how well the resume already speaks the job's language (ATS wording), semantic equivalents count.

Return ONLY valid JSON matching this exact shape:
{
  "requirements": [ { "requirement": "", "priority": "must", "matchType": "direct", "coverage": 1, "status": "confirmed", "evidence": "", "gapNote": "" } ],
  "experienceDepth": 0,
  "responsibilities": 0,
  "keywordAlignment": 0,
  "matchedKeywords": [],
  "missingKeywords": [],
  "strengths": [],
  "fixes": [],
  "rewrittenSummary": "",
  "rewrittenBullets": [],
  "gapsToAddress": [],
  "caution": ""
}

Rules:
- requirements: 6-14 items, most important first.
- matchedKeywords / missingKeywords: max 10 each. missingKeywords must only contain terms the resume genuinely does not support.
- strengths: exactly 3. fixes: max 6, each an honest wording, structure or evidence fix.
- rewrittenBullets: 3-5, factual.
- gapsToAddress: real unmet must-have requirements the candidate should address separately (training, certification, honest framing). Never hide them.
- Keep everything concise. No markdown, JSON only.

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
        "You are a factual resume screening engine that matches on meaning, not literal keywords. Never invent candidate information. Reply with JSON only.",
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

// Weights: must-have coverage dominates, preferred is a bonus layer.
const W_MUST = 55;
const W_PREF = 15;
const W_DEPTH = 15;
const W_RESP = 8;
const W_KEYS = 7;

const COVERAGE: Record<string, number> = { direct: 1, semantic: 0.7, transferable: 0.45, absent: 0 };

// deno-lint-ignore no-explicit-any
function normalizeRequirements(x: any) {
  const list = Array.isArray(x?.requirements) ? x.requirements.slice(0, 14) : [];
  // deno-lint-ignore no-explicit-any
  return list.map((r: any) => {
    const priority = r?.priority === "preferred" ? "preferred" : "must";
    const matchType = ["direct", "semantic", "transferable", "absent"].includes(r?.matchType)
      ? r.matchType
      : r?.status === "confirmed"
      ? "direct"
      : r?.status === "partial"
      ? "semantic"
      : "absent";
    const coverage = COVERAGE[matchType];
    return {
      requirement: String(r?.requirement || "Unspecified requirement"),
      priority,
      matchType,
      coverage,
      status: matchType === "direct" ? "confirmed" : matchType === "absent" ? "missing" : "partial",
      evidence: String(r?.evidence || "No supporting evidence found in the supplied resume."),
      gapNote: matchType === "direct" ? "" : String(r?.gapNote || ""),
    };
  });
}

// deno-lint-ignore no-explicit-any
function normalize(x: any) {
  const requirements = normalizeRequirements(x);
  const musts = requirements.filter((r) => r.priority === "must");
  const prefs = requirements.filter((r) => r.priority === "preferred");

  const avg = (list: typeof requirements) =>
    list.length ? list.reduce((s, r) => s + r.coverage, 0) / list.length : 0;

  // When the job lists no preferred items, its weight rolls into must-haves.
  const mustWeight = prefs.length ? W_MUST : W_MUST + W_PREF;
  const mustPoints = Math.round(avg(musts) * mustWeight);
  const prefPoints = prefs.length ? Math.round(avg(prefs) * W_PREF) : 0;

  const depth = clampNum(x?.experienceDepth, 10);
  const resp = clampNum(x?.responsibilities, 10);
  const keys = clampNum(x?.keywordAlignment, 10);

  const depthPoints = Math.round((depth / 10) * W_DEPTH);
  const respPoints = Math.round((resp / 10) * W_RESP);
  const keyPoints = Math.round((keys / 10) * W_KEYS);

  let score = Math.max(0, Math.min(100, mustPoints + prefPoints + depthPoints + respPoints + keyPoints));

  const unmetMustHaves = musts.filter((r) => r.matchType === "absent");
  const partialMustHaves = musts.filter((r) => r.matchType !== "absent" && r.matchType !== "direct");

  // Score ceiling: more than 2 completely absent must-haves caps the score.
  let ceiling: { applied: boolean; cap: number; reason: string } = { applied: false, cap: 100, reason: "" };
  if (unmetMustHaves.length > 2) {
    const cap = 84;
    if (score > cap) {
      ceiling = {
        applied: true,
        cap,
        reason: `${unmetMustHaves.length} must-have requirements are completely absent from the resume (${unmetMustHaves
          .map((r) => r.requirement)
          .slice(0, 4)
          .join(", ")}). No amount of rewording can lift the score above ${cap}% until these are genuinely met.`,
      };
      score = cap;
    } else {
      ceiling = {
        applied: false,
        cap,
        reason: `${unmetMustHaves.length} must-have requirements are completely absent, so this role is capped at ${cap}% until they are genuinely met.`,
      };
    }
  }

  const gapsToAddress = arr(x?.gapsToAddress, 8);
  const mustGapLines = unmetMustHaves.map((r) =>
    r.gapNote ? `${r.requirement}: ${r.gapNote}` : r.requirement
  );
  const mergedGaps = Array.from(new Set([...mustGapLines, ...gapsToAddress])).slice(0, 10);

  return {
    matchScore: score,
    verdict: verdictFor(score),
    recommendation: recommendationFor(score),
    scoreBreakdown: {
      mustHaves: mustPoints,
      mustHavesMax: mustWeight,
      preferred: prefPoints,
      preferredMax: prefs.length ? W_PREF : 0,
      experience: depthPoints,
      experienceMax: W_DEPTH,
      responsibilities: respPoints,
      responsibilitiesMax: W_RESP,
      keywords: keyPoints,
      keywordsMax: W_KEYS,
    },
    requirements,
    mustHaveSummary: {
      total: musts.length,
      met: musts.filter((r) => r.matchType === "direct").length,
      partial: partialMustHaves.length,
      unmet: unmetMustHaves.length,
    },
    unmetMustHaves: unmetMustHaves.map((r) => ({
      requirement: r.requirement,
      evidence: r.evidence,
      gapNote: r.gapNote,
    })),
    scoreCeiling: ceiling,
    matchedKeywords: arr(x?.matchedKeywords, 10),
    missingKeywords: arr(x?.missingKeywords, 10),
    strengths: arr(x?.strengths, 3),
    fixes: arr(x?.fixes, 6),
    rewrittenSummary: String(x?.rewrittenSummary || "No tailored summary was generated."),
    rewrittenBullets: arr(x?.rewrittenBullets, 5),
    gapsToAddress: mergedGaps,
    caution: String(
      x?.caution ||
        "Review every rewritten statement against the original resume before submitting it. Unmet must-have requirements are listed separately and must not be rewritten around.",
    ),
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
