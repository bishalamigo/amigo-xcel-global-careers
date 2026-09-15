import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronUp, Laptop, Rocket, SearchCheck, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type Course = {
  icon: typeof Laptop;
  marker: string;
  format: string;
  title: string;
  lead: string;
  close: string;
  includes: string[];
  tags: string[];
  block: string;
  blockText: string;
};

const courses: Course[] = [
  {
    icon: Laptop,
    marker: "AGES 10-16",
    format: "Foundation",
    title: "Tech Ready Kids",
    lead: "Understand tech careers. Build projects. Earn first income.",
    close: "Start early. Get ahead.",
    includes: ["How tech careers really work", "Build real projects", "First income, first confidence"],
    tags: ["Young Learners", "Projects", "Foundation"],
    block: "bg-primary",
    blockText: "text-primary-foreground",
  },
  {
    icon: Rocket,
    marker: "15 DAYS",
    format: "Sprint",
    title: "Ready Before Your Batch",
    lead: "Get job-ready before graduation. Beat your peers.",
    close: "Graduate prepared for the job market.",
    includes: ["Job-ready before you graduate", "Interview practice that mirrors reality", "A plan for your first role"],
    tags: ["Students", "Interview Prep", "Job Search"],
    block: "bg-accent",
    blockText: "text-accent-foreground",
  },
  {
    icon: SearchCheck,
    marker: "7 DAYS",
    format: "Intensive",
    title: "Resume & Profile Optimization",
    lead: "Fix your resume. Strengthen your profile. Get noticed faster.",
    close: "Build a stronger profile for your next application.",
    includes: ["A resume recruiters finish reading", "A profile that gets found", "Your story, told sharper"],
    tags: ["Job Seekers", "Resume", "Personal Brand"],
    block: "bg-secondary",
    blockText: "text-secondary-foreground",
  },
  {
    icon: UsersRound,
    marker: "2 MONTHS",
    format: "Certification",
    title: "AI-Powered Tech Recruitment Certification",
    lead: "Master the complete hiring system.",
    close: "Certification. Network. Premium opportunities.",
    includes: ["The complete hiring system", "Certification and network", "Access to premium opportunities"],
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
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Learning Paths
          </span>
          <h2 className="mt-6 font-editorial text-3xl font-semibold leading-tight md:text-5xl">
            Four ways in. One system.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Pick the room you are standing in right now. We will show you the door out of it.
          </p>
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

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="flex flex-col justify-between rounded-2xl border border-primary/40 bg-card p-7">
            <div>
              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                Not sure yet
              </span>
              <h3 className="mt-6 font-editorial text-3xl font-semibold leading-tight">
                Every stage. One system.
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The same hiring knowledge, shaped for where you are. Kids build curiosity. Students
                build readiness. Job seekers build momentum. Professionals build mastery.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {courses.map((course) => (
                  <li key={course.title} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{course.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button className="mt-8 w-full" onClick={() => chooseCourse("Not sure yet")}>
              Find Your Best Fit
            </Button>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
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
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    {course.format} <span className="text-muted-foreground">· {course.marker}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{course.lead}</p>

                  <ul className="mt-5 space-y-2 text-sm">
                    {course.includes.map((item) => (
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
                      <p className="mb-4 border-l-2 border-primary pl-3 text-sm font-semibold">{course.close}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        variant="link"
                        className="h-auto p-0"
                        onClick={() => setExpanded(expanded === course.title ? null : course.title)}
                        aria-expanded={expanded === course.title}
                      >
                        Learn More <ArrowRight className="h-4 w-4" />
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
                  <tr><td className="p-4 font-semibold">Tech Ready Kids</td><td className="p-4">Ages 10-16</td><td className="p-4">Not specified</td><td className="p-4">Tech careers and projects</td></tr>
                  <tr><td className="p-4 font-semibold">Ready Before Your Batch</td><td className="p-4">Graduating students</td><td className="p-4">15 days</td><td className="p-4">Job readiness</td></tr>
                  <tr><td className="p-4 font-semibold">Resume &amp; Profile Optimization</td><td className="p-4">Job seekers</td><td className="p-4">7 days</td><td className="p-4">Resume and profile</td></tr>
                  <tr><td className="p-4 font-semibold">AI-Powered Tech Recruitment Certification</td><td className="p-4">Deeper mastery</td><td className="p-4">2 months</td><td className="p-4">The hiring system</td></tr>
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
