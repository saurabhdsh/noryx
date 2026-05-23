import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Clock, Mail, Sparkles } from "lucide-react";
import { PLAN_LABELS, type PlanId } from "../../lib/auth";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Props = {
  name: string;
  email: string;
  plan: PlanId;
};

export function TrialQueueSuccess({ name, email, plan }: Props) {
  const reduced = useReducedMotion();
  const firstName = name.trim().split(/\s+/)[0] || "there";

  return (
    <div className="relative text-center" role="status" aria-live="polite">
      <div
        className="pointer-events-none absolute inset-0 -top-6 flex justify-center overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="h-40 w-40 rounded-full bg-violet-500/30 blur-3xl"
          animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-32 w-32 translate-x-12 rounded-full bg-cyan-400/25 blur-3xl"
          animate={reduced ? undefined : { scale: [1.1, 0.9, 1.1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <motion.div
        className="relative mx-auto flex h-20 w-20 items-center justify-center"
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-400/30 blur-md" />
        {!reduced && (
          <span className="absolute inset-0 animate-ping rounded-full border border-cyan-400/30" />
        )}
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/40">
          <Check className="h-10 w-10 text-white" strokeWidth={2.5} />
        </span>
        <motion.span
          className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0a1f] ring-2 ring-cyan-400/50"
          initial={reduced ? false : { rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 400, damping: 14 }}
        >
          <Sparkles className="h-4 w-4 text-cyan-300" />
        </motion.span>
      </motion.div>

      <motion.h2
        className="relative mt-8 font-display text-2xl font-bold md:text-3xl"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        You&apos;re in the <span className="gradient-text">queue</span>
      </motion.h2>

      <motion.p
        className="relative mt-3 text-base text-white/70 leading-relaxed"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        Thanks, {firstName} — we&apos;ve got your request. Our team will reach out at{" "}
        <span className="font-medium text-cyan-300">{email}</span> soon to activate your trial.
      </motion.p>

      <motion.div
        className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
            <Clock className="h-5 w-5 text-violet-300" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">We&apos;ll revert back soon</p>
            <p className="mt-1 text-xs text-white/50 leading-relaxed">
              Most teams hear from us within one business day. Your spot is reserved while we
              review your request.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < 2 ? "bg-gradient-to-r from-violet-500 to-cyan-400" : "bg-white/10"
              }`}
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              style={{ transformOrigin: "left" }}
            />
          ))}
        </div>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-cyan-400/80">
          Queue confirmed · {PLAN_LABELS[plan]}
        </p>
      </motion.div>

      <motion.div
        className="relative mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-white/45"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <Mail className="h-3.5 w-3.5" />
          We&apos;ll email you when your trial is ready
        </span>
      </motion.div>

      <motion.div
        className="relative mt-8"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <Link
          to="/"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-3.5 text-sm font-semibold text-white hover:brightness-110 sm:w-auto sm:px-10"
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
