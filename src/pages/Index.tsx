import Hero from "../components/Hero";
import Hook from "../components/Hook";
import Services from "../components/Services";
import WhyItWorks from "../components/WhyItWorks";
import WhoWeHelp from "../components/WhoWeHelp";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Hook />
      <Services />
      <WhyItWorks />
      <WhoWeHelp />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Index;
