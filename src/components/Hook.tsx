const Hook = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-6">The Hook</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10 leading-tight">
            Growth Isn't One Problem.
            <span className="block text-muted-foreground mt-2">It's Everything.</span>
          </h2>
          <div className="space-y-5 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            <p>You don't just need developers. Or content. Or hiring support.</p>
            <p className="text-foreground font-normal">
              You need everything working together — at the right time, in the right way.
            </p>
            <p>That's where most businesses struggle.</p>
            <p className="gradient-text font-semibold text-2xl md:text-3xl pt-4">
              That's where we step in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hook;
