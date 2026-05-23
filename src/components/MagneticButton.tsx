import { motion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent, type RefObject } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionLink = motion.create(Link);

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "glass" | "outline";
  className?: string;
  type?: "button" | "submit";
};

function isClientRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:brightness-110",
    glass: "glass text-white hover:bg-white/10",
    outline: "border border-white/20 text-white hover:border-cyan-400/50 hover:bg-white/5",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-20" />
      )}
    </>
  );

  const motionProps = {
    className: `group ${cls}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: reduced ? undefined : { scale: 0.97 },
  };

  if (href && isClientRoute(href)) {
    return (
      <MotionLink
        to={href}
        ref={ref as RefObject<HTMLAnchorElement>}
        {...motionProps}
      >
        {inner}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a ref={ref as RefObject<HTMLAnchorElement>} href={href} {...motionProps}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
