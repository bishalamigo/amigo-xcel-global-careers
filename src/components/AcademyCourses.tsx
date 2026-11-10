import { Check, Clock3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { academyCourses, openCourseEnquiry } from "@/lib/academy";

const AcademyCourses = () => (
  <section id="courses" className="border-y border-border bg-background py-12 md:py-16">
    <div className="container mx-auto px-5">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold text-primary">Choose your course</p>
        <h2 className="mt-3 font-editorial text-3xl md:text-4xl">Which skill do you want to build?</h2>
        <p className="mt-4 text-base text-muted-foreground">Compare the focus, then ask about the syllabus and next class.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {academyCourses.map((course, index) => (
          <article key={course.title} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
            <div className={`border-b border-border p-6 ${index === 0 ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
              <p className="mb-3 text-sm font-semibold">0{index + 1}</p>
              <h3 className="font-editorial text-2xl leading-tight md:text-3xl">{course.title}</h3>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm font-semibold text-primary">{course.audience}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="h-4 w-4 shrink-0" />{course.duration}</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{course.summary}</p>
              {course.learn.length > 0 ? <>
                <h4 className="mt-6 text-sm font-semibold">What you will learn</h4>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed">
                  {course.learn.map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>)}
                </ul>
              </> : <div className="mt-6 border-l-2 border-primary pl-4 text-sm leading-relaxed">
                The detailed syllabus, duration and projects are being confirmed. Ask for these details before enrolling.
              </div>}
              <div className="mt-6 border-t border-border pt-5">
                <h4 className="text-sm font-semibold">{course.learn.length > 0 ? "What you will practise" : "Before you decide"}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{course.outcome}</p>
              </div>
              <div className="mt-auto pt-6"><Button className="w-full sm:w-auto" onClick={() => openCourseEnquiry(course.title)}>Find Your Best Fit <ArrowRight className="h-4 w-4" /></Button></div>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Ask about live or recorded classes, weekly commitment, course fees and the next start date before enrolling.</p>
    </div>
  </section>
);

export default AcademyCourses;
