import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../data/content";
import { Logo } from "./Logo";
import { MagneticButton } from "./MagneticButton";

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anchorHref = (hash: string) =>
    location.pathname === "/" ? hash : `/${hash}`;

  return (
    <header
      className={`fixed top-0.5 left-0 right-0 z-50 px-4 transition-all duration-300 md:px-6 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all md:px-6 ${
          scrolled ? "glass-strong shadow-xl shadow-black/20" : "glass"
        }`}
        aria-label="Main"
      >
        <Link to="/" className="rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">
          <Logo variant="full" size="md" className="hidden sm:flex" />
          <Logo variant="mark" size="md" className="sm:hidden" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={anchorHref(link.href)}
              className="rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <MagneticButton href="/signup" variant="primary" className="!px-5 !py-2.5 !text-sm">
              Start free trial
            </MagneticButton>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-white/80 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong mx-auto mt-2 max-w-7xl rounded-2xl p-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={anchorHref(link.href)}
              className="block rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 border-t border-white/10 pt-3">
            <MagneticButton href="/signup" variant="primary" className="w-full">
              Start free trial
            </MagneticButton>
          </div>
        </div>
      )}
    </header>
  );
}
