import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GS1 Solution Provider Registration",
  description: "Apply to become a GS1 Solution Provider.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", sizes: "512x512" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-screen overflow-y-auto bg-gs1-surface font-sans text-slate-800">
        {children}
      </body>
    </html>
  );
}
