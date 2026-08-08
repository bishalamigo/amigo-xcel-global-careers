import { Card, CardContent } from "@/components/ui/card";
import { Users, Code2, GraduationCap, Clapperboard } from "lucide-react";
import Reveal from "./Reveal";

const featured = {
  icon: Users,
  tag: "Talent",
  title: "Build the right team before you build anything else.",
  body: "Hiring sets the ceiling for everything else you do. We source, screen, and place people who can actually carry the work, across IT and non-IT roles, onshore or offshore.",
  points: ["Recruitment & staffing", "Offshore hiring", "IT & Non-IT roles"],
};

const rest = [
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
    title: "Attention is the new currency.",
    points: ["Video editing for Reels, YouTube, Ads", "Personal brand content", "Creative campaigns"],
  },
];

const Services = () => {
  return (
    <section id="engine" className="py-28 bg-background relative border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              The System Behind
              <span className="block text-primary">Modern Growth.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg text-muted-foreground">
              Four pillars. One engine. Built to move your business forward.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 max-w-6xl lg:items-start">
          {/* Featured pillar */}
          <Reveal className="lg:col-span-7">
            <Card className="bg-secondary/40 border-primary/30">
              <CardContent className="p-8 md:p-12">
                <featured.icon className="w-10 h-10 text-primary mb-8" />
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-4">{featured.tag}</p>
                <h3 className="text-2xl md:text-4xl font-semibold leading-tight mb-5">{featured.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">{featured.body}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.points.map((pt) => (
                    <span
                      key={pt}
                      className="text-sm text-foreground/80 border border-border rounded-full px-4 py-1.5"
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Stacked, staggered secondary pillars */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {rest.map((p, i) => (
              <Reveal key={p.tag} delay={(i + 1) * 90}>
                <Card className={`bg-card border-border/60 ${i === 1 ? "lg:ml-8" : ""}`}>
                  <CardContent className="p-7">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary">{p.tag}</p>
                      <p.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold leading-snug mb-4">{p.title}</h3>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {p.points.map((pt) => (
                        <li key={pt} className="border-l border-border pl-3">{pt}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
