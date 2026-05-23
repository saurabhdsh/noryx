import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  PLAN_LABELS,
  submitTrialRequest,
  type PlanId,
  type SignUpInput,
} from "../../lib/auth";
import { getCompanyEmailError } from "../../lib/companyEmail";
import { FormField, inputClass } from "./FormField";
import { TrialQueueSuccess } from "./TrialQueueSuccess";

const STEPS = ["Your details", "Plan"] as const;
const PLANS: PlanId[] = ["starter", "growth", "business", "enterprise"];

type Props = {
  onQueued?: () => void;
};

export function SignUpForm({ onQueued }: Props) {
  const [searchParams] = useSearchParams();
  const initialPlan = (searchParams.get("plan") as PlanId) || "growth";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [queued, setQueued] = useState<{
    name: string;
    email: string;
    plan: PlanId;
  } | null>(null);

  const [form, setForm] = useState<SignUpInput>({
    email: "",
    name: "",
    plan: PLANS.includes(initialPlan) ? initialPlan : "growth",
  });

  const update = (patch: Partial<SignUpInput>) => {
    setForm((f) => ({ ...f, ...patch }));
    setFieldErrors({});
    setError(null);
  };

  const validateStep = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = "Name is required";
      const emailErr = getCompanyEmailError(form.email);
      if (emailErr) errs.email = emailErr;
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setError(null);
    try {
      await submitTrialRequest(form);
      const snapshot = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        plan: form.plan,
      };
      setQueued(snapshot);
      onQueued?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Sign up failed";
      setError(
        msg === "Load failed" || msg === "Failed to fetch"
          ? "Network error — check your connection, try disabling ad blockers, or email reach@noryxtest.io."
          : msg,
      );
    } finally {
      setLoading(false);
    }
  };

  if (queued) {
    return (
      <TrialQueueSuccess name={queued.name} email={queued.email} plan={queued.plan} />
    );
  }

  return (
    <div>
      <ol className="mb-8 flex items-center justify-between gap-2" aria-label="Sign up progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-1">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                i < step
                  ? "bg-emerald-500/20 text-emerald-400"
                  : i === step
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                    : "bg-white/10 text-white/40"
              }`}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className="text-[10px] text-white/50 sm:text-xs">{label}</span>
          </li>
        ))}
      </ol>

      {error && (
        <div
          className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
          role="alert"
        >
          {error}
        </div>
      )}

      {step === 0 && (
        <div className="space-y-4">
          <FormField id="name" label="Full name" error={fieldErrors.name}>
            <input
              id="name"
              className={inputClass}
              value={form.name}
              onChange={(e) => update({ name: e.target.value })}
              autoComplete="name"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
          </FormField>
          <FormField
            id="email"
            label="Company email"
            error={fieldErrors.email}
            hint="Work email only — Gmail, Outlook.com, Yahoo, and similar aren’t accepted."
          >
            <input
              id="email"
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
              autoComplete="work-email"
              placeholder="you@yourcompany.com"
              aria-invalid={!!fieldErrors.email}
            />
          </FormField>
        </div>
      )}

      {step === 1 && (
        <fieldset className="space-y-3">
          <legend className="sr-only">Choose a plan</legend>
          {PLANS.map((plan) => (
            <label
              key={plan}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                form.plan === plan
                  ? "border-violet-500/60 bg-violet-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={plan}
                checked={form.plan === plan}
                onChange={() => update({ plan })}
                className="h-4 w-4 accent-violet-500"
              />
              <span className="flex-1 text-sm font-medium">{PLAN_LABELS[plan]}</span>
              {plan === "growth" && (
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-300">
                  Popular
                </span>
              )}
            </label>
          ))}
          <p className="text-xs text-white/40">
            14-day free trial on Starter and Growth. No credit card required.
          </p>
        </fieldset>
      )}

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-white/15 py-3 text-sm font-semibold text-white/80 hover:bg-white/5"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit trial request"}
          </button>
        )}
      </div>
    </div>
  );
}
