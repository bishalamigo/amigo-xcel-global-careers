import { Card, CardContent } from "@/components/ui/card";
import { Globe2, Briefcase, Users2 } from "lucide-react";

const proof = [
  { icon: Users2, stat: "Growing", label: "Roster of clients scaling their teams" },
  { icon: Briefcase, stat: "Multi-Project", label: "Delivered across tech, content & hiring" },
  { icon: Globe2, stat: "Global", label: "Working with clients across countries" },
];

const Testimonials = () => {
  return (
    <section className="py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-6">Social Proof</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Built on Trust.
              <span className="block gradient-text">Growing Every Day.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {proof.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <Card className="bg-card/70 backdrop-blur-sm border-border/60 hover:border-primary/40 hover-lift glow-border h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_hsl(var(--primary)/0.25)]">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{p.stat}</div>
                  <p className="text-muted-foreground">{p.label}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-card border-border/60 overflow-hidden glow-border">
              <CardContent className="p-8 md:p-12">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Case Snapshot</p>
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-foreground">
                  "We came in for hiring. Stayed for the engine. Within months, our team, content, and tech were finally moving in the same direction."
                </blockquote>
                <p className="mt-6 text-sm text-muted-foreground">— Founder, growing digital brand</p>
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
