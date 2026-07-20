"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Check,
  Eye,
  FileText,
  ImagePlus,
  KeyRound,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  MonitorSmartphone,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

type ContentItem = {
  id: number;
  page: string;
  key: string;
  label: string;
  value: string;
  valueType: "text" | "textarea" | "image" | "url";
  groupName: string;
  sortOrder: number;
};

type Achievement = {
  id: number;
  title: string;
  description: string;
  category: string;
  achievementDate: string;
  imageUrl: string | null;
  published: boolean;
  sortOrder: number;
};

type AchievementDraft = Omit<Achievement, "id"> & { id?: number };

const emptyAchievement: AchievementDraft = {
  title: "",
  description: "",
  category: "Recognition",
  achievementDate: new Date().toISOString().slice(0, 10),
  imageUrl: null,
  published: true,
  sortOrder: 0,
};

const categories = ["Award", "Recognition", "Certification", "Publication", "Research", "Speaking", "Community"];

export default function AdminStudioPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"overview" | "content" | "achievements" | "security">("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [achievementDraft, setAchievementDraft] = useState<AchievementDraft | null>(null);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [contentResponse, achievementsResponse] = await Promise.all([
        fetch("/api/admin/content", { cache: "no-store" }),
        fetch("/api/admin/achievements", { cache: "no-store" }),
      ]);
      if (contentResponse.status === 401 || achievementsResponse.status === 401) {
        router.replace("/login");
        return;
      }
      const contentData = await contentResponse.json();
      const achievementData = await achievementsResponse.json();
      setContent(contentData.items || []);
      setAchievements(achievementData.items || []);
    } catch {
      toast.error("Could not load Admin Studio");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const updateContent = (id: number, value: string) => {
    setContent((items) => items.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const upload = async (file?: File) => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Upload failed");
    return result.url as string;
  };

  const uploadContentImage = async (item: ContentItem, file?: File) => {
    if (!file) return;
    setSaving(true);
    try {
      const url = await upload(file);
      if (url) updateContent(item.id, url);
      toast.success("Image ready — click Publish all changes");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const saveAllContent = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: content.map(({ page, key, label, value, valueType, groupName, sortOrder }) => ({ page, key, label, value, valueType, groupName, sortOrder })),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Save failed");
      toast.success("All changes are live");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveAchievement = async () => {
    if (!achievementDraft?.title.trim() || !achievementDraft.description.trim()) {
      toast.error("Add a title and description");
      return;
    }
    setSaving(true);
    try {
      const isEditing = Boolean(achievementDraft.id);
      const response = await fetch(isEditing ? `/api/admin/achievements/${achievementDraft.id}` : "/api/admin/achievements", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievementDraft),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save achievement");
      toast.success(isEditing ? "Achievement updated" : "Achievement published");
      setAchievementDraft(null);
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save achievement");
    } finally {
      setSaving(false);
    }
  };

  const deleteAchievement = async (id: number) => {
    if (!window.confirm("Permanently delete this achievement?")) return;
    const response = await fetch(`/api/admin/achievements/${id}`, { method: "DELETE" });
    if (response.ok) {
      setAchievements((items) => items.filter((item) => item.id !== id));
      toast.success("Achievement deleted");
    } else toast.error("Could not delete achievement");
  };

  const uploadAchievementImage = async (file?: File) => {
    if (!file || !achievementDraft) return;
    setSaving(true);
    try {
      const url = await upload(file);
      setAchievementDraft((draft) => (draft ? { ...draft, imageUrl: url } : draft));
      toast.success("Photo uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update password");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password updated securely");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update password");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  const groups = useMemo(() => {
    const visible = content.filter((item) => `${item.label} ${item.key} ${item.groupName}`.toLowerCase().includes(search.toLowerCase()));
    return Object.entries(Object.groupBy(visible, (item) => item.groupName));
  }, [content, search]);

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "content" as const, label: "All text & images", icon: FileText },
    { id: "achievements" as const, label: "Achievements", icon: Award },
    { id: "security" as const, label: "Login & security", icon: KeyRound },
  ];

  return (
    <div className="min-h-screen bg-[#fff8fb] text-slate-950 dark:bg-slate-950 dark:text-white" data-no-cms>
      <aside className={`fixed inset-y-0 left-0 z-50 w-[285px] border-r border-pink-100 bg-white p-5 shadow-2xl transition-transform dark:border-pink-950 dark:bg-slate-900 lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/rudra-logo.svg" alt="Dr. Swathy Priya logo" className="h-12 w-12 rounded-full" />
            <div><p className="font-black">Admin Studio</p><p className="text-xs font-semibold text-pink-600">Dr. Swathy Priya Wellness</p></div>
          </div>
          <button onClick={() => setMenuOpen(false)} className="rounded-full bg-pink-50 p-2 lg:hidden"><X className="h-4 w-4" /></button>
        </div>

        <nav className="mt-9 space-y-2">
          {tabs.map((item) => (
            <button key={item.id} onClick={() => { setTab(item.id); setMenuOpen(false); }} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-bold transition ${tab === item.id ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-500/20" : "text-slate-600 hover:bg-pink-50 hover:text-pink-700 dark:text-slate-300 dark:hover:bg-pink-950/30"}`}>
              <item.icon className="h-5 w-5" />{item.label}
            </button>
          ))}
        </nav>

        <div className="absolute inset-x-5 bottom-5 space-y-2">
          <Link href="/?edit=1" target="_blank" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-pink-200 px-4 py-3 text-sm font-bold text-pink-700 transition hover:bg-pink-50 dark:border-pink-900 dark:text-pink-300">
            <Eye className="h-4 w-4" /> Visual page editor
          </Link>
          <button onClick={() => void logout()} className="flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-[285px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-pink-100 bg-white/90 px-4 backdrop-blur-xl dark:border-pink-950 dark:bg-slate-950/90 sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)} className="rounded-xl border border-pink-100 bg-white p-2.5 lg:hidden dark:border-slate-700 dark:bg-slate-900"><Menu className="h-5 w-5" /></button>
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">Content management</p><h1 className="text-lg font-black sm:text-xl">{tabs.find((item) => item.id === tab)?.label}</h1></div>
          </div>
          <Link href="/" target="_blank" className="flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-bold text-white dark:bg-white dark:text-slate-950">View website <ArrowUpRight className="h-4 w-4" /></Link>
        </header>

        <div className="mx-auto max-w-[1220px] p-4 sm:p-8 lg:p-10">
          {loading ? (
            <div className="grid min-h-[60vh] place-items-center"><LoaderCircle className="h-9 w-9 animate-spin text-pink-600" /></div>
          ) : (
            <AnimatePresence mode="wait">
              {tab === "overview" && (
                <motion.section key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-pink-700 via-pink-600 to-rose-500 p-7 text-white shadow-2xl shadow-pink-500/20 sm:p-10">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-100">Welcome, Dr. Swathy Priya</p>
                    <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">You are in complete control of your website.</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-pink-50 sm:text-base">Use the field editor for structured content or open Visual Page Editor to click any visible text or image and publish a change instantly.</p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <button onClick={() => setTab("content")} className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-pink-700"><Pencil className="h-4 w-4" /> Edit all text & images</button>
                      <Link href="/?edit=1" target="_blank" className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-lg"><MonitorSmartphone className="h-4 w-4" /> Click-to-edit website</Link>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Editable fields", value: content.length, icon: FileText },
                      { label: "Achievements", value: achievements.length, icon: Award },
                      { label: "Published posts", value: achievements.filter((item) => item.published).length, icon: Check },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm dark:border-pink-950 dark:bg-slate-900"><stat.icon className="h-6 w-6 text-pink-600" /><p className="mt-5 text-4xl font-black">{stat.value}</p><p className="mt-1 text-sm font-semibold text-slate-500">{stat.label}</p></div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-3xl border border-pink-100 bg-white p-6 dark:border-pink-950 dark:bg-slate-900 sm:p-8">
                    <h3 className="text-xl font-black">Quick start</h3>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      {[
                        ["1", "Upload your logo", "All text & images → Brand → Website logo"],
                        ["2", "Upload doctor photo", "All text & images → Opening media → Main doctor photo"],
                        ["3", "Edit anything visually", "Open Visual Page Editor and click an outlined item"],
                      ].map(([number, title, body]) => <div key={number} className="rounded-2xl bg-pink-50 p-5 dark:bg-pink-950/20"><span className="grid h-8 w-8 place-items-center rounded-full bg-pink-600 text-sm font-black text-white">{number}</span><p className="mt-4 font-black">{title}</p><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p></div>)}
                    </div>
                  </div>
                </motion.section>
              )}

              {tab === "content" && (
                <motion.section key="content" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div><p className="text-sm font-bold text-pink-600">Complete website control</p><h2 className="mt-1 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Every saved text & image</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Upload the real doctor photograph, replace the logo or mascot, and update every structured or visually-edited field.</p></div>
                    <button onClick={() => void saveAllContent()} disabled={saving} className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 disabled:opacity-50"><Save className="h-4 w-4" />{saving ? "Publishing…" : "Publish all changes"}</button>
                  </div>

                  <div className="relative mb-6"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search all fields…" className="w-full rounded-2xl border border-pink-100 bg-white py-3.5 pl-11 pr-4 outline-none focus:border-pink-400 dark:border-pink-950 dark:bg-slate-900" /></div>

                  <div className="space-y-6">
                    {groups.map(([group, items]) => (
                      <div key={group} className="rounded-[2rem] border border-pink-100 bg-white p-5 shadow-sm dark:border-pink-950 dark:bg-slate-900 sm:p-7">
                        <div className="mb-5 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-pink-50 text-pink-600 dark:bg-pink-950/30"><Sparkles className="h-4 w-4" /></span><div><h3 className="font-black">{group}</h3><p className="text-xs text-slate-400">{items?.length || 0} editable fields</p></div></div>
                        <div className="grid gap-5 md:grid-cols-2">
                          {(items || []).map((item) => (
                            <div key={item.id} className={item.valueType === "image" ? "md:col-span-1" : ""}>
                              <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">{item.label}</label>
                              {item.valueType === "image" ? (
                                <div className="overflow-hidden rounded-2xl border border-pink-100 bg-pink-50/50 p-3 dark:border-pink-950 dark:bg-slate-800">
                                  <div className="grid h-48 place-items-center overflow-hidden rounded-xl bg-white dark:bg-slate-950">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.value} alt={item.label} className="h-full w-full object-contain" />
                                  </div>
                                  <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-pink-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-pink-700"><Upload className="h-4 w-4" /> Replace image<input type="file" accept="image/*" className="hidden" onChange={(event) => void uploadContentImage(item, event.target.files?.[0])} /></label>
                                </div>
                              ) : item.valueType === "textarea" || item.value.length > 120 ? (
                                <textarea value={item.value} onChange={(event) => updateContent(item.id, event.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-pink-950/30" />
                              ) : (
                                <input value={item.value} onChange={(event) => updateContent(item.id, event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-pink-950/30" />
                              )}
                              <p className="mt-1.5 truncate text-[10px] text-slate-400">{item.page} · {item.key}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {tab === "achievements" && (
                <motion.section key="achievements" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-bold text-pink-600">News & milestones</p><h2 className="mt-1 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Achievements</h2><p className="mt-2 text-sm text-slate-500">Post awards, qualifications, publications and photos.</p></div><button onClick={() => setAchievementDraft({ ...emptyAchievement })} className="flex items-center gap-2 rounded-full bg-pink-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-500/20"><Plus className="h-4 w-4" /> New post</button></div>
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {achievements.map((item) => (
                      <article key={item.id} className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white dark:border-pink-950 dark:bg-slate-900">
                        <div className="aspect-[16/10] bg-pink-50 dark:bg-pink-950/20">{item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center"><Award className="h-12 w-12 text-pink-300" /></div>}</div>
                        <div className="p-5"><div className="flex items-center justify-between"><span className="rounded-full bg-pink-50 px-3 py-1 text-[10px] font-black uppercase text-pink-700 dark:bg-pink-950/30 dark:text-pink-300">{item.category}</span><span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${item.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{item.published ? "Live" : "Draft"}</span></div><h3 className="mt-4 text-lg font-black">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{item.description}</p><div className="mt-5 flex gap-2"><button onClick={() => setAchievementDraft({ ...item })} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-pink-50 py-2.5 text-sm font-bold text-pink-700 dark:bg-pink-950/30 dark:text-pink-300"><Pencil className="h-4 w-4" /> Edit</button><button onClick={() => void deleteAchievement(item.id)} className="grid w-11 place-items-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/30"><Trash2 className="h-4 w-4" /></button></div></div>
                      </article>
                    ))}
                  </div>
                </motion.section>
              )}

              {tab === "security" && (
                <motion.section key="security" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl">
                  <p className="text-sm font-bold text-pink-600">Account protection</p><h2 className="mt-1 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Login & security</h2>
                  <div className="mt-7 rounded-[2rem] border border-pink-100 bg-white p-6 dark:border-pink-950 dark:bg-slate-900 sm:p-8"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-pink-50 text-pink-600 dark:bg-pink-950/30"><KeyRound className="h-5 w-5" /></span><div><h3 className="font-black">Change admin password</h3><p className="text-xs text-slate-400">Use at least 12 characters.</p></div></div><div className="mt-6 space-y-4">{[["Current password", "currentPassword"], ["New password", "newPassword"], ["Confirm new password", "confirmPassword"]].map(([label, key]) => <label key={key} className="block"><span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">{label}</span><input type="password" value={passwords[key as keyof typeof passwords]} onChange={(event) => setPasswords((values) => ({ ...values, [key]: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-800" /></label>)}<button onClick={() => void changePassword()} disabled={saving} className="flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" /> Update password</button></div></div>
                </motion.section>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>

      <AnimatePresence>
        {achievementDraft && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm" onClick={() => setAchievementDraft(null)}>
            <motion.div initial={{ opacity: 0, y: 25, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 25, scale: 0.98 }} onClick={(event) => event.stopPropagation()} className="mx-auto my-8 w-full max-w-3xl rounded-[2rem] bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8">
              <div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-pink-600">Achievement post</p><h2 className="mt-1 text-2xl font-black">{achievementDraft.id ? "Edit achievement" : "New achievement"}</h2></div><button onClick={() => setAchievementDraft(null)} className="rounded-full bg-slate-100 p-2 dark:bg-slate-800"><X className="h-4 w-4" /></button></div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-4"><label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Title</span><input value={achievementDraft.title} onChange={(event) => setAchievementDraft({ ...achievementDraft, title: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-800" /></label><label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Description</span><textarea rows={5} value={achievementDraft.description} onChange={(event) => setAchievementDraft({ ...achievementDraft, description: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-800" /></label><div className="grid grid-cols-2 gap-3"><label><span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Category</span><select value={achievementDraft.category} onChange={(event) => setAchievementDraft({ ...achievementDraft, category: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-800">{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label><span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Date</span><input type="date" value={achievementDraft.achievementDate} onChange={(event) => setAchievementDraft({ ...achievementDraft, achievementDate: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-800" /></label></div><label className="flex items-center gap-3 rounded-xl bg-pink-50 p-4 font-bold text-pink-800 dark:bg-pink-950/20 dark:text-pink-300"><input type="checkbox" checked={achievementDraft.published} onChange={(event) => setAchievementDraft({ ...achievementDraft, published: event.target.checked })} className="h-4 w-4 accent-pink-600" /> Publish immediately</label></div>
                <div><span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Achievement photo</span><div className="grid aspect-square place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50 dark:border-pink-900 dark:bg-pink-950/10">{achievementDraft.imageUrl ? <img src={achievementDraft.imageUrl} alt="Achievement preview" className="h-full w-full object-contain" /> : <div className="text-center"><ImagePlus className="mx-auto h-12 w-12 text-pink-300" /><p className="mt-3 text-sm font-bold text-slate-500">Add a certificate or event photo</p></div>}</div><label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950"><Upload className="h-4 w-4" /> Choose photo<input type="file" accept="image/*" className="hidden" onChange={(event) => void uploadAchievementImage(event.target.files?.[0])} /></label></div>
              </div>
              <button onClick={() => void saveAchievement()} disabled={saving} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-4 font-bold text-white shadow-lg shadow-pink-500/20 disabled:opacity-50"><Save className="h-5 w-5" />{saving ? "Saving…" : achievementDraft.id ? "Save achievement changes" : "Publish achievement"}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
