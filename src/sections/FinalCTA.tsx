import { SectionReveal } from "../components/SectionReveal";
import { MagneticButton } from "../components/MagneticButton";

export function FinalCTA() {
  return (
    <section className="px-4 py-24 md:px-6" id="demo">
      <SectionReveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-cyan-500/30" />
          <div className="absolute inset-0 backdrop-blur-sm" />
          <div className="relative z-10 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              Your agents are only as good as how you test them.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Start free. Connect your first agent in under 5 minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/signup">Start free trial</MagneticButton>
              <MagneticButton href="/contact" variant="glass">
                Book a demo
              </MagneticButton>
            </div>
            <form
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Work email"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:outline-none"
                aria-label="Work email"
              />
              <MagneticButton href="/signup" variant="primary" className="shrink-0">
                Get started
              </MagneticButton>
            </form>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
