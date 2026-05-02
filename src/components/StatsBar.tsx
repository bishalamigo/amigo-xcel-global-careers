import Reveal from "./Reveal";
import Counter from "./Counter";

const stats = [
  { end: 50, suffix: "+", label: "Projects delivered globally" },
  { end: 8, suffix: "", label: "Countries served" },
  { end: 100, suffix: "%", label: "Founder-led delivery" },
  { end: 24, suffix: "/7", label: "Async partner support" },
];

const StatsBar = () => {
  return (
    <section className="py-20 bg-background border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 tracking-tight">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
