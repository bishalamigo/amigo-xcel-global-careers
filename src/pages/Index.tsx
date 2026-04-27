import Header from "../components/Header";
import Hero from "../components/Hero";
import Hook from "../components/Hook";
import Services from "../components/Services";
import WhyItWorks from "../components/WhyItWorks";
import WhoWeHelp from "../components/WhoWeHelp";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Hook />
        <section id="services"><Services /></section>
        <section id="why"><WhyItWorks /></section>
        <section id="audience"><WhoWeHelp /></section>
        <section id="proof"><Testimonials /></section>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
