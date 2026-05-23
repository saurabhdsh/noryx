import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { FormField, inputClass } from "../components/auth/FormField";
import { usePageTitle } from "../hooks/usePageTitle";

export function ForgotPasswordPage() {
  usePageTitle("Reset password");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AuthShell
      title="Reset password"
      subtitle="We'll send a reset link if an account exists for this email."
    >
      {sent ? (
        <div className="text-center">
          <p className="text-sm text-white/70 leading-relaxed">
            If <strong className="text-white">{email}</strong> is registered, you'll receive
            reset instructions shortly. (Demo: no email is sent.)
          </p>
          <Link
            to="/signin"
            className="mt-6 inline-block text-sm text-cyan-400 hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <FormField id="reset-email" label="Work email">
            <input
              id="reset-email"
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </FormField>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-sm font-semibold text-white"
          >
            Send reset link
          </button>
        </form>
      )}
    </AuthShell>
  );
}
