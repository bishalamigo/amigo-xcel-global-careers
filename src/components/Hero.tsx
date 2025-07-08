
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%234f46e5\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative container mx-auto px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Globe className="w-4 h-4" />
            <span className="text-sm">Trusted by tech professionals in 10+ countries</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Resumes that <span className="text-blue-400">Open Doors.</span><br />
            Profiles that <span className="text-green-400">Get Clicks.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
            Built by tech hiring experts. Trusted by job seekers worldwide.<br />
            <span className="text-blue-300">Real people. Real jobs. Real results.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Get My Resume Reviewed
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
              See Before/After Examples
            </Button>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center animate-fade-in">
            <div>
              <div className="text-3xl font-bold text-blue-400">2,500+</div>
              <div className="text-gray-400">Resumes Crafted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">85%</div>
              <div className="text-gray-400">Interview Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">4.9★</div>
              <div className="text-gray-400">Client Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* World Map Visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-900/50 to-transparent">
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 600\"%3E%3Cpath d=\"M200,200 Q300,150 400,200 T600,200 T800,200 T1000,200\" stroke=\"%234f46e5\" stroke-width=\"2\" fill=\"none\" opacity=\"0.3\"/%3E%3C/svg%3E')] bg-center bg-no-repeat opacity-20"></div>
          {/* Success Pins */}
          <div className="absolute bottom-16 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-14 left-2/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
