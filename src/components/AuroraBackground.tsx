import { useReducedMotion } from "../hooks/useReducedMotion";

export function AuroraBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#0a0918]" />
      <div
        className={`absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-violet-600/30 blur-[120px] ${reduced ? "" : "aurora-orb"}`}
      />
      <div
        className={`absolute right-0 top-1/4 h-[480px] w-[480px] rounded-full bg-cyan-500/25 blur-[120px] ${reduced ? "" : "aurora-orb"}`}
        style={{ animationDelay: "-6s" }}
      />
      <div
        className={`absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/20 blur-[100px] ${reduced ? "" : "aurora-orb"}`}
        style={{ animationDelay: "-12s" }}
      />
      <div className="absolute bottom-1/4 right-1/4 h-[320px] w-[320px] rounded-full bg-amber-500/15 blur-[90px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B4B]/40 via-transparent to-[#0a0918]" />
    </div>
  );
}
