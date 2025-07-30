
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Users, FileText, Linkedin, UserCheck, CheckCircle, ArrowRight } from "lucide-react";




const Services = () => {
  const services = [
    {
      icon: Code,
      title: "IT Hiring Solutions",
      description: "Find the perfect tech talent for your team. From developers to data scientists, we connect you with skilled IT professionals.",
      features: ["Software Developers", "DevOps Engineers", "Data Scientists", "QA Engineers", "UI/UX Designers"],
      pricing: "Custom packages • Contact for quote"
    },
    {
      icon: Users,
      title: "Non-IT Hiring Solutions",
      description: "Complete recruitment services for all non-technical roles. Marketing, sales, finance, HR, and more.",
      features: ["Marketing Professionals", "Sales Representatives", "Finance Experts", "HR Specialists", "Administrative Staff"],
      pricing: "Flexible plans • Volume discounts available"
    },
    {
      icon: FileText,
      title: "Resume & Profile Optimization",
      description: "Professional resume writing and LinkedIn optimization to help candidates stand out in the job market.",
      features: ["ATS-optimized resumes", "LinkedIn profile enhancement", "Cover letter writing", "Interview coaching"],
      pricing: "Starting from $5 • Depends on service requirements"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Our Core Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive hiring solutions for businesses and professional services for job seekers.
            <span className="block mt-2 text-primary font-medium">Tailored solutions for every hiring need and career goal.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group relative overflow-hidden hover-lift glass-effect border-border/50 hover:border-primary/20 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 transform">
                  <service.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <p className="text-muted-foreground text-center leading-relaxed">{service.description}</p>
                
                <div className="space-y-3" id = 'my-target-section'>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 group/feature">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 group-hover/feature:scale-110 transition-transform" />
                      <span className="text-foreground/80 group-hover/feature:text-foreground transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="glass-effect rounded-lg p-4 text-center border border-primary/10">
                  <p className="text-sm font-semibold text-primary">{service.pricing}</p>
                </div>

                {/* <Button variant="premium" className="w-full group/btn">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass-effect rounded-lg p-8 max-w-2xl mx-auto border border-primary/10">
            <p className="text-xl text-foreground font-medium italic leading-relaxed">
              "Your success is our mission - whether you're hiring or job hunting."
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-primary rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
