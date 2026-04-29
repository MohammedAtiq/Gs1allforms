"use client";

import Image from "next/image";

export function PageHeader() {
  return (
    <header className="w-full bg-white">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-gs1-blue py-2 text-center text-xs font-medium tracking-wide text-white">
          GS1 India Solution Provider Registration — Official Application Portal
        </div>

        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
            <Image
              src="/gs1-logo.png"
              alt="GS1 Saudi Arabia"
              width={160}
              height={70}
              priority
              className="h-12 w-auto object-contain"
            />
            <div className="hidden items-center gap-2 text-sm font-medium text-slate-700 md:flex">
              <span aria-hidden>📄</span>
              Solution Provider Registration
            </div>
            <a
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-gs1-blue"
            >
              ← Back to Info
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-semibold text-gs1-blue">
              Become a Solution Provider
            </h1>
            <p className="text-xs text-slate-500">
              Complete all 6 steps. Fields marked{" "}
              <span className="text-gs1-orange">*</span> are required.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
              Secure
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
              <span aria-hidden>⏱</span>
              ~10 min
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
