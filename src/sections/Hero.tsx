import { Play } from "lucide-react";
import { HeroFeatureBanner } from "../components/HeroFeatureBanner";
import { SectionReveal } from "../components/SectionReveal";
import { MagneticButton } from "../components/MagneticButton";
import { TRUST_LOGOS } from "../data/content";

export function Hero() {
  return (
    <section className="relative min-h-screen px-4 pb-20 pt-28 md:px-6 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            The evaluation layer for the agentic era
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <HeroFeatureBanner />
        </SectionReveal>

        <SectionReveal delay={0.12} className="mt-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-lg text-white/60 leading-relaxed md:text-xl">
                Connect Copilot, Bedrock, Azure, custom APIs, chatbots, voice & IVR — run test
                suites, score with 10+ evaluators, fix issues before users see them.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href="/signup">Start 14-day free trial</MagneticButton>
                <MagneticButton href="#demo" variant="glass">
                  <Play className="h-4 w-4 fill-current" />
                  Watch 90s demo
                </MagneticButton>
              </div>
            </div>

            <div className="lg:text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                Built for teams shipping agentic AI
              </p>
              <div className="mt-4 flex flex-wrap gap-3 lg:justify-end">
                {TRUST_LOGOS.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/50"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
