
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Plane, RefreshCw, Briefcase } from "lucide-react";

const WhoWeHelp = () => {
  const personas = [
    {
      icon: GraduationCap,
      title: "New Graduates",
      story: "I was a new grad from Nepal — now I work in Sydney.",
      description: "Recent graduates ready to start their tech careers globally",
      locations: ["🇳🇵 Nepal", "🇮🇳 India", "🇵🇭 Philippines", "🇸🇬 Singapore"]
    },
    {
      icon: Plane,
      title: "International Migrants",
      story: "I had the skills. AmigoXcel gave me the confidence.",
      description: "Experienced professionals relocating to new countries",
      locations: ["🇦🇺 Australia", "🇨🇦 Canada", "🇺🇸 United States", "🇬🇧 United Kingdom"]
    },
    {
      icon: RefreshCw,
      title: "Career Switchers",
      story: "I switched from support to DevOps in 6 weeks.",
      description: "Professionals pivoting into tech or advancing their careers",
      locations: ["All Countries", "Remote Roles", "Global Opportunities"]
    },
    {
      icon: Briefcase,
      title: "Intern Seekers",
      story: "From internship to full-time in 4 months.",
      description: "Students and early-career professionals seeking internships",
      locations: ["University Programs", "Tech Companies", "Startup Opportunities"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Who We Help
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You've come this far — we'll help you go global.<br />
            <span className="text-blue-600">Real stories from real people building real careers.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <persona.icon className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900">{persona.title}</h3>
                
                <blockquote className="text-blue-600 font-medium italic text-sm bg-blue-50 p-3 rounded-lg">
                  "{persona.story}"
                </blockquote>
                
                <p className="text-gray-600 text-sm">{persona.description}</p>
                
                <div className="space-y-1">
                  {persona.locations.map((location, idx) => (
                    <div key={idx} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {location}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            See Yourself Here?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of tech professionals who've transformed their careers with AmigoXcel
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="bg-white px-3 py-1 rounded-full">🇦🇺 Australia</span>
            <span className="bg-white px-3 py-1 rounded-full">🇺🇸 United States</span>
            <span className="bg-white px-3 py-1 rounded-full">🇬🇧 United Kingdom</span>
            <span className="bg-white px-3 py-1 rounded-full">🇨🇦 Canada</span>
            <span className="bg-white px-3 py-1 rounded-full">🇸🇬 Singapore</span>
            <span className="bg-white px-3 py-1 rounded-full">+ More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
