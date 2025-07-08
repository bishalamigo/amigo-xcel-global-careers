
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ramesh Patel",
      role: "Full Stack Developer",
      location: "Melbourne, Australia 🇦🇺",
      image: "/placeholder.svg",
      story: "Before AmigoXcel, I got 0 replies in 2 months. After their rewrite, I landed 3 interviews in a week.",
      rating: 5,
      timeline: "Got hired in 3 weeks"
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist",
      location: "Toronto, Canada 🇨🇦",
      image: "/placeholder.svg",
      story: "As an international student, I didn't know how to present my skills. AmigoXcel helped me showcase my projects perfectly.",
      rating: 5,
      timeline: "Landed internship → Full-time"
    },
    {
      name: "Michael Chen",
      role: "DevOps Engineer",
      location: "Singapore 🇸🇬",
      image: "/placeholder.svg",
      story: "Switching careers felt impossible. Their LinkedIn optimization got me noticed by recruiters in my new field.",
      rating: 5,
      timeline: "Career pivot in 6 weeks"
    },
    {
      name: "Sarah Martinez",
      role: "Frontend Developer",
      location: "London, UK 🇬🇧",
      image: "/placeholder.svg",
      story: "The coaching sessions gave me confidence to negotiate. I got 30% more than my initial offer!",
      rating: 5,
      timeline: "Salary increase: 30%"
    },
    {
      name: "Arun Thapa",
      role: "Software Engineer",
      location: "Sydney, Australia 🇦🇺",
      image: "/placeholder.svg",
      story: "From Nepal to Sydney: AmigoXcel made my resume stand out among hundreds of applications.",
      rating: 5,
      timeline: "Visa → Dream job"
    },
    {
      name: "Jessica Park",
      role: "Product Manager",
      location: "San Francisco, US 🇺🇸",
      image: "/placeholder.svg",
      story: "Their LinkedIn strategy was game-changing. Recruiters started reaching out to me instead.",
      rating: 5,
      timeline: "5 offers in 1 month"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real People. Real Jobs. Real Results.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's how AmigoXcel has transformed careers across the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-8 h-8 text-blue-600" />
              </div>
              
              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Story */}
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "{testimonial.story}"
                </blockquote>

                {/* Profile */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-blue-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>

                {/* Timeline Badge */}
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium text-center">
                  {testimonial.timeline}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Join 2,500+ Success Stories</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold">10+</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div>
              <div className="text-2xl font-bold">85%</div>
              <div className="text-blue-100">Interview Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold">30%</div>
              <div className="text-blue-100">Salary Increase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
