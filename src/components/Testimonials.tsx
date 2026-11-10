import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openCourseEnquiry } from "@/lib/academy";

const Testimonials = () => (
  <section id="mentors" className="bg-secondary/40 py-12 md:py-16">
    <div className="container mx-auto grid gap-10 px-5 md:grid-cols-2">
      <div>
        <p className="text-sm font-semibold text-primary">Mentor-led learning</p>
        <h2 className="mt-3 font-editorial text-3xl md:text-4xl">Learn with people who know the work.</h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">Experienced mentors and recruiters guide the courses. For recruitment, connect what you learn with how hiring decisions are made.</p>
      </div>
      <div className="border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <h3 className="text-xl font-semibold">Know who will teach you.</h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">Before enrolling, ask for your mentor’s background and the course syllabus. Choose based on relevant experience and what you will actually practise.</p>
        <ul className="mt-5 space-y-3 text-sm">
          {["Mentor background and relevant experience", "Topics, practical work and class format", "Placement support available for your course"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</li>)}
        </ul>
        <Button variant="link" className="mt-5 h-auto p-0" onClick={() => openCourseEnquiry()}>Find Your Best Fit <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </div>
  </section>
);

export default Testimonials;
