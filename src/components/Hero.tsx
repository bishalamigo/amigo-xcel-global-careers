import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Single static, subtle gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_20%_0%,hsl(var(--primary)/0.10),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10 py-24">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 animate-fade-in">
            Growth Partner, Not a Service Provider
          </p>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8 animate-fade-in"
            style={{ animationDelay: '120ms', animationFillMode: 'backwards' }}
          >
            Not Just Services.
            <span className="block hero-accent mt-2">The Engine Behind</span>
            <span className="block">Your Growth.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: '260ms', animationFillMode: 'backwards' }}
          >
            We bring together talent, technology, training, and creative media so you can build faster, scale smarter, and stand out globally.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 items-start animate-fade-in"
            style={{ animationDelay: '380ms', animationFillMode: 'backwards' }}
          >
            <Button size="xl" className="group" onClick={() => scrollTo('engine')}>
              Start Your Growth
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => scrollTo('contact')}>
              Book a Free Strategy Call
            </Button>
          </div>

          <p
            className="mt-10 text-sm text-muted-foreground max-w-xl animate-fade-in"
            style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}
          >
            Four services under one team: recruitment, software development, training, and video production.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
