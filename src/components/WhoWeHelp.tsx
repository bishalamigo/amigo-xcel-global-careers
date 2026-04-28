import { Card, CardContent } from "@/components/ui/card";
import { Rocket, User, Building2, Layers, ShoppingBag } from "lucide-react";

const audiences = [
  { icon: Rocket, title: "Startups", desc: "Building from scratch, ready to move fast." },
  { icon: User, title: "Founders & Personal Brands", desc: "Turning ideas into authority and reach." },
  { icon: Building2, title: "IT & Recruitment Companies", desc: "Scaling delivery without scaling chaos." },
  { icon: Layers, title: "Agencies", desc: "Need reliable white-label support." },
  { icon: ShoppingBag, title: "E-commerce & Digital-First Brands", desc: "Growing with content, tech, and talent." },
];

const WhoWeHelp = () => {
  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-6">Who It's For</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Built for Those Who Are
              <span className="block gradient-text">Ready to Scale.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {audiences.map((a, i) => (
            <Reveal key={i} delay={i * 70}>
              <Card
                className="group bg-card/60 backdrop-blur-sm border-border/60 hover:border-primary/50 hover-lift glow-border transition-all h-full"
              >
                <CardContent className="p-7">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:shadow-glow transition-all">
                    <a.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{a.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{a.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
