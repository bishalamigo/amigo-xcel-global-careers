import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Courses", href: "#courses" },
  { label: "Why It Works", href: "#why" },
  { label: "Who We Help", href: "#audience" },
  { label: "Proof", href: "#proof" },
  { label: "Resume Tailor", href: "/resume-tailor", isRoute: true },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isHome) {
      scrollTo(href);
    } else {
      window.location.href = "/" + href;
    }
  };

  const linkClass =
    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";
  const mobileLinkClass = "block text-sm font-medium text-foreground py-2";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold text-lg tracking-tight"
          aria-label="AmigoXcel home"
          onClick={() => setOpen(false)}
        >
          Amigo<span className="text-primary">Xcel</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.isRoute ? (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className={`${linkClass} ${pathname === l.href ? "text-foreground" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ) : (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleAnchor(e, l.href)}
                  className={linkClass}
                >
                  {l.label}
                </a>
              </li>
            )
          )}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href="#contact" onClick={(e) => handleAnchor(e, "#contact")}>
              Book a Call
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <ul className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) =>
              l.isRoute ? (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    {l.label}
                  </Link>
                </li>
              ) : (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleAnchor(e, l.href)}
                    className={mobileLinkClass}
                  >
                    {l.label}
                  </a>
                </li>
              )
            )}
            <li>
              <Button asChild className="w-full">
                <a href="#contact" onClick={(e) => handleAnchor(e, "#contact")}>
                  Book a Call
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
