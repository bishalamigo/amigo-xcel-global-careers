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
        description="Choose a clear learning path for your career stage. Explore courses for young learners, graduates, job seekers and recruiters."
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <AcademyCourses />
        <section id="proof"><Testimonials /></section>
        <AcademyFaq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
