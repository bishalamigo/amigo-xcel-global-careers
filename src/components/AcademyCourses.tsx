import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronUp, Clock3, Laptop, Rocket, SearchCheck, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type Course = {
  icon: typeof Laptop;
  marker: string;
  audience: string;
  title: string;
  summary: string;
  learn: string[];
  completion: string;
  tags: string[];
  block: string;
  blockText: string;
};

const courses: Course[] = [
  {
    icon: Laptop,
    marker: "Schedule confirmed before you start",
    audience: "Ages 10–16",
    title: "Tech Ready Kids",
    summary: "Explore real tech roles and finish a practical project you can explain clearly.",
    learn: ["How different tech roles solve problems", "How to plan and build a small project", "How to present your work and explain your choices"],
    completion: "You finish with a completed project and can explain the skills used to build it.",
    tags: ["Young Learners", "Projects", "Foundation"],
    block: "bg-primary",
    blockText: "text-primary-foreground",
  },
  {
    icon: Rocket,
    marker: "15 days",
    audience: "Graduating students",
    title: "Ready Before Your Batch",
    summary: "Prepare the core materials and interview skills needed for a focused first-job search.",
    learn: ["Match your resume to a job description", "Answer behavioural questions using STAR", "Introduce yourself clearly and target suitable roles"],
    completion: "You can tailor a truthful resume, answer common interview questions, and run a focused application plan.",
    tags: ["Students", "Interview Prep", "Job Search"],
    block: "bg-accent",
    blockText: "text-accent-foreground",
  },
  {
    icon: SearchCheck,
    marker: "7 days",
    audience: "Job seekers",
    title: "Resume & Profile Optimization",
    summary: "Rework your resume and professional profile for the roles you are actually targeting.",
    learn: ["Read a job description for must-have requirements", "Align resume language without copying or exaggerating", "Write stronger achievement bullets and profile summaries"],
    completion: "You leave with a role-matched resume and profile that represent your real experience clearly.",
    tags: ["Job Seekers", "Resume", "Personal Brand"],
    block: "bg-secondary",
    blockText: "text-secondary-foreground",
  },
  {
    icon: UsersRound,
    marker: "2 months",
    audience: "Recruitment professionals",
    title: "AI-Powered Tech Recruitment Certification",
    summary: "Learn a structured recruitment workflow from role intake through candidate evaluation.",
    learn: ["Turn job requirements into a clear hiring brief", "Source and assess candidates against evidence", "Structure interviews and use AI without replacing judgment"],
    completion: "You can explain and apply a consistent, evidence-based recruitment process.",
    tags: ["Professionals", "Recruitment", "Mastery"],
    block: "bg-muted",
    blockText: "text-foreground",
  },
];

const filters = ["All", "Young Learners", "Students", "Job Seekers", "Professionals"];

const AcademyCourses = () => {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  const visible = useMemo(
    () => (filter === "All" ? courses : courses.filter((course) => course.tags.includes(filter))),
    [filter],
  );

  const chooseCourse = (title: string) => {
    window.dispatchEvent(new CustomEvent("academy:course", { detail: title }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="courses" className="border-y border-border bg-background py-16 md:py-24">
      <div className="container mx-auto px-5">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Choose your course
          </span>
          <h2 className="mt-6 font-editorial text-3xl font-semibold leading-tight md:text-5xl">
            Start with what you need to learn.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Compare the skills, time, and finished work before you choose.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="px-5 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Time per session</p>
            <p className="mt-2 text-sm leading-relaxed">30–60 minutes</p>
          </div>
          <div className="border-border px-5 py-3 sm:border-l">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">How you learn</p>
            <p className="mt-2 text-sm leading-relaxed">Live sessions and recorded lessons</p>
          </div>
          <div className="border-border px-5 py-3 lg:border-l">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">What you practise</p>
            <p className="mt-2 text-sm leading-relaxed">Real examples and practical assignments</p>
          </div>
          <div className="border-border px-5 py-3 sm:border-l">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Support</p>
            <p className="mt-2 text-sm leading-relaxed">Mentor feedback and accountability</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10">
          <div className="grid gap-5 md:grid-cols-2">
            {visible.map((course) => (
              <article
                key={course.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary"
              >
                <div className={`relative flex min-h-32 items-end p-5 ${course.block} ${course.blockText}`}>
                  <course.icon className="absolute right-5 top-5 h-6 w-6 opacity-70" />
                  <span className="font-editorial text-2xl font-semibold leading-tight">{course.title}</span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                   <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-wide">
                     <span className="text-primary">{course.audience}</span>
                     <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{course.marker}</span>
                   </div>
                   <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{course.summary}</p>

                   <p className="mt-5 text-xs font-bold uppercase tracking-wide">What you will learn</p>
                   <ul className="mt-3 space-y-2 text-sm">
                     {course.learn.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                     {expanded === course.title && (
                       <div className="mb-5 border-l-2 border-primary pl-3">
                         <p className="text-xs font-bold uppercase tracking-wide text-primary">By the end</p>
                         <p className="mt-1 text-sm leading-relaxed">{course.completion}</p>
                       </div>
                    )}
                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        variant="link"
                        className="h-auto p-0"
                        onClick={() => setExpanded(expanded === course.title ? null : course.title)}
                        aria-expanded={expanded === course.title}
                      >
                         {expanded === course.title ? "Show Less" : "See the outcome"} <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => chooseCourse(course.title)}>
                        Find Your Best Fit
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 border-y border-border py-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Why not just use free tutorials?</p>
            <h3 className="mt-3 font-editorial text-2xl font-semibold">Tutorials give you information. Practice shows you what you can do.</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Follow lessons in a clear order, work through real job examples, submit practical work, and get personal feedback. You will know what to improve next instead of collecting disconnected advice.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">What “job-ready” means here</p>
            <h3 className="mt-3 font-editorial text-2xl font-semibold">You can do the work of applying, not just describe it.</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Tailor a truthful resume to the role requirements.</li>
              <li className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Answer behavioural questions clearly using STAR.</li>
              <li className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Choose suitable roles and track focused applications.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setComparisonOpen((value) => !value)}
            aria-expanded={comparisonOpen}
            aria-controls="course-comparison"
          >
            See Comparison {comparisonOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
          {comparisonOpen && (
            <div id="course-comparison" className="mt-5 overflow-x-auto rounded-xl border border-border text-left">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="p-4">Course</th>
                    <th className="p-4">Best for</th>
                    <th className="p-4">Length</th>
                    <th className="p-4">Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                   <tr><td className="p-4 font-semibold">Tech Ready Kids</td><td className="p-4">Ages 10–16</td><td className="p-4">Schedule confirmed before starting</td><td className="p-4">Tech roles, projects, presentation</td></tr>
                   <tr><td className="p-4 font-semibold">Ready Before Your Batch</td><td className="p-4">Graduating students</td><td className="p-4">15 days</td><td className="p-4">Resume matching, STAR interviews, job targeting</td></tr>
                   <tr><td className="p-4 font-semibold">Resume &amp; Profile Optimization</td><td className="p-4">Job seekers</td><td className="p-4">7 days</td><td className="p-4">Role-matched resume and profile</td></tr>
                   <tr><td className="p-4 font-semibold">AI-Powered Tech Recruitment Certification</td><td className="p-4">Recruitment professionals</td><td className="p-4">2 months</td><td className="p-4">Sourcing, assessment, structured interviews</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AcademyCourses;
