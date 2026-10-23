"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, Sparkles, Copy, Check, Loader2, X, 
  Image as ImageIcon, Sliders, RefreshCw, 
  Trash2, Search, Plus, Layers, Wand2, Eye, Download, History,
  Camera, Palette, ShieldAlert, FileText
} from 'lucide-react';
import { FileFormatCardsIcon } from '@/components/ui/FileFormatCardsIcon';
import { VisionModelSelector, VisionModel, PRESET_MODELS } from '@/components/prompts/VisionModelSelector';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';

interface ConvertedPrompt {
  id: string;
  thumbnail: string;
  prompt: string;
  targetModel: string;
  fileName: string;
  createdAt: number;
}

export interface PromptResult {
  mainPrompt: string;
  style: string;
  negativePrompt: string;
  fullPrompt: string;
}

export default function ImageToPromptPage() {
  const { isLoggedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [customNote, setCustomNote] = useState('');
  const [targetModel, setTargetModel] = useState('Midjourney v6.1');
  const [selectedVisionModel, setSelectedVisionModel] = useState<VisionModel>(PRESET_MODELS[0]);
  const [activeParams, setActiveParams] = useState<string[]>(['--ar 16:9', '--v 6.1', '--stylize 250']);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [promptResult, setPromptResult] = useState<PromptResult | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'main' | 'style' | 'negative'>('all');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState<ConvertedPrompt[]>([]);
  const [historySearch, setHistorySearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const modelOptions = [
    { name: 'Midjourney v6.1', tag: 'Best for Artistic & Photorealism' },
    { name: 'FLUX.1 Schnell', tag: 'Fast, High Detail, Realistic Text' },
    { name: 'Stable Diffusion XL', tag: 'Open Weights & ControlNet Friendly' },
    { name: 'DALL-E 3', tag: 'Precise Concept Adherence' },
  ];

  const paramOptions = [
    '--ar 16:9',
    '--ar 1:1',
    '--ar 9:16',
    '--ar 4:5',
    '--v 6.1',
    '--stylize 250',
    '--stylize 750',
    '--q 2',
    '--chaos 10'
  ];

  const loadingMessages = [
    "Analyzing image composition & geometry...",
    "Extracting lighting, color palettes & shaders...",
    "Identifying artist style & medium...",
    "Synthesizing high-precision AI prompt..."
  ];

  // Rotate loading messages during generation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading, loadingMessages.length]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('imgToPromptHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }

    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }

    try {
      const savedModelId = localStorage.getItem('procraft_selected_vision_model') || localStorage.getItem('nexpedia_selected_vision_model');
      if (savedModelId) {
        const found = PRESET_MODELS.find(m => m.id === savedModelId);
        if (found) setSelectedVisionModel(found);
      }
    } catch (e) {}
  }, []);

  const handleSelectVisionModel = (model: VisionModel) => {
    setSelectedVisionModel(model);
    try {
      localStorage.setItem('procraft_selected_vision_model', model.id);
    } catch (e) {}
  };

  // Save history on changes
  const saveToHistory = (item: ConvertedPrompt) => {
    const updated = [item, ...history.filter(h => h.id !== item.id)].slice(0, 30);
    setHistory(updated);
    localStorage.setItem('imgToPromptHistory', JSON.stringify(updated));
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('imgToPromptHistory', JSON.stringify(updated));
  };

  const clearAllHistory = () => {
    if (confirm('Clear all conversion history?')) {
      setHistory([]);
      localStorage.removeItem('imgToPromptHistory');
    }
  };

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please provide a valid image (PNG, JPG, WEBP, GIF).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file must be under 10MB.');
      return;
    }

    setError(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  }, []);

  // Listen for clipboard image paste
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

  const startNew = () => {
    setImagePreview(null);
    setImageBase64(null);
    setFileName('');
    setGeneratedPrompt('');
    setCustomNote('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = async () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    if (!imageBase64) {
      setError('Please upload or paste an image to analyze.');
      return;
    }

    setLoading(true);
    setError(null);
    setLoadingStep(0);
    setGeneratedPrompt('');

    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
      const promptInstruction = `Target Generator: ${selectedVisionModel.name} (${selectedVisionModel.modelName}). Output format preference: ${targetModel}. ${customNote ? `User preferences: ${customNote}.` : ''} Create an exact prompt that will reproduce this image with the same style, composition, lighting, and mood.`;

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API}/api/ai/enhance`, {
        method: 'POST',
        headers,
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

      // Save to history
      saveToHistory({
        id: Date.now().toString(),
        thumbnail: imagePreview || '',
        prompt: parsed.fullPrompt,
        targetModel: targetModel,
        fileName: fileName || 'Uploaded Image',
        createdAt: Date.now()
      });

    } catch (err: any) {
      setError(err.message || 'Error converting image. Please try again.');
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

  const copySpecificField = (field: 'main' | 'style' | 'negative' | 'full', text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const loadHistoryItem = (item: ConvertedPrompt) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
    setImagePreview(item.thumbnail);
    setImageBase64(item.thumbnail);
    setGeneratedPrompt(item.prompt);
    setPromptResult({
      mainPrompt: item.prompt,
      style: '',
      negativePrompt: 'blurry, low quality, distorted, bad anatomy, deformed limbs, watermark',
      fullPrompt: item.prompt
    });
    setTargetModel(item.targetModel);
    setFileName(item.fileName);
    setError(null);
  };

  const filteredHistory = history.filter(item => 
    item.prompt.toLowerCase().includes(historySearch.toLowerCase()) ||
    item.fileName.toLowerCase().includes(historySearch.toLowerCase()) ||
    item.targetModel.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 top-[60px] flex w-full overflow-hidden bg-base text-primary">
      
      {/* ── Mobile Backdrop for Sidebar Drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 top-[60px] z-40 bg-black/60 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Left Sidebar (History & Saved) ── */}
      <aside className={`
        fixed inset-y-0 left-0 top-[60px] z-50 w-72 sm:w-80 md:relative md:top-0
        ${sidebarOpen ? 'translate-x-0 md:w-80 lg:w-88' : '-translate-x-full md:translate-x-0 md:w-0'} 
        shrink-0 border-r border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0d0e]/95 md:bg-white/50 md:dark:bg-[#0c0d0e]/60 backdrop-blur-2xl md:backdrop-blur-xl flex flex-col transition-all duration-300 overflow-hidden shadow-2xl md:shadow-none
      `}>
        <div className="p-3.5 sm:p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#EA4C89]" />
            <h3 className="font-bold text-sm tracking-tight">Recent Conversions</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                startNew();
                if (typeof window !== 'undefined' && window.innerWidth < 768) setSidebarOpen(false);
              }}
              className="p-1.5 rounded-lg bg-[var(--brand-solid)] hover:opacity-90 text-white transition-opacity shadow-sm"
              title="Start New Image Conversion"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted hover:text-primary transition-colors cursor-pointer"
              title="Close Sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search History */}
        <div className="p-3 border-b border-black/5 dark:border-white/5">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-black/40 dark:text-white/40" />
            <input
              type="text"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="Search history..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-black/5 dark:bg-white/5 border border-transparent focus:border-[#EA4C89] focus:outline-none transition-colors placeholder:text-black/30 dark:placeholder:text-white/30"
            />
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2 custom-scrollbar">
          {filteredHistory.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center p-4">
              <Layers size={28} className="text-black/20 dark:text-white/20 mb-2" />
              <p className="text-xs text-black/50 dark:text-white/50 font-medium">No conversion history yet</p>
              <p className="text-[11px] text-black/40 dark:text-white/40 mt-1">Uploaded images & prompts will appear here</p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => loadHistoryItem(item)}
                className="group relative p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#141517] hover:border-[#EA4C89]/40 hover:bg-[#EA4C89]/5 transition-all cursor-pointer flex gap-3 items-center"
              >
                {/* Mini Thumbnail */}
                <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0 bg-black/10 dark:bg-black/40 border border-black/10 dark:border-white/10">
                  <Image 
                    src={item.thumbnail} 
                    alt={item.fileName} 
                    fill 
                    className="object-cover" 
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA4C89] truncate">
                      {item.targetModel}
                    </span>
                    <button
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 rounded transition-opacity"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <p className="text-xs text-primary/80 truncate leading-snug">
                    {item.prompt}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="p-3 border-t border-black/10 dark:border-white/10">
            <button
              onClick={clearAllHistory}
              className="w-full py-1.5 text-xs text-black/50 dark:text-white/50 hover:text-red-500 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trash2 size={13} /> Clear History
            </button>
          </div>
        )}
      </aside>

      {/* ── Main Content Studio ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Bar Navigation (Fixed Header) */}
        <header className="h-14 border-b border-black/10 dark:border-white/10 px-3 sm:px-6 md:px-8 flex items-center justify-between shrink-0 bg-white/40 dark:bg-[#090A0A]/40 backdrop-blur-md z-30">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 transition-colors cursor-pointer"
              title="Toggle History Sidebar"
              aria-label="Toggle History Sidebar"
            >
              <Layers size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <VisionModelSelector
              selectedModel={selectedVisionModel}
              onSelectModel={handleSelectVisionModel}
            />
          </div>
        </header>

        {/* Studio Canvas (Internal Scroll Area ONLY) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-6 md:p-8">
          <div className="max-w-4xl w-full mx-auto flex flex-col gap-5 sm:gap-6">
          

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center justify-between gap-3">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="p-1 hover:bg-red-500/20 rounded">
                <X size={14} />
              </button>
            </div>
          )}

          {/* ── Main Studio Form Stack ── */}
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-5 sm:gap-6">
            
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
                  className={`
                    w-full min-h-[250px] sm:min-h-[320px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-4 sm:p-8 text-center cursor-pointer transition-all duration-300 relative group
                    ${isDragging 
                      ? 'border-[#EA4C89] bg-[#EA4C89]/10 scale-[0.99]' 
                      : 'border-black/15 dark:border-white/15 hover:border-[#EA4C89]/60 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                    }
                  `}
                >
                  {/* 3 File Cards Vector Icon (.png, .jpg, .webp) */}
                  <FileFormatCardsIcon className="w-44 sm:w-56 h-28 sm:h-36 mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-105" />

                  {/* Target Headline */}
                  <h3 className="font-extrabold text-lg sm:text-2xl text-primary dark:text-white tracking-wide uppercase mb-1.5 sm:mb-2 text-center">
                    <span className="sm:hidden">TAP OR DROP IMAGE HERE</span>
                    <span className="hidden sm:inline">DRAG IMAGE HERE TO BEGIN</span>
                  </h3>

                  <div className="inline-flex flex-wrap justify-center items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-[11px] text-black/60 dark:text-white/60 font-medium text-center">
                    <span>Supports PNG, JPG, WEBP • Max 10MB</span>
                    <span className="hidden sm:inline">• Paste with <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-xs">Ctrl+V</kbd></span>
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-[250px] sm:min-h-[340px] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-[#121315] relative group flex items-center justify-center p-3 sm:p-4">
                  <div className="relative w-full h-[240px] sm:h-[320px]">
                    <Image
                      src={imagePreview}
                      alt="Uploaded target"
                      fill
                      className="object-contain rounded-2xl"
                    />
                  </div>

                  {/* Image Controls Overlay */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-10">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-md transition-all shadow-md flex items-center gap-1.5"
                    >
                      <RefreshCw size={13} /> Replace
                    </button>
                    <button
                      onClick={startNew}
                      className="p-2 rounded-xl bg-black/75 hover:bg-red-600 text-white backdrop-blur-md transition-all shadow-md"
                      title="Clear image"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 px-3 py-1.5 rounded-xl bg-black/75 text-white text-xs font-medium backdrop-blur-md flex items-center gap-2 max-w-[calc(100%-1.5rem)]">
                    <ImageIcon size={14} className="text-[#EA4C89] shrink-0" />
                    <span className="truncate">{fileName || 'Target Visual'}</span>
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
                placeholder="e.g. Focus on lighting and textures, cinematic mood, 8k resolution, photorealistic..."
                rows={3}
                className="w-full rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-primary dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#EA4C89] transition-colors resize-none shadow-sm"
              />
            </div>

            {/* Generate Button */}
            <div className="w-full">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl bg-[#EA4C89] hover:bg-[#d43a76] disabled:opacity-50 disabled:cursor-not-allowed !text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-[0_6px_25px_rgba(234,76,137,0.35)] active:scale-[0.99] cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-white shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-white font-bold" style={{ color: '#ffffff' }}>{loadingMessages[loadingStep]}</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={18} className="text-white shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-white font-bold" style={{ color: '#ffffff' }}>Generate Prompt</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Generated Result Section with 3 Options: Main, Style & Negative */}
          {generatedPrompt && promptResult && (
            <div className="w-full rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121315] p-4 sm:p-6 md:p-8 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mb-5 pb-4 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-primary">
                      Re-creation Prompt Breakdown
                    </h3>
                    <p className="text-[11px] sm:text-xs text-muted">
                      Optimized for <span className="text-primary font-semibold">{targetModel}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                    <span>Regenerate</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-[#EA4C89] hover:bg-[#d43a76] text-white text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied Full!' : 'Copy Full'}</span>
                  </button>
                </div>
              </div>

              {/* 3-Tab Filter Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-5 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
                {[
                  { id: 'all', label: 'All Options', icon: Layers },
                  { id: 'main', label: '1. Main', icon: Sparkles },
                  { id: 'style', label: '2. Style', icon: Camera },
                  { id: 'negative', label: '3. Negative', icon: ShieldAlert },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                        isActive
                          ? 'bg-black dark:bg-white text-white dark:text-black shadow-xs'
                          : 'bg-black/5 dark:bg-white/5 text-muted hover:text-primary hover:bg-black/10 dark:hover:bg-white/10'
                      }`}
                    >
                      <Icon size={13} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* The 3 Option Cards */}
              <div className="space-y-3.5 sm:space-y-4">
                
                {/* ── Option 1: Main Prompt ── */}
                {(activeTab === 'all' || activeTab === 'main') && (
                  <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] p-3.5 sm:p-5 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 flex items-center justify-center font-bold text-xs shrink-0">
                          1
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 truncate">
                          <Sparkles size={13} className="shrink-0" />
                          Main Prompt (Subject & Scene)
                        </span>
                      </div>
                      <button
                        onClick={() => copySpecificField('main', promptResult.mainPrompt)}
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-medium border border-indigo-500/20 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 transition-colors shrink-0"
                      >
                        {copiedField === 'main' ? <Check size={12} /> : <Copy size={12} />}
                        {copiedField === 'main' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={promptResult.mainPrompt}
                      onChange={(e) => setPromptResult({ ...promptResult, mainPrompt: e.target.value })}
                      className="w-full bg-white/70 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-3 sm:p-3.5 font-mono text-xs sm:text-sm text-primary leading-relaxed focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                )}

                {/* ── Option 2: Style (Color, Camera, Lighting) ── */}
                {(activeTab === 'all' || activeTab === 'style') && (
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] dark:bg-amber-500/[0.05] p-3.5 sm:p-5 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0">
                          2
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 flex items-center gap-1.5 truncate">
                          <Camera size={13} className="shrink-0" />
                          Style & Optics
                        </span>
                      </div>
                      <button
                        onClick={() => copySpecificField('style', promptResult.style)}
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-medium border border-amber-500/20 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-colors shrink-0"
                      >
                        {copiedField === 'style' ? <Check size={12} /> : <Copy size={12} />}
                        {copiedField === 'style' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={promptResult.style}
                      onChange={(e) => setPromptResult({ ...promptResult, style: e.target.value })}
                      className="w-full bg-white/70 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-3 sm:p-3.5 font-mono text-xs sm:text-sm text-primary leading-relaxed focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>
                )}

                {/* ── Option 3: Negative Prompt ── */}
                {(activeTab === 'all' || activeTab === 'negative') && (
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] dark:bg-rose-500/[0.05] p-3.5 sm:p-5 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-500 flex items-center justify-center font-bold text-xs shrink-0">
                          3
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400 flex items-center gap-1.5 truncate">
                          <ShieldAlert size={13} className="shrink-0" />
                          Negative Prompt (What to Avoid)
                        </span>
                      </div>
                      <button
                        onClick={() => copySpecificField('negative', promptResult.negativePrompt)}
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-medium border border-rose-500/20 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 transition-colors shrink-0"
                      >
                        {copiedField === 'negative' ? <Check size={12} /> : <Copy size={12} />}
                        {copiedField === 'negative' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={promptResult.negativePrompt}
                      onChange={(e) => setPromptResult({ ...promptResult, negativePrompt: e.target.value })}
                      className="w-full bg-white/70 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-3 sm:p-3.5 font-mono text-xs sm:text-sm text-primary leading-relaxed focus:outline-none focus:border-rose-500 resize-none"
                    />
                  </div>
                )}

              </div>

              {/* Parameter Toggles */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-5 pt-4 border-t border-black/5 dark:border-white/10">
                <span className="text-[11px] sm:text-xs text-black/50 dark:text-white/50 flex items-center gap-1 mr-1 font-medium">
                  <Sliders size={12} /> Parameters:
                </span>
                {paramOptions.map((p) => {
                  const isActive = activeParams.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleParam(p)}
                      className={`px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-mono transition-all ${
                        isActive
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
        </div>
      </main>

      {/* Auth Modal for Login / Signup requirement */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
