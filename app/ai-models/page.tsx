"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, Zap, Code, Loader2, Send, ChevronDown, Bot, Trophy, Star, Cpu, Database, Globe, CheckCircle, Copy, Check, RotateCcw, Trash2 } from 'lucide-react';

const formatPrice = (priceStr?: string) => {
  if (!priceStr) return '$0.00';
  const price = parseFloat(priceStr);
  if (price === 0) return '$0.00';
  return '$' + (price * 1_000_000).toFixed(2);
};

const isFreeModel = (pricing: any) => parseFloat(pricing?.prompt || '1') === 0;

const fmtCtx = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${Math.round(n / 1000)}K`;

const getProviderLogo = (providerId: string) => {
  const map: Record<string, string> = {
    openai: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    anthropic: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg',
    google: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
    meta: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    mistral: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mistral_AI_logo.svg/512px-Mistral_AI_logo.svg.png',
    perplexity: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Perplexity_AI_logo.svg/512px-Perplexity_AI_logo.svg.png',
    qwen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Alibaba_Cloud_logo.svg/512px-Alibaba_Cloud_logo.svg.png',
  };
  return map[providerId] || `https://api.dicebear.com/7.x/initials/svg?seed=${providerId}&backgroundColor=111111`;
};

export interface ORModel {
  id: string;
  name: string;
  description: string;
  pricing: { prompt: string; completion: string; input_cache_read?: string };
  context_length: number;
  architecture: { modality: string; tokenizer: string };
  benchmarks?: { artificial_analysis?: { intelligence_index?: number; coding_index?: number } };
  supported_parameters?: string[];
}

function ProviderImg({ id, className = 'w-full h-full object-contain' }: { id: string; className?: string }) {
  return (
    <img
      src={getProviderLogo(id)}
      onError={e => { e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${id}&backgroundColor=111111`; }}
      className={className}
      alt={id}
    />
  );
}

function ModelDetailModal({ model, onClose }: { model: ORModel; onClose: () => void }) {
  const isFree = isFreeModel(model.pricing);
  const provider = model.id.split('/')[0];

  // close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const capabilities = [
    model.supported_parameters?.includes('tools') && 'Function Calling',
    model.supported_parameters?.includes('response_format') && 'JSON Mode',
    model.supported_parameters?.includes('streaming') && 'Streaming',
    model.supported_parameters?.includes('temperature') && 'Temperature Control',
    model.architecture?.modality?.includes('image') && 'Image Input',
  ].filter(Boolean) as string[];

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
    >
      <div onClick={e => e.stopPropagation()} className="relative w-full max-w-xl bg-white dark:bg-[#0E0F12] rounded-t-3xl sm:rounded-3xl border border-gray-200/60 dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 duration-300">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#ff3366]/10 via-pink-500/5 to-transparent p-6 pb-5 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff3366]/5 to-transparent" />


          <div className="flex items-start gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center p-3 shadow-lg shrink-0">
              <ProviderImg id={provider} />
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {model.architecture?.modality?.includes('image') && !model.architecture?.modality?.includes('text->text') ? 'Multimodal' : 'Language'}
                </span>
                {isFree && (
                  <span className="text-[10px] font-black text-[#ff3366] bg-[#ff3366]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Free</span>
                )}
                {model.id.includes('latest') && (
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Latest</span>
                )}
              </div>
              <h2 className="font-black text-2xl text-gray-900 dark:text-white leading-tight">{model.name}</h2>
              <p className="text-sm text-gray-500 dark:text-muted capitalize mt-0.5">{provider}</p>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 pb-6 pt-2 space-y-5">

          {/* Description */}
          {model.description && (
            <div>
              <h3 className="text-xs font-black text-gray-400 dark:text-muted uppercase tracking-widest mb-2">Description</h3>
              <p className="text-sm text-gray-700 dark:text-white/80 leading-relaxed">{model.description}</p>
            </div>
          )}

          {/* Pricing grid */}
          <div>
            <h3 className="text-xs font-black text-gray-400 dark:text-muted uppercase tracking-widest mb-3">Pricing per 1M Tokens</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Cached Input', value: model.pricing?.input_cache_read },
                { label: 'Input', value: model.pricing?.prompt },
                { label: 'Output', value: model.pricing?.completion },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-muted mb-2">{item.label}</div>
                  <div className={`font-black text-lg font-mono ${isFree ? 'text-[#ff3366]' : 'text-gray-900 dark:text-white'}`}>
                    {formatPrice(item.value)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div>
            <h3 className="text-xs font-black text-gray-400 dark:text-muted uppercase tracking-widest mb-3">Specifications</h3>
            <div className="space-y-2">
              {[
                { icon: <Database size={14} />, label: 'Context Window', value: fmtCtx(model.context_length) },
                { icon: <Cpu size={14} />, label: 'Tokenizer', value: model.architecture?.tokenizer || 'Unknown' },
                { icon: <Globe size={14} />, label: 'Modality', value: model.architecture?.modality || 'text->text' },
                { icon: <Star size={14} />, label: 'Intelligence', value: model.benchmarks?.artificial_analysis?.intelligence_index ? `${model.benchmarks.artificial_analysis.intelligence_index}/100` : 'N/A' },
                { icon: <Code size={14} />, label: 'Coding Index', value: model.benchmarks?.artificial_analysis?.coding_index ? `${model.benchmarks.artificial_analysis.coding_index}/100` : 'N/A' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-muted">
                    <span className="text-[#ff3366]">{item.icon}</span>
                    {item.label}
                  </div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white font-mono">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          {capabilities.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-gray-400 dark:text-muted uppercase tracking-widest mb-3">Capabilities</h3>
              <div className="flex flex-wrap gap-2">
                {capabilities.map(cap => (
                  <span key={cap} className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-full">
                    <CheckCircle size={12} /> {cap}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Model ID */}
          <div>
            <h3 className="text-xs font-black text-gray-400 dark:text-muted uppercase tracking-widest mb-2">Model ID</h3>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3">
              <code className="text-sm font-mono text-gray-700 dark:text-white/70 flex-1 truncate">{model.id}</code>
              <button
                onClick={() => navigator.clipboard.writeText(model.id)}
                className="text-[10px] font-black text-[#ff3366] uppercase tracking-wider hover:opacity-70 transition-opacity shrink-0"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, isLastAssistant, onRegenerate }: { msg: any, isLastAssistant: boolean, onRegenerate?: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 group/message ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {msg.role !== 'user' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff3366] to-pink-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-[#ff3366]/20">
          <Bot size={14} className="text-white" />
        </div>
      )}
      <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <div className={`text-sm leading-relaxed px-5 py-3.5 shadow-sm ${msg.role === 'user'
            ? 'bg-[#ff3366] text-white rounded-[24px] rounded-br-sm shadow-md shadow-[#ff3366]/20'
            : msg.role === 'system'
              ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-[24px] rounded-tl-sm'
              : 'text-gray-800 dark:text-white/90 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[24px] rounded-tl-sm'
          }`}>
          {msg.content}
        </div>
        
        {/* Actions Bar */}
        <div className={`flex items-center gap-3 mt-1.5 px-2 opacity-0 group-hover/message:opacity-100 transition-opacity duration-200`}>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wide transition-colors uppercase ${copied ? 'text-emerald-500 dark:text-emerald-400' : 'text-gray-400 hover:text-gray-700 dark:text-white/30 dark:hover:text-white/70'}`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          {isLastAssistant && onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-gray-400 hover:text-[#ff3366] dark:text-white/30 transition-colors uppercase"
            >
              <RotateCcw size={12} /> Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InlinePlayground({ freeModels }: { freeModels: ORModel[] }) {
  const [selectedModel, setSelectedModel] = useState<ORModel | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (freeModels.length > 0 && !selectedModel) {
      setSelectedModel(freeModels[0]);
      setMessages([]);
    }
  }, [freeModels]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loadingChat]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectModel = (model: ORModel) => {
    setSelectedModel(model);
    setDropdownOpen(false);
    setMessages([]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedModel || loadingChat) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoadingChat(true);
    try {
      const res = await fetch('/api/openrouter/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: selectedModel.id, messages: newMessages }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.choices?.[0]?.message) setMessages([...newMessages, data.choices[0].message]);
    } catch (err: any) {
      setMessages([...newMessages, { role: 'system', content: `⚠️ ${err.message}` }]);
    } finally {
      setLoadingChat(false);
    }
  };

  if (freeModels.length === 0) return null;

  const hasMessages = messages.length > 0;

  return (
    <div className="mb-16 relative max-w-2xl mx-auto">
      {/* ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#ff3366]/20 via-purple-500/10 to-[#ff3366]/20 rounded-[32px] blur-2xl opacity-60 pointer-events-none" />

      <div className="relative rounded-[32px] overflow-hidden bg-white dark:bg-[#0E0F11] border border-gray-100 dark:border-white/10 shadow-2xl shadow-gray-200/50 dark:shadow-none">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 dark:border-white/5">
          {/* Left: status dot + label */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3366] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff3366]" />
            </span>
            <span className="text-xs font-black text-gray-500 dark:text-white/50 tracking-widest uppercase">Playground</span>
          </div>

          <div className="flex items-center gap-3">
            {hasMessages && (
              <button
                onClick={() => setMessages([])}
                className="text-[11px] font-bold text-gray-400 hover:text-red-500 dark:text-white/40 dark:hover:text-red-400 uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={12} /> Clear
              </button>
            )}

            {/* Right: model selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(v => !v)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/8 hover:border-[#ff3366]/40 transition-all duration-200 shadow-sm group"
            >
              {selectedModel && (
                <div className="w-5 h-5 rounded-full overflow-hidden bg-white dark:bg-white/10 flex items-center justify-center shrink-0 shadow-sm">
                  <ProviderImg id={selectedModel.id.split('/')[0]} className="w-full h-full object-contain p-0.5" />
                </div>
              )}
              <span className="text-xs font-bold text-gray-700 dark:text-white/70 group-hover:text-gray-900 dark:group-hover:text-white transition-colors max-w-[180px] truncate">
                {selectedModel?.name || 'Select model'}
              </span>
              <ChevronDown size={14} className={`text-gray-400 dark:text-white/40 transition-transform duration-200 shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-72 bg-white dark:bg-[#141518] border border-gray-200 dark:border-white/10 rounded-[24px] shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden z-50">
                <div className="p-2 max-h-64 overflow-y-auto">
                  {freeModels.map(m => (
                    <button
                      key={m.id}
                      onClick={() => selectModel(m)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[16px] text-left transition-all hover:bg-gray-50 dark:hover:bg-white/5 ${selectedModel?.id === m.id ? 'bg-[#ff3366]/5 border border-[#ff3366]/20' : 'border border-transparent'}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/8 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                        <ProviderImg id={m.id.split('/')[0]} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-gray-900 dark:text-white/90 truncate">{m.name}</div>
                        <div className="text-[10px] text-gray-500 dark:text-white/40 mt-0.5 capitalize">{m.id.split('/')[0]} · {fmtCtx(m.context_length)}</div>
                      </div>
                      {selectedModel?.id === m.id && (
                        <div className="w-2 h-2 rounded-full bg-[#ff3366] shrink-0 shadow-sm shadow-[#ff3366]/50" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* ── Messages area ── */}
        <div className="h-[280px] overflow-y-auto px-6 py-6 flex flex-col gap-5 scroll-smooth bg-gray-50/30 dark:bg-transparent">
          {!hasMessages && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-6">
              <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8 flex items-center justify-center shadow-inner">
                <Bot size={26} className="text-gray-400 dark:text-white/30" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 dark:text-white/60">Ask anything</p>
                <p className="text-xs font-medium text-gray-500 dark:text-white/30 mt-1">Start a conversation with {selectedModel?.name}</p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble 
              key={i} 
              msg={msg} 
              isLastAssistant={i === messages.length - 1 && msg.role !== 'user' && msg.role !== 'system'}
              onRegenerate={async () => {
                const newMessages = messages.slice(0, -1);
                setMessages(newMessages);
                setLoadingChat(true);
                try {
                  const res = await fetch('/api/openrouter/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ model: selectedModel?.id, messages: newMessages }),
                  });
                  const data = await res.json();
                  if (data.error) throw new Error(data.error);
                  if (data.choices?.[0]?.message) setMessages([...newMessages, data.choices[0].message]);
                } catch (err: any) {
                  setMessages([...newMessages, { role: 'system', content: `⚠️ ${err.message}` }]);
                } finally {
                  setLoadingChat(false);
                }
              }}
            />
          ))}

          {loadingChat && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff3366] to-pink-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-[#ff3366]/20">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 px-5 py-4 rounded-[24px] rounded-tl-sm flex gap-1.5 items-center shadow-sm">
                <span className="w-1.5 h-1.5 bg-[#ff3366] rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-[#ff3366] rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-[#ff3366] rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* ── Input bar ── */}
        <div className="px-5 pb-5 pt-0">
          <form onSubmit={handleSend} className="flex items-center gap-3 bg-gray-50 dark:bg-[#15171A] border border-gray-200 dark:border-white/10 focus-within:border-[#ff3366]/40 focus-within:ring-4 focus-within:ring-[#ff3366]/10 rounded-full pl-6 pr-2 py-2 transition-all duration-300 shadow-inner">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={loadingChat}
              className="flex-1 bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={!input.trim() || loadingChat}
              className="w-10 h-10 flex items-center justify-center bg-[#ff3366] rounded-full hover:bg-[#e02957] hover:shadow-lg hover:shadow-[#ff3366]/30 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 shrink-0"
            >
              {loadingChat ? <Loader2 size={16} className="animate-spin text-white" /> : <Send size={15} className="text-white ml-0.5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function AIModelsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const setSearchQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const [models, setModels] = useState<ORModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('All Models');
  const [displayLimit, setDisplayLimit] = useState(30);
  const [selectedModel, setSelectedModel] = useState<ORModel | null>(null);
  const [detailModel, setDetailModel] = useState<ORModel | null>(null);

  useEffect(() => {
    fetch('/api/openrouter/models')
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        if (data.data && Array.isArray(data.data)) setModels(data.data);
      })
      .catch(err => setError(err.message || 'Failed to fetch models'))
      .finally(() => setLoading(false));
  }, []);

  const filteredModels = useMemo(() => models.filter(m => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q);
    if (category === 'Free Models') return matchesSearch && isFreeModel(m.pricing);
    if (category === 'Latest') return matchesSearch && m.id.includes('latest');
    return matchesSearch;
  }), [models, searchQuery, category]);

  const topIntelligence = useMemo(() => [...models].sort((a, b) => (b.benchmarks?.artificial_analysis?.intelligence_index || 0) - (a.benchmarks?.artificial_analysis?.intelligence_index || 0)).slice(0, 5), [models]);
  const topModels = useMemo(() => [...models].sort((a, b) => (b.benchmarks?.artificial_analysis?.intelligence_index || 0) - (a.benchmarks?.artificial_analysis?.intelligence_index || 0)).slice(0, 6), [models]);
  const topCoding = useMemo(() => [...models].sort((a, b) => (b.benchmarks?.artificial_analysis?.coding_index || 0) - (a.benchmarks?.artificial_analysis?.coding_index || 0))[0], [models]);
  const bestValue = useMemo(() => [...models].filter(m => { const p = parseFloat(m.pricing?.prompt || '0'); return p > 0 && p < 0.000005; }).sort((a, b) => (b.benchmarks?.artificial_analysis?.intelligence_index || 0) - (a.benchmarks?.artificial_analysis?.intelligence_index || 0))[0], [models]);
  const freeModelsList = useMemo(() => models.filter(m => isFreeModel(m.pricing)), [models]);
  const freeModelsShort = useMemo(() => freeModelsList.slice(0, 5), [freeModelsList]);
  const latestModels = useMemo(() => models.filter(m => m.id.includes('latest')).slice(0, 5), [models]);
  const providers = useMemo(() => { const p = new Set<string>(); models.forEach(m => { const parts = m.id.split('/'); if (parts.length > 1) p.add(parts[0]); }); return Array.from(p).slice(0, 20); }, [models]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 size={40} className="animate-spin text-[#ff3366]" />
      <p className="text-gray-500 dark:text-muted text-sm">Loading models from OpenRouter API...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 text-[#ff3366] bg-[#ff3366]/10 rounded-2xl border border-[#ff3366]/20 max-w-lg mx-auto mt-20 p-8">
      <p className="font-bold text-lg">Failed to load AI models</p>
      <p className="text-sm mt-2 opacity-80">{error}</p>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 relative">

      {/* Model Detail Modal */}
      {detailModel && <ModelDetailModal model={detailModel} onClose={() => setDetailModel(null)} />}

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="text-center mb-14 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ff3366]/15 blur-[120px] rounded-full pointer-events-none" />
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#ff3366] mb-5 bg-[#ff3366]/10 px-4 py-2 rounded-full border border-[#ff3366]/20">
          <Zap size={12} fill="currentColor" /> Powered by OpenRouter
        </span>
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 dark:text-white tracking-tight relative z-10">Discover Models</h1>
        <p className="text-gray-500 dark:text-muted max-w-2xl mx-auto text-lg relative z-10">
          Browse, compare, and chat with {models.length}+ AI models. Try free models instantly below.
        </p>
      </div>

      {/* â”€â”€ Inline Playground â”€â”€ */}
      <InlinePlayground freeModels={freeModelsList} />

      {/* â”€â”€ Top AI Models â”€â”€ */}
      {topModels.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Trophy size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Top AI Models</h2>
              <p className="text-xs text-gray-500 dark:text-muted">Ranked by Artificial Analysis intelligence score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topModels.map((model, i) => {
              const provider = model.id.split('/')[0];
              const score = model.benchmarks?.artificial_analysis?.intelligence_index || 0;
              const isFirst = i === 0;

              return (
                <div
                  key={model.id}
                  onClick={() => setDetailModel(model)}
                  className={`relative group rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden ${isFirst
                      ? 'bg-gradient-to-br from-[#ff3366] to-pink-600 text-white shadow-xl shadow-[#ff3366]/30 col-span-1 sm:col-span-2 lg:col-span-1'
                      : 'bg-white dark:bg-[#0E0F12] border border-gray-200/60 dark:border-white/8 hover:border-[#ff3366]/40'
                    }`}
                >
                  {/* rank badge */}
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-sm ${isFirst ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-muted'}`}>
                    {i + 1}
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-transparent to-white/5" />

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 shrink-0 shadow-inner ${isFirst ? 'bg-white/20' : 'bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10'}`}>
                      <ProviderImg id={provider} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-base leading-tight truncate ${isFirst ? 'text-white' : 'text-gray-900 dark:text-white group-hover:text-[#ff3366] transition-colors'}`}>{model.name}</h3>
                      <p className={`text-xs capitalize mt-0.5 ${isFirst ? 'text-white/70' : 'text-gray-500 dark:text-muted'}`}>{provider}</p>
                    </div>
                  </div>

                  {/* Score bar */}
                  {score > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isFirst ? 'text-white/70' : 'text-gray-400 dark:text-muted'}`}>Intelligence</span>
                        <span className={`text-sm font-black font-mono ${isFirst ? 'text-white' : 'text-[#ff3366]'}`}>{score}</span>
                      </div>
                      <div className={`h-1.5 rounded-full overflow-hidden ${isFirst ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/10'}`}>
                        <div className={`h-full rounded-full transition-all ${isFirst ? 'bg-white' : 'bg-gradient-to-r from-[#ff3366] to-pink-500'}`} style={{ width: `${score * 1.2}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className={`text-xs font-bold font-mono ${isFirst ? 'text-white/80' : 'text-gray-500 dark:text-muted'}`}>
                      {fmtCtx(model.context_length)} ctx
                    </div>
                    <div className="flex gap-1.5">
                      {isFreeModel(model.pricing) && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${isFirst ? 'bg-white/20 text-white' : 'bg-[#ff3366]/10 text-[#ff3366]'}`}>Free</span>
                      )}
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${isFirst ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-muted'}`}>Details â†’</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* â”€â”€ Rankings â”€â”€ */}
      {topIntelligence.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="lg:col-span-2 bg-white/60 dark:bg-[#111213]/60 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/10 p-8 shadow-xl">
            <p className="text-xs font-black text-[#ff3366] mb-2 uppercase tracking-widest">Today's frontier</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{topIntelligence[0]?.name} takes the frontier lead</h2>
            <p className="text-sm text-gray-500 dark:text-muted mb-8">Top performing models on the Artificial Analysis intelligence index.</p>
            <div className="space-y-2">
              <div className="flex text-xs font-semibold text-gray-400 dark:text-muted/60 uppercase tracking-wider px-3 mb-3">
                <div className="w-8" /><div className="flex-1">Model</div><div className="w-32 text-right">Intelligence</div>
              </div>
              {topIntelligence.map((model, i) => (
                <div key={model.id} onClick={() => setDetailModel(model)} className="flex items-center text-sm py-2.5 px-3 group hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
                  <div className="w-8 text-gray-400 dark:text-muted font-black font-mono">{i + 1}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                      <ProviderImg id={model.id.split('/')[0]} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white group-hover:text-[#ff3366] transition-colors">{model.name}</div>
                      <div className="text-xs text-gray-500 dark:text-muted capitalize">{model.id.split('/')[0]}</div>
                    </div>
                  </div>
                  <div className="w-48 flex items-center gap-3 justify-end">
                    <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#ff3366] to-pink-500 rounded-full" style={{ width: `${(model.benchmarks?.artificial_analysis?.intelligence_index || 0) * 1.2}%` }} />
                    </div>
                    <div className="font-black font-mono text-gray-900 dark:text-white w-8 text-right">{model.benchmarks?.artificial_analysis?.intelligence_index}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div onClick={() => topCoding && setDetailModel(topCoding)} className="bg-white/60 dark:bg-[#111213]/60 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/10 p-6 flex flex-col justify-center flex-1 shadow-lg hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="text-xs font-black text-gray-500 dark:text-muted mb-4 flex items-center gap-1.5 uppercase tracking-widest">
                <Code size={14} className="text-[#ff3366]" /> Smartest coding
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center p-1.5 shadow-sm">
                  <ProviderImg id={topCoding?.id?.split('/')[0] || ''} />
                </div>
                <div className="font-bold text-lg text-gray-900 dark:text-white truncate">{topCoding?.name}</div>
              </div>
              <div className="text-4xl font-black text-[#ff3366] font-mono">{topCoding?.benchmarks?.artificial_analysis?.coding_index || '--'}<span className="text-sm font-medium text-gray-400 ml-2">index</span></div>
            </div>
            <div onClick={() => bestValue && setDetailModel(bestValue)} className="bg-white/60 dark:bg-[#111213]/60 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/10 p-6 flex flex-col justify-center flex-1 shadow-lg hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="text-xs font-black text-gray-500 dark:text-muted mb-4 flex items-center gap-1.5 uppercase tracking-widest">
                <Zap size={14} className="text-yellow-500" fill="currentColor" /> Best value
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center p-1.5 shadow-sm">
                  <ProviderImg id={bestValue?.id?.split('/')[0] || ''} />
                </div>
                <div className="font-bold text-lg text-gray-900 dark:text-white truncate">{bestValue?.name}</div>
              </div>
              <div className="text-4xl font-black text-gray-900 dark:text-white font-mono">{formatPrice(bestValue?.pricing?.prompt)}<span className="text-sm font-medium text-gray-400 ml-2">/M tok</span></div>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€ Providers Marquee â”€â”€ */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Explore model providers</h2>
          <p className="text-sm text-gray-500 dark:text-muted">Access {models.length} models from {providers.length} leading AI providers.</p>
        </div>
        <div className="overflow-hidden relative py-6">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-base to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-base to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 w-max animate-scroll-left hover:[animation-play-state:paused]">
            {providers.concat(providers).map((provider, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 bg-white/80 dark:bg-[#111213]/80 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl whitespace-nowrap shadow-md hover:shadow-xl hover:border-[#ff3366]/50 hover:-translate-y-1 transition-all cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <ProviderImg id={provider} className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-sm capitalize">{provider}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ Curated Lists â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        <div className="bg-white/60 dark:bg-[#111213]/60 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/10 p-8 shadow-lg">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Always-latest aliases</h3>
          <p className="text-xs text-gray-500 dark:text-muted mb-6">Pin one model ID and always get the newest release.</p>
          <div className="space-y-2">
            {latestModels.map((m, i) => (
              <div key={m.id} onClick={() => setDetailModel(m)} className="flex items-center text-sm py-3 px-3 hover:bg-white dark:hover:bg-white/10 rounded-2xl transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10 cursor-pointer group">
                <div className="w-6 text-gray-400 dark:text-muted/60 font-mono text-xs">{i + 1}</div>
                <div className="flex-1 flex items-center gap-3">
                  <ProviderImg id={m.id.split('/')[0]} className="w-5 h-5 object-contain" />
                  <span className="font-bold text-gray-900 dark:text-white truncate group-hover:text-[#ff3366] transition-colors">{m.name}</span>
                </div>
                <div className="text-right text-gray-500 dark:text-muted text-xs font-mono font-bold">{fmtCtx(m.context_length)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/60 to-pink-50/30 dark:from-[#111213]/60 dark:to-[#0A0A0B]/60 backdrop-blur-xl rounded-3xl border border-[#ff3366]/10 dark:border-white/10 p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff3366]/5 blur-[80px] rounded-full pointer-events-none" />
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1 relative z-10">Free models</h3>
          <p className="text-xs text-gray-500 dark:text-muted mb-6 relative z-10">Use these models in the Playground above â€” completely free.</p>
          <div className="space-y-2 relative z-10">
            {freeModelsShort.map((m, i) => (
              <div key={m.id} onClick={() => setDetailModel(m)} className="flex items-center text-sm py-3 px-3 hover:bg-white dark:hover:bg-white/10 rounded-2xl transition-all border border-transparent hover:border-[#ff3366]/20 cursor-pointer group">
                <div className="w-6 text-gray-400 dark:text-muted/60 font-mono text-xs">{i + 1}</div>
                <div className="flex-1 flex items-center gap-3">
                  <ProviderImg id={m.id.split('/')[0]} className="w-5 h-5 object-contain" />
                  <span className="font-bold text-gray-900 dark:text-white truncate group-hover:text-[#ff3366] transition-colors">{m.name}</span>
                </div>
                <span className="text-[10px] font-black text-[#ff3366] bg-[#ff3366]/10 px-2 py-0.5 rounded-md uppercase">Free</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ All Models â”€â”€ */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">
          All Models <span className="text-[#ff3366] text-xl font-bold">({filteredModels.length})</span>
        </h2>
        <div className="flex gap-1.5 bg-gray-100 dark:bg-[#111213] p-1.5 rounded-2xl">
          {['All Models', 'Free Models', 'Latest'].map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${category === c ? 'bg-white dark:bg-white/10 text-[#ff3366] shadow-sm' : 'bg-transparent text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="relative mb-10 group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff3366]/20 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-muted z-10" size={22} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search all OpenRouter models..."
          className="w-full bg-white dark:bg-[#090A0A] border-2 border-gray-200 dark:border-white/10 rounded-2xl py-5 pl-14 pr-5 text-lg font-medium text-gray-900 dark:text-white outline-none focus:border-[#ff3366] dark:focus:border-[#ff3366] transition-all shadow-lg relative z-10 placeholder-gray-400 dark:placeholder-white/20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredModels.slice(0, displayLimit).map(model => (
          <div
            key={model.id}
            onClick={() => setDetailModel(model)}
            className="relative group flex flex-col rounded-3xl bg-white dark:bg-[#0B0C10] border border-gray-200/60 dark:border-white/5 hover:border-[#ff3366]/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff3366]/0 to-[#ff3366]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="p-7 flex-1 flex flex-col relative z-10">
              <div className="flex gap-4 items-start mb-6">
                <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 p-2.5 shrink-0 flex items-center justify-center shadow-inner">
                  <ProviderImg id={model.id.split('/')[0]} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-gray-400 dark:text-muted uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    {model.architecture?.modality?.includes('image') && !model.architecture?.modality?.includes('text->text') ? 'IMAGE' : 'CHAT'}
                    {isFreeModel(model.pricing) && <span className="text-[#ff3366] bg-[#ff3366]/10 px-1.5 py-0.5 rounded-md text-[9px]">FREE</span>}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight line-clamp-2 group-hover:text-[#ff3366] transition-colors">{model.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5 mt-auto bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                {[['Cached/1M', model.pricing?.input_cache_read], ['Input/1M', model.pricing?.prompt], ['Output/1M', model.pricing?.completion]].map(([label, val]) => (
                  <div key={label as string}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-muted mb-1">{label}</div>
                    <div className="font-mono font-bold text-gray-900 dark:text-white text-sm">{formatPrice(val as string)}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                {model.supported_parameters?.includes('tools') && <span className="text-[10px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-lg">FUNC CALLING</span>}
                {model.supported_parameters?.includes('response_format') && <span className="text-[10px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-lg">JSON MODE</span>}
                <span className="text-[11px] font-black text-gray-400 dark:text-muted uppercase tracking-wider ml-auto">{fmtCtx(model.context_length)} CTX</span>
              </div>
            </div>

            {/* Click hint */}
            <div className="px-7 pb-5 relative z-10">
              <div className="text-[10px] font-bold text-gray-300 dark:text-white/20 uppercase tracking-widest group-hover:text-[#ff3366]/50 transition-colors">Click for details â†’</div>
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length > displayLimit && (
        <div className="mt-12 text-center pb-10">
          <button onClick={() => setDisplayLimit(prev => prev + 30)} className="bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-wider py-4 px-10 rounded-full hover:scale-105 hover:shadow-xl transition-all text-sm">
            Load More Models
          </button>
        </div>
      )}
    </div>
  );
}

export default function AIModels() {
  return (
    <React.Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={40} className="animate-spin text-[#ff3366]" />
        <p className="text-gray-500 dark:text-muted text-sm">Loading models from OpenRouter API...</p>
      </div>
    }>
      <AIModelsContent />
    </React.Suspense>
  );
}
