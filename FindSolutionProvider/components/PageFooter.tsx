"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export function PageFooter() {
  const { t } = useTranslation();
  return (
    <footer className="sticky bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Image
            src="/gs1-logo.png"
            alt="GS1"
            width={52}
            height={23}
            className="h-5 w-auto object-contain opacity-90"
          />
          <span className="whitespace-nowrap">
            {t("footer.copyright")}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a className="hover:text-gs1-blue" href="#">
            {t("footer.privacy")}
          </a>
          <a className="hover:text-gs1-blue" href="#">
            {t("footer.terms")}
          </a>
          <a className="hover:text-gs1-blue" href="#">
            {t("footer.support")}
          </a>
        </div>
      </div>
    </footer>
  );
}
