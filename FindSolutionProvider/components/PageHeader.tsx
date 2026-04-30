"use client";

import { ChevronDown, Languages } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../providers/LanguageProvider";

export function PageHeader() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const { language, setLanguage, isRTL } = useLanguage();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="w-full bg-white">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-gs1-blue py-2 text-center text-xs font-medium tracking-wide text-white">
          {t("header.portalTitle")}
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
              {t("header.registration")}
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-gs1-blue">
                {isRTL ? "→" : "←"} {t("common.backToInfo")}
              </a>

              <div className="relative" ref={languageRef}>
                <button
                  type="button"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-gs1-blue"
                  aria-haspopup="menu"
                  aria-expanded={isLangOpen}
                >
                  <Languages size={14} />
                  <span className="hidden sm:inline">
                    {language === "ar" ? "Saudi Arabia" : "English"}
                  </span>
                  <ChevronDown size={12} />
                </button>

                {isLangOpen ? (
                  <div
                    className={`absolute top-9 z-50 w-40 max-w-[calc(100vw-1rem)] overflow-hidden rounded-md border border-slate-200 bg-white shadow-md ${
                      isRTL ? "left-0" : "right-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("ar");
                        setIsLangOpen(false);
                      }}
                      className={`block w-full cursor-pointer px-3 py-2 text-xs transition hover:bg-slate-50 ${
                        isRTL ? "text-right" : "text-left"
                      } ${
                        language === "ar"
                          ? "bg-slate-50 font-semibold text-gs1-blue"
                          : "text-slate-600"
                      }`}
                    >
                      Saudi Arabia
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("en");
                        setIsLangOpen(false);
                      }}
                      className={`block w-full cursor-pointer px-3 py-2 text-xs transition hover:bg-slate-50 ${
                        isRTL ? "text-right" : "text-left"
                      } ${
                        language === "en"
                          ? "bg-slate-50 font-semibold text-gs1-blue"
                          : "text-slate-600"
                      }`}
                    >
                      English
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-semibold text-gs1-blue">
              {t("header.becomeProvider")}
            </h1>
            <p className="text-xs text-slate-500">
              {t("header.completeSteps")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
              {t("common.secure")}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
              <span aria-hidden>⏱</span>
              {t("common.minutes")}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
