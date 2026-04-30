"use client";

import { Building2, FileText, Landmark, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface DocumentsValues {
  nationalIdIqamaNumber: string;
  vatRegistrationNumber: string;
  commercialRegistrationNumber: string;
}

interface DocumentsStepProps {
  defaultValues?: Partial<DocumentsValues>;
  onBack: () => void;
  onSubmit: (values: DocumentsValues) => void;
}

const defaults: DocumentsValues = {
  nationalIdIqamaNumber: "",
  vatRegistrationNumber: "",
  commercialRegistrationNumber: "",
};

export function DocumentsStep({
  defaultValues,
  onBack,
  onSubmit,
}: DocumentsStepProps) {
  const { t } = useTranslation();
  const [values, setValues] = useState<DocumentsValues>({
    ...defaults,
    ...defaultValues,
  });
  const [errors, setErrors] = useState<{
    nationalIdIqamaNumber?: string;
    vatRegistrationNumber?: string;
    commercialRegistrationNumber?: string;
  }>({});

  function setField<K extends keyof DocumentsValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleContinue() {
    const nextErrors: {
      nationalIdIqamaNumber?: string;
      vatRegistrationNumber?: string;
      commercialRegistrationNumber?: string;
    } = {};

    const nationalId = values.nationalIdIqamaNumber.trim();
    const vat = values.vatRegistrationNumber.trim();
    const cr = values.commercialRegistrationNumber.trim();

    if (!nationalId) {
      nextErrors.nationalIdIqamaNumber = "National ID / Iqama number is required.";
    } else if (!/^\d+$/.test(nationalId)) {
      nextErrors.nationalIdIqamaNumber = "National ID / Iqama number must be numeric.";
    } else if (nationalId.length !== 10) {
      nextErrors.nationalIdIqamaNumber = "National ID / Iqama number must be 10 digits.";
    }

    if (vat && !/^\d{15}$/.test(vat)) {
      nextErrors.vatRegistrationNumber =
        "VAT registration number must be 15 digits.";
    }

    if (cr && !/^\d+$/.test(cr)) {
      nextErrors.commercialRegistrationNumber =
        "Commercial Registration number must be numeric.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      nationalIdIqamaNumber: nationalId,
      vatRegistrationNumber: vat,
      commercialRegistrationNumber: cr,
    });
  }

  return (
    <div className="flex min-h-[620px] flex-col gap-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-gs1-blue">
            <FileText size={16} strokeWidth={2.2} />
          </span>
          <div>
            <h2 className="text-base font-semibold text-gs1-blue">
              {t("steps.documentsTitle")}
            </h2>
            <p className="text-xs text-slate-500">{t("steps.documentsSubtitle")}</p>
          </div>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200 sm:px-3 sm:text-[11px]">
          {t("common.stepOf", { current: 3, total: 6 })}
        </span>
      </header>

      <DocumentCard
        label="National ID / Iqama Number"
        required
        hint="Enter your Iqama (for residents) or Saudi National ID"
        placeholder="e.g. 1023456789"
        value={values.nationalIdIqamaNumber}
        onChange={(v) => setField("nationalIdIqamaNumber", v)}
        icon={ShieldCheck}
        error={errors.nationalIdIqamaNumber}
      />

      <DocumentCard
        label="VAT Registration Number"
        hint="Company VAT number issued by Zakat, Tax and Customs Authority"
        optional
        placeholder="e.g. 300123456700003"
        value={values.vatRegistrationNumber}
        onChange={(v) => setField("vatRegistrationNumber", v)}
        icon={Landmark}
        error={errors.vatRegistrationNumber}
      />

      <DocumentCard
        label="Commercial Registration (CR) Number"
        hint="Official business registration number in Saudi Arabia"
        optional
        placeholder="e.g. 1010123456"
        value={values.commercialRegistrationNumber}
        onChange={(v) => setField("commercialRegistrationNumber", v)}
        icon={Building2}
        error={errors.commercialRegistrationNumber}
      />

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-800">Documents Checklist</p>
        <ul className="mt-2 space-y-1.5 text-xs text-amber-900/90">
          <li>⊙ Self-attested copies of all documents required</li>
          <li>⊙ Audited Balance Sheet of last 2 years (physical submission)</li>
          <li>⊙ Proof of fee payment to be submitted with application</li>
          <li>⊙ Documents in PDF/JPG format, max 2MB each</li>
        </ul>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-5">
        <ProgressDots active={3} total={6} />
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 min-w-[78px] items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-slate-300 sm:min-w-[94px] sm:px-4 sm:text-sm"
          >
            {`← ${t("common.back")}`}
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-md bg-gs1-blue px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-gs1-blue-dark sm:min-w-[110px] sm:px-5 sm:text-sm"
          >
            {t("common.continue")}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentCard({
  label,
  required,
  optional,
  hint,
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: typeof FileText;
  error?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600">
          <Icon size={15} />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-700">
            {label}
            {required ? <span className="ml-1 text-gs1-orange">*</span> : null}
            {optional ? (
              <span className="ml-1 text-xs font-normal text-slate-400">
                (optional)
              </span>
            ) : null}
          </p>
          <p className="text-[11px] text-slate-500">{hint}</p>
        </div>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-10 w-full rounded-md border px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            : "border-slate-200 focus:border-gs1-blue focus:ring-2 focus:ring-gs1-blue/20"
        }`}
      />
      {error ? <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}

function ProgressDots({ active, total }: { active: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i + 1 === active;
        const isDone = i + 1 < active;
        return (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              isActive
                ? "w-6 bg-gs1-orange"
                : isDone
                  ? "w-3 bg-gs1-blue"
                  : "w-3 bg-slate-200"
            }`}
          />
        );
      })}
    </div>
  );
}

