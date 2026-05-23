import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { SignUpForm } from "../components/auth/SignUpForm";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../hooks/usePageTitle";

export function SignUpPage() {
  usePageTitle("Start free trial");
  const { user, loading } = useAuth();
  const [queued, setQueued] = useState(false);

  if (!loading && user) return <Navigate to="/app" replace />;

  return (
    <AuthShell
      hideHeader={queued}
      title="Request your 14-day trial"
      subtitle="Company email and plan only — no password or company profile. We’ll follow up to activate your trial."
    >
      <SignUpForm onQueued={() => setQueued(true)} />
    </AuthShell>
  );
}
