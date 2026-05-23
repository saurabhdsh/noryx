import { Globe, MessageCircle, Share2 } from "lucide-react";
import { Logo } from "../components/Logo";
import { FOOTER_LINKS } from "../data/content";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-16 md:px-6">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="#" className="inline-flex rounded-xl">
              <Logo variant="full" size="md" />
            </a>
            <p className="mt-3 text-sm text-white/45 leading-relaxed">
              Production-grade evaluation for the agentic era.
            </p>
            <div className="mt-4 flex gap-3">
              {[Share2, Globe, MessageCircle].map((Icon, i) => {
                const labels = ["Twitter", "GitHub", "LinkedIn"];
                return (
                <a
                  key={labels[i]}
                  href="#"
                  className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white"
                  aria-label={labels[i]}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );})}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/80">{title}</h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-xs text-white/35">
          © {new Date().getFullYear()} noryx. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
