import { Link } from "react-router-dom";
import { AuroraBackground } from "../AuroraBackground";
import { Logo } from "../Logo";

type Props = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  hideHeader?: boolean;
};

export function AuthShell({ children, title, subtitle, hideHeader }: Props) {
  return (
    <div className="relative min-h-screen px-4 py-12 md:px-6">
      <AuroraBackground />
      <header className="relative z-10 mx-auto flex max-w-lg items-center justify-between">
        <Link to="/" className="rounded-xl">
          <Logo variant="full" size="md" />
        </Link>
        <Link to="/" className="text-sm text-white/50 hover:text-white">
          Back to home
        </Link>
      </header>

      <main
        id="main-content"
        className="relative z-10 mx-auto mt-10 w-full max-w-lg"
      >
        {!hideHeader && title && (
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        <div className="glass-strong gradient-border rounded-3xl p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
