import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionReveal } from "../components/SectionReveal";
import { MagneticButton } from "../components/MagneticButton";
import { PRICING_PLANS, FAQ } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section className="px-4 py-24 md:px-6" id="pricing">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <h2 className="font-display text-center text-3xl font-bold md:text-4xl">
            Simple pricing. <span className="gradient-text">Scale by agents.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/55">
            Pay for how many agents you evaluate. Test suites and runs included. Upgrade anytime.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm ${!annual ? "text-white" : "text-white/40"}`}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
              onClick={() => setAnnual(!annual)}
              className="relative h-8 w-14 rounded-full bg-white/10 transition"
            >
              <motion.span
                className="absolute top-1 left-1 h-6 w-6 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                animate={{ x: annual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${annual ? "text-white" : "text-white/40"}`}>
              Annual
              <span className="ml-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">
                Save 20%
              </span>
            </span>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PRICING_PLANS.map((plan, i) => (
            <SectionReveal key={plan.name} delay={i * 0.08}>
              <motion.div
                className={`relative flex h-full flex-col rounded-3xl glass p-6 ${
                  plan.popular ? "ring-2 ring-violet-500/50 shadow-xl shadow-violet-500/20" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        rotateX: 4,
                        rotateY: -4,
                        scale: plan.popular ? 1.05 : 1.02,
                      }
                }
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-1 text-xs font-semibold">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className="mt-4 font-display text-4xl font-bold gradient-text">{plan.agents}</p>
                <p className="mt-2 text-white/50">
                  {plan.price.monthly === null ? (
                    "Custom pricing"
                  ) : (
                    <>
                      <span className="text-2xl font-bold text-white">
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      /mo
                    </>
                  )}
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-white/60">
                  {plan.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-cyan-400" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <MagneticButton
                    href={plan.href}
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </MagneticButton>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2} className="mt-16">
          <div className="glass mx-auto max-w-xl rounded-2xl p-6">
            <p className="text-sm font-medium text-white/70">Agent meter</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-cyan-400 font-semibold">3 / 10 agents used</span>
              <span className="text-white/40">Growth plan</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                initial={{ width: 0 }}
                whileInView={{ width: "30%" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="mt-3 text-xs text-white/45 leading-relaxed">
              Each external agent you register counts toward your plan. Archive agents to free
              slots.
            </p>
          </div>
        </SectionReveal>

        <div className="mx-auto mt-12 max-w-2xl">
          {FAQ.map((item, i) => (
            <div key={item.q} className="border-b border-white/10">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left font-medium text-white/90"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {item.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <p className="pb-4 text-sm text-white/55 leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
