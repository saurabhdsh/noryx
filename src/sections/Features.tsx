import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Search, Star, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionReveal } from "../components/SectionReveal";
import {
  FEATURE_CATEGORIES,
  FEATURES,
  type Feature,
  type FeatureCategory,
} from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

type FilterId = FeatureCategory | "all";

export function Features() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(FEATURES[0].title);

  const heroes = useMemo(() => FEATURES.filter((f) => f.hero), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FEATURES.filter((f) => {
      const catOk = filter === "all" || f.category === filter;
      const searchOk =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }, [filter, query]);

  const active: Feature =
    filtered.find((f) => f.title === selectedTitle) ?? filtered[0] ?? FEATURES[0];
  const activeIndex = filtered.findIndex((f) => f.title === active.title);
  const ActiveIcon = active.icon as LucideIcon;

  useEffect(() => {
    if (!filtered.some((f) => f.title === selectedTitle)) {
      setSelectedTitle(filtered[0]?.title ?? FEATURES[0].title);
    }
  }, [filter, query, filtered, selectedTitle]);

  useEffect(() => {
    if (reduced || !inView || query || filter !== "all") return;
    const id = setInterval(() => {
      setSelectedTitle((title) => {
        const idx = filtered.findIndex((f) => f.title === title);
        const next = filtered[(idx + 1) % filtered.length];
        return next?.title ?? title;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [reduced, inView, filtered, query, filter]);

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-6" id="features">
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50">
              <span className="font-semibold text-cyan-400">{FEATURES.length}</span> capabilities
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              Everything to <span className="gradient-text">evaluate at scale</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/55">
              One glass deck — browse, filter, explore. No endless grid.
            </p>
          </div>
        </SectionReveal>

        {/* Hero trio — compact strip */}
        <SectionReveal delay={0.08} className="mt-10">
          <div className="grid gap-3 sm:grid-cols-3">
            {heroes.map((f) => {
              const Icon = f.icon as LucideIcon;
              return (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => {
                    setFilter("all");
                    setQuery("");
                    setSelectedTitle(f.title);
                  }}
                  className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition-all hover:scale-[1.02] ${
                    active.title === f.title
                      ? "border-violet-500/40 bg-violet-500/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                      {f.title}
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </span>
                    <span className="line-clamp-1 text-xs text-white/45">Core platform</span>
                  </span>
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* Glass capability deck */}
        <div ref={ref} className="features-deck relative mt-8 overflow-hidden rounded-3xl border border-white/10">
          {/* Dock */}
          <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {FEATURE_CATEGORIES.map((cat) => {
                const CatIcon = cat.icon as LucideIcon;
                const isOn = filter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilter(cat.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      isOn
                        ? "border-transparent bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                        : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                    }`}
                  >
                    <CatIcon className="h-3.5 w-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search features…"
                className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/40 focus:outline-none sm:w-56"
                aria-label="Search features"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_minmax(300px,380px)]">
            {/* Bubble field */}
            <div className="feature-bubble-mask relative border-b border-white/10 p-4 md:p-5 lg:border-b-0 lg:border-r">
              {filtered.length === 0 ? (
                <p className="py-12 text-center text-sm text-white/40">No features match your search.</p>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                >
                  <AnimatePresence mode="popLayout">
                    {filtered.map((feature, i) => {
                      const Icon = feature.icon as LucideIcon;
                      const isActive = active.title === feature.title;
                      const globalIdx = FEATURES.indexOf(feature);
                      return (
                        <motion.button
                          key={feature.title}
                          id={globalIdx >= 0 ? `feature-${globalIdx}` : undefined}
                          type="button"
                          layout
                          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.25, delay: i * 0.02 }}
                          onClick={() => setSelectedTitle(feature.title)}
                          className={`feature-bubble group relative flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center transition-all ${
                            isActive
                              ? "border-white/25 bg-white/10 shadow-lg"
                              : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                          }`}
                          aria-pressed={isActive}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="bubble-glow"
                              className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20 ${feature.accent}`}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          <span
                            className={`relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} shadow-md transition-transform group-hover:scale-110`}
                          >
                            <Icon className="h-4 w-4 text-white" />
                          </span>
                          <span className="relative line-clamp-2 text-[10px] font-medium leading-tight text-white/75 sm:text-[11px]">
                            {feature.title}
                          </span>
                          {feature.hero && (
                            <Star className="absolute right-1.5 top-1.5 h-2.5 w-2.5 fill-amber-400/80 text-amber-400" />
                          )}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
              <p className="mt-3 text-center text-[10px] text-white/30 lg:hidden">
                Tap a bubble to explore
              </p>
            </div>

            {/* Detail glass panel */}
            <div className="relative p-4 md:p-6 lg:sticky lg:top-24 lg:self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="feature-detail-panel relative overflow-hidden rounded-2xl border border-white/15 p-6"
                >
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-30 blur-2xl ${active.accent}`}
                    aria-hidden
                  />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-xl ${active.accent}`}
                      initial={reduced ? false : { rotate: -8, scale: 0.9 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <ActiveIcon className="h-7 w-7 text-white" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                          {active.category}
                        </span>
                        {active.hero && (
                          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                            Core
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl">
                        {active.title}
                      </h3>
                    </div>
                  </div>

                  <p className="relative mt-4 text-sm leading-relaxed text-white/60 md:text-base">
                    {active.description}
                  </p>

                  <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-white/35">
                      {activeIndex + 1} of {filtered.length}
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const prev =
                            filtered[(activeIndex - 1 + filtered.length) % filtered.length];
                          if (prev) setSelectedTitle(prev.title);
                        }}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 hover:bg-white/5"
                        disabled={filtered.length <= 1}
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const next = filtered[(activeIndex + 1) % filtered.length];
                          if (next) setSelectedTitle(next.title);
                        }}
                        className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-1 text-xs font-semibold text-white"
                        disabled={filtered.length <= 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
