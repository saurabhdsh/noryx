import { useReducedMotion } from "../hooks/useReducedMotion";

type Props = { ready: boolean };

export function PageLoader({ ready }: Props) {
  const reduced = useReducedMotion();

  if (ready || reduced) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0a0918] transition-opacity duration-400"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500" />
        <div className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full animate-pulse bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>
      </div>
    </div>
  );
}
