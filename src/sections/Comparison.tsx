import { Check, Minus } from "lucide-react";
import { SectionReveal } from "../components/SectionReveal";
import { COMPARISON } from "../data/content";

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-emerald-400" />;
  if (value === false) return <Minus className="mx-auto h-5 w-5 text-white/20" />;
  return <span className="text-xs text-amber-400/80">Partial</span>;
}

export function Comparison() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionReveal>
          <h2 className="font-display text-center text-2xl font-bold md:text-3xl">
            Why noryx vs alternatives
          </h2>
          <div className="mt-10 overflow-x-auto rounded-2xl glass">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th scope="col" className="p-4 text-left text-white/50">Capability</th>
                  {COMPARISON.columns.map((col, i) => (
                    <th
                      scope="col"
                      key={col}
                      className={`p-4 text-center font-semibold ${
                        i === 0
                          ? "bg-gradient-to-b from-violet-500/20 to-transparent text-white"
                          : "text-white/60"
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td scope="row" className="p-4 text-white/80">{row.feature}</td>
                    <td className="p-4 bg-violet-500/5">
                      <Cell value={row.noryx} />
                    </td>
                    <td className="p-4">
                      <Cell value={row.manual} />
                    </td>
                    <td className="p-4">
                      <Cell value={row.generic === "partial" ? "partial" : row.generic} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
