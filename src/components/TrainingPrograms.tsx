import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Briefcase,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Trophy,
} from "lucide-react";
import Reveal from "./Reveal";

const programs = [
  {
    icon: Calculator,
    tag: "CA Learning Track",
    title: "Chartered Accountancy Mastery",
    subtitle: "Foundation to Final, taught by qualified CAs.",
    duration: "12–24 months",
    cohort: "Live + Recorded",
    seats: "Small cohorts of 40",
    highlights: [
      "CA Foundation, Inter & Final coverage",
      "Live problem-solving sessions",
      "Mock exams & revision marathons",
      "1:1 mentorship with practicing CAs",
      "Doubt-clearing within 24 hours",
    ],
    outcome: "92% first-attempt pass rate",
    accent: "from-primary/20 to-primary/0",
  },
  {
    icon: Briefcase,
    tag: "Tech Recruitment Track",
    title: "Job-Oriented Tech Career Program",
    subtitle: "From learner to hired engineer in months, not years.",
    duration: "4–6 months",
    cohort: "Hybrid bootcamp",
    seats: "Cohorts of 25",
    highlights: [
      "Full-stack, Data, DevOps & QA tracks",
      "Real client projects in your portfolio",
      "Resume, LinkedIn & interview coaching",
      "Direct referrals into our hiring network",
      "Placement support until you're hired",
    ],
    outcome: "Avg. placement in 90 days",
    accent: "from-primary/15 to-primary/0",
  },
];

const TrainingPrograms = () => {
  return (
    <section id="training" className="py-28 bg-background relative overflow-hidden border-t border-border/40">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Reveal>
            <Badge variant="secondary" className="px-4 py-2 mb-6 glass-effect border-primary/30">
              <GraduationCap className="w-3.5 h-3.5 mr-2 text-primary" />
              <span className="text-xs font-medium tracking-wide uppercase">
                Live Training Programs
              </span>
            </Badge>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Learn the Skills
              <span className="block gradient-text">That Actually Get You Hired.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg text-muted-foreground font-light">
              Two flagship programs designed for serious learners. Taught live by industry experts, backed by real placement outcomes.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {programs.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <Card className="group relative overflow-hidden border-border/60 hover:border-primary/50 bg-card/60 backdrop-blur-sm hover-lift glow-border transition-all duration-300 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-60 pointer-events-none`} />
                <CardContent className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                      <p.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2">
                        {p.tag}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-foreground">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 font-light">{p.subtitle}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6 pl-[76px]">
                    <div className="flex flex-col">
                      <Clock className="w-4 h-4 text-primary mb-1.5" />
                      <span className="text-xs text-muted-foreground">Duration</span>
                      <span className="text-sm font-medium">{p.duration}</span>
                    </div>
                    <div className="flex flex-col">
                      <Users className="w-4 h-4 text-primary mb-1.5" />
                      <span className="text-xs text-muted-foreground">Format</span>
                      <span className="text-sm font-medium">{p.cohort}</span>
                    </div>
                    <div className="flex flex-col">
                      <GraduationCap className="w-4 h-4 text-primary mb-1.5" />
                      <span className="text-xs text-muted-foreground">Batch</span>
                      <span className="text-sm font-medium">{p.seats}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 pl-[76px] mb-6 flex-1">
                    {p.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pl-[76px] flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold gradient-text">{p.outcome}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group/btn"
                      onClick={() => {
                        const el = document.getElementById("contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Enroll
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Not sure which track fits you? <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-primary hover:underline font-medium">Talk to a program advisor</button>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TrainingPrograms;
