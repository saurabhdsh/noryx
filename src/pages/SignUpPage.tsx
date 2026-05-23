import { Navigate } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { SignUpForm } from "../components/auth/SignUpForm";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../hooks/usePageTitle";

export function SignUpPage() {
  usePageTitle("Start free trial");
  const { user, loading } = useAuth();

  if (!loading && user) return <Navigate to="/app" replace />;

  return (
    <AuthShell
      title="Start your 14-day trial"
      subtitle="Connect your first agent in under 5 minutes. No credit card required."
    >
      <SignUpForm />
    </AuthShell>
  );
}
