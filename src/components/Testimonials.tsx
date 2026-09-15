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
    <section className="bg-card/40 py-16 md:py-24">
      <div className="container mx-auto px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Why people stay
            </span>
            <h2 className="mt-6 font-editorial text-3xl font-semibold leading-tight md:text-5xl">
              Built on trust. Growing every day.
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mb-12 grid max-w-5xl gap-5 md:grid-cols-3">
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
          <div className="mx-auto max-w-3xl">
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
