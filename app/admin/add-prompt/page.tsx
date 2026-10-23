"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Plus, Search, Edit2, Trash2, X, Save, AlertCircle,
  CheckCircle, Loader2, Sparkles, Clock, Tag, Eye,
  ChevronLeft, ChevronRight, Filter, ToggleLeft, ToggleRight,
  Lightbulb, BookOpen, ChevronDown, ChevronUp, Wand2, Crown, DollarSign
} from "lucide-react";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";

// ── Constants ─────────────────────────────────────────────────────────────────
const CATEGORIES = ["Design", "Business", "Marketing", "Writing", "Coding", "Education", "Health", "Finance"];
const AI_MODELS  = ["ChatGPT", "Claude", "Gemini", "Grok", "DeepSeek", "Midjourney", "Runway", "Nano Banana", "Other"];
const API        = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// ── Types ─────────────────────────────────────────────────────────────────────
interface PromptRow {
  _id: string;
  slug?: string;
  page_name?: string;
  title?: string;
  category?: { name: string; slug: string } | string;
  status?: string;
  isLatest?: boolean;
  publishedAt?: string;
  latestExpiresInDays?: number | null;
  description?: string;
  prompt_body?: string;
  promptText?: string;
  imageUrl?: string;
  example_output_image_url?: string;
  aiModel?: string;
  exampleOutput?: string;
  tags?: string[];
  is_premium?: boolean;
  price?: string;
  pricingType?: "free" | "paid";
  what_this_prompt_does?: string;
  tips?: string;
  how_to_use_the_prompt?: string;
}

interface FormState {
  page_name: string;
  prompt_body: string;
  description: string;
  category: string;
  tags: string;
  imageUrl: string;
  aiModel: string;
  exampleOutput: string;
  status: "draft" | "published";
  isLatest: boolean;
  publishedAt: string;
  is_premium: boolean;
  pricingType: "free" | "paid";
  price: string;
  what_this_prompt_does: string;
  tips: string;
  how_to_use_the_prompt: string;
}

const EMPTY_FORM: FormState = {
  page_name: "",
  prompt_body: "",
  description: "",
  category: "Design",
  tags: "",
  imageUrl: "",
  aiModel: "",
  exampleOutput: "",
  status: "published",
  isLatest: true,
  publishedAt: new Date().toISOString().slice(0, 16),
  is_premium: false,
  pricingType: "free",
  price: "Free",
  what_this_prompt_does: "",
  tips: "",
  how_to_use_the_prompt: "",
};

// ── Helper ────────────────────────────────────────────────────────────────────
function getCategoryName(cat: PromptRow["category"]): string {
  if (!cat) return "—";
  if (typeof cat === "string") return cat;
  return cat.name || "—";
}

function getTitle(p: PromptRow): string {
  return p.page_name || p.title || "(Untitled)";
}

// ── Toast ─────────────────────────────────────────────────────────────────────
interface Toast { id: number; type: "success" | "error"; message: string }

function ToastStack({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border pointer-events-auto text-sm font-medium animate-in slide-in-from-bottom-4 duration-300 ${
            t.type === "success"
              ? "bg-green-900/90 border-green-500/40 text-green-300"
              : "bg-red-900/90 border-red-500/40 text-red-300"
          }`}
        >
          {t.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {t.message}
          <button onClick={() => onRemove(t.id)} className="ml-2 opacity-70 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Confirm Modal ─────────────────────────────────────────────────────────────
function ConfirmModal({ title, message, onConfirm, onCancel }: {
  title: string; message: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border p-6 space-y-4 shadow-2xl" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-primary">{title}</h3>
            <p className="text-muted text-sm mt-0.5">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ borderColor: "var(--border)" }}>
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Prompt Form Modal ─────────────────────────────────────────────────────────
function PromptFormModal({
  editingPrompt, onClose, onSaved, showToast
}: {
  editingPrompt: PromptRow | null;
  onClose: () => void;
  onSaved: () => void;
  showToast: (type: "success" | "error", msg: string) => void;
}) {
  const isEdit = !!editingPrompt;

  const toForm = (p: PromptRow | null): FormState => {
    if (!p) return { ...EMPTY_FORM, publishedAt: new Date().toISOString().slice(0, 16) };
    return {
      page_name:    p.page_name || p.title || "",
      prompt_body:  p.prompt_body || p.promptText || "",
      description:  p.description || "",
      category:     getCategoryName(p.category),
      tags:         (p.tags || []).join(", "),
      imageUrl:     p.imageUrl || p.example_output_image_url || "",
      aiModel:      p.aiModel || "",
      exampleOutput: p.exampleOutput || "",
      status:       (p.status === "draft" ? "draft" : "published") as "draft" | "published",
      isLatest:     p.isLatest ?? false,
      publishedAt:  p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
      is_premium:   p.is_premium ?? false,
      pricingType:  (p.is_premium ? "paid" : "free") as "free" | "paid",
      price:        p.price || (p.is_premium ? "Paid" : "Free"),
      what_this_prompt_does: p.what_this_prompt_does || "",
      tips:         p.tips || "",
      how_to_use_the_prompt: p.how_to_use_the_prompt || "",
    };
  };

  const [form, setForm] = useState<FormState>(toForm(editingPrompt));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [saving, setSaving] = useState(false);
  const [generatingDetails, setGeneratingDetails] = useState(false);
  const [showDetailsSection, setShowDetailsSection] = useState(
    !!(editingPrompt?.what_this_prompt_does || editingPrompt?.tips || editingPrompt?.how_to_use_the_prompt)
  );

  const set = (key: keyof FormState, val: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const handleGenerateDetails = async () => {
    if (!form.page_name.trim() && !form.prompt_body.trim()) {
      showToast("error", "Please provide a Title or Prompt Text first.");
      return;
    }
    setGeneratingDetails(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API}/api/admin/prompts/generate-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: form.page_name.trim(),
          prompt_body: form.prompt_body.trim(),
          category: form.category,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setForm(prev => ({
          ...prev,
          what_this_prompt_does: data.data.what_this_prompt_does || prev.what_this_prompt_does,
          tips: data.data.tips || prev.tips,
          how_to_use_the_prompt: data.data.how_to_use_the_prompt || prev.how_to_use_the_prompt,
        }));
        setShowDetailsSection(true);
        showToast("success", "AI generated prompt details successfully!");
      } else {
        showToast("error", data.error || "Failed to generate details.");
      }
    } catch {
      showToast("error", "Network error while generating details.");
    } finally {
      setGeneratingDetails(false);
    }
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.page_name.trim()) e.page_name = "Title is required.";
    else if (form.page_name.length > 200) e.page_name = "Max 200 characters.";
    if (!form.prompt_body.trim()) e.prompt_body = "Prompt text is required.";
    if (!form.category) e.category = "Category is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const token = sessionStorage.getItem("admin_token");
    const tagsArr = form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [];

    const body = {
      page_name:    form.page_name.trim(),
      prompt_body:  form.prompt_body.trim(),
      description:  form.description.trim(),
      category:     form.category,
      tags:         tagsArr,
      imageUrl:     form.imageUrl.trim() || null,
      aiModel:      form.aiModel.trim() || null,
      exampleOutput: form.exampleOutput.trim() || null,
      status:       form.status,
      isLatest:     form.status === "draft" ? false : form.isLatest,
      publishedAt:  form.publishedAt || new Date().toISOString(),
      is_premium:   form.pricingType === "paid",
      price:        form.pricingType === "paid" ? (form.price || "Paid") : "Free",
      what_this_prompt_does: form.what_this_prompt_does.trim() || undefined,
      tips:         form.tips.trim() || undefined,
      how_to_use_the_prompt: form.how_to_use_the_prompt.trim() || undefined,
    };

    try {
      const url = isEdit
        ? `${API}/api/admin/prompts/${editingPrompt!._id}`
        : `${API}/api/admin/prompts`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.success) {
        showToast("success", isEdit ? "Prompt updated!" : "Prompt created!");
        onSaved();
        onClose();
      } else {
        showToast("error", data.error || "Failed to save prompt.");
      }
    } catch {
      showToast("error", "Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl border shadow-2xl my-8" style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div>
            <h2 className="text-xl font-bold font-bricolage text-primary">
              {isEdit ? "Edit Prompt" : "Add New Prompt"}
            </h2>
            <p className="text-muted text-sm mt-0.5">
              {isEdit ? "Update the prompt details below." : "Fill in the details to create a new prompt."}
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Row: Title + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary">Title *</label>
              <input
                type="text"
                value={form.page_name}
                onChange={e => set("page_name", e.target.value)}
                maxLength={200}
                placeholder="e.g. Product promotional image"
                className={`w-full bg-black/5 dark:bg-white/5 border rounded-lg px-4 py-2.5 text-primary text-sm focus:border-accent outline-none transition-colors ${errors.page_name ? "border-red-500" : "border-border"}`}
              />
              {errors.page_name && <p className="text-xs text-red-500">{errors.page_name}</p>}
              <p className="text-xs text-muted">{form.page_name.length}/200</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary">Category *</label>
              <select
                value={form.category}
                onChange={e => set("category", e.target.value)}
                className={`w-full bg-black/5 dark:bg-white/5 border rounded-lg px-4 py-2.5 text-primary text-sm focus:border-accent outline-none transition-colors ${errors.category ? "border-red-500" : "border-border"}`}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
          </div>

          {/* Short description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-primary">Short Description</label>
            <textarea
              value={form.description}
              onChange={e => set("description", e.target.value)}
              rows={2}
              placeholder="A brief description shown on the card…"
              className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-4 py-2.5 text-primary text-sm focus:border-accent outline-none transition-colors resize-none"
            />
          </div>

          {/* Prompt body */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-primary">Prompt Text *</label>
            <textarea
              value={form.prompt_body}
              onChange={e => set("prompt_body", e.target.value)}
              rows={5}
              placeholder="The full prompt content with [Placeholders]…"
              className={`w-full bg-black/5 dark:bg-white/5 border rounded-lg px-4 py-2.5 text-primary text-sm font-mono focus:border-accent outline-none transition-colors resize-none ${errors.prompt_body ? "border-red-500" : "border-border"}`}
            />
            {errors.prompt_body && <p className="text-xs text-red-500">{errors.prompt_body}</p>}
          </div>

          {/* Row: Tags + AI Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                <Tag size={13} /> Tags
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={e => set("tags", e.target.value)}
                placeholder="logo, design, branding (comma-separated)"
                className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-4 py-2.5 text-primary text-sm focus:border-accent outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary">AI Model / Tool</label>
              <select
                value={form.aiModel}
                onChange={e => set("aiModel", e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-4 py-2.5 text-primary text-sm focus:border-accent outline-none transition-colors"
              >
                <option value="">Select AI tool…</option>
                {AI_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Preview image URL with ImgBB upload */}
          <ImageUploadInput
            label="Cover / Preview Image"
            value={form.imageUrl}
            onChange={url => set("imageUrl", url)}
            placeholder="https://example.com/image.jpg"
            helperText="Upload image directly to ImgBB or enter an image URL."
          />

          {/* Example output */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-primary">Example Output / Result</label>
            <textarea
              value={form.exampleOutput}
              onChange={e => set("exampleOutput", e.target.value)}
              rows={2}
              placeholder="A sample output or result the prompt produces…"
              className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-4 py-2.5 text-primary text-sm focus:border-accent outline-none transition-colors resize-none"
            />
          </div>

          {/* ── Auto-Generated Prompt Details (What it does, Tips, How to use) ── */}
          <div className="rounded-xl border border-border bg-black/5 dark:bg-white/5 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-primary flex items-center gap-1.5">
                  <Sparkles size={15} className="text-accent" />
                  Prompt Details
                  <span className="text-[10px] bg-accent/15 text-accent font-medium px-2 py-0.5 rounded-full border border-accent/20">
                    AI Auto-Generated
                  </span>
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Generates &quot;What This Prompt Does&quot;, &quot;Tips&quot;, and &quot;How to Use&quot;. Auto-generates on submit if left blank.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleGenerateDetails}
                  disabled={generatingDetails}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 shadow-sm"
                >
                  {generatingDetails ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 size={13} />
                      Generate with AI
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetailsSection(!showDetailsSection)}
                  className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 text-xs transition-colors"
                  title={showDetailsSection ? "Collapse" : "Expand"}
                >
                  {showDetailsSection ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>

            {showDetailsSection && (
              <div className="space-y-4 pt-3 border-t border-border">
                {/* What This Prompt Does */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                    <Sparkles size={13} className="text-accent" /> What This Prompt Does
                  </label>
                  <textarea
                    value={form.what_this_prompt_does}
                    onChange={e => set("what_this_prompt_does", e.target.value)}
                    rows={3}
                    placeholder="● Generates a unique NFT character featuring a cyberpunk fox...&#10;● Incorporates glowing tattoos...&#10;● Produces a crisp vector-style art..."
                    className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-3 py-2 text-primary text-xs focus:border-accent outline-none transition-colors font-mono leading-relaxed"
                  />
                </div>

                {/* Tips for This Prompt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                    <Lightbulb size={13} className="text-amber-400" /> Tips for This Prompt
                  </label>
                  <textarea
                    value={form.tips}
                    onChange={e => set("tips", e.target.value)}
                    rows={3}
                    placeholder="● Choose unique features for your character...&#10;● Consider the NFT market trends...&#10;● Use the AI image prompt to create..."
                    className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-3 py-2 text-primary text-xs focus:border-accent outline-none transition-colors font-mono leading-relaxed"
                  />
                </div>

                {/* How to Use the Prompt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                    <BookOpen size={13} className="text-blue-400" /> How to Use the Prompt
                  </label>
                  <textarea
                    value={form.how_to_use_the_prompt}
                    onChange={e => set("how_to_use_the_prompt", e.target.value)}
                    rows={3}
                    placeholder="● Fill in the [character features] with specific elements...&#10;● Example: Create NFT Collection Character cyberpunk fox wearing..."
                    className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-3 py-2 text-primary text-xs focus:border-accent outline-none transition-colors font-mono leading-relaxed"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Pricing Model: Free vs Paid PRO ── */}
          <div className="space-y-3 p-4 rounded-xl border border-border bg-black/5 dark:bg-white/5">
            <div>
              <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                <DollarSign size={15} className="text-accent" />
                Pricing Model *
              </label>
              <p className="text-xs text-muted mt-0.5">
                Choose whether this prompt is free for everyone or requires PRO / payment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  set("pricingType", "free");
                  set("is_premium", false);
                  set("price", "Free");
                }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                  form.pricingType === "free"
                    ? "bg-accent/15 border-accent/40 text-accent shadow-sm"
                    : "bg-black/5 dark:bg-white/5 border-border text-muted hover:border-border/80"
                }`}
              >
                <Sparkles size={16} />
                <span>Free Prompt</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  set("pricingType", "paid");
                  set("is_premium", true);
                  if (!form.price || form.price === "Free") set("price", "Paid");
                }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                  form.pricingType === "paid"
                    ? "bg-accent/15 border-accent/40 text-accent shadow-sm"
                    : "bg-black/5 dark:bg-white/5 border-border text-muted hover:border-border/80"
                }`}
              >
                <Crown size={16} />
                <span>Paid (PRO)</span>
              </button>
            </div>

            {form.pricingType === "paid" && (
              <div className="pt-2 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-muted mb-1 block">Custom Price / Tag (optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <DollarSign size={14} />
                  </div>
                  <input
                    type="text"
                    value={form.price}
                    onChange={e => set("price", e.target.value)}
                    placeholder="e.g. $4.99 or Paid / PRO"
                    className="w-full bg-black/5 dark:bg-white/5 border border-accent/40 rounded-lg pl-9 pr-4 py-2 text-primary text-xs focus:border-accent outline-none transition-colors"
                  />
                </div>
                <p className="text-[11px] text-muted mt-1">
                  Card will display the PRO Crown badge in the prompt library.
                </p>
              </div>
            )}
          </div>

          {/* Row: Status + Publish Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary">Status</label>
              <div className="flex gap-3">
                {(["published", "draft"] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("status", s)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                      form.status === s
                        ? s === "published"
                          ? "bg-green-500/20 border-green-500/50 text-green-400"
                          : "bg-amber-500/20 border-amber-500/50 text-amber-400"
                        : "bg-black/5 dark:bg-white/5 border-border text-muted hover:border-border/80"
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                <Clock size={13} /> Publish Date
              </label>
              <input
                type="datetime-local"
                value={form.publishedAt}
                onChange={e => set("publishedAt", e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-4 py-2.5 text-primary text-sm focus:border-accent outline-none transition-colors"
              />
            </div>
          </div>

          {/* Mark as Latest toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
            <div>
              <p className="text-sm font-semibold text-primary flex items-center gap-2">
                <Sparkles size={14} className="text-violet-500" />
                Mark as Latest
              </p>
              <p className="text-xs text-muted mt-0.5">
                Show in the "Latest Prompts" section with a NEW badge. Auto-expires after 180 days. Drafts are never shown as Latest.
              </p>
            </div>
            <button
              type="button"
              onClick={() => set("isLatest", !form.isLatest)}
              disabled={form.status === "draft"}
              className={`ml-4 shrink-0 transition-colors ${form.status === "draft" ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              {form.isLatest && form.status !== "draft" ? (
                <ToggleRight size={36} className="text-violet-500" />
              ) : (
                <ToggleLeft size={36} className="text-muted" />
              )}
            </button>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ borderColor: "var(--border)" }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent/90 text-white text-sm font-semibold transition-colors shadow-lg hover:shadow-accent/20 disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving…" : isEdit ? "Update Prompt" : "Create Prompt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminPromptsPage() {
  const [prompts, setPrompts]       = useState<PromptRow[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]               = useState("");
  const [filterStatus, setFilter]         = useState("");
  const [filterPricing, setFilterPricing] = useState("");
  const [page, setPage]                   = useState(1);
  const [totalPages, setTotalPages]       = useState(1);
  const LIMIT = 15;

  const [showForm, setShowForm]           = useState(false);
  const [editingPrompt, setEditing]       = useState<PromptRow | null>(null);
  const [deleteTarget, setDeleteTarget]   = useState<PromptRow | null>(null);
  const [toasts, setToasts]              = useState<Toast[]>([]);

  const showToast = useCallback((type: "success" | "error", message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    const token = sessionStorage.getItem("admin_token");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
        ...(search && { search }),
        ...(filterStatus && { status: filterStatus }),
        ...(filterPricing && { pricing: filterPricing }),
      });
      const res  = await fetch(`${API}/api/admin/prompts?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPrompts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch {
      showToast("error", "Failed to load prompts.");
    } finally {
      setLoading(false);
    }
  }, [page, search, filterStatus, filterPricing, showToast]);

  useEffect(() => { fetchPrompts(); }, [fetchPrompts]);

  // Re-fetch with debounce on search/filter change
  useEffect(() => {
    setPage(1);
  }, [search, filterStatus, filterPricing]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const token = sessionStorage.getItem("admin_token");
    try {
      const res  = await fetch(`${API}/api/admin/prompts/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Prompt deleted.");
        fetchPrompts();
      } else {
        showToast("error", data.error || "Delete failed.");
      }
    } catch {
      showToast("error", "Network error.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleRunMigration = async () => {
    const token = sessionStorage.getItem("admin_token");
    try {
      const res  = await fetch(`${API}/api/admin/prompts/migrate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `Migration done. Backfilled: ${data.backfilled}, Tagged: ${data.latestTagged}`);
        fetchPrompts();
      } else {
        showToast("error", data.error || "Migration failed.");
      }
    } catch {
      showToast("error", "Network error.");
    }
  };

  // ── Status badge helper ───────────────────────────────────────────────────
  const StatusBadge = ({ status }: { status?: string }) => {
    if (status === "published" || status === "approved") {
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-green-500/15 text-green-400 border border-green-500/30">Published</span>;
    }
    if (status === "draft") {
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">Draft</span>;
    }
    return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-500/15 text-gray-400 border border-gray-500/30">{status || "—"}</span>;
  };

  const PricingBadge = ({ p }: { p: PromptRow }) => {
    if (p.is_premium) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent/15 text-accent border border-accent/30">
          <Crown size={9} /> {p.price || "PRO"}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-black/10 dark:bg-white/10 text-muted border border-border">
        Free
      </span>
    );
  };

  const LatestBadge = ({ p }: { p: PromptRow }) => {
    if (!p.isLatest) {
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-black/10 dark:bg-white/10 text-muted border border-border">Normal</span>;
    }
    const expired = p.latestExpiresInDays === 0;
    if (expired) {
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/15 text-red-400 border border-red-500/30">Expired</span>;
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/30">
        <Sparkles size={9} /> Latest
      </span>
    );
  };

  return (
    <>
      <ToastStack toasts={toasts} onRemove={removeToast} />

      {showForm && (
        <PromptFormModal
          editingPrompt={editingPrompt}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={fetchPrompts}
          showToast={showToast}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          title="Delete Prompt"
          message={`Are you sure you want to delete "${getTitle(deleteTarget)}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="space-y-6">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-bricolage">Prompt Library</h1>
            <p className="text-muted text-sm mt-1">Manage all prompts — add, edit, delete, and control Latest badges.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunMigration}
              className="px-4 py-2 rounded-lg border text-xs font-semibold text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              style={{ borderColor: "var(--border)" }}
              title="Backfill publishedAt and set isLatest=false on old prompts"
            >
              Run Migration
            </button>
            <button
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-semibold transition-colors shadow-lg hover:shadow-accent/20"
            >
              <Plus size={16} />
              Add Prompt
            </button>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--glass-bg)" }}>
            <Search size={15} className="text-muted shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search prompts by title…"
              className="flex-1 bg-transparent outline-none text-sm text-primary placeholder:text-muted"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-muted hover:text-primary">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm" style={{ borderColor: "var(--border)", background: "var(--glass-bg)" }}>
            <Filter size={14} className="text-muted" />
            <select
              value={filterStatus}
              onChange={e => setFilter(e.target.value)}
              className="bg-transparent outline-none text-primary"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm" style={{ borderColor: "var(--border)", background: "var(--glass-bg)" }}>
            <DollarSign size={14} className="text-muted" />
            <select
              value={filterPricing}
              onChange={e => setFilterPricing(e.target.value)}
              className="bg-transparent outline-none text-primary"
            >
              <option value="">All Pricing</option>
              <option value="free">Free Only</option>
              <option value="paid">Paid (PRO) Only</option>
            </select>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--glass-bg)" }}>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={24} className="animate-spin text-muted" />
            </div>
          ) : prompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-4xl mb-3">📭</span>
              <p className="text-primary font-bold">No prompts found</p>
              <p className="text-muted text-sm mt-1">Try adjusting your filters or add a new prompt.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-muted uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3.5 text-left text-xs font-bold text-muted uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="px-4 py-3.5 text-left text-xs font-bold text-muted uppercase tracking-wider">Pricing</th>
                    <th className="px-4 py-3.5 text-left text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3.5 text-left text-xs font-bold text-muted uppercase tracking-wider">Latest</th>
                    <th className="px-4 py-3.5 text-left text-xs font-bold text-muted uppercase tracking-wider hidden lg:table-cell">Expires In</th>
                    <th className="px-4 py-3.5 text-left text-xs font-bold text-muted uppercase tracking-wider hidden lg:table-cell">Published</th>
                    <th className="px-4 py-3.5 text-right text-xs font-bold text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {prompts.map(p => (
                    <tr key={p._id} className="hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-medium text-primary line-clamp-1 max-w-[200px]">{getTitle(p)}</p>
                        <p className="text-muted text-xs mt-0.5 line-clamp-1">{p.slug || ""}</p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-muted text-xs font-medium">{getCategoryName(p.category)}</span>
                      </td>
                      <td className="px-4 py-4"><PricingBadge p={p} /></td>
                      <td className="px-4 py-4"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-4"><LatestBadge p={p} /></td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        {p.isLatest && p.latestExpiresInDays !== null && p.latestExpiresInDays !== undefined ? (
                          <span className={`text-xs font-medium ${p.latestExpiresInDays === 0 ? "text-red-400" : p.latestExpiresInDays < 30 ? "text-amber-400" : "text-muted"}`}>
                            {p.latestExpiresInDays === 0 ? "Expired" : `${p.latestExpiresInDays}d`}
                          </span>
                        ) : (
                          <span className="text-muted text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-muted text-xs">
                          {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditing(p); setShowForm(true); }}
                            className="p-2 rounded-lg hover:bg-blue-500/10 text-muted hover:text-blue-400 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(p)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-muted text-sm">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderColor: "var(--border)" }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderColor: "var(--border)" }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
