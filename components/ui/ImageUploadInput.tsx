"use client";

import React, { useState, useRef } from "react";
import { Upload, Link2, X, Loader2, Image as ImageIcon, CheckCircle, ExternalLink, Cloud } from "lucide-react";
import { uploadImageToCDN } from "@/lib/uploadImage";

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helperText?: string;
}

export function ImageUploadInput({
  label = "Image",
  value,
  onChange,
  placeholder = "https://cdn.procraft.site/image.webp",
  helperText,
}: ImageUploadInputProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image (JPG, PNG, WEBP, AVIF, or GIF).");
      return;
    }

    // Validate size (Supports up to 30MB)
    if (file.size > 30 * 1024 * 1024) {
      setError("Image size exceeds 30MB limit.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const res = await uploadImageToCDN(file);
      onChange(res.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image. Please try again or paste a URL.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-primary">{label}</label>
        
        {/* Toggle between Upload and URL */}
        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-lg border border-border text-xs">
          <button
            type="button"
            onClick={() => { setMode("upload"); setError(null); }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              mode === "upload"
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:text-primary"
            }`}
          >
            <Upload size={12} /> Upload
          </button>
          <button
            type="button"
            onClick={() => { setMode("url"); setError(null); }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              mode === "url"
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:text-primary"
            }`}
          >
            <Link2 size={12} /> Direct URL
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div>
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept="image/png, image/jpeg, image/webp, image/gif"
            className="hidden"
          />

          {!value ? (
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? "border-accent bg-accent/5 scale-[0.99]"
                  : "border-border hover:border-accent/50 bg-black/5 dark:bg-white/5"
              } ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {uploading ? (
                <>
                  <Loader2 size={28} className="animate-spin text-accent" />
                  <p className="text-sm font-semibold text-primary">Uploading to Cloudflare R2...</p>
                  <p className="text-xs text-muted">Optimizing and storing to cdn.procraft.site</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-1">
                    <Upload size={22} />
                  </div>
                  <p className="text-sm font-medium text-primary">
                    <span className="text-accent font-semibold underline underline-offset-2">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted">PNG, JPG, WEBP, or AVIF (Hosted on Cloudflare R2 CDN)</p>
                </>
              )}
            </div>
          ) : (
            /* Uploaded Preview State */
            <div className="flex items-center gap-4 p-3 rounded-xl border border-border bg-black/5 dark:bg-white/5">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-border bg-black/10 shrink-0">
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500 mb-0.5">
                  <CheckCircle size={13} />
                  <span>Image uploaded</span>
                  {value.includes("cdn.procraft.site") ? (
                    <span className="text-[10px] bg-accent/15 text-accent px-1.5 py-0.2 rounded font-mono">Cloudflare R2</span>
                  ) : value.includes("ibb.co") ? (
                    <span className="text-[10px] bg-amber-500/15 text-amber-500 px-1.5 py-0.2 rounded font-mono">ImgBB</span>
                  ) : (
                    <span className="text-[10px] bg-blue-500/15 text-blue-500 px-1.5 py-0.2 rounded font-mono">CDN</span>
                  )}
                </div>
                <p className="text-xs text-muted truncate font-mono">{value}</p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline mt-1"
                >
                  View full image <ExternalLink size={10} />
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-black/10 dark:hover:bg-white/10 text-primary transition-colors"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Remove image"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Direct URL Input Mode */
        <div className="space-y-2">
          <div className="relative">
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg pl-4 pr-10 py-2.5 text-primary text-sm focus:border-accent outline-none transition-colors"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {value && (
            <div className="mt-2 relative rounded-lg overflow-hidden border border-border max-h-36 bg-black/5 flex items-center justify-center">
              <img
                src={value}
                alt="URL preview"
                className="max-h-36 object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-xs text-muted">{helperText}</p>
      )}
    </div>
  );
}
