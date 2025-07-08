
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhoWeHelp from "../components/WhoWeHelp";
import WhyItWorks from "../components/WhyItWorks";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <WhoWeHelp />
      <WhyItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Index;
