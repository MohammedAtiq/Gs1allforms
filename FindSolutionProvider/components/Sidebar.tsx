"use client";

import { STEPS, type StepId } from "../types";

interface SidebarProps {
  currentStep: StepId;
  completedPercent: number;
  completedStepIds: StepId[];
}

export function Sidebar({
  currentStep,
  completedPercent,
  completedStepIds,
}: SidebarProps) {
  return (
    <aside className="hidden w-full flex-col gap-6 rounded-xl bg-gs1-blue p-6 text-white shadow-sm md:flex md:w-72 md:shrink-0">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          Application Form
        </p>
        <h2 className="mt-1 text-xl font-semibold leading-snug">
          Solution Provider Registration
        </h2>
      </div>

      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
          {completedPercent}% complete
        </p>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-gs1-orange transition-all"
            style={{ width: `${Math.min(100, Math.max(0, completedPercent))}%` }}
          />
        </div>
      </div>

      <ol className="flex flex-col gap-2">
        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedStepIds.includes(step.id);
          return (
            <li
              key={step.id}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition ${
                isActive
                  ? "bg-white/10 ring-1 ring-white/20"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : isActive
                    ? "bg-gs1-orange text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                {isCompleted ? "✓" : step.index}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">{step.title}</span>
                <span className="text-[11px] text-white/60">
                  {step.subtitle}
                </span>
              </span>
              {isActive ? (
                <span
                  aria-hidden
                  className="ml-auto h-2 w-2 rounded-full bg-gs1-orange"
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-2 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span aria-hidden>?</span>
          Need Help?
        </div>
        <p className="mt-1 text-xs text-white/70">
          Contact our support team for assistance.
        </p>
        <a
          href="mailto:support@gs1india.org"
          className="mt-2 inline-block text-xs font-semibold text-gs1-orange hover:underline"
        >
          support@gs1india.org
        </a>
      </div>
    </aside>
  );
}
