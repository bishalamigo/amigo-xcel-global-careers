import { Button } from "@/components/ui/button";
import { ArrowRight, BriefcaseBusiness, GraduationCap, School, UserRound } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const stages = [
  { label: "Kids", note: "Curiosity", icon: School },
  { label: "Student", note: "Preparation", icon: GraduationCap },
  { label: "Job Seeker", note: "Momentum", icon: UserRound },
  { label: "Professional", note: "Mastery", icon: BriefcaseBusiness },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-accent/30 to-transparent" />

      <div className="container relative z-10 mx-auto px-5">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            The Academy
          </span>

          <h1 className="mt-7 font-editorial text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Know How Hiring Works.
            <span className="mt-2 block hero-accent">Then Dominate It.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Start at any age. Master the hiring system. Get results faster.
          </p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Most people learn hiring the slow way, one rejection at a time. We teach it from the
            inside, the way recruiters actually decide.
          </p>

          <div className="mt-9 flex justify-center">
            <Button size="xl" className="group w-full sm:w-auto" onClick={() => scrollTo("courses")}>
              See Your Best Fit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            One path, four stages
          </p>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {stages.map((stage, index) => (
              <div key={stage.label} className="relative flex min-h-28 flex-col justify-between bg-card p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <stage.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <div>
                  <span className="block font-display text-base font-semibold">{stage.label}</span>
                  <span className="text-xs text-muted-foreground">{stage.note}</span>
                </div>
                {index < 3 && (
                  <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-primary p-1 text-primary-foreground sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
