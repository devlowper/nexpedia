"use client";

import React, { useState, useRef } from 'react';
import { Sparkles, Image as ImageIcon, Copy, Check, Loader2, X } from 'lucide-react';

export const PromptEnhancer = () => {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setError("Image must be smaller than 4MB");
      return;
    }
    setImageFile(file);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEnhance = async () => {
    if (!prompt && !imageBase64) {
      setError("Please provide a text idea or upload an image.");
      return;
    }
    setLoading(true);
    setError('');
    setEnhancedPrompt('');
    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const res = await fetch(`${API}/api/ai/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageBase64 })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to enhance prompt');
      setEnhancedPrompt(data.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!enhancedPrompt) return;
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full overflow-hidden  bg-transparent">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold mb-6 tracking-tight flex flex-col items-center justify-center gap-3 md:gap-4 leading-tight">
            <span className="text-primary text-center">Generate Your</span>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 flex-wrap justify-center w-full">
              <span className="library-hero__title-pill">
                <svg className="generator-hero__magic shrink-0" style={{ width: '0.65em', height: '0.65em' }} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9.5 3 11 7l4 1.5-4 1.5-1.5 4-1.5-4L4 8.5 8 7l1.5-4Zm8 8 .9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4Zm-3 6 .55 1.45L16.5 19l-1.45.55L14.5 21l-.55-1.45L12.5 19l1.45-.55L14.5 17Z" fill="currentColor"></path>
                </svg>
                AI Prompts
              </span>
              <span className="text-primary text-center">Is One Click</span>
            </div>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Get powerful AI prompts with ease — just describe your goal like you're chatting with a friend, and we'll handle the rest.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <X size={16} className="shrink-0" />
              {error}
            </div>
            <button onClick={() => setError('')} className="p-1 hover:bg-red-500/20 rounded-full transition-colors">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Main Input Area */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-3 px-2">
            <label className="text-sm font-bold text-primary">What's your goal?</label>
          </div>
          <div className="glass-card p-6 transition-all focus-within:!border-[#FFC107]/50 focus-within:!shadow-[0_0_30px_rgba(255,193,7,0.15)]">
            <div className="relative">
              <textarea
                className="w-full h-32 md:h-40 bg-transparent text-primary placeholder:text-muted focus:outline-none resize-none text-lg leading-relaxed"
                placeholder="Describe what you want to create... we'll optimize it for any AI model...."
                value={prompt}
                maxLength={500}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* Upload Preview within the input area if image exists */}
            {imageBase64 && (
              <div className="mb-4 inline-flex items-center gap-3 p-2 pr-4 rounded-2xl border border-border bg-elevated">
                <img src={imageBase64} alt="Reference" className="w-12 h-12 rounded-xl object-cover border border-border shrink-0" />
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-xs font-semibold text-primary truncate max-w-[150px]">{imageFile?.name}</p>
                  <p className="text-[10px] text-muted">Reference attached</p>
                </div>
                <button onClick={removeImage} className="p-1.5 rounded-full bg-surface hover:text-red-500 hover:bg-red-500/10 transition-colors">
                  <X size={14} />
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border pt-5 mt-2 gap-4">
              {/* Photo upload */}
              <div className="w-full sm:w-auto flex-1">
                <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-5 py-3 rounded-2xl border border-border bg-elevated text-muted hover:text-primary hover:border-muted/50 transition-colors shadow-sm"
                >
                  <ImageIcon size={18} />
                  <span className="text-sm font-medium">Add Photo Reference</span>
                </button>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleEnhance}
                disabled={loading || (!prompt && !imageBase64)}
                className="w-full sm:w-auto bg-accent hover:bg-accent-hover  disabled:cursor-not-allowed text-black px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98] relative z-50"
              >
                {loading ? (
                  <><Loader2 className="animate-spin" size={18} /> Generating…</>
                ) : (
                  <><svg className="generator-hero__magic shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 3 11 7l4 1.5-4 1.5-1.5 4-1.5-4L4 8.5 8 7l1.5-4Zm8 8 .9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4Zm-3 6 .55 1.45L16.5 19l-1.45.55L14.5 21l-.55-1.45L12.5 19l1.45-.55L14.5 17Z" fill="#2d2b2c"></path></svg> Generate</>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end px-4 mt-2">
            <span className={`text-xs font-mono ${prompt.length > 400 ? 'text-red-400' : 'text-muted'}`}>
              {prompt.length}/500
            </span>
          </div>
        </div>

        {/* Output Card */}
        {enhancedPrompt && (
          <div className="mt-8 max-w-4xl mx-auto glass-card p-6 relative animate-fadeIn" style={{ borderColor: 'color-mix(in srgb, var(--brand-solid) 40%, transparent)' }}>
            <div className="flex items-center justify-between mb-4 px-2">
              <label className="text-sm font-bold text-primary flex items-center gap-2">
                <Sparkles size={18} className="text-accent fill-accent" /> Your Enhanced Prompt
              </label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted hidden sm:inline-block">{enhancedPrompt.split(' ').length} words</span>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-colors text-xs font-bold shadow-sm ${copied
                    ? 'bg-accent border-accent text-black'
                    : 'bg-elevated border-border text-primary hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                >
                  {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            </div>
            <div className="bg-elevated border border-border rounded-2xl p-6 min-h-[150px] text-primary whitespace-pre-wrap font-mono text-sm md:text-base leading-relaxed">
              {enhancedPrompt}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
