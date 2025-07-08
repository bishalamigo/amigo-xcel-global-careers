
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Users, FileText, Linkedin, UserCheck, CheckCircle } from "lucide-react";

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
      pricing: "Starting from $79 • Premium packages available"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Core Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive hiring solutions for businesses and professional services for job seekers.<br />
            <span className="text-blue-600">Tailored solutions for every hiring need and career goal.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-center">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-semibold text-gray-900">{service.pricing}</p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 italic">
            "Your success is our mission - whether you're hiring or job hunting."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
