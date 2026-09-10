"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Sparkles, Loader2, Copy, Check, RotateCcw, Menu, X, ArrowRight, Bot, Wrench, ListOrdered, FileText } from 'lucide-react';

interface AgentData {
  id: string;
  name: string;
  role: string;
  recommendedModel: string;
  requiredTools: string[];
  sampleWorkflow: string[];
  systemPrompt: string;
  createdAt: number;
}

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function AgentBuilderPage() {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeAgent, setActiveAgent] = useState<AgentData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setSidebarOpen(true);
    }
  }, []);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = ["Checking the library...", "Designing your agent...", "Finalizing prompt..."];

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('agentHistory');
    if (saved) {
      try {
        setAgents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse agent history");
      }
    }
  }, []);

  // Save history on change
  useEffect(() => {
    localStorage.setItem('agentHistory', JSON.stringify(agents));
  }, [agents]);

  // Loading message rotation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async (forceNew: boolean = false, overridePrompt: string = prompt) => {
    if (!overridePrompt.trim()) return;

    setLoading(true);
    setError(null);
    setLoadingMessageIndex(0);

    if (forceNew) {
      setActiveAgent(null);
    }

    try {
      const res = await fetch('/api/generate-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: overridePrompt })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate agent');
      }

      const newAgent: AgentData = {
        ...data.data,
        id: Date.now().toString(),
        createdAt: Date.now()
      };

      setActiveAgent(newAgent);
      if (!forceNew || !activeAgent || activeAgent.id !== newAgent.id) {
        setAgents(prev => [newAgent, ...prev]);
      }

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!activeAgent) return;
    navigator.clipboard.writeText(activeAgent.systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectAgent = (agent: AgentData | null) => {
    setActiveAgent(agent);
    setPrompt('');
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const suggestions = [
    "Customer support agent",
    "Social media caption writer",
    "Code reviewer",
    "Email reply assistant",
    "SEO blog writer"
  ];

  const filteredAgents = agents.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white dark:bg-[#0E0F11]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar (Left) ── */}
      <div className={`fixed md:relative z-50 w-72 shrink-0 h-full bg-gray-50 dark:bg-[#15171A] border-r border-gray-200 dark:border-white/10 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0 md:ml-0' : '-translate-x-full md:-ml-72'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center md:block">
          <button
            onClick={() => handleSelectAgent(null)}
            className="w-full flex items-center gap-2 justify-center py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm text-sm font-semibold text-gray-800 dark:text-white"
          >
            <Plus size={16} /> New Agent
          </button>
          <button className="md:hidden p-2" onClick={() => setSidebarOpen(false)}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-4 pb-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#0E0F11] border border-gray-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-accent transition-colors text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredAgents.length === 0 ? (
            <p className="text-center text-xs text-gray-400 mt-4">No agents found.</p>
          ) : (
            filteredAgents.map(agent => (
              <button
                key={agent.id}
                onClick={() => handleSelectAgent(agent)}
                className={`w-full text-left p-3 rounded-xl transition-all ${activeAgent?.id === agent.id ? 'bg-accent/10 border border-accent/20' : 'hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent'}`}
              >
                <div className="font-bold text-sm text-gray-900 dark:text-white truncate">{agent.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{agent.role}</div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Main Panel ── */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 shrink-0 bg-white dark:bg-[#0E0F11]">
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-600 dark:text-gray-300 transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">

              <span className="font-bold text-gray-900 dark:text-white tracking-tight">Agent Builder</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col relative pb-20">

          {/* Active Result State */}
          {activeAgent && (
            <ScrollReveal variant="slide-up" duration={0.6} className="max-w-3xl mx-auto w-full p-6 lg:p-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-6">
                <Sparkles size={12} />
                {activeAgent.createdAt > Date.now() - 5000 ? 'Freshly generated' : 'From the library'}
              </div>

              {/* Header Info */}
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                {activeAgent.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {activeAgent.role}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                    <Sparkles size={14} /> Recommended Model
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {activeAgent.recommendedModel}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <Wrench size={14} /> Required Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeAgent.requiredTools.map((tool, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Workflow */}
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                  <ListOrdered size={16} /> Sample Workflow
                </h3>
                <div className="space-y-3 pl-2">
                  {activeAgent.sampleWorkflow.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Prompt */}
              <div className="mb-10 relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <FileText size={16} /> System Prompt
                  </h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors bg-white dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 shadow-sm"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    {copied ? 'Copied ✓' : 'Copy Prompt'}
                  </button>
                </div>
                <div className="bg-[#1E1E1E] rounded-2xl p-5 overflow-x-auto shadow-inner border border-white/10">
                  <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {activeAgent.systemPrompt}
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-white/10">
                <button
                  onClick={() => { setPrompt(activeAgent.role); setActiveAgent(null); }}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold text-sm transition-colors border border-gray-200 dark:border-transparent"
                >
                  Refine this
                </button>
                <button
                  onClick={() => handleGenerate(true, activeAgent.role)}
                  className="px-5 py-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold text-sm transition-colors flex items-center gap-2 border border-gray-200 dark:border-white/10"
                >
                  <RotateCcw size={16} /> Regenerate
                </button>
              </div>
            </ScrollReveal>
          )}

          {/* Empty / Initial State Content (Centered) */}
          {!activeAgent && !loading && (
            <ScrollReveal variant="slide-up" duration={0.6} className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto w-full">

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
                Describe the agent you want to build
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                We'll generate a complete agent profile, workflow, and optimized system prompt.
              </p>

              {/* Central Input Box */}
              <div className="w-full relative mb-8">
                <div className={`relative bg-white dark:bg-[#1E1E20] rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-gray-200 dark:border-white/10 overflow-hidden focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 transition-all min-h-[120px] text-left`}>
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGenerate(true);
                      }
                    }}
                    disabled={loading}
                    placeholder="A friendly customer support agent that helps users troubleshoot billing issues..."
                    className={`w-full bg-transparent resize-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400 p-4 md:p-5 min-h-[120px] pb-14 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
                  />

                  <div className={`absolute bottom-3 right-3`}>
                    <button
                      onClick={() => handleGenerate(true)}
                      disabled={!prompt.trim() || loading}
                      className={`flex items-center justify-center rounded-xl bg-accent hover:bg-accent-hover text-black transition-all disabled:opacity-40 disabled:pointer-events-none shadow-md px-4 py-2 gap-2 font-bold text-sm`}
                    >
                      Generate <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Error state */}
                {error && (
                  <div className="absolute -top-10 left-0 right-0 flex justify-center">
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                      {error}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(suggestion)}
                    className="px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-accent hover:text-accent text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              
              <p className="text-center text-xs text-gray-400 mt-2">
                Agent Builder can make mistakes. Please review the system prompt before deploying.
              </p>
            </ScrollReveal>
          )}

          {/* Loading State Content */}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-accent blur-xl opacity-20 rounded-full animate-pulse" />
                <div className="w-16 h-16 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl flex items-center justify-center relative">
                  <Loader2 size={28} className="animate-spin text-accent" />
                </div>
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-white animate-pulse">
                {loadingMessages[loadingMessageIndex]}
              </p>
            </div>
          )}

        </div>

        {/* Floating Input Area (Only visible when loading or activeAgent is present) */}
        {(loading || activeAgent) && (
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white dark:from-[#0E0F11] dark:via-[#0E0F11] to-transparent pt-10 pb-6 px-4 md:px-10 transition-all duration-500 ${activeAgent ? 'border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0E0F11] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pt-6' : ''}`}>
            <div className="max-w-3xl mx-auto w-full relative animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`relative bg-white dark:bg-[#1E1E20] rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-gray-200 dark:border-white/10 overflow-hidden focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 transition-all ${activeAgent ? 'h-14' : 'min-h-[120px]'}`}>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate(true);
                    }
                  }}
                  disabled={loading}
                  placeholder={activeAgent ? "Refine this agent or start a new one..." : "A friendly customer support agent that helps users troubleshoot billing issues..."}
                  className={`w-full bg-transparent resize-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400 p-4 md:p-5 ${activeAgent ? 'h-14 pt-4 pr-16' : 'min-h-[120px] pb-14'} [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
                />

                <div className={`absolute ${activeAgent ? 'right-2 top-2' : 'bottom-3 right-3'}`}>
                  <button
                    onClick={() => handleGenerate(true)}
                    disabled={!prompt.trim() || loading}
                    className={`flex items-center justify-center rounded-xl bg-accent hover:bg-accent-hover text-black transition-all disabled:opacity-40 disabled:pointer-events-none shadow-md ${activeAgent ? 'w-10 h-10' : 'px-4 py-2 gap-2 font-bold text-sm'}`}
                  >
                    {activeAgent ? (
                      <ArrowRight size={18} />
                    ) : (
                      <>Generate <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </div>

              {/* Error state */}
              {error && (
                <div className="absolute -top-10 left-0 right-0 flex justify-center">
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                    {error}
                  </div>
                </div>
              )}

              {!activeAgent && (
                <p className="text-center text-xs text-gray-400 mt-3">
                  Agent Builder can make mistakes. Please review the system prompt before deploying.
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
