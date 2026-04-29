"use client";

import Select, { type StylesConfig } from "react-select";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  id: string;
  label: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

function getDropdownStyles(hasError: boolean): StylesConfig<DropdownOption, false> {
  return {
    control: (base, state) => ({
    ...base,
    minHeight: 44,
    borderRadius: 6,
    borderColor: hasError
      ? "#fb7185"
      : state.isFocused
        ? "#002c6c"
        : "#e2e8f0",
    boxShadow: hasError
      ? "0 0 0 2px rgba(251, 113, 133, 0.2)"
      : state.isFocused
        ? "0 0 0 2px rgba(0, 44, 108, 0.2)"
        : "none",
    "&:hover": {
      borderColor: hasError ? "#f43f5e" : state.isFocused ? "#002c6c" : "#cbd5e1",
    },
  }),
    valueContainer: (base) => ({ ...base, padding: "0 12px" }),
    placeholder: (base) => ({ ...base, color: "#94a3b8", fontSize: 14 }),
    singleValue: (base) => ({ ...base, color: "#0f172a", fontSize: 14 }),
    menu: (base) => ({ ...base, zIndex: 40 }),
    menuPortal: (base) => ({ ...base, zIndex: 60 }),
    option: (base, state) => ({
      ...base,
      fontSize: 14,
      backgroundColor: state.isFocused ? "#eff6ff" : "#fff",
      color: "#0f172a",
    }),
    indicatorSeparator: (base) => ({ ...base, display: "none" }),
  };
}

export function Dropdown({
  id,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  placeholder = "Select",
  required = false,
}: DropdownProps) {
  const selected = options.find((opt) => opt.value === value) ?? null;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500"
      >
        {label}
        {required ? <span className="ml-0.5 text-gs1-orange">*</span> : null}
      </label>

      <Select
        inputId={id}
        instanceId={id}
        value={selected}
        options={options}
        onChange={(option) => onChange(option?.value ?? "")}
        onBlur={onBlur}
        placeholder={placeholder}
        styles={getDropdownStyles(!!error)}
        classNamePrefix="gs1-select"
        menuPlacement="auto"
        menuPortalTarget={typeof document !== "undefined" ? document.body : null}
      />

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

