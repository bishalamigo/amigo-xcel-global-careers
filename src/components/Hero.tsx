import { Button } from "@/components/ui/button";
import { ArrowRight, BriefcaseBusiness, GraduationCap, School, UserRound } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-accent/40 to-transparent pointer-events-none" />
      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-primary mb-5 animate-fade-in">
            A learning path for every career stage
          </p>

          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in"
            style={{ animationDelay: '120ms', animationFillMode: 'backwards' }}
          >
            Know How Hiring Works.
            <span className="block hero-accent mt-2">Then Dominate It.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed animate-fade-in"
            style={{ animationDelay: '260ms', animationFillMode: 'backwards' }}
          >
            Start at any age. Master the hiring system. Get results faster.
          </p>

          <div
            className="animate-fade-in"
            style={{ animationDelay: '380ms', animationFillMode: 'backwards' }}
          >
            <Button size="xl" className="group w-full sm:w-auto" onClick={() => scrollTo('courses')}>
              See Your Best Fit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4 max-w-5xl">
          {[
            { label: "Kids", icon: School },
            { label: "Student", icon: GraduationCap },
            { label: "Job Seeker", icon: UserRound },
            { label: "Professional", icon: BriefcaseBusiness },
          ].map((stage, index) => (
            <div key={stage.label} className="relative flex min-h-28 flex-col justify-between bg-card p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <stage.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">0{index + 1}</span>
              </div>
              <span className="font-display text-base font-semibold">{stage.label}</span>
              {index < 3 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-primary p-1 text-primary-foreground sm:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
