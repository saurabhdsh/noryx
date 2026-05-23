import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  GitBranch,
  Radio,
  Scan,
  Sparkles,
  Zap,
} from "lucide-react";
import { HeroRunPreview } from "./HeroRunPreview";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Slide = {
  id: string;
  line1: string;
  line2: string;
  accent: string;
  icon: LucideIcon;
  chips: string[];
};

const SLIDES: Slide[] = [
  {
    id: "confidence",
    line1: "Evaluate every agent.",
    line2: "Ship with confidence.",
    accent: "from-violet-400 via-cyan-300 to-fuchsia-400",
    icon: Bot,
    chips: ["Bedrock", "Copilot", "Custom REST", "Voice & IVR"],
  },
  {
    id: "evaluators",
    line1: "10+ production evaluators.",
    line2: "PII · Hallucination · Groundedness.",
    accent: "from-cyan-400 via-violet-400 to-pink-400",
    icon: Scan,
    chips: ["PII Scanner", "G-Eval", "Tool Calls", "DAG Metric"],
  },
  {
    id: "cicd",
    line1: "Gate every deploy.",
    line2: "GitHub Actions · Jenkins · API.",
    accent: "from-amber-400 via-rose-400 to-violet-400",
    icon: GitBranch,
    chips: ["CI/CD native", "Pass thresholds", "Block merges", "Audit reports"],
  },
  {
    id: "generate",
    line1: "AI-generated test suites.",
    line2: "Describe your agent — we build the cases.",
    accent: "from-fuchsia-400 via-violet-400 to-cyan-400",
    icon: Sparkles,
    chips: ["YAML suites", "Synthetic data", "Personas", "Batch runs"],
  },
  {
    id: "connect",
    line1: "Connect any agent platform.",
    line2: "Under 60 seconds to first run.",
    accent: "from-emerald-400 via-cyan-400 to-violet-400",
    icon: Zap,
    chips: ["Vertex AI", "Azure Foundry", "AgentSpace", "Python agents"],
  },
  {
    id: "voice",
    line1: "Chatbots, voice & IVR.",
    line2: "One panel for every channel.",
    accent: "from-pink-400 via-violet-400 to-amber-400",
    icon: Radio,
    chips: ["HTTP chatbots", "Call-center flows", "Live monitoring", "HTML reports"],
  },
];

const TICKER = [
  "External Agent Hub",
  "Synthetic Data Studio",
  "Smart Recommendations",
  "Observability",
  "Testing Rules",
  "HTML & JSON Reports",
  "CLI · aitest",
  "Desktop App",
  "Jira & GitHub",
  "Live Monitoring",
  "Evaluation Models",
  "Custom PII Patterns",
];

const INTERVAL_MS = 4200;

export function HeroFeatureBanner() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const Icon = slide.icon;

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-64 w-96 rounded-full bg-violet-600/30 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-56 w-80 rounded-full bg-cyan-500/25 blur-[90px]"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-1 shadow-2xl shadow-violet-950/40 backdrop-blur-md">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.35), transparent)",
          }}
          aria-hidden
        />

        <div className="relative flex gap-1 px-3 pt-3 sm:px-4" role="tablist" aria-label="Feature highlights">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={s.line1}
              onClick={() => setIndex(i)}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"
            >
              <motion.span
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${s.accent}`}
                initial={false}
                animate={{
                  width: i === index ? "100%" : i < index ? "100%" : "0%",
                  opacity: i === index ? 1 : 0.35,
                }}
                transition={
                  i === index && !reduced
                    ? { width: { duration: INTERVAL_MS / 1000, ease: "linear" } }
                    : { duration: 0.3 }
                }
              />
            </button>
          ))}
        </div>

        <div className="relative grid lg:grid-cols-[1fr_minmax(240px,300px)] lg:gap-0">
          <div className="relative min-h-[10rem] px-4 py-6 sm:min-h-[11rem] sm:px-6 sm:py-7 md:min-h-[12rem] lg:min-h-[13rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={reduced ? false : { opacity: 0, y: 32, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? undefined : { opacity: 0, y: -28, filter: "blur(10px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-4 top-6 sm:inset-x-6 sm:top-7"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                  <motion.span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${slide.accent} shadow-xl shadow-violet-500/25 sm:h-16 sm:w-16`}
                    initial={reduced ? false : { scale: 0.75, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <Icon className="h-7 w-7 text-white sm:h-8 sm:w-8" aria-hidden />
                  </motion.span>
                  <h1 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl">
                    <span
                      className={`block bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}
                    >
                      {slide.line1}
                    </span>
                    <span className="mt-1 block text-white">{slide.line2}</span>
                  </h1>
                </div>

                <motion.div
                  className="mt-6 flex flex-wrap gap-2"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  {slide.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/75 backdrop-blur-sm sm:text-sm"
                    >
                      {chip}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border-t border-white/10 px-4 py-4 lg:border-t-0 lg:py-5 lg:pr-5">
            <HeroRunPreview />
          </div>
        </div>
      </div>

      <div className="hero-ticker-mask relative mt-6 w-full overflow-hidden">
        <div className={`flex w-max gap-3 ${reduced ? "" : "hero-ticker-track"}`}>
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs font-medium text-white/55 whitespace-nowrap sm:text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {slide.line1} {slide.line2}
      </p>
    </div>
  );
}
