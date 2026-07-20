import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import SiteChrome from "@/components/ui/SiteChrome";
import Preloader from "@/components/ui/Preloader";

export const metadata: Metadata = {
  title: {
    default: "Dr. Rudra Wellness Centre",
    template: "%s | Dr. Rudra Wellness Centre",
  },
  description: "Compassionate whole-person healthcare at Dr. Rudra Wellness Centre.",
  keywords: "Dr Rudra, wellness centre, doctor, healthcare, medical clinic, appointment",
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
