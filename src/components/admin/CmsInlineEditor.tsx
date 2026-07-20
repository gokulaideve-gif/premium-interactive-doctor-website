"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Edit3, ExternalLink, ImagePlus, LockKeyhole, Save, X } from "lucide-react";
import toast from "react-hot-toast";

type ContentItem = {
  page: string;
  key: string;
  label: string;
  value: string;
  valueType: "text" | "textarea" | "image" | "url";
  groupName: string;
  sortOrder: number;
};

type Selection = ContentItem & { element: HTMLElement };

const textSelector = "h1,h2,h3,h4,h5,h6,p,span,small,label,li,button,a";

function routePage(pathname: string) {
  if (pathname === "/") return "home";
  return pathname.replace(/^\//, "").split("/")[0] || "home";
}

function closestPage(element: HTMLElement, fallback: string) {
  return element.closest<HTMLElement>("[data-cms-page]")?.dataset.cmsPage || fallback;
}

export default function CmsInlineEditor() {
  const pathname = usePathname();
  const page = routePage(pathname);
  const [authenticated, setAuthenticated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => {
        setAuthenticated(response.ok);
        if (response.ok && new URLSearchParams(window.location.search).get("edit") === "1") setEditMode(true);
      })
      .catch(() => setAuthenticated(false));
  }, [pathname]);

  const loadContent = useCallback(async () => {
    const response = await fetch(`/api/content?page=${encodeURIComponent(page)}`, { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { items: ContentItem[] };
    setItems(data.items);
  }, [page]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const contentMap = useMemo(
    () => new Map(items.map((item) => [`${item.page}:${item.key}`, item])),
    [items],
  );

  const prepareElements = useCallback(() => {
    const roots = Array.from(document.querySelectorAll<HTMLElement>("header,main,footer"));
    let autoIndex = 0;

    for (const root of roots) {
      const elements = Array.from(root.querySelectorAll<HTMLElement>(`${textSelector},img`));
      for (const element of elements) {
        if (element.closest("[data-no-cms]")) continue;
        const isImage = element instanceof HTMLImageElement;
        const isLeafText = !isImage && element.children.length === 0 && Boolean(element.textContent?.trim());
        if (!isImage && !isLeafText) continue;

        const elementPage = element.dataset.cmsPage || closestPage(element, page);
        const explicitKey = element.dataset.cmsKey;
        const key = explicitKey || `auto.${element.tagName.toLowerCase()}.${autoIndex++}`;
        element.dataset.cmsResolvedKey = key;
        element.dataset.cmsResolvedPage = elementPage;
        element.dataset.cmsResolvedType = isImage ? "image" : "text";

        const stored = contentMap.get(`${elementPage}:${key}`);
        if (stored) {
          if (isImage) {
            (element as HTMLImageElement).src = stored.value;
          } else if (element.textContent !== stored.value) {
            element.textContent = stored.value;
          }
        }

        if (editMode && authenticated) element.dataset.cmsEditable = "true";
        else delete element.dataset.cmsEditable;
      }
    }
  }, [authenticated, contentMap, editMode, page]);

  useEffect(() => {
    const timer = window.setTimeout(prepareElements, 80);
    return () => window.clearTimeout(timer);
  }, [prepareElements, pathname]);

  useEffect(() => {
    if (!editMode || !authenticated) return;

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cms-editable='true']");
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();

      const key = target.dataset.cmsResolvedKey!;
      const selectedPage = target.dataset.cmsResolvedPage || page;
      const valueType = (target.dataset.cmsResolvedType || "text") as ContentItem["valueType"];
      const existing = contentMap.get(`${selectedPage}:${key}`);
      const value = existing?.value || (target instanceof HTMLImageElement ? target.src : target.textContent?.trim() || "");
      const label = target.dataset.cmsLabel || existing?.label || (valueType === "image" ? "Website image" : value.slice(0, 80));

      setSelection({
        element: target,
        page: selectedPage,
        key,
        label,
        value,
        valueType,
        groupName: existing?.groupName || "Inline page edits",
        sortOrder: existing?.sortOrder || 9000,
      });
      setDraft(value);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [authenticated, contentMap, editMode, page]);

  const uploadImage = async (file?: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setSaving(true);
    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      setDraft(data.url);
      toast.success("Image ready. Click Save change.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const saveSelection = async () => {
    if (!selection) return;
    setSaving(true);
    try {
      const payload = { ...selection, element: undefined, value: draft };
      const response = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save change");

      if (selection.element instanceof HTMLImageElement) selection.element.src = draft;
      else selection.element.textContent = draft;
      setSelection(null);
      await loadContent();
      toast.success("Published to the website");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save change");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-no-cms>
      {authenticated ? (
        <div className="fixed bottom-5 left-5 z-[900] flex flex-col items-start gap-2">
          <AnimatePresence>
            {editMode && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="rounded-2xl border border-pink-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-pink-900 dark:bg-slate-900/95"
              >
                <p className="flex items-center gap-2 text-xs font-semibold text-pink-700 dark:text-pink-300">
                  <Check className="h-4 w-4" /> Click outlined text or images
                </p>
                <Link href="/admin" className="mt-2 flex items-center gap-2 text-xs text-slate-600 hover:text-pink-600 dark:text-slate-300">
                  <ExternalLink className="h-3.5 w-3.5" /> Open full Admin Studio
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setEditMode((value) => !value)}
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-xl transition ${editMode ? "bg-slate-900 dark:bg-white dark:text-slate-900" : "bg-gradient-to-r from-pink-600 to-rose-500 shadow-pink-500/25"}`}
          >
            {editMode ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            {editMode ? "Exit editing" : "Edit this page"}
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="fixed bottom-5 left-5 z-[900] flex items-center gap-2 rounded-full border border-pink-200 bg-white/90 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur-xl transition hover:border-pink-400 hover:text-pink-600 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200"
          aria-label="Administrator login"
        >
          <LockKeyhole className="h-4 w-4 text-pink-500" /> Admin Login
        </Link>
      )}

      <AnimatePresence>
        {selection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm"
            onClick={() => setSelection(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl dark:border-pink-900 dark:bg-slate-900"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-500">Quick edit</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">{selection.label}</h2>
                </div>
                <button onClick={() => setSelection(null)} className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {selection.valueType === "image" ? (
                <div>
                  <div className="mb-4 grid h-56 place-items-center overflow-hidden rounded-2xl bg-pink-50 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={draft} alt="Selected preview" className="h-full w-full object-contain" />
                  </div>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-pink-200 px-4 py-4 text-sm font-semibold text-pink-600 transition hover:border-pink-500 hover:bg-pink-50 dark:border-pink-900 dark:hover:bg-pink-950/20">
                    <ImagePlus className="h-5 w-5" /> Choose replacement image
                    <input type="file" accept="image/*" className="hidden" onChange={(event) => void uploadImage(event.target.files?.[0])} />
                  </label>
                </div>
              ) : (
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={5}
                  autoFocus
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-pink-950"
                />
              )}

              <button
                onClick={() => void saveSelection()}
                disabled={saving || !draft}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-pink-500/20 disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save & publish change"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
