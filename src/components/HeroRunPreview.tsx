import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const EVALUATORS = [
  { label: "PII", pass: true },
  { label: "Hallucination", pass: true },
  { label: "Groundedness", pass: true },
  { label: "Tools", pass: false },
] as const;

export function HeroRunPreview() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative h-full min-h-[200px] rounded-xl border border-white/10 bg-[#0d0c18]/80 p-4 backdrop-blur-md lg:min-h-0 lg:rounded-none lg:border-0 lg:border-l lg:border-white/10 lg:bg-transparent lg:pl-5"
      initial={reduced ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium uppercase tracking-wider text-white/40">
            Live run
          </p>
          <p className="truncate text-sm font-semibold text-white/90">prod-regression</p>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
          Live
        </span>
      </div>

      <div className="mt-3 flex gap-3">
        <div className="flex-1">
          <div className="flex items-baseline justify-between text-[10px] text-white/40">
            <span>Progress</span>
            <span className="text-cyan-400">78%</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ duration: 1.8, delay: 0.4 }}
            />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase text-white/40">Pass</p>
          <p className="font-display text-lg font-bold text-cyan-400">94%</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {EVALUATORS.map((ev, i) => (
          <motion.div
            key={ev.label}
            className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2"
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          >
            <span className="text-[11px] text-white/75">{ev.label}</span>
            {ev.pass ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <XCircle className="h-3.5 w-3.5 text-rose-400" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-white/40">
        <span className="flex items-center gap-1.5">
          <Loader2 className="h-3 w-3 animate-spin" />
          24 / 31 cases
        </span>
        <span className="font-medium text-white/55">8 agents</span>
      </div>
    </motion.div>
  );
}
