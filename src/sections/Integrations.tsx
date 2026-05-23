import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SectionReveal } from "../components/SectionReveal";
import { INTEGRATIONS_CODE } from "../data/content";

const LOGOS = ["Jira", "Rally", "GitHub", "Webhook"];

export function Integrations() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(INTEGRATIONS_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-4 py-24 md:px-6" id="integrations">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Block bad deploys. <span className="gradient-text">Run evals in your pipeline.</span>
              </h2>
              <p className="mt-4 text-white/55 leading-relaxed">
                Native API keys, curl examples, GitHub Actions, and Jenkins — gate production on
                evaluator scores.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {LOGOS.map((name) => (
                  <span
                    key={name}
                    className="glass rounded-xl px-5 py-3 text-sm font-semibold text-white/70"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0c1a] p-6 text-xs leading-relaxed text-cyan-100/90">
                <code>{INTEGRATIONS_CODE}</code>
              </pre>
              <button
                type="button"
                onClick={copy}
                className="absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/15"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
