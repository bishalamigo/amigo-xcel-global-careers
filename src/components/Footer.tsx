import { Mail, Globe, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3">
              Amigo<span className="text-primary">Xcel</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-md text-muted-foreground">
              One partner for talent, technology, training, and creative media. We help teams
              hire, ship, train, and publish, without stitching four vendors together.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <a
                href="mailto:careers@amigoxcel.com"
                className="hover:text-primary transition-colors"
              >
                careers@amigoxcel.com
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#why" className="hover:text-primary transition-colors">Why It Works</a></li>
              <li><a href="#audience" className="hover:text-primary transition-colors">Who We Help</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/108184787/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/amigoxcel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://amigoxcel.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Working with clients across 8 countries. Based in Nepal.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} AmigoXcel. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
