"use client";

import { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface FieldShellProps {
  id: string;
  label: ReactNode;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}

function FieldShell({ id, label, optional, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500"
      >
        {label}
        {optional ? (
          <span className="ml-1 text-[11px] font-normal normal-case tracking-normal text-slate-400">
            (optional)
          </span>
        ) : (
          <span className="ml-0.5 text-gs1-orange">*</span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-rose-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

const baseControl =
  "h-11 w-full rounded-md border bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-gs1-blue focus:ring-2 focus:ring-gs1-blue/20";

function controlClass(hasError?: boolean) {
  return `${baseControl} ${
    hasError
      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
      : "border-slate-200 hover:border-slate-300"
  }`;
}

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: ReactNode;
  optional?: boolean;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { id, label, optional, error, className, ...rest },
    ref,
  ) {
    return (
      <FieldShell id={id} label={label} optional={optional} error={error}>
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${controlClass(!!error)} ${className ?? ""}`}
          {...rest}
        />
      </FieldShell>
    );
  },
);

interface TextAreaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  id: string;
  label: ReactNode;
  optional?: boolean;
  error?: string;
}

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(function TextAreaField(
  { id, label, optional, error, className, ...rest },
  ref,
) {
  return (
    <FieldShell id={id} label={label} optional={optional} error={error}>
      <textarea
        id={id}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${controlClass(!!error)} h-auto py-2.5 ${className ?? ""}`}
        {...rest}
      />
    </FieldShell>
  );
});

interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  id: string;
  label: ReactNode;
  optional?: boolean;
  error?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    { id, label, optional, error, className, placeholder, options, ...rest },
    ref,
  ) {
    return (
      <FieldShell id={id} label={label} optional={optional} error={error}>
        <select
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${controlClass(!!error)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2364748b%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:12px_12px] bg-[right_0.85rem_center] bg-no-repeat pr-9 ${className ?? ""}`}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FieldShell>
    );
  },
);
