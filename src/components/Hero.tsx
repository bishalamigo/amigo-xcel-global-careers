import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="bg-background pb-12 pt-28 md:pb-16 md:pt-32">
    <div className="container mx-auto px-5">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-primary">AmigoXcel Academy</p>
        <h1 className="mt-5 font-editorial text-4xl leading-tight sm:text-5xl md:text-6xl">
          Tech Recruitment.<span className="hero-accent block">Digital Marketing.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Learn with experienced mentors and recruiters. Build practical skills, with placement support after your course.
        </p>
        <Button size="lg" className="mt-7" onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}>
          Find Your Best Fit <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">Two focused courses. Placement support, not a job guarantee.</p>
      </div>
    </div>
  </section>
);

export default Hero;
