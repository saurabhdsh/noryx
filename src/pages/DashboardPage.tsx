import { Link } from "react-router-dom";
import { Bot, LogOut, Plus, Settings } from "lucide-react";
import { AuroraBackground } from "../components/AuroraBackground";
import { Logo } from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { PLAN_AGENT_LIMIT, PLAN_LABELS } from "../lib/auth";
import { usePageTitle } from "../hooks/usePageTitle";

export function DashboardPage() {
  usePageTitle("Dashboard");
  const { user, signOut } = useAuth();

  if (!user) return null;

  const limit = PLAN_AGENT_LIMIT[user.plan];
  const used = 0;

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <header className="relative z-10 border-b border-white/10 glass-strong">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/">
            <Logo variant="full" size="sm" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/50 sm:inline">{user.email}</span>
            <button
              type="button"
              className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-6">
        <h1 className="font-display text-2xl font-bold md:text-3xl">
          Welcome, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-white/55">
          {PLAN_LABELS[user.plan]} · {user.company}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="glass rounded-2xl p-6 md:col-span-2">
            <h2 className="font-display text-lg font-semibold">Agent slots</h2>
            <p className="mt-1 text-sm text-white/50">
              {limit === null
                ? "Unlimited agents on Enterprise"
                : `${used} of ${limit} agents connected`}
            </p>
            {limit !== null && (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                  style={{ width: `${(used / limit) * 100}%` }}
                />
              </div>
            )}
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              Connect first agent
            </button>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold">Quick start</h2>
            <ol className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex gap-2">
                <span className="text-cyan-400">1.</span> Connect an agent via URL or SDK
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">2.</span> Generate or import a test suite
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">3.</span> Run evaluators and review scores
              </li>
            </ol>
          </div>
        </div>

        <section className="mt-10" aria-labelledby="agents-heading">
          <h2 id="agents-heading" className="font-display text-lg font-semibold">
            Your agents
          </h2>
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 py-16 text-center">
            <Bot className="h-10 w-10 text-white/25" />
            <p className="mt-3 text-sm text-white/45">No agents connected yet</p>
            <p className="mt-1 text-xs text-white/30">
              Paste a REST URL, Bedrock agentId, or upload a Python agent file
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
