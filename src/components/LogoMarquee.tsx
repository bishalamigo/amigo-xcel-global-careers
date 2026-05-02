const labels = [
  "Startups", "E-commerce", "SaaS", "Creators", "Agencies",
  "Recruiters", "Founders", "D2C Brands", "Coaches", "Studios",
];

const LogoMarquee = () => {
  const items = [...labels, ...labels];
  return (
    <section className="py-12 bg-background/50 border-y border-border/40 overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
        Trusted across industries
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-12 marquee whitespace-nowrap w-max">
          {items.map((l, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-semibold text-muted-foreground/60 hover:text-primary transition-colors"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
