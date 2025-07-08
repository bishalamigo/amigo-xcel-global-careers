
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Globe, Zap } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready for a resume that<br />
            <span className="text-blue-400">works as hard as you do?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Start with a free review. Upgrade with expert-crafted clarity.<br />
            <span className="text-green-400">Your global career starts here.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Start Free Review
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
              See Success Examples
            </Button>
          </div>
        </div>

        {/* Option Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Start Free</h3>
              <p className="text-gray-300">Get your resume reviewed and receive actionable feedback</p>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Comprehensive resume audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>ATS compatibility check</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Improvement recommendations</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Get Free Audit
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Expert Upgrade</h3>
              <p className="text-gray-300">Let our hiring experts craft your perfect career materials</p>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Professional resume rewrite</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>LinkedIn optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Personal career coaching</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Book Expert Session
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Global Reach */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Globe className="w-5 h-5 text-blue-400" />
            <span>Serving tech professionals worldwide</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
            <span className="bg-white/10 px-4 py-2 rounded-full">🇦🇺 Australia</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🇺🇸 United States</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🇬🇧 United Kingdom</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🇨🇦 Canada</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🇸🇬 Singapore</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🇮🇳 India</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🇳🇵 Nepal</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🇵🇭 Philippines</span>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-4">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <span className="text-lg font-semibold">Google</span>
            <span className="text-lg font-semibold">Microsoft</span>
            <span className="text-lg font-semibold">Amazon</span>
            <span className="text-lg font-semibold">Meta</span>
            <span className="text-lg font-semibold">Tesla</span>
            <span className="text-lg font-semibold">Netflix</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
