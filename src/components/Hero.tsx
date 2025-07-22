import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Users, TrendingUp, MapPin, CheckCircle, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 overflow-hidden">
      {/* Enhanced Background Pattern - Google Material inspired */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--primary)/0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-pulse opacity-60"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        {/* Enhanced Trust Badge - Netflix inspired */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <Badge variant="secondary" className="px-6 py-3 text-sm glass-effect hover-lift">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
              <span className="text-muted-foreground">•</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
              Trusted by 10,000+ professionals worldwide
            </div>
          </Badge>
        </div>

        {/* Enhanced Main Headline - Tesla/Apple inspired */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight tracking-tight">
            IT & Non-IT 
            <span className="gradient-text block mt-2">Hiring Solutions.</span>
            <span className="text-3xl md:text-5xl font-semibold block mt-4 text-muted-foreground">
              Find. Hire. Succeed.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Your trusted partner for IT and Non-IT recruitment solutions.
            <span className="block mt-2 text-primary font-medium">Plus professional resume and profile optimization services.</span>
          </p>

          {/* Enhanced CTA Buttons - Multi-company inspired */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {/* <Button variant="premium" size="xl" className="group">
              Start Hiring Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button> */}
            <Button variant="glass" size="xl" className="group">
              View Our Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Enhanced Social Proof - Amazon/Google inspired */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-20">
            <div className="flex flex-col items-center gap-3 group hover-lift">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Successful Placements</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 group hover-lift">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 group hover-lift">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Partner Companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced World Map Visualization - Interactive elements */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background/50 to-transparent">
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-0 bg-center bg-no-repeat opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cpath d='M200,200 Q300,150 400,200 T600,200 T800,200 T1000,200' stroke='hsl(var(--primary))' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E")`
          }}></div>
          {/* Success Pins with enhanced animations */}
          <div className="absolute bottom-16 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute bottom-14 left-2/3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
          
          {/* Connection lines */}
          <div className="absolute bottom-16 left-1/4 w-32 h-0.5 bg-gradient-to-r from-green-500/50 to-transparent rotate-12 origin-left"></div>
          <div className="absolute bottom-20 right-1/3 w-32 h-0.5 bg-gradient-to-l from-primary/50 to-transparent -rotate-12 origin-right"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;