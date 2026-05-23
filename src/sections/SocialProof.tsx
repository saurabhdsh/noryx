import { SectionReveal } from "../components/SectionReveal";
import { TESTIMONIALS, STATS } from "../data/content";

export function SocialProof() {
  return (
    <section className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <SectionReveal key={t.author} delay={i * 0.1}>
              <blockquote className="glass flex h-full flex-col rounded-2xl p-6">
                <p className="flex-1 text-white/75 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-sm text-white/45">
                    {t.role} · {t.company}
                  </p>
                </footer>
              </blockquote>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2} className="mt-16">
          <div className="grid grid-cols-2 gap-6 rounded-3xl glass p-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
