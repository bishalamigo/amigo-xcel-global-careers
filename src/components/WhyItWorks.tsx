import { ArrowRight } from "lucide-react";

const shifts = [
  { from: "Slow hiring", to: "Faster execution" },
  { from: "Fragile tech", to: "Stronger foundation" },
  { from: "Stuck skills", to: "Higher performance" },
  { from: "Invisible brand", to: "More visibility" },
];

const WhyItWorks = () => {
  return (
    <section className="py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-6">The Transformation</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              What Changes When
              <span className="block gradient-text">Everything Works Together.</span>
            </h2>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          {shifts.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div
                className="group flex items-center gap-4 md:gap-8 p-6 md:p-8 rounded-2xl bg-card/70 backdrop-blur-sm border border-border/60 hover:border-primary/50 transition-all hover-lift glow-border"
              >
                <span className="flex-1 text-lg md:text-xl text-muted-foreground line-through decoration-destructive/40">
                  {s.from}
                </span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                <span className="flex-1 text-lg md:text-2xl font-semibold text-foreground text-right">
                  {s.to}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl font-semibold leading-snug">
              Growth stops being random.
              <span className="block gradient-text mt-2">It becomes predictable.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyItWorks;
