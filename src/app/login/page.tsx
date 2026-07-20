"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, KeyRound, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import toast from "react-hot-toast";

const dots = [[8, 16], [17, 78], [31, 29], [46, 83], [58, 19], [71, 67], [84, 27], [93, 74]];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" }).then((response) => {
      if (response.ok) router.replace("/admin");
    }).catch(() => undefined);
  }, [router]);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Sign in failed");
      toast.success("Welcome to Admin Studio");
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#fff8fb] px-4 py-10 dark:bg-slate-950" data-no-cms>
      <motion.div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-pink-200/50 blur-[110px] dark:bg-pink-900/15" animate={{ scale: [1, 1.18, 1], x: [0, 35, 0] }} transition={{ duration: 11, repeat: Infinity }} />
      <motion.div className="absolute -right-32 bottom-0 h-[560px] w-[560px] rounded-full bg-rose-200/45 blur-[120px] dark:bg-rose-900/15" animate={{ scale: [1.12, 0.96, 1.12], y: [0, -35, 0] }} transition={{ duration: 13, repeat: Infinity }} />
      {dots.map(([left, top], index) => <motion.span key={index} className="absolute h-2 w-2 rounded-full bg-pink-400/35" style={{ left: `${left}%`, top: `${top}%` }} animate={{ y: [0, -22, 0], opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3.4 + index * 0.2, repeat: Infinity }} />)}

      <Link href="/" className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-pink-100 bg-white/80 px-4 py-2.5 text-xs font-bold text-slate-600 backdrop-blur-lg transition hover:text-pink-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"><ArrowLeft className="h-4 w-4" /> Back to website</Link>

      <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 w-full max-w-md overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white/90 p-7 shadow-[0_35px_100px_rgba(157,23,77,0.15)] backdrop-blur-2xl dark:border-pink-950 dark:bg-slate-900/90 sm:p-9">
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img src="/images/rudra-logo.svg" alt="Dr. Swathy Priya Wellness Centre" className="mx-auto h-24 w-24 rounded-full shadow-xl shadow-pink-500/20" whileHover={{ rotate: 5, scale: 1.04 }} />
          <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-pink-600">Secure administration</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">Admin Studio</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Sign in to change every text, image, logo, doctor photo and achievement.</p>
        </div>

        <form onSubmit={login} className="mt-8 space-y-4">
          <label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Username</span><div className="relative"><UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400" /><input value={username} onChange={(event) => setUsername(event.target.value)} required autoComplete="username" placeholder="Administrator username" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-950 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-pink-950" /></div></label>
          <label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Password</span><div className="relative"><LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400" /><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete="current-password" placeholder="Your secure password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-slate-950 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-pink-950" /><button type="button" onClick={() => setShowPassword((shown) => !shown)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-slate-700" aria-label="Show password">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-700 to-rose-500 px-6 py-4 font-black text-white shadow-xl shadow-pink-500/20 transition hover:-translate-y-0.5 disabled:opacity-60">{loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <KeyRound className="h-5 w-5" />}{loading ? "Signing in…" : "Enter Admin Studio"}</button>
        </form>

        <div className="mt-6 rounded-2xl bg-pink-50 p-4 text-center dark:bg-pink-950/20"><p className="text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">This area is protected by a hashed password and an HTTP-only server session.</p></div>
      </motion.div>
    </div>
  );
}
