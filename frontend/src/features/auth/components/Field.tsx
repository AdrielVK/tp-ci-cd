import type { ComponentPropsWithoutRef } from "react";
import type { FieldError } from "react-hook-form";

interface FieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string | FieldError;
}

function getErrorMessage(error?: string | FieldError): string | undefined {
  if (typeof error === "string") {
    return error;
  }

  if (error && "message" in error && typeof error.message === "string") {
    return error.message;
  }
}

export default function Field({
  label,
  id,
  name,
  type = "text",
  error,
  className = "",
  ...rest
}: Readonly<FieldProps>) {
  const errorMessage = getErrorMessage(error);

  return (
    <label className="grid gap-2 text-sm text-slate-700" htmlFor={id ?? String(name)}>
      <span className="font-medium">{label}</span>
      <input
        id={id ?? String(name)}
        name={name}
        type={type}
        className={`rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 ${className}`}
        aria-invalid={errorMessage !== undefined}
        aria-describedby={errorMessage !== undefined ? `${id ?? String(name)}-error` : undefined}
        {...rest}
      />
      {errorMessage !== undefined ? (
        <span id={`${id ?? String(name)}-error`} className="text-sm text-rose-600">
          {errorMessage}
        </span>
      ) : null}
    </label>
  );
}
