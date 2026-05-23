import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SkipLink } from "./components/SkipLink";
import { AuthProvider } from "./context/AuthContext";
import { MarketingPage } from "./pages/MarketingPage";

const SignUpPage = lazy(() =>
  import("./pages/SignUpPage").then((m) => ({ default: m.SignUpPage })),
);
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);

function PageSpinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400"
        role="status"
        aria-label="Loading page"
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SkipLink />
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
