import { Mail, Globe, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3"><img src={logo} alt="AmigoXcel" className="h-12 w-auto" /><span className="border-l border-border pl-3 font-display font-semibold text-foreground">Academy</span></div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Learn how hiring works. Choose the path that fits your career stage.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:careers@amigoxcel.com"
                className="transition-colors hover:text-primary"
              >
                careers@amigoxcel.com
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="transition-colors hover:text-primary">
                  Courses
                </a>
              </li>
              <li>
                <a href="#proof" className="transition-colors hover:text-primary">
                  Stories
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-primary">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/resume-tailor" className="transition-colors hover:text-primary">
                  Resume Tailor
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/108184787/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/amigoxcel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://amigoxcel.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Serving clients globally from Nepal.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {year} AmigoXcel Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
