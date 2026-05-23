import { motion } from "framer-motion";
import { Cable, Key, Link2 } from "lucide-react";
import { SectionReveal } from "../components/SectionReveal";
import { AGENT_PLATFORMS } from "../data/content";

export function AgentPlatforms() {
  const doubled = [...AGENT_PLATFORMS, ...AGENT_PLATFORMS];

  return (
    <section className="overflow-hidden px-4 py-24 md:px-6" id="agents">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <h2 className="font-display text-center text-3xl font-bold md:text-4xl">
            Works with the agents you <span className="gradient-text">already built</span>
          </h2>
        </SectionReveal>

        <div className="relative mt-12 overflow-hidden py-4">
          <div className="flex w-max animate-marquee gap-4">
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/60 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <SectionReveal delay={0.15} className="mt-16">
          <div className="relative mx-auto max-w-md">
            {[2, 1, 0].map((offset) => (
              <motion.div
                key={offset}
                className="glass absolute inset-x-0 mx-auto rounded-2xl p-6"
                style={{
                  transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.04})`,
                  zIndex: 3 - offset,
                  opacity: 1 - offset * 0.2,
                }}
                whileHover={{ y: offset * 12 - 8 }}
              >
                {offset === 0 && (
                  <>
                    <p className="text-sm font-semibold text-cyan-400">Connect in 60 seconds</p>
                    <div className="mt-4 space-y-3">
                      <label className="block text-xs text-white/40">
                        Agent URL
                        <div className="mt-1 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70">
                          <Link2 className="h-4 w-4 shrink-0 text-white/30" />
                          https://api.myagent.io/v1/chat
                        </div>
                      </label>
                      <label className="block text-xs text-white/40">
                        API Key
                        <div className="mt-1 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70">
                          <Key className="h-4 w-4 shrink-0 text-white/30" />
                          ••••••••••••••••
                        </div>
                      </label>
                      <label className="block text-xs text-white/40">
                        Bedrock agentId
                        <div className="mt-1 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70">
                          <Cable className="h-4 w-4 shrink-0 text-white/30" />
                          SUPPORT-BOT-7X2K
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
            <div className="h-[280px]" aria-hidden />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
