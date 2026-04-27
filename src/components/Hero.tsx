import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Subtle ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.04)_1px,transparent_0)] bg-[size:32px_32px]"></div>

      <div className="container mx-auto px-6 relative z-10 py-24">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <Badge variant="secondary" className="px-4 py-2 mb-8 glass-effect">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" />
            <span className="text-xs font-medium tracking-wide uppercase">Growth Partner — Not a Service Provider</span>
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
            Not Just Services.
            <span className="block gradient-text mt-2">The Engine Behind</span>
            <span className="block">Your Growth.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We bring together talent, technology, training, and creative media — so you can build faster, scale smarter, and stand out globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button variant="premium" size="xl" className="group" onClick={() => scrollTo('engine')}>
              Start Your Growth
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="xl" onClick={() => scrollTo('contact')}>
              Book a Free Strategy Call
            </Button>
          </div>

          <p className="text-sm text-muted-foreground tracking-wide">
            Trusted by startups, creators, and growing businesses worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
