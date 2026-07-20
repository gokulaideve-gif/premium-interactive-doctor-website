"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", key: "nav.home" },
  { href: "/about", label: "About", key: "nav.about" },
  { href: "/services", label: "Services", key: "nav.services" },
  { href: "/treatments", label: "Treatments", key: "nav.treatments" },
  { href: "/achievements", label: "Achievements", key: "nav.achievements" },
  { href: "/booking", label: "Book now", key: "nav.booking" },
  { href: "/blog", label: "Journal", key: "nav.blog" },
  { href: "/contact", label: "Contact", key: "nav.contact" },
];

type ContentItem = { page: string; key: string; value: string };

export default function NavbarV2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
    fetch("/api/content?page=global", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { items: ContentItem[] }) => {
        setContent(Object.fromEntries(data.items.map((item) => [item.key, item.value])));
      })
      .catch(() => undefined);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logo = content["brand.logo"] || "/images/rudra-logo.svg";
  const shortName = content["brand.shortName"] || "Dr. Rudra";
  const tagline = content["brand.tagline"] || "Wellness Centre";
  const phone = content["contact.phone"] || "+1 (234) 567-890";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isScrolled
            ? "border-b border-pink-100/80 bg-white/88 shadow-[0_16px_50px_rgba(157,23,77,0.08)] backdrop-blur-2xl dark:border-pink-950 dark:bg-slate-950/88"
            : "bg-white/45 backdrop-blur-md dark:bg-slate-950/30",
        )}
        data-cms-page="global"
      >
        <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-3 lg:h-20">
            <Link href="/" className="group flex min-w-0 items-center gap-3">
              <motion.div whileHover={{ rotate: 6, scale: 1.06 }} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-pink-600 shadow-lg shadow-pink-500/20 lg:h-14 lg:w-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt="Dr. Rudra Wellness Centre logo"
                  className="h-full w-full object-contain"
                  data-cms-key="brand.logo"
                  data-cms-label="Website logo"
                  data-cms-page="global"
                />
              </motion.div>
              <div className="hidden min-w-0 sm:block">
                <p className="truncate text-[17px] font-black uppercase tracking-[-0.02em] text-slate-950 dark:text-white" data-cms-key="brand.shortName" data-cms-label="Short brand name">
                  {shortName}
                </p>
                <p className="-mt-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-pink-600" data-cms-key="brand.tagline" data-cms-label="Brand tagline">
                  {tagline}
                </p>
              </div>
            </Link>

            <div className="hidden items-center xl:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-pink-50 hover:text-pink-700 dark:text-slate-300 dark:hover:bg-pink-950/30 dark:hover:text-pink-300"
                >
                  <span data-cms-key={link.key} data-cms-label={`${link.label} navigation label`}>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="grid h-10 w-10 place-items-center rounded-full border border-pink-100 bg-white/80 text-slate-600 transition hover:border-pink-300 hover:text-pink-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  aria-label="Toggle theme"
                  data-no-cms
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              )}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 transition hover:-translate-y-0.5 lg:flex"
              >
                <Phone className="h-4 w-4" />
                <span data-cms-key="contact.phone" data-cms-label="Phone number" data-cms-page="global">{phone}</span>
              </a>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-xs font-bold text-pink-700 transition hover:border-pink-500 hover:bg-pink-50 dark:border-pink-900 dark:bg-slate-900 dark:text-pink-300 md:flex"
                data-no-cms
              >
                <LockKeyhole className="h-4 w-4" /> Admin
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="grid h-10 w-10 place-items-center rounded-full border border-pink-100 bg-white xl:hidden dark:border-slate-700 dark:bg-slate-900"
                aria-label="Open menu"
                data-no-cms
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="fixed inset-0 z-40 bg-white/97 px-6 pt-24 backdrop-blur-2xl dark:bg-slate-950/97 xl:hidden"
            data-cms-page="global"
          >
            <div className="mx-auto flex max-w-md flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045 }}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-2xl px-5 py-3.5 text-lg font-bold text-slate-800 transition hover:bg-pink-50 hover:text-pink-700 dark:text-slate-200 dark:hover:bg-pink-950/30"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/login" className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-pink-600 px-5 py-4 font-bold text-white" data-no-cms>
                <LockKeyhole className="h-5 w-5" /> Administrator login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
