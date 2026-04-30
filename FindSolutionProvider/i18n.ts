"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        secure: "Secure",
        minutes: "~10 min",
        backToInfo: "Back to Info",
        back: "Back",
        continue: "Continue",
        stepOf: "Step {{current}} of {{total}}",
        supportEmail: "support@gs1saudiarabia.org",
      },
      header: {
        portalTitle:
          "GS1 Saudi Arabia Solution Provider Registration — Official Application Portal",
        registration: "Solution Provider Registration",
        becomeProvider: "Become a Solution Provider",
        completeSteps: "Complete all 6 steps. Fields marked * are required.",
        languageSaudi: "Saudi Arabia",
        languageEnglish: "English",
      },
      footer: {
        copyright: "© 2026 GS1 Saudi Arabia. All rights reserved.",
        privacy: "Privacy",
        terms: "Terms",
        support: "Support",
      },
      sidebar: {
        appForm: "Application Form",
        title: "Solution Provider Registration",
        complete: "{{value}}% complete",
        needHelp: "Need Help?",
        helpText: "Contact our support team for assistance.",
      },
      steps: {
        companyTitle: "Company Info",
        companySubtitle: "Basic company details",
        categoryTitle: "Category",
        categorySubtitle: "Registration categories",
        documentsTitle: "Documents",
        documentsSubtitle: "Legal document numbers",
        feesTitle: "Fee & Payment",
        feesSubtitle: "Fees & payment method",
        declarationTitle: "Declaration",
        declarationSubtitle: "Authorisation & consent",
        reviewTitle: "Review & Submit",
        reviewSubtitle: "Final review & submit",
      },
      success: {
        submitted: "Application Submitted!",
        thankYou: "Thank you, {{name}}.",
        message:
          "Your application for {{company}} has been received. Our team will contact you within 3-5 business days.",
        categories: "Categories",
        processing: "Processing",
        reference: "Reference",
        backHome: "Back to Home",
      },
    },
  },
  ar: {
    translation: {
      common: {
        secure: "آمن",
        minutes: "~10 دقائق",
        backToInfo: "العودة للمعلومات",
        back: "رجوع",
        continue: "متابعة",
        stepOf: "الخطوة {{current}} من {{total}}",
        supportEmail: "support@gs1saudiarabia.org",
      },
      header: {
        portalTitle:
          "بوابة التسجيل الرسمية لمزود الحلول - GS1 السعودية",
        registration: "تسجيل مزود الحلول",
        becomeProvider: "كن مزود حلول",
        completeSteps: "أكمل جميع الخطوات الست. الحقول المميزة بـ * مطلوبة.",
        languageSaudi: "العربية (السعودية)",
        languageEnglish: "الإنجليزية",
      },
      footer: {
        copyright: "© 2026 GS1 السعودية. جميع الحقوق محفوظة.",
        privacy: "الخصوصية",
        terms: "الشروط",
        support: "الدعم",
      },
      sidebar: {
        appForm: "نموذج الطلب",
        title: "تسجيل مزود الحلول",
        complete: "مكتمل {{value}}%",
        needHelp: "تحتاج مساعدة؟",
        helpText: "تواصل مع فريق الدعم للمساعدة.",
      },
      steps: {
        companyTitle: "معلومات الشركة",
        companySubtitle: "البيانات الأساسية للشركة",
        categoryTitle: "الفئات",
        categorySubtitle: "فئات التسجيل",
        documentsTitle: "المستندات",
        documentsSubtitle: "أرقام المستندات القانونية",
        feesTitle: "الرسوم والدفع",
        feesSubtitle: "الرسوم وطريقة الدفع",
        declarationTitle: "الإقرار",
        declarationSubtitle: "التفويض والموافقة",
        reviewTitle: "المراجعة والإرسال",
        reviewSubtitle: "المراجعة النهائية والإرسال",
      },
      success: {
        submitted: "تم إرسال الطلب!",
        thankYou: "شكرًا لك، {{name}}.",
        message:
          "تم استلام طلبك الخاص بـ {{company}}. سيتواصل معك فريقنا خلال 3-5 أيام عمل.",
        categories: "الفئات",
        processing: "المعالجة",
        reference: "المرجع",
        backHome: "العودة للرئيسية",
      },
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;

