"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Search, Loader2, Sparkles, BadgeCheck, ListFilter, SlidersHorizontal, Check, Star, Heart, Bookmark, ExternalLink, Award, TrendingUp, LayoutGrid, ChevronLeft, ChevronRight, ArrowLeft, Video, Type, Briefcase, Image as ImageIcon, Settings, Palette, Headphones, Box, Code } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { ProductHuntMarquee } from '@/components/ui/ProductHuntMarquee';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';



const taxonomyMap: Record<string, string[]> = {
  "AI Productivity Tools": ["personal assistant", "research", "spreadsheets", "translator", "presentations"],
  "AI Video Tool": ["video enhancer", "video editing", "video generators", "text to video"],
  "AI Text Generators": ["prompt generators", "writing generators", "paraphrasing", "storyteller", "copywriting"],
  "AI Business Tools": ["website builders", "marketing", "finance", "project management", "social media"],
  "AI Image Tools": ["design generators", "image generators", "image editing", "text to image"],
  "Automation Tools": ["workflows", "ai agents"],
  "AI Art Generators": ["cartoon generators", "portrait generators", "avatars", "logo generator", "3d"],
  "AI Audio Generators": ["audio editing", "text to speech", "music", "transcriber"],
  "Misc AI Tools": ["fitness", "religion", "students", "fashion", "gift ideas"],
  "AI Code Tools": ["code assistant", "low-code/no-code", "sql", "code"]
};

const categoryConfig: Record<string, { from: string, to: string, icon: any, tagBg: string, tagText: string, iconColor: string }> = {
  "AI Productivity Tools": { from: "from-[#ff007f]", to: "to-[#ff4d4d]", icon: LayoutGrid, tagBg: "bg-pink-500/10", tagText: "text-pink-300", iconColor: "text-pink-500" },
  "AI Video Tool": { from: "from-[#ff007f]", to: "to-[#9d00ff]", icon: Video, tagBg: "bg-purple-500/10", tagText: "text-purple-300", iconColor: "text-purple-500" },
  "AI Text Generators": { from: "from-[#00f2fe]", to: "to-[#4facfe]", icon: Type, tagBg: "bg-blue-500/10", tagText: "text-blue-300", iconColor: "text-blue-500" },
  "AI Business Tools": { from: "from-[#f6d365]", to: "to-[#fda085]", icon: Briefcase, tagBg: "bg-orange-500/10", tagText: "text-orange-300", iconColor: "text-orange-500" },
  "AI Image Tools": { from: "from-[#43e97b]", to: "to-[#38f9d7]", icon: ImageIcon, tagBg: "bg-emerald-500/10", tagText: "text-emerald-300", iconColor: "text-emerald-500" },
  "Automation Tools": { from: "from-[#c471f5]", to: "to-[#fa71cd]", icon: Settings, tagBg: "bg-fuchsia-500/10", tagText: "text-fuchsia-300", iconColor: "text-fuchsia-500" },
  "AI Art Generators": { from: "from-[#b224ef]", to: "to-[#7579ff]", icon: Palette, tagBg: "bg-indigo-500/10", tagText: "text-indigo-300", iconColor: "text-indigo-500" },
  "AI Audio Generators": { from: "from-[#f83600]", to: "to-[#f9d423]", icon: Headphones, tagBg: "bg-yellow-500/10", tagText: "text-yellow-300", iconColor: "text-yellow-500" },
  "Misc AI Tools": { from: "from-[#5ee7df]", to: "to-[#b490ca]", icon: Box, tagBg: "bg-cyan-500/10", tagText: "text-cyan-300", iconColor: "text-cyan-500" },
  "AI Code Tools": { from: "from-[#667eea]", to: "to-[#764ba2]", icon: Code, tagBg: "bg-violet-500/10", tagText: "text-violet-300", iconColor: "text-violet-500" }
};

export interface AITool {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  categories: string[];
  websiteUrl?: string;
  logo?: string;
  pricing?: string;
  pricingTiers?: { name: string; price: string }[];
  isVerified?: boolean;
  rating?: number;
  reviewCount?: number;
  badges?: string[];
  features?: string[];
  pros?: string[];
  socialLinks?: Record<string, string>;
}

const ToolCard = ({ tool }: { tool: AITool }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [loveCount, setLoveCount] = useState(Math.floor(Math.random() * 100) + 10);
  const router = useRouter();

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasLiked) {
      setHasLiked(false);
      setLoveCount(prev => prev - 1);
    } else {
      setHasLiked(true);
      setLoveCount(prev => prev + 1);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHasBookmarked(!hasBookmarked);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    router.push(`/ai-directory/${tool.slug}`);
  };

  return (
    <div onClick={handleCardClick} className="block h-full cursor-pointer group select-none">
      <div className="details-card flex flex-col h-full p-5 relative group-hover:-translate-y-1 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        
        {/* Header Row */}
        <div className="flex gap-4 items-start mb-4 relative z-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-border bg-elevated overflow-hidden shrink-0">
              {tool.logo ? (
                <img src={tool.logo} alt={tool.name} className="w-full h-full object-cover" />
              ) : (
                <Sparkles className="text-accent" size={24} />
              )}
            </div>
            {tool.isVerified && (
              <div className="absolute -top-1.5 -right-1.5 bg-surface rounded-full p-0.5 z-20">
                <BadgeCheck className="text-blue-500 fill-blue-500/20" size={18} />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg leading-tight truncate text-primary mb-1">{tool.name}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} className="text-gray-600" />
              <span className="text-muted text-xs ml-1">({tool.reviewCount || 0})</span>
            </div>
          </div>
        </div>
        
        {/* Pricing & Interaction Row */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="text-xs font-semibold text-muted bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md border border-border">
            {tool.pricing || 'Free'}
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all ${
                hasLiked ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-black/5 dark:bg-white/5 border-border text-muted hover:text-primary hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              <Heart size={14} className={hasLiked ? "fill-red-500" : ""} />
              <span className="text-xs font-medium">{loveCount}</span>
            </button>
            <button 
              onClick={handleBookmark}
              className={`p-1.5 rounded-md transition-colors ${
                hasBookmarked ? 'bg-blue-500/10 border border-blue-500/30 text-blue-500' : 'bg-black/5 dark:bg-white/5 border border-border text-muted hover:text-primary hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              <Bookmark size={14} className={hasBookmarked ? "fill-blue-500" : ""} />
            </button>
          </div>
        </div>
        
        {/* Body Section */}
        <div className="mb-2 flex-grow relative z-10">
          <p className="text-muted text-sm mb-3 line-clamp-2 leading-relaxed select-text cursor-text" onClick={(e) => e.stopPropagation()}>
            {tool.description}
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {tool.categories?.slice(0, 3).map(tag => (
              <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Row (Details and Visit Site buttons) */}
        <div className="flex gap-2.5 mt-4 pt-4 border-t border-border relative z-10 w-full">
          <Link 
            href={`/ai-directory/${tool.slug}`}
            className="flex-1 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border text-primary text-xs font-semibold text-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            Details
          </Link>
          {tool.websiteUrl && (
            <a 
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg bg-transparent border border-accent text-accent hover:bg-elevated/10 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink size={14} /> Visit Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

function AIDirectoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const category = searchParams.get('category');
  const pageParam = searchParams.get('page');
  const currentPage = parseInt(pageParam || '1', 10);

  const [searchQuery, setSearchQuery] = useState('');
  const [pricingFilter, setPricingFilter] = useState('All');
  const [badgeFilter, setBadgeFilter] = useState('All');
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [activeTab, setActiveTab] = useState('Trending');
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  
  // Track which sections are expanded to show all cards
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const initialRangeStart = Math.floor((currentPage - 1) / 3) * 3 + 1;
  const [rangeStart, setRangeStart] = useState(initialRangeStart);

  useEffect(() => {
    // Sync rangeStart if currentPage is outside the visible range, 
    // EXCEPT when currentPage is exactly rangeStart - 1 (which means we just shifted the range forward)
    if (currentPage < rangeStart || currentPage > rangeStart + 2) {
      if (currentPage !== rangeStart - 1) {
        setRangeStart(Math.floor((currentPage - 1) / 3) * 3 + 1);
      }
    }
  }, [currentPage, rangeStart]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError(null);
        const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
        let url = `${API}/api/directory?limit=100&search=${encodeURIComponent(searchQuery)}&pricing=${pricingFilter}&badge=${badgeFilter}&verified=${verifiedFilter}&sort=${activeTab}`;
        if (category) {
          url = `${API}/api/directory?category=${encodeURIComponent(category)}&page=${currentPage}&limit=12&search=${encodeURIComponent(searchQuery)}&pricing=${pricingFilter}&badge=${badgeFilter}&verified=${verifiedFilter}&sort=${activeTab}`;
        }
          
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        
        if (data.success) {
          setTools(data.data);
          if (category && data.pagination) {
            setTotalPages(data.pagination.pages || 1);
          } else {
            setTotalPages(1);
          }
        } else {
          throw new Error(data.error || 'Failed to fetch data');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [category, currentPage, searchQuery, pricingFilter, badgeFilter, verifiedFilter, activeTab]);

  const filteredTools = useMemo(() => {
    if (category) return tools;
    let result = tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPricing = pricingFilter === 'All' ? true : 
                             pricingFilter === 'Free' ? tool.pricing?.toLowerCase().includes('free') || tool.pricingTiers?.some(t => t.price.toLowerCase().includes('free')) :
                             pricingFilter === 'Freemium' ? tool.pricing?.toLowerCase().includes('freemium') || tool.pricingTiers?.some(t => t.name.toLowerCase().includes('free') && tool.pricingTiers?.length! > 1) :
                             pricingFilter === 'Paid' ? tool.pricing?.toLowerCase().includes('paid') || tool.pricingTiers?.some(t => t.price.toLowerCase().includes('paid') || t.price.includes('$')) :
                             pricingFilter === 'Contact for Pricing' ? tool.pricing?.toLowerCase().includes('contact') : true;
                             
      const matchesBadge = badgeFilter === 'All' ? true :
                           tool.badges?.includes(badgeFilter);
                             
      const matchesVerified = verifiedFilter ? tool.isVerified : true;
      
      return matchesSearch && matchesPricing && matchesBadge && matchesVerified;
    });

    // Apply sorting based on activeTab
    if (activeTab === 'Popular') {
      result = [...result].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    } else if (activeTab === 'Trending') {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (activeTab === 'New') {
      // Just reverse the list to simulate 'newest first' for demo purposes
      result = [...result].reverse();
    }

    return result;
  }, [tools, searchQuery, pricingFilter, badgeFilter, verifiedFilter, activeTab]);

  const groupedTools = useMemo(() => {
    const groups: Record<string, AITool[]> = {};
    const uncategorized: AITool[] = [];

    // Initialize groups to preserve order
    Object.keys(taxonomyMap).forEach(key => {
      groups[key] = [];
    });

    filteredTools.forEach(tool => {
      let matched = false;
      const toolCategories = tool.categories?.map(c => c.toLowerCase()) || [];
      // Also check against tool name and description for better categorization if tags are lacking
      const searchString = `${toolCategories.join(' ')} ${tool.name.toLowerCase()} ${tool.description.toLowerCase()}`;

      for (const [sectionName, keywords] of Object.entries(taxonomyMap)) {
        if (keywords.some(kw => searchString.includes(kw.toLowerCase()))) {
          groups[sectionName].push(tool);
          matched = true;
          break;
        }
      }

      if (!matched) {
        uncategorized.push(tool);
      }
    });

    return { groups, uncategorized };
  }, [filteredTools]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categoryTools = useMemo(() => {
    if (!category) return [];
    return tools;
  }, [tools, category]);

  const paginatedTools = useMemo(() => {
    if (!category) return [];
    return tools;
  }, [tools, category]);

  const selectCategory = (catName: string) => {
    setRangeStart(1);
    router.push(`/ai-directory?category=${encodeURIComponent(catName)}&page=1`);
  };

  const scrollToCategory = (catName: string) => {
    const targetId = catName.replace(/\s+/g, '-').toLowerCase();
    
    if (category) {
      // If we are currently in a category view, go back to main directory first
      router.push(`/ai-directory#${targetId}`);
    } else {
      // Smooth scroll if we are already on the main page
      const element = document.getElementById(targetId);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const changePage = (pageNumber: number) => {
    router.push(`/ai-directory?category=${encodeURIComponent(category || '')}&page=${pageNumber}`);
    
    // Adjust rangeStart dynamically based on the page navigated to
    if (pageNumber > rangeStart + 2) {
      setRangeStart(Math.floor((pageNumber - 1) / 3) * 3 + 1);
    } else if (pageNumber < rangeStart) {
      setRangeStart(Math.floor((pageNumber - 1) / 3) * 3 + 1);
    }
  };

  const handlePageClick = (pageNum: number) => {
    changePage(pageNum);
    // User explicitly clicked the 3rd button of the range: load next 3 pages if available
    if (pageNum === rangeStart + 2 && pageNum < totalPages) {
      setRangeStart(rangeStart + 3);
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">AI Directory</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Explore the most comprehensive directory of creative AI tools, models, and platforms.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12 w-full">
        <div className="w-full max-w-[500px] bg-surface border border-border rounded-full p-2 flex items-center shadow-lg transition-all focus-within:border-accent/30">
          <div className="pl-4 pr-2 text-muted">
            <Search size={20} />
          </div>
          <input 
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-primary text-sm placeholder:text-muted"
            placeholder="Search AI tools (e.g., 'Midjourney', 'Video')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Buttons Row */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide max-w-full">
          <div className="flex items-center justify-center gap-2 min-w-max mx-auto px-4 md:flex-wrap md:min-w-0">
            {[...Object.keys(taxonomyMap), 'Other AI Tools'].map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all bg-surface-secondary border border-border text-muted hover:text-primary`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProductHuntMarquee />

      {loading ? (
        <div className="space-y-12">
          {Object.keys(taxonomyMap).slice(0, 2).map((sectionName, i) => (
            <div key={i} className="space-y-4">
               <div className="flex items-end justify-between mb-4 border-b border-border pb-2">
                 <div className="h-6 bg-surface-secondary rounded-md w-48 animate-pulse" />
                 <div className="h-4 bg-surface-secondary rounded-md w-24 animate-pulse" />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                 {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
               </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-xl border border-red-500/20 max-w-lg mx-auto shadow-lg">
          <p className="font-medium">Failed to load AI directory data.</p>
          <p className="text-sm mt-2 opacity-80">Error: {error}</p>
          <p className="text-sm mt-2 opacity-80">Please ensure the backend server is running and connected to MongoDB.</p>
        </div>
      ) : filteredTools.length === 0 ? (
        <div className="text-center py-20 bg-surface-secondary border border-border rounded-2xl max-w-2xl mx-auto shadow-lg">
          <Search size={40} className="mx-auto text-muted mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-primary mb-2">No tools found</h3>
          <p className="text-muted">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setSearchQuery(''); setPricingFilter('All'); setVerifiedFilter(false); }}
            className="mt-6 px-6 py-2 bg-surface-tertiary hover:bg-surface-quaternary text-primary rounded-full transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : category ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Breadcrumb / Back Button */}
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => router.push('/ai-directory')}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} /> Back to Directory
            </button>
            <span className="text-xs font-semibold text-muted uppercase tracking-wider font-bold">
              {category}
            </span>
          </div>

          {/* Section Header with Tabs and Filters */}
          <div className="flex justify-between items-center w-full border-b border-gray-200 dark:border-border pb-0 mb-6">
            {/* Left Side: Tabs */}
            <div className="flex items-center gap-8 relative top-[1px]">
              {[
                { id: 'Trending', label: 'Trending', icon: TrendingUp },
                { id: 'Popular', label: 'Popular', icon: Star },
                { id: 'New', label: 'New', icon: Sparkles }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-4 text-sm font-semibold border-b-2 transition-all duration-200 ${
                      isActive 
                        ? 'border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400' 
                        : 'border-transparent text-gray-500 dark:text-muted hover:text-gray-700 dark:hover:text-primary hover:border-gray-200 dark:hover:border-border'
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-blue-500 dark:text-blue-400" : "text-muted"} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Right Side: Filters */}
            <div className="flex items-center gap-3 pb-3">
              <div className="relative">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2 shadow-sm ${
                    showFilters || pricingFilter !== 'All' || badgeFilter !== 'All'
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' 
                      : 'bg-white dark:bg-elevated border-gray-200 dark:border-border text-gray-700 dark:text-muted hover:bg-gray-50 dark:hover:bg-black/5 dark:bg-black/5 dark:bg-white/5'
                  }`}
                >
                  <ListFilter size={18} /> Filters
                  {(pricingFilter !== 'All' || badgeFilter !== 'All') && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1 right-1"></span>
                  )}
                </button>

                {/* Filter Dropdown */}
                {showFilters && (
                  <div className="absolute right-0 top-full mt-3 w-[280px] bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-2xl shadow-2xl p-5 z-50 text-left">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800 dark:text-primary text-sm">Filters</h3>
                      <button 
                        onClick={() => { setPricingFilter('All'); setBadgeFilter('All'); }}
                        className="text-blue-500 text-xs font-semibold hover:underline"
                      >
                        Reset All
                      </button>
                    </div>
                    
                    <div className="space-y-5">
                      {/* Pricing Category */}
                      <div>
                        <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 block">Pricing</label>
                        <div className="space-y-2">
                          {['All', 'Free', 'Freemium', 'Paid', 'Contact for Pricing'].map(price => (
                            <button
                              key={price}
                              onClick={() => setPricingFilter(price)}
                              className="flex items-center justify-between w-full text-sm group"
                            >
                              <span className={pricingFilter === price ? 'text-blue-500 font-medium' : 'text-gray-600 dark:text-muted group-hover:text-blue-500 transition-colors'}>
                                {price}
                              </span>
                              {pricingFilter === price && <Check size={16} className="text-blue-500" />}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="h-px bg-gray-200 dark:bg-black/10 dark:bg-black/10 dark:bg-white/10 w-full"></div>

                      {/* Badge Category */}
                      <div>
                        <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 block">Badge</label>
                        <div className="space-y-2">
                          {['All', "Editor's Pick", 'Featured', 'Top Rated'].map(badge => (
                            <button
                              key={badge}
                              onClick={() => setBadgeFilter(badge)}
                              className="flex items-center justify-between w-full text-sm group"
                            >
                              <span className={badgeFilter === badge ? 'text-blue-500 font-medium' : 'text-gray-600 dark:text-muted group-hover:text-blue-500 transition-colors'}>
                                {badge}
                              </span>
                              {badgeFilter === badge && <Check size={16} className="text-blue-500" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setVerifiedFilter(!verifiedFilter)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2 shadow-sm ${
                  verifiedFilter 
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' 
                    : 'bg-white dark:bg-elevated border-gray-200 dark:border-border text-gray-700 dark:text-muted hover:bg-gray-50 dark:hover:bg-black/5 dark:bg-black/5 dark:bg-white/5'
                }`}
              >
                <BadgeCheck size={18} className={verifiedFilter ? "text-blue-500" : "text-muted"} /> Verified Only
              </button>

              <button 
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-border text-gray-700 dark:text-muted bg-white dark:bg-elevated hover:bg-gray-50 dark:hover:bg-black/5 dark:bg-black/5 dark:bg-white/5 transition-all flex items-center gap-2 shadow-sm"
              >
                <LayoutGrid size={18} /> View
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {paginatedTools.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-gray-200 dark:border-border rounded-2xl max-w-2xl mx-auto shadow-lg">
              <Search size={40} className="mx-auto text-muted dark:text-muted mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-primary mb-2">No tools found in this category</h3>
              <p className="text-gray-500 dark:text-muted">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedTools.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-gray-200 dark:border-border">
              <button
                onClick={() => currentPage > 1 && changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 dark:border-border text-gray-500 dark:text-muted hover:bg-gray-50 dark:hover:bg-black/5 dark:bg-black/5 dark:bg-white/5 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: 3 }, (_, i) => rangeStart + i)
                .filter(pageNum => pageNum <= totalPages)
                .map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-primary shadow-md'
                        : 'border border-gray-200 dark:border-border text-gray-600 dark:text-muted hover:bg-gray-50 dark:hover:bg-black/5 dark:bg-black/5 dark:bg-white/5'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

              <button
                onClick={() => currentPage < totalPages && changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 dark:border-border text-gray-500 dark:text-muted hover:bg-gray-50 dark:hover:bg-black/5 dark:bg-black/5 dark:bg-white/5 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-16 animate-fadeIn pb-16">
          {Object.entries(groupedTools.groups)
            .filter(([_, tools]) => tools.length > 0)
            .map(([sectionName, toolsInSection], index) => {
            const displayTools = toolsInSection.slice(0, 4);
            const config = categoryConfig[sectionName] || categoryConfig["Misc AI Tools"];
            const Icon = config.icon;
            
            return (
              <ScrollReveal variant="slide-up" duration={0.6} key={sectionName} id={sectionName.replace(/\s+/g, '-').toLowerCase()} className="flex flex-col pt-4">
                <div className="flex items-center justify-between w-full mb-8 border-b border-black/5 dark:border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config?.from || 'from-gray-500'} ${config?.to || 'to-gray-400'} p-[1px] shadow-lg`}>
                      <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0B0C10] flex items-center justify-center relative">
                        <Icon size={22} className={config?.iconColor || "text-gray-500"} />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{sectionName}</h2>
                      <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
                        Explore the best {sectionName.toLowerCase()} to boost your productivity.
                      </p>
                    </div>
                  </div>
                  
                  {toolsInSection.length > 4 && (
                    <button 
                      onClick={() => selectCategory(sectionName)}
                      className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-white/50 dark:hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      See more
                      <span className="transform group-hover:translate-x-1 transition-transform inline-block">
                        &rarr;
                      </span>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayTools.map((tool) => (
                    <ToolCard key={tool._id} tool={tool} />
                  ))}
                </div>
              </ScrollReveal>
            );
          })}
          
          {/* Uncategorized Tools */}
          {groupedTools.uncategorized.length > 0 && (
              <section id="other-ai-tools" className="flex flex-col pt-8">
                <div className="flex items-center justify-between w-full mb-8 border-b border-black/5 dark:border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-400 p-[1px] shadow-lg`}>
                      <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0B0C10] flex items-center justify-center relative">
                        <Box size={22} className="text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Other AI Tools</h2>
                      <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Explore more amazing AI tools.</p>
                    </div>
                  </div>
                  {groupedTools.uncategorized.length > 4 && (
                    <button 
                      onClick={() => selectCategory('Other AI Tools')}
                      className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-white/50 dark:hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      See more
                      <span className="transform group-hover:translate-x-1 transition-transform inline-block">
                        &rarr;
                      </span>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {groupedTools.uncategorized.slice(0, 4).map((tool) => (
                    <ToolCard key={tool._id} tool={tool} />
                  ))}
                </div>
              </section>
          )}
        </div>
      )}
    </div>
  );
}

export default function AIDirectory() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-500" size={36} />
      </div>
    }>
      <AIDirectoryContent />
    </Suspense>
  );
}

