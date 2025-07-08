
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Search, Zap, TrendingUp } from "lucide-react";

const WhyItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Resume",
      description: "Share your current resume or LinkedIn profile with us",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Search,
      title: "Get Free Audit",
      description: "Receive detailed feedback and improvement recommendations",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Zap,
      title: "Expert Enhancement",
      description: "Our hiring experts craft your perfect resume and profile",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Start Getting Interviews",
      description: "Watch your response rate soar with your new materials",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why AmigoXcel Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 4-step process has helped thousands land their dream roles<br />
            <span className="text-blue-600">Simple, effective, and results-driven</span>
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`}></div>
              <CardContent className="p-6 text-center space-y-4">
                <div className="relative">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-sm font-bold text-gray-700">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="relative">
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="hidden md:block w-32 h-0.5 bg-gradient-to-r from-blue-200 to-blue-400"></div>
            <div className="text-center bg-white rounded-full px-6 py-3 shadow-lg">
              <span className="text-lg font-semibold text-gray-700">Average Timeline: 3-7 days</span>
            </div>
            <div className="hidden md:block w-32 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200"></div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">3x</div>
              <div className="text-gray-600">More Interview Invites</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">70%</div>
              <div className="text-gray-600">Faster Job Placement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">25%</div>
              <div className="text-gray-600">Higher Salary Offers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
