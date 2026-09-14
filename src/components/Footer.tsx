import { Mail, Globe, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3"><img src={logo} alt="AmigoXcel" className="h-12 w-auto" /><span className="border-l border-border pl-3 font-display font-semibold text-foreground">Academy</span></div>
            <p className="text-sm leading-relaxed max-w-md text-slate-400">
              Learn how hiring works. Choose the path that fits your career stage.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:careers@amigoxcel.com"
                className="hover:text-white transition-colors"
              >
                careers@amigoxcel.com
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#proof" className="hover:text-white transition-colors">
                  Stories
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/resume-tailor" className="hover:text-white transition-colors">
                  Resume Tailor
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/108184787/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/amigoxcel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://amigoxcel.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Serving clients globally from Nepal.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} AmigoXcel Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
