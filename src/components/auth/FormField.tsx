type Props = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
};

export function FormField({ id, label, error, children, hint }: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white/80">
        {label}
      </label>
      <div className="mt-1.5">
        {children}
      </div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-white/40">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 aria-invalid:border-rose-500/60";
