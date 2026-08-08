import { Card, CardContent } from "@/components/ui/card";
import { Globe2, Briefcase, Users2 } from "lucide-react";
import Reveal from "./Reveal";

const proof = [
  {
    icon: Users2,
    headline: "Hiring support across IT and non-IT roles",
    label: "We handle sourcing, screening and placement end to end.",
  },
  {
    icon: Briefcase,
    headline: "Projects delivered across tech, content and hiring",
    label: "One team covering the work most businesses split across three vendors.",
  },
  {
    icon: Globe2,
    headline: "Working with clients in multiple countries",
    label: "Remote-first delivery across time zones, in English.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Built on Trust.
              <span className="block text-primary">Growing Every Day.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mb-16">
          {proof.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <Card className="bg-card border-border/60 h-full">
                <CardContent className="p-8">
                  <p.icon className="w-6 h-6 text-primary mb-5" />
                  <p className="text-lg font-semibold leading-snug mb-3">{p.headline}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.label}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/*
          TODO: PLACEHOLDER TESTIMONIAL - replace with a real, attributed client quote
          (full name, role, company) before relying on this as social proof.
        */}
        <Reveal>
          <div className="max-w-3xl">
            <Card className="bg-card border-dashed border-border">
              <CardContent className="p-8 md:p-12">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-5">
                  Example testimonial
                </p>
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-foreground">
                  "We came in for hiring. Stayed for the engine. Within months, our team, content, and tech were finally moving in the same direction."
                </blockquote>
                <p className="mt-6 text-sm text-muted-foreground">
                  Sample copy, to be replaced with a named client quote.
                </p>
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
