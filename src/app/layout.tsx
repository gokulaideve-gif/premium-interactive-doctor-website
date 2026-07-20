import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import SiteChrome from "@/components/ui/SiteChrome";
import Preloader from "@/components/ui/Preloader";

export const metadata: Metadata = {
  title: {
    default: "Dr. Swathy Priya Wellness Centre",
    template: "%s | Dr. Swathy Priya Wellness Centre",
  },
  description: "Compassionate whole-person healthcare at Dr. Swathy Priya Wellness Centre.",
  keywords: "Dr Swathy Priya, wellness centre, doctor, healthcare, medical clinic, appointment",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-white">
        <Providers>
          <Preloader />
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
