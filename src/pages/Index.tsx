import Seo from "../components/Seo";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AcademyCourses from "../components/AcademyCourses";
import AcademyFaq from "../components/AcademyFaq";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div id="top" className="min-h-screen">
      <Seo
        title="AmigoXcel Academy — Career Learning Paths"
        description="Explore mentor-led courses in AI-powered tech recruitment and digital marketing, with placement support after your course."
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <AcademyCourses />
        <Testimonials />
        <AcademyFaq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
