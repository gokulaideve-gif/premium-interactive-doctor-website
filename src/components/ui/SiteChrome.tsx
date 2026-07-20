"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import NavbarV2 from "@/components/ui/NavbarV2";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import CmsInlineEditor from "@/components/admin/CmsInlineEditor";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/admin") || pathname === "/login";

  if (isStudio) return <main className="min-h-screen">{children}</main>;

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <NavbarV2 />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CmsInlineEditor />
    </>
  );
}
