"use client";

import { useMemo, useState } from "react";

import { PageFooter } from "./components/PageFooter";
import { PageHeader } from "./components/PageHeader";
import { MobileStepCard } from "./components/MobileStepCard";
import { Sidebar } from "./components/Sidebar";
import { SubmissionSuccess } from "./components/SubmissionSuccess";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CompanyInfo } from "./steps/CompanyInfo";
import { CategoryStep } from "./steps/CategoryStep";
import { DeclarationStep, type DeclarationValues } from "./steps/DeclarationStep";
import { DocumentsStep, type DocumentsValues } from "./steps/DocumentsStep";
import { FeesStep, type FeesValues } from "./steps/FeesStep";
import { ReviewStep } from "./steps/ReviewStep";
import type { CompanyInfoValues } from "./schemas/companyInfo";
import { STEPS, type StepId } from "./types";

interface FormData {
  company?: CompanyInfoValues;
  category?: string[];
  documents?: DocumentsValues;
  fees?: FeesValues;
  declaration?: DeclarationValues;
}

export default function FindSolutionProvider() {
  return (
    <LanguageProvider>
      <FindSolutionProviderContent />
    </LanguageProvider>
  );
}

function FindSolutionProviderContent() {
  const [currentStep, setCurrentStep] = useState<StepId>("company");
  const [data, setData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const completedPercent = useMemo(() => {
    if (currentStep === "review") return 100;
    const idx = STEPS.findIndex((s) => s.id === currentStep);
    const completedSteps = Object.keys(data).length;
    return Math.round(
      (Math.max(completedSteps, Math.max(idx, 0)) / STEPS.length) * 100,
    );
  }, [currentStep, data]);

  const completedStepIds = useMemo(() => {
    const ids: StepId[] = [];
    if (data.company) ids.push("company");
    if (data.category) ids.push("category");
    if (data.documents) ids.push("documents");
    if (data.fees) ids.push("fees");
    if (data.declaration) ids.push("declaration");
    return ids;
  }, [data]);

  function handleCompanySubmit(values: CompanyInfoValues) {
    setData((prev) => ({ ...prev, company: values }));
    setCurrentStep("category");
  }

  function handleCategorySubmit(values: string[]) {
    setData((prev) => ({ ...prev, category: values }));
    setCurrentStep("documents");
  }

  function handleDocumentsSubmit(values: DocumentsValues) {
    setData((prev) => ({ ...prev, documents: values }));
    setCurrentStep("fees");
  }

  function handleFeesSubmit(values: FeesValues) {
    setData((prev) => ({ ...prev, fees: values }));
    setCurrentStep("declaration");
  }

  function handleDeclarationSubmit(values: DeclarationValues) {
    setData((prev) => ({ ...prev, declaration: values }));
    setCurrentStep("review");
  }

  function handleFinalSubmit() {
    console.log("GS1 Solution Provider submission payload:", data);
    setIsSubmitted(true);
  }

  function handleBackToHome() {
    setCurrentStep("company");
    setData({});
    setIsSubmitted(false);
  }

  return (
    <div className="flex min-h-full flex-col bg-gs1-surface">
      <PageHeader />

      {isSubmitted ? (
        <SubmissionSuccess
          company={data.company}
          categoryCount={data.category?.length ?? 0}
          fees={data.fees}
          onBackToHome={handleBackToHome}
        />
      ) : (
        <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <Sidebar
              currentStep={currentStep}
              completedPercent={completedPercent}
              completedStepIds={completedStepIds}
            />

            <div className="flex flex-1 flex-col gap-4">
              <MobileStepCard currentStep={currentStep} />

              <section className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              {currentStep === "company" ? (
                <CompanyInfo
                  defaultValues={data.company}
                  onSubmit={handleCompanySubmit}
                />
              ) : currentStep === "category" ? (
                <CategoryStep
                  defaultSelected={data.category}
                  onBack={() => setCurrentStep("company")}
                  onSubmit={handleCategorySubmit}
                />
              ) : currentStep === "documents" ? (
                <DocumentsStep
                  defaultValues={data.documents}
                  onBack={() => setCurrentStep("category")}
                  onSubmit={handleDocumentsSubmit}
                />
              ) : currentStep === "fees" ? (
                <FeesStep
                  selectedCategories={data.category}
                  defaultValues={data.fees}
                  onBack={() => setCurrentStep("documents")}
                  onSubmit={handleFeesSubmit}
                />
              ) : currentStep === "declaration" ? (
                <DeclarationStep
                  defaultValues={data.declaration}
                  onBack={() => setCurrentStep("fees")}
                  onSubmit={handleDeclarationSubmit}
                />
              ) : currentStep === "review" ? (
                <ReviewStep
                  company={data.company}
                  category={data.category}
                  documents={data.documents}
                  fees={data.fees}
                  declaration={data.declaration}
                  onBack={() => setCurrentStep("declaration")}
                  onSubmitApplication={handleFinalSubmit}
                />
              ) : (
                <PlaceholderStep
                  stepId={currentStep}
                  onBack={() => setCurrentStep("declaration")}
                />
              )}
              </section>
            </div>
          </div>
        </div>
      )}

      <PageFooter />
    </div>
  );
}

function PlaceholderStep({
  stepId,
  onBack,
}: {
  stepId: StepId;
  onBack: () => void;
}) {
  const step = STEPS.find((s) => s.id === stepId);
  return (
    <div className="flex min-h-[420px] flex-col items-start justify-center gap-3">
      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
        Step {step?.index} of {STEPS.length}
      </span>
      <h2 className="text-lg font-semibold text-gs1-blue">{step?.title}</h2>
      <p className="text-sm text-slate-500">{step?.subtitle}</p>
      <p className="text-sm text-slate-400">
        This step will be implemented next.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-2 inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:border-gs1-blue hover:text-gs1-blue"
      >
        ← Back to Company Info
      </button>
    </div>
  );
}
