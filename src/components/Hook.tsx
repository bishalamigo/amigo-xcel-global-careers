import Reveal from "./Reveal";

const Hook = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden border-t border-border/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 blur-3xl rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10 leading-tight">
              Growth Isn't One Problem.
              <span className="block text-muted-foreground mt-2">It's Everything.</span>
            </h2>
          </Reveal>
          <div className="space-y-5 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            <Reveal delay={120}><p>You don't just need developers, content, or hiring support.</p></Reveal>
            <Reveal delay={200}>
              <p className="text-foreground font-normal">
                You need everything working together, at the right time and in the right way.
              </p>
            </Reveal>
            <Reveal delay={280}><p>That's where most businesses struggle.</p></Reveal>
            <Reveal delay={360}>
              <p className="gradient-text font-semibold text-2xl md:text-3xl pt-4">
                That's where we step in.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hook;
