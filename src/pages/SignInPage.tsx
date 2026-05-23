import { Navigate } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { SignInForm } from "../components/auth/SignInForm";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../hooks/usePageTitle";

export function SignInPage() {
  usePageTitle("Sign in");
  const { user, loading } = useAuth();

  if (!loading && user) return <Navigate to="/app" replace />;

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your noryx workspace.">
      <SignInForm />
    </AuthShell>
  );
}
