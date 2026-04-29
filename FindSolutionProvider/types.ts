export type StepId =
  | "company"
  | "category"
  | "documents"
  | "fees"
  | "declaration"
  | "review";

export interface StepDefinition {
  id: StepId;
  index: number;
  title: string;
  subtitle: string;
}

export const STEPS: StepDefinition[] = [
  {
    id: "company",
    index: 1,
    title: "Company Info",
    subtitle: "Basic company details",
  },
  {
    id: "category",
    index: 2,
    title: "Category",
    subtitle: "Registration category",
  },
  {
    id: "documents",
    index: 3,
    title: "Documents",
    subtitle: "Legal document numbers",
  },
  {
    id: "fees",
    index: 4,
    title: "Fee & Payment",
    subtitle: "Fees & payment method",
  },
  {
    id: "declaration",
    index: 5,
    title: "Declaration",
    subtitle: "Authorisation & consent",
  },
  {
    id: "review",
    index: 6,
    title: "Review & Submit",
    subtitle: "Final review & submit",
  },
];
