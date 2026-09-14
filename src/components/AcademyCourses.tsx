import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Laptop, Rocket, SearchCheck, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  { icon: Laptop, marker: "AGES 10-16", title: "Tech Ready Kids", lead: "Understand tech careers. Build projects. Earn first income.", close: "Start early. Get ahead." },
  { icon: Rocket, marker: "15 DAYS", title: "Ready Before Your Batch", lead: "Get job-ready before graduation. Beat your peers.", close: "Graduate prepared for the job market." },
  { icon: SearchCheck, marker: "7 DAYS", title: "Resume & Profile Optimization", lead: "Fix your resume. Strengthen your profile. Get noticed faster.", close: "Build a stronger profile for your next application." },
  { icon: UsersRound, marker: "2 MONTHS", title: "AI-Powered Tech Recruitment Certification", lead: "Master the complete hiring system.", close: "Certification. Network. Premium opportunities." },
];

const AcademyCourses = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const chooseCourse = (title: string) => {
    window.dispatchEvent(new CustomEvent("academy:course", { detail: title }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="courses" className="bg-foreground py-16 text-background md:py-24">
      <div className="container mx-auto px-5">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase text-primary">Choose your path</p>
          <h2 className="text-3xl font-bold md:text-5xl">One academy. Four clear starting points.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {courses.map((course, index) => (
            <article key={course.title} className="group flex min-h-[330px] flex-col rounded-lg border border-background/15 bg-background p-6 text-foreground transition-colors hover:border-primary">
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">{course.marker}</span>
                <course.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold leading-tight">{course.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{course.lead}</p>
              <div className="mt-auto pt-7">
                {expanded === index && <p className="mb-5 border-l-2 border-primary pl-3 text-sm font-semibold">{course.close}</p>}
                <Button variant="link" className="h-auto p-0" onClick={() => setExpanded(expanded === index ? null : index)} aria-expanded={expanded === index}>
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
                {expanded === index && (
                  <Button className="mt-4 w-full" onClick={() => chooseCourse(course.title)}>Find Your Best Fit</Button>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 border-t border-background/15 pt-6">
          <Button variant="ghost" className="text-background hover:bg-background/10 hover:text-background" onClick={() => setComparisonOpen((value) => !value)} aria-expanded={comparisonOpen} aria-controls="course-comparison">
            See Comparison {comparisonOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
          {comparisonOpen && (
            <div id="course-comparison" className="mt-5 overflow-x-auto rounded-lg border border-background/15">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-background/10 text-background"><tr><th className="p-4">Course</th><th className="p-4">Best for</th><th className="p-4">Length</th><th className="p-4">Focus</th></tr></thead>
                <tbody className="divide-y divide-background/10">
                  <tr><td className="p-4 font-semibold">Tech Ready Kids</td><td className="p-4">Ages 10-16</td><td className="p-4">Not specified</td><td className="p-4">Tech careers and projects</td></tr>
                  <tr><td className="p-4 font-semibold">Ready Before Your Batch</td><td className="p-4">Graduating students</td><td className="p-4">15 days</td><td className="p-4">Job readiness</td></tr>
                  <tr><td className="p-4 font-semibold">Resume & Profile Optimization</td><td className="p-4">Job seekers</td><td className="p-4">7 days</td><td className="p-4">Resume and profile</td></tr>
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