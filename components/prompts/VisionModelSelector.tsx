"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { 
  ChevronDown, Check, Plus, Key, Trash2, Eye, EyeOff, 
  Sparkles, ShieldCheck, X, Cpu, Zap, Settings2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface VisionModel {
  id: string;
  name: string;
  provider: "openai" | "anthropic" | "google" | "xai" | "deepseek" | "midjourney" | "flux" | "custom";
  modelName: string;
  logo: string;
  tagline: string;
  isCustom?: boolean;
  apiKey?: string;
  badge?: string;
}

export const PRESET_MODELS: VisionModel[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    modelName: "gpt-4o",
    provider: "openai",
    logo: "/models/chatgpt.svg",
    tagline: "GPT-4o Vision • Exceptional detail & context",
    badge: "Popular"
  },
  {
    id: "claude",
    name: "Claude",
    modelName: "claude-3-5-sonnet",
    provider: "anthropic",
    logo: "/models/claude.svg",
    tagline: "Claude 3.5 Sonnet • World-class nuance & styles",
    badge: "Accurate"
  },
  {
    id: "gemini",
    name: "Gemini",
    modelName: "gemini-1.5-flash",
    provider: "google",
    logo: "/models/gemini.svg",
    tagline: "Gemini 1.5 Flash • Ultra-fast multi-modal parsing",
    badge: "Fast"
  },
  {
    id: "grok",
    name: "Grok",
    modelName: "grok-2-vision",
    provider: "xai",
    logo: "/models/grok.svg",
    tagline: "Grok 2 Vision • Unfiltered, creative reverse-engineering",
    badge: "Creative"
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    modelName: "deepseek-vl",
    provider: "deepseek",
    logo: "/models/deepseek.svg",
    tagline: "DeepSeek-VL • Advanced technical prompt structures",
    badge: "Smart"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    modelName: "midjourney-v6.1",
    provider: "midjourney",
    logo: "/models/midjourney.svg",
    tagline: "Midjourney v6.1 • Tuned for stylize & photorealism",
    badge: "Artistic"
  },
  {
    id: "flux",
    name: "FLUX / GLoC",
    modelName: "flux-1-dev",
    provider: "flux",
    logo: "/models/midjourney.svg",
    tagline: "FLUX.1 Kontext • Crisp textures, typography & optics",
    badge: "NextGen"
  }
];

const PROVIDER_CONFIG = {
  openai: {
    label: "OpenAI (ChatGPT)",
    defaultModel: "gpt-4o",
    logo: "/models/chatgpt.svg",
    placeholder: "sk-proj-...",
    keyHelp: "platform.openai.com/api-keys"
  },
  anthropic: {
    label: "Anthropic (Claude)",
    defaultModel: "claude-3-5-sonnet-20241022",
    logo: "/models/claude.svg",
    placeholder: "sk-ant-...",
    keyHelp: "console.anthropic.com/settings/keys"
  },
  google: {
    label: "Google (Gemini)",
    defaultModel: "gemini-1.5-flash",
    logo: "/models/gemini.svg",
    placeholder: "AIzaSy...",
    keyHelp: "aistudio.google.com/app/apikey"
  },
  xai: {
    label: "xAI (Grok)",
    defaultModel: "grok-2-vision-1212",
    logo: "/models/grok.svg",
    placeholder: "xai-...",
    keyHelp: "console.x.ai"
  },
  deepseek: {
    label: "DeepSeek",
    defaultModel: "deepseek-chat",
    logo: "/models/deepseek.svg",
    placeholder: "sk-...",
    keyHelp: "platform.deepseek.com/api_keys"
  },
  custom: {
    label: "Custom / OpenRouter",
    defaultModel: "openai/gpt-4o",
    logo: "/models/chatgpt.svg",
    placeholder: "sk-or-...",
    keyHelp: "openrouter.ai/keys"
  }
};

interface VisionModelSelectorProps {
  selectedModel: VisionModel;
  onSelectModel: (model: VisionModel) => void;
}

export function VisionModelSelector({ selectedModel, onSelectModel }: VisionModelSelectorProps) {
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [customModels, setCustomModels] = useState<VisionModel[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal form states
  const [provider, setProvider] = useState<keyof typeof PROVIDER_CONFIG>("openai");
  const [displayName, setDisplayName] = useState("");
  const [modelIdentifier, setModelIdentifier] = useState(PROVIDER_CONFIG.openai.defaultModel);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [formError, setFormError] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load custom models from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("procraft_custom_vision_models") || localStorage.getItem("nexpedia_custom_vision_models");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCustomModels(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load custom models", e);
    }
  }, []);

  // Update default model ID when provider changes in modal
  useEffect(() => {
    setModelIdentifier(PROVIDER_CONFIG[provider].defaultModel);
    if (!displayName || Object.values(PROVIDER_CONFIG).some(p => p.label === displayName)) {
      setDisplayName(`${PROVIDER_CONFIG[provider].label.split(" ")[0]} Custom API`);
    }
  }, [provider]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveCustomModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setFormError("Please enter a valid API key.");
      return;
    }

    const newModel: VisionModel = {
      id: `custom-${Date.now()}`,
      name: displayName.trim() || `${PROVIDER_CONFIG[provider].label} API`,
      modelName: modelIdentifier.trim() || PROVIDER_CONFIG[provider].defaultModel,
      provider: provider as any,
      logo: PROVIDER_CONFIG[provider].logo,
      tagline: `Custom ${PROVIDER_CONFIG[provider].label} • Using your API key`,
      isCustom: true,
      apiKey: apiKey.trim(),
      badge: "Your API"
    };

    const updated = [newModel, ...customModels];
    setCustomModels(updated);
    try {
      localStorage.setItem("procraft_custom_vision_models", JSON.stringify(updated));
    } catch (err) {
      console.error("Error saving custom model", err);
    }

    // Activate the newly added model
    onSelectModel(newModel);

    // Reset and close
    setApiKey("");
    setDisplayName("");
    setFormError("");
    setModalOpen(false);
    setDropdownOpen(false);
  };

  const handleDeleteCustomModel = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customModels.filter(m => m.id !== id);
    setCustomModels(updated);
    try {
      localStorage.setItem("procraft_custom_vision_models", JSON.stringify(updated));
    } catch (err) {
      console.error("Error updating custom models", err);
    }

    // If currently selected model was deleted, fallback to default
    if (selectedModel.id === id) {
      onSelectModel(PRESET_MODELS[0]);
    }
  };

  return (
    <>
      {/* ── Model Selector Dropdown Trigger ── */}
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#EA4C89]/60 hover:bg-[#EA4C89]/5 transition-all text-xs font-semibold text-primary shadow-xs group cursor-pointer"
          title="Select AI Vision Model or Add Custom API"
        >
          {/* Active status pulse */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>

          {/* Model Logo */}
          <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center shrink-0">
            {selectedModel.logo.startsWith("http") || selectedModel.logo.startsWith("/") ? (
              <Image
                src={selectedModel.logo}
                alt={selectedModel.name}
                width={16}
                height={16}
                className="object-contain w-3.5 h-3.5"
                unoptimized
              />
            ) : (
              <span className="text-xs">{selectedModel.logo}</span>
            )}
          </div>

          {/* Model Name */}
          <span className="font-semibold text-primary group-hover:text-[#EA4C89] transition-colors">
            {selectedModel.name}
          </span>

          {/* Custom key badge */}
          {selectedModel.isCustom ? (
            <span className="text-[10px] font-bold text-[#EA4C89] bg-[#EA4C89]/10 px-1.5 py-0.2 rounded-md border border-[#EA4C89]/25">
              API
            </span>
          ) : (
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              Active
            </span>
          )}

          <ChevronDown
            size={13}
            className={`text-muted transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-primary" : ""}`}
          />
        </button>

        {/* ── Dropdown Menu ── */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-[#12141a] border border-black/10 dark:border-white/10 shadow-2xl p-2 z-50 backdrop-blur-xl"
            >
              {/* Header */}
              <div className="px-3 py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Cpu size={12} className="text-[#EA4C89]" /> Select Vision Model
                </span>
                <span className="text-[10px] text-muted/70">
                  {PRESET_MODELS.length + customModels.length} available
                </span>
              </div>

              {/* Models List */}
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar py-1 space-y-1">
                {/* User's Custom API Models (if any) */}
                {customModels.length > 0 && (
                  <div className="mb-2 pb-2 border-b border-black/5 dark:border-white/5">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#EA4C89] flex items-center justify-between">
                      <span>Your Custom Models</span>
                      <span className="text-[9px] bg-[#EA4C89]/10 px-1.5 py-0.5 rounded text-[#EA4C89]">BYOK</span>
                    </div>
                    {customModels.map((m) => {
                      const isSelected = selectedModel.id === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => {
                            onSelectModel(m);
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer group ${
                            isSelected
                              ? "bg-[#EA4C89]/10 text-primary border border-[#EA4C89]/30"
                              : "hover:bg-black/5 dark:hover:bg-white/5 text-muted hover:text-primary"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-5 h-5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 p-0.5">
                              <Image src={m.logo} alt={m.name} width={16} height={16} className="object-contain" unoptimized />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-xs text-primary truncate">{m.name}</span>
                                <span className="text-[9px] font-bold text-[#EA4C89] bg-[#EA4C89]/15 px-1 rounded">API</span>
                              </div>
                              <p className="text-[10px] text-muted truncate">{m.modelName}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0 ml-2">
                            {isSelected && <Check size={14} className="text-[#EA4C89]" />}
                            <button
                              type="button"
                              onClick={(e) => handleDeleteCustomModel(m.id, e)}
                              className="p-1 rounded hover:bg-red-500/10 text-muted hover:text-red-500 opacity-60 group-hover:opacity-100 transition-opacity"
                              title="Delete this custom API key"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Preset Built-in Models */}
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                  Standard Models
                </div>
                {PRESET_MODELS.map((m) => {
                  const isSelected = selectedModel.id === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        onSelectModel(m);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#EA4C89]/10 text-primary border border-[#EA4C89]/30"
                          : "hover:bg-black/5 dark:hover:bg-white/5 text-muted hover:text-primary"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-5 h-5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 p-0.5">
                          <Image src={m.logo} alt={m.name} width={16} height={16} className="object-contain" unoptimized />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-xs text-primary truncate">{m.name}</span>
                            {m.badge && (
                              <span className="text-[9px] font-medium text-muted/80 bg-black/5 dark:bg-white/5 px-1.5 py-0.2 rounded">
                                {m.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-muted truncate">{m.tagline}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <Check size={14} className="text-[#EA4C89] shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom API Button */}
              <div className="pt-2 mt-1 border-t border-black/5 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    setModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#EA4C89]/10 hover:bg-[#EA4C89]/20 text-[#EA4C89] border border-[#EA4C89]/30 text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add your API Key</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Add Your API Modal (Portaled directly to document.body) ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {modalOpen && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl bg-white dark:bg-[#12141a] border border-black/10 dark:border-white/10 shadow-2xl p-6 sm:p-7 my-auto z-10"
              >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-muted hover:text-primary transition-colors"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-[#EA4C89]/10 border border-[#EA4C89]/25 flex items-center justify-center text-[#EA4C89]">
                  <Key size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary">Connect Your Own Vision API</h3>
                  <p className="text-xs text-muted">Use your custom API key for unlimited high-accuracy image to prompt runs.</p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSaveCustomModel} className="space-y-4">
                {/* 1. Select Provider */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-2">
                    Select AI Provider
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(Object.keys(PROVIDER_CONFIG) as Array<keyof typeof PROVIDER_CONFIG>).map((key) => {
                      const cfg = PROVIDER_CONFIG[key];
                      const isChosen = provider === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setProvider(key)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                            isChosen
                              ? "border-[#EA4C89] bg-[#EA4C89]/10 text-primary shadow-xs"
                              : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-muted"
                          }`}
                        >
                          <Image src={cfg.logo} alt={cfg.label} width={18} height={18} className="object-contain" unoptimized />
                          <span className="truncate">{cfg.label.split(" ")[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Model Identifier */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-primary">
                      Model ID
                    </label>
                    <span className="text-[10px] text-muted">e.g. {PROVIDER_CONFIG[provider].defaultModel}</span>
                  </div>
                  <input
                    type="text"
                    value={modelIdentifier}
                    onChange={(e) => setModelIdentifier(e.target.value)}
                    placeholder={PROVIDER_CONFIG[provider].defaultModel}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-primary focus:outline-hidden focus:border-[#EA4C89] transition-colors"
                  />
                </div>

                {/* 3. Nickname */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    Model Nickname
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={`${PROVIDER_CONFIG[provider].label} API`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-primary focus:outline-hidden focus:border-[#EA4C89] transition-colors"
                  />
                </div>

                {/* 4. API Key */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-primary">
                      API Secret Key
                    </label>
                    <a
                      href={`https://${PROVIDER_CONFIG[provider].keyHelp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#EA4C89] hover:underline"
                    >
                      Get {PROVIDER_CONFIG[provider].label.split(" ")[0]} key ↗
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);
                        if (formError) setFormError("");
                      }}
                      placeholder={PROVIDER_CONFIG[provider].placeholder}
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-primary font-mono focus:outline-hidden focus:border-[#EA4C89] transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                    >
                      {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Privacy Guarantee */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] flex items-center gap-2">
                  <ShieldCheck size={16} className="shrink-0" />
                  <span>Your API key is stored only on this device in localStorage and is never shared or saved to our servers.</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold text-muted hover:text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#EA4C89] hover:bg-[#d63f78] text-white text-xs font-bold transition-all shadow-md shadow-[#EA4C89]/25 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles size={14} />
                    <span>Save & Select Model</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
  </>
  );
}
