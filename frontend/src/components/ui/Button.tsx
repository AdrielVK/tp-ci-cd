import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  type = "button",
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2";

  const variantClasses =
    variant === "secondary"
      ? "bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:bg-slate-200 disabled:text-slate-500"
      : "bg-slate-950 text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:text-slate-700";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`.trim()}
      disabled={disabled}
      {...rest}
    />
  );
}
