import { Card, CardContent } from "@/components/ui/card";
import { Users, Code2, GraduationCap, Clapperboard } from "lucide-react";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: Users,
    tag: "Talent",
    title: "Build the right team before you build anything else.",
    points: ["Recruitment & staffing", "Offshore hiring", "IT & Non-IT roles"],
  },
  {
    icon: Code2,
    tag: "Technology",
    title: "Turn ideas into scalable products.",
    points: ["Web & app development", "Enterprise systems", "Custom platforms"],
  },
  {
    icon: GraduationCap,
    tag: "Training",
    title: "Upgrade skills. Unlock speed.",
    points: ["Industry-focused programs", "Team upskilling", "Career accelerators"],
  },
  {
    icon: Clapperboard,
    tag: "Media",
    title: "Attention is the new currency. We help you earn it.",
    points: ["Video editing — Reels, YouTube, Ads", "Personal brand content", "Creative campaigns"],
  },
];

const Services = () => {
  return (
    <section id="engine" className="py-28 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-6">The Engine</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              The System Behind
              <span className="block gradient-text">Modern Growth.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg text-muted-foreground font-light">
              Four pillars. One engine. Built to move your business forward.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <Card
                className="group relative overflow-hidden border-border/60 hover:border-primary/50 bg-card/60 backdrop-blur-sm hover-lift glow-border transition-all duration-300 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8 md:p-10 relative z-10">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                      <p.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2">{p.tag}</p>
                      <h3 className="text-xl md:text-2xl font-semibold leading-snug text-foreground">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-2.5 pl-[76px]">
                    {p.points.map((pt, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shadow-[0_0_8px_hsl(var(--primary))]"></span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
