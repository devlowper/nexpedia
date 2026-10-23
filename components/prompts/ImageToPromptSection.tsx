"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles, Copy, Check, Loader2, X,
  Image as ImageIcon, Sliders, ArrowUpRight, RefreshCw, AlertCircle,
  Camera, ShieldAlert, Layers
} from 'lucide-react';
import { FileFormatCardsIcon } from '@/components/ui/FileFormatCardsIcon';
import { VisionModel, PRESET_MODELS } from './VisionModelSelector';

export interface PromptResult {
  mainPrompt: string;
  style: string;
  negativePrompt: string;
  fullPrompt: string;
}

export function ImageToPromptSection() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [promptResult, setPromptResult] = useState<PromptResult | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'main' | 'style' | 'negative'>('all');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [selectedVisionModel, setSelectedVisionModel] = useState<VisionModel>(PRESET_MODELS[0]);

  useEffect(() => {
    try {
      const savedModelId = localStorage.getItem('nexpedia_selected_vision_model');
      if (savedModelId) {
        const found = PRESET_MODELS.find(m => m.id === savedModelId);
        if (found) setSelectedVisionModel(found);
      }
    } catch (e) {}
  }, []);

  const handleSelectVisionModel = (model: VisionModel) => {
    setSelectedVisionModel(model);
    try {
      localStorage.setItem('nexpedia_selected_vision_model', model.id);
    } catch (e) {}
  };
  const [isDragging, setIsDragging] = useState(false);
  const [activeParams, setActiveParams] = useState<string[]>(['--ar 16:9', '--v 6.1']);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const paramOptions = ['--ar 16:9', '--ar 4:5', '--v 6.1', '--stylize 250', '--q 2', '--chaos 10'];

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.');
      return;
    }

    setError('');
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  }, []);

  // Listen for clipboard paste (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [processFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageBase64(null);
    setGeneratedPrompt('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = async () => {
    if (!imageBase64) {
      setError('Please drag & drop or upload an image first.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedPrompt('');

    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
      const promptInstruction = `Target Generator: ${selectedVisionModel.name} (${selectedVisionModel.modelName}). ${customNote ? `User preferences: ${customNote}. ` : ''}Create an exact prompt that will reproduce this image with the same style, composition, lighting, and mood.`;

      const res = await fetch(`${API}/api/ai/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptInstruction,
          imageBase64: imageBase64,
          model: selectedVisionModel.modelName,
          provider: selectedVisionModel.provider,
          customApiKey: selectedVisionModel.apiKey || undefined
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate prompt from image');
      }

      const resData = data.data;
      const parsed: PromptResult = typeof resData === 'object' && resData !== null ? {
        mainPrompt: resData.mainPrompt || '',
        style: resData.style || '',
        negativePrompt: resData.negativePrompt || 'blurry, low quality, distorted, bad anatomy, deformed limbs, watermark, oversaturated',
        fullPrompt: resData.fullPrompt || [resData.mainPrompt, resData.style].filter(Boolean).join(', ')
      } : {
        mainPrompt: typeof resData === 'string' ? resData : '',
        style: 'Photorealistic, cinematic lighting, 8k resolution, highly detailed, octane render, sharp focus',
        negativePrompt: 'blurry, low quality, distorted, bad anatomy, deformed limbs, watermark, oversaturated',
        fullPrompt: typeof resData === 'string' ? resData : ''
      };

      setPromptResult(parsed);
      setGeneratedPrompt(parsed.fullPrompt);
    } catch (err: any) {
      setError(err.message || 'Error communicating with vision AI. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleParam = (param: string) => {
    setActiveParams(prev =>
      prev.includes(param) ? prev.filter(p => p !== param) : [...prev, param]
    );
  };

  const getFullPrompt = () => {
    if (!generatedPrompt) return '';
    if (activeParams.length === 0) return generatedPrompt;
    return `${generatedPrompt.trim()} ${activeParams.join(' ')}`;
  };

  const handleCopy = () => {
    const full = getFullPrompt();
    if (!full) return;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySpecificField = (field: 'main' | 'style' | 'negative', text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="w-full relative">
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

        {/* Header Badge */}
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#EA4C89]/30 bg-[#EA4C89]/5 text-black/80 dark:text-white/90 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles size={15} className="text-[#EA4C89]" />
            AI Image to Prompt Converter
          </div>
        </div>

        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary dark:text-white text-center leading-tight tracking-tight mb-3"
          style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
        >
          Recreate Any Image <span className="text-[#EA4C89]">Into a Prompt</span>
        </h2>

        <p className="text-muted dark:text-white/80 text-center text-sm sm:text-base max-w-xl mb-8 leading-relaxed font-medium">
          Upload or drag & drop any image. Our Vision AI reverse-engineers the exact lighting, camera angle, artist style, and composition so you can generate the exact same artwork.
        </p>

        {/* Error Alert */}
        {error && (
          <div className="w-full mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError('')} className="p-1 hover:bg-red-500/20 rounded-lg">
              <X size={14} />
            </button>
          </div>
        )}

        {/* ── Main Form Stack ── */}
        <div className="w-full flex flex-col gap-5">

          {/* Upload Dropzone */}
          <div className="w-full">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
            />

            {!imagePreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-full min-h-[300px] sm:min-h-[320px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-200 group ${isDragging
                    ? 'border-[#EA4C89] bg-[#EA4C89]/5 scale-[0.99]'
                    : 'border-black/15 dark:border-white/15 hover:border-[#EA4C89]/60 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                  }`}
              >
                {/* 3 File Cards Vector Icon (.png, .jpg, .webp) in #EA4C89 */}
                <FileFormatCardsIcon className="w-56 h-36 mb-3 transition-transform duration-300 group-hover:scale-105" />

                {/* Target Headline */}
                <h3 className="font-extrabold text-lg sm:text-xl text-primary dark:text-white tracking-wide uppercase mb-2">
                  DRAG IMAGE HERE TO BEGIN
                </h3>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-[11px] text-black/60 dark:text-white/60 font-medium">
                  Supports PNG, JPG, WEBP • Max 10MB • Paste with <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">Ctrl+V</kbd>
                </div>
              </div>
            ) : (
              <div className="relative w-full min-h-[300px] sm:min-h-[340px] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40 group flex items-center justify-center p-4">
                <div className="relative w-full h-[280px]">
                  <Image
                    src={imagePreview}
                    alt="Uploaded target"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-xl bg-black/70 hover:bg-black text-white text-xs font-semibold backdrop-blur-md transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <RefreshCw size={13} />
                    <span>Change</span>
                  </button>
                  <button
                    onClick={clearImage}
                    className="p-2 rounded-xl bg-black/70 hover:bg-red-600 text-white backdrop-blur-md transition-colors shadow-md"
                    title="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-xl bg-black/70 text-white backdrop-blur-md text-xs font-medium flex items-center gap-2">
                  <ImageIcon size={14} className="text-[#EA4C89]" />
                  <span className="truncate max-w-[220px]">{imageFile?.name || 'Uploaded Image'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Extra Instructions (Optional) Box */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/70 dark:text-white/70">
              Extra Instructions (Optional)
            </label>
            <textarea
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g., Focus on lighting and textures, cinematic mood, 8k resolution, photorealistic..."
              rows={3}
              className="w-full rounded-2xl p-4 text-xs sm:text-sm bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-primary dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#EA4C89] transition-colors resize-none shadow-sm"
            />
          </div>

          {/* Generate Prompt Button */}
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={handleGenerate}
              disabled={loading || !imageBase64}
              className="w-full py-4 px-8 rounded-2xl bg-[#EA4C89] hover:bg-[#d43a76] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-[0_6px_25px_rgba(234,76,137,0.35)] active:scale-[0.99] cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Analyzing Visuals & Generating Prompt...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Generate Prompt</span>
                </>
              )}
            </button>

            <Link
              href="/image-to-prompt"
              className="inline-flex items-center justify-center gap-1 text-xs text-black/50 dark:text-white/50 hover:text-[#EA4C89] dark:hover:text-[#EA4C89] transition-colors py-1 mt-1"
            >
              Open Fullscreen Studio <ArrowUpRight size={13} />
            </Link>
          </div>

        </div>

        {/* Output Result Section with 3 Options: Main, Style & Negative */}
        {generatedPrompt && promptResult && (
          <div className="w-full mt-8 p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#18191a] shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-black/70 dark:text-white/80">
                  Re-creation Prompt Breakdown
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                  Regenerate
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#EA4C89] hover:bg-[#d43a76] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied Full!' : 'Copy Full Prompt'}
                </button>
              </div>
            </div>

            {/* 3-Tab Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {[
                { id: 'all', label: 'All 3 Options', icon: Layers },
                { id: 'main', label: '1. Main Prompt', icon: Sparkles },
                { id: 'style', label: '2. Style & Optics', icon: Camera },
                { id: 'negative', label: '3. Negative Prompt', icon: ShieldAlert },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-xs'
                        : 'bg-black/5 dark:bg-white/5 text-muted hover:text-primary hover:bg-black/10 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon size={12} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* The 3 Option Cards */}
            <div className="space-y-3.5">
              
              {/* Option 1: Main Prompt */}
              {(activeTab === 'all' || activeTab === 'main') && (
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] p-4 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <Sparkles size={13} />
                      1. Main Prompt (Subject & Composition)
                    </span>
                    <button
                      onClick={() => copySpecificField('main', promptResult.mainPrompt)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-medium border border-indigo-500/20 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 transition-colors"
                    >
                      {copiedField === 'main' ? <Check size={11} /> : <Copy size={11} />}
                      {copiedField === 'main' ? 'Copied' : 'Copy Main'}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={promptResult.mainPrompt}
                    onChange={(e) => setPromptResult({ ...promptResult, mainPrompt: e.target.value })}
                    className="w-full bg-white/70 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-3 font-mono text-xs text-primary leading-relaxed focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              )}

              {/* Option 2: Style & Optics */}
              {(activeTab === 'all' || activeTab === 'style') && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] dark:bg-amber-500/[0.05] p-4 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <Camera size={13} />
                      2. Style & Optics (Color, Camera, Lighting & Medium)
                    </span>
                    <button
                      onClick={() => copySpecificField('style', promptResult.style)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-medium border border-amber-500/20 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-colors"
                    >
                      {copiedField === 'style' ? <Check size={11} /> : <Copy size={11} />}
                      {copiedField === 'style' ? 'Copied' : 'Copy Style'}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={promptResult.style}
                    onChange={(e) => setPromptResult({ ...promptResult, style: e.target.value })}
                    className="w-full bg-white/70 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-3 font-mono text-xs text-primary leading-relaxed focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              )}

              {/* Option 3: Negative Prompt */}
              {(activeTab === 'all' || activeTab === 'negative') && (
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] dark:bg-rose-500/[0.05] p-4 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                      <ShieldAlert size={13} />
                      3. Negative Prompt (What to Avoid)
                    </span>
                    <button
                      onClick={() => copySpecificField('negative', promptResult.negativePrompt)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-medium border border-rose-500/20 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 transition-colors"
                    >
                      {copiedField === 'negative' ? <Check size={11} /> : <Copy size={11} />}
                      {copiedField === 'negative' ? 'Copied' : 'Copy Negative'}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={promptResult.negativePrompt}
                    onChange={(e) => setPromptResult({ ...promptResult, negativePrompt: e.target.value })}
                    className="w-full bg-white/70 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-3 font-mono text-xs text-primary leading-relaxed focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>
              )}

            </div>

            {/* Quick Parameter Toggle Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-black/5 dark:border-white/5">
              <span className="text-xs text-black/50 dark:text-white/50 flex items-center gap-1 mr-1">
                <Sliders size={12} /> Parameters:
              </span>
              {paramOptions.map((p) => {
                const isActive = activeParams.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleParam(p)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${isActive
                        ? 'bg-[#EA4C89]/15 border border-[#EA4C89] text-[#EA4C89] font-bold'
                        : 'bg-black/5 dark:bg-white/5 border border-transparent text-black/60 dark:text-white/60 hover:border-black/20 dark:hover:border-white/20'
                      }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
