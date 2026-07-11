import Header from "../components/Header";
import Hero from "../components/Hero";
import Hook from "../components/Hook";
import StatsBar from "../components/StatsBar";
import Services from "../components/Services";
import WhyItWorks from "../components/WhyItWorks";
import WhoWeHelp from "../components/WhoWeHelp";
import LogoMarquee from "../components/LogoMarquee";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

// Alternating light/dark rhythm creates the premium feel.
// Light: LogoMarquee, StatsBar, WhyItWorks, Testimonials
// Dark:  Hero, Hook, Services, WhoWeHelp, CallToAction, Footer
const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div className="dark bg-background text-foreground">
          <Hero />
        </div>
        <LogoMarquee />
        <div className="dark bg-background text-foreground">
          <Hook />
        </div>
        <StatsBar />
        <section id="services" className="dark bg-background text-foreground"><Services /></section>
        <section id="why"><WhyItWorks /></section>
        <section id="audience" className="dark bg-background text-foreground"><WhoWeHelp /></section>
        <section id="proof"><Testimonials /></section>
        <div className="dark bg-background text-foreground">
          <CallToAction />
        </div>
      </main>
      <div className="dark bg-background text-foreground">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
