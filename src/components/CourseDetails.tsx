import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Reveal from "./Reveal";
import {
  Briefcase,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
  Calendar,
} from "lucide-react";

const tabs = ["Overview", "Curriculum", "Outcomes", "Enrollment"];

const highlights = [
  { icon: Clock, label: "Duration", value: "30 Days" },
  { icon: Users, label: "Format", value: "Live + Recorded" },
  { icon: Briefcase, label: "Focus", value: "Job Ready Skills" },
  { icon: Award, label: "Certificate", value: "Completion Badge" },
];

const curriculum = [
  { week: "Week 1", title: "Foundation Reset", topics: ["Mindset shift", "Industry overview", "Skill gap analysis", "Personal roadmap"] },
  { week: "Week 2", title: "Core Skill Build", topics: ["Technical deep dive", "Tools & workflows", "Real world projects", "Peer reviews"] },
  { week: "Week 3", title: "Portfolio & Profile", topics: ["Resume crafting", "LinkedIn optimization", "Portfolio building", "GitHub cleanup"] },
  { week: "Week 4", title: "Interview & Placement", topics: ["Mock interviews", "Salary negotiation", "Application strategy", "Referral network"] },
];

const outcomes = [
  "Clear understanding of your target role",
  "Job-ready projects in your portfolio",
  "ATS-friendly resume and optimized profile",
  "Confidence in interviews and negotiations",
  "Access to AmigoXcel hiring network",
];

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="courses" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Reveal>
            <Badge variant="secondary" className="mb-4 glass-effect border-primary/30">
              <BookOpen className="w-3.5 h-3.5 mr-2 text-primary" />
              <span className="text-xs font-medium tracking-wide uppercase">Training Program</span>
            </Badge>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Become Job Ready
              <span className="block gradient-text">in 30 Days.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg text-muted-foreground font-light">
              A focused, hands-on program designed to take you from learning to earning. Build skills, portfolio, and confidence in one month.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={280}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-card/60 text-muted-foreground hover:text-foreground border border-border/60 hover:border-primary/50"
                }`}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "Overview" && (
            <Reveal>
              <div className="grid md:grid-cols-2 gap-6">
                {highlights.map((h, i) => (
                  <Card
                    key={i}
                    className="bg-card/60 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all hover-lift"
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <h.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{h.label}</p>
                        <p className="text-xl font-semibold text-foreground">{h.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Reveal>
          )}

          {activeTab === "Curriculum" && (
            <div className="grid md:grid-cols-2 gap-6">
              {curriculum.map((week, i) => (
                <Reveal key={i} delay={i * 90}>
                  <Card className="h-full bg-card/60 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all hover-lift">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold tracking-wider uppercase text-primary">{week.week}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{week.title}</h3>
                      <ul className="space-y-2.5">
                        {week.topics.map((topic, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shadow-[0_0_8px_hsl(var(--primary))]" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}

          {activeTab === "Outcomes" && (
            <Reveal>
              <Card className="bg-card/60 backdrop-blur-sm border-border/60">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">What You Will Walk Away With</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/40">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          )}

          {activeTab === "Enrollment" && (
            <Reveal>
              <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Become Job Ready?</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Seats are limited each month. Book a free call to check your eligibility, clarify the schedule, and reserve your spot.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="group shadow-glow" onClick={scrollToContact}>
                      Book a Free Call
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="glass" onClick={scrollToContact}>
                      Ask a Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
