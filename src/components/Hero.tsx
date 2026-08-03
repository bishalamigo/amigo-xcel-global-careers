import React, { Suspense, lazy } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroScene = lazy(() => import('./HeroScene'));

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Animated mesh + grid */}
      <div className="absolute inset-0 mesh-bg opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.06)_1px,transparent_0)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

      {/* 3D scene — pushed back, dimmed */}
      <div className="absolute inset-0 z-0 opacity-40 blur-[2px]">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Dark vignette + radial spotlight behind text for legibility */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--background)/0.85)_0%,hsl(var(--background)/0.6)_40%,transparent_75%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-background/60 via-transparent to-background" />

      <div className="container mx-auto px-6 relative z-10 py-24 pointer-events-none">
        <div className="max-w-5xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="px-4 py-2 mb-8 glass-effect border-primary/30 animate-fade-in pointer-events-auto"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" />
            <span className="text-xs font-medium tracking-wide uppercase">
              Growth Partner, Not a Service Provider
            </span>
          </Badge>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 animate-fade-in"
            style={{ animationDelay: '120ms', animationFillMode: 'backwards' }}
          >
            Not Just Services.
            <span className="block gradient-text mt-2">The Engine Behind</span>
            <span className="block">Your Growth.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in"
            style={{ animationDelay: '260ms', animationFillMode: 'backwards' }}
          >
            We bring together talent, technology, training, and creative media so you can build faster, scale smarter, and stand out globally.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 animate-fade-in pointer-events-auto"
            style={{ animationDelay: '380ms', animationFillMode: 'backwards' }}
          >
            <Button variant="premium" size="xl" className="group shadow-glow" onClick={() => scrollTo('engine')}>
              Start Your Growth
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="xl" onClick={() => scrollTo('contact')}>
              Book a Free Strategy Call
            </Button>
          </div>

          <p
            className="text-sm text-muted-foreground tracking-wide animate-fade-in"
            style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}
          >
            Trusted by startups, creators, and growing businesses worldwide.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 float-slow opacity-60">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
