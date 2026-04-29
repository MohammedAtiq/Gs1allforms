import { z } from "zod";

export const companyInfoSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, { message: "Company name is required" }),
  contactPerson: z
    .string()
    .trim()
    .min(1, { message: "Contact person name is required" }),
  designation: z
    .string()
    .trim()
    .min(1, { message: "Designation is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email address is required" })
    .email({ message: "Enter a valid email address" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Registered address is required" }),
  city: z.string().trim().min(1, { message: "City is required" }),
  state: z.string().trim().min(1, { message: "State is required" }),
  pin: z
    .string()
    .trim()
    .min(1, { message: "PIN code is required" })
    .regex(/^\d{6}$/, { message: "Enter a valid 6-digit PIN" }),
  website: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
});

export type CompanyInfoValues = z.infer<typeof companyInfoSchema>;

export const companyInfoDefaults: CompanyInfoValues = {
  companyName: "",
  contactPerson: "",
  designation: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pin: "",
  website: "",
};
