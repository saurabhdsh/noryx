import { useId } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Props = {
  variant?: "mark" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
};

const sizes = {
  sm: { mark: 34, full: { mark: 32, text: "text-xl" } },
  md: { mark: 42, full: { mark: 40, text: "text-2xl" } },
  lg: { mark: 50, full: { mark: 48, text: "text-3xl" } },
};

export function Logo({ variant = "full", size = "md", className = "", animated = true }: Props) {
  const uid = useId().replace(/:/g, "");
  const reduced = useReducedMotion();
  const motion = animated && !reduced;
  const markSize = variant === "full" ? sizes[size].full.mark : sizes[size].mark;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <NoryxMark id={uid} size={markSize} animated={motion} />
      {variant === "full" && (
        <span
          className={`font-display font-bold tracking-tight ${sizes[size].full.text}`}
          aria-hidden
        >
          <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
            nor
          </span>
          <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
            yx
          </span>
        </span>
      )}
    </span>
  );
}

function NoryxMark({
  id,
  size,
  animated,
}: {
  id: string;
  size: number;
  animated: boolean;
}) {
  const grad = `${id}-grad`;
  const glow = `${id}-glow`;
  const gradSoft = `${id}-grad-soft`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <defs>
        <linearGradient id={grad} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="0.45" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id={gradSoft} x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#06B6D4" stopOpacity="0.25" />
          <stop offset="1" stopColor="#EC4899" stopOpacity="0.15" />
        </linearGradient>
        <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft hex field */}
      <path
        d="M24 4 L40.8 13.6 V32.4 L24 42 L7.2 32.4 V13.6 Z"
        fill={`url(#${gradSoft})`}
        stroke={`url(#${grad})`}
        strokeWidth="0.75"
        strokeOpacity="0.35"
      />

      {/* Orbital arcs */}
      <g
        className={animated ? "logo-orbit-slow" : undefined}
        style={{ transformOrigin: "24px 24px" }}
      >
        <path
          d="M24 8 A16 16 0 0 1 38 18"
          stroke={`url(#${grad})`}
          strokeWidth="1.25"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M38 30 A16 16 0 0 1 24 40"
          stroke={`url(#${grad})`}
          strokeWidth="1.25"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </g>

      <g
        className={animated ? "logo-orbit-reverse" : undefined}
        style={{ transformOrigin: "24px 24px" }}
      >
        <path
          d="M10 18 A16 16 0 0 1 24 8"
          stroke={`url(#${grad})`}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
          strokeDasharray="3 4"
        />
      </g>

      {/* Core "n" — dual beam paths */}
      <g filter={`url(#${glow})`}>
        <path
          d="M14 34 V16 C14 11.5 17 10 20 13 L30 24"
          stroke={`url(#${grad})`}
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M30 14 V34"
          stroke={`url(#${grad})`}
          strokeWidth="3.25"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Nexus hub + evaluator nodes */}
      <circle cx="22" cy="22" r="3" fill="#0a0918" stroke={`url(#${grad})`} strokeWidth="1.5" />
      <circle
        cx="22"
        cy="22"
        r="1.25"
        fill="#06B6D4"
        className={animated ? "logo-pulse" : undefined}
        style={{ transformOrigin: "22px 22px" }}
      />

      <circle cx="14" cy="15" r="2" fill="#7C3AED" opacity="0.9" />
      <circle cx="30" cy="33" r="2" fill="#EC4899" opacity="0.9" />
      <circle cx="36" cy="16" r="1.5" fill="#06B6D4" opacity="0.75" />

      {/* X accent — subtle crossing rays through nexus */}
      <path
        d="M18 30 L28 18 M28 30 L18 18"
        stroke={`url(#${grad})`}
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.22"
      />
    </svg>
  );
}
