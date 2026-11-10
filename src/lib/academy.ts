export const academyCourses = [
  {
    title: "AI-Powered Tech Recruitment",
    duration: "2 months",
    audience: "Aspiring and practising recruiters",
    summary: "Build a structured hiring process, from understanding a role to assessing a candidate.",
    learn: ["Turn job requirements into a hiring brief", "Source and assess candidates using evidence", "Structure interviews and use AI with human judgment"],
    outcome: "Practise an evidence-based recruitment workflow you can explain and apply.",
  },
  {
    title: "Digital Marketing",
    duration: "Schedule to be confirmed",
    audience: "Learners exploring digital marketing",
    summary: "Explore the digital marketing course with an experienced mentor before deciding whether it fits your goals.",
    learn: [],
    outcome: "Request the syllabus, project details and class schedule before you enrol.",
  },
] as const;

export const enquiryChoices = [...academyCourses.map((course) => course.title), "Help me choose"];

export function resolveCourseEnquiry(value: unknown): string {
  return typeof value === "string" && enquiryChoices.includes(value) ? value : "Help me choose";
}

export function openCourseEnquiry(course = "Help me choose") {
  window.dispatchEvent(new CustomEvent("academy:course", { detail: resolveCourseEnquiry(course) }));
}