import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { openCourseEnquiry } from "@/lib/academy";

const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "Mentors", href: "#mentors" },
  { label: "Placement Support", href: "#placement" },
  { label: "FAQ", href: "#faq" },
  { label: "Resume Tailor", href: "/resume-tailor", isRoute: true, footerOnly: true },
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
          : "bg-background"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="AmigoXcel Academy home"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="AmigoXcel" className="h-8 w-auto sm:h-9" />
          <span className="border-l border-border pl-2 font-display text-xs font-semibold sm:text-sm">Academy</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.filter((l) => !l.footerOnly).map((l) =>
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

        <div className="hidden lg:block">
          <Button size="sm" onClick={() => openCourseEnquiry()}>Find Your Best Fit</Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button size="sm" className="hidden sm:inline-flex" onClick={() => openCourseEnquiry()}>Find Your Best Fit</Button>
          <Button
            variant="ghost" size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <ul className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.filter((l) => !l.footerOnly).map((l) =>
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
              <Button className="w-full" onClick={() => { setOpen(false); openCourseEnquiry(); }}>Find Your Best Fit</Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
