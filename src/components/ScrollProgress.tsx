import { useScrollProgress } from "../hooks/useScrollProgress";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-white/5" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
