"use client";

import React, { useState } from 'react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ContributionStats } from '@/components/profile/ContributionStats';
import { 
  Library, 
  FolderHeart, 
  Activity
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { api } from '@/lib/apiClient';

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState('Prompts');
  const [profileUser, setProfileUser] = useState<any>(null);
  const [userPrompts, setUserPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch public profile
        const profileResponse = await api.get<any>(`/api/users/profile/${params.username}`);
        setProfileUser(profileResponse);

        // Fetch prompts by author
        const promptsResponse = await api.get<any>(`/api/prompts?author=${params.username}`);
        if (promptsResponse && promptsResponse.data) {
          setUserPrompts(promptsResponse.data);
        }
      } catch (err: any) {
        console.error("Error fetching profile", err);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.username]);

  if (loading) {
    return <div className="max-w-[1000px] mx-auto px-4 py-32 flex justify-center"><div className="animate-pulse flex items-center gap-2 font-semibold">Loading profile...</div></div>;
  }

  if (error || !profileUser) {
    return (
      <div className="max-w-[1000px] mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <p className="text-muted">The user you are looking for does not exist or has set their profile to private.</p>
      </div>
    );
  }

  const mappedProfileUser = {
    name: profileUser.name || 'Guest User',
    username: profileUser.username || params.username,
    bio: profileUser.bio || 'AI Creator & Prompt Engineer',
    location: profileUser.location || 'United States',
    website: profileUser.website || '',
    avatar: profileUser.avatar || ''
  };

  const stats = {
    prompts: userPrompts.length,
    uses: userPrompts.reduce((acc, p) => acc + (p.views_count || 0), 0),
    rating: 4.9,
    upvotes: userPrompts.reduce((acc, p) => acc + (p.saveCount || 0), 0)
  };



  const tabs = [
    { id: 'Prompts', icon: Library },
    { id: 'Collections', icon: FolderHeart },
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-12 animate-in fade-in duration-500">
      {/* Notice isOwner is false */}
      <ProfileHeader user={mappedProfileUser} isOwner={false} />
      
      <ContributionStats stats={stats} />

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-border mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted hover:text-primary'
            }`}
          >
            <tab.icon size={16} />
            {tab.id}
          </button>
        ))}
      </div>

      {/* Tab Content Areas */}
      <div className="space-y-8 min-h-[40vh]">
        {activeTab === 'Prompts' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Public Prompts</h3>
              <select className="bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-primary focus:border-accent/50 outline-none">
                <option>Most Popular</option>
                <option>Newest</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPrompts.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted">No prompts published yet.</div>
              ) : (
                userPrompts.map((prompt: any) => (
                  <div key={prompt._id || prompt.id} className="bg-surface border border-border p-5 rounded-xl hover:border-accent/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded text-muted">
                        {prompt.category?.name || 'Category'}
                      </span>
                    </div>
                    <h4 className="font-bold mb-2 group-hover:text-accent transition-colors line-clamp-1">{prompt.page_name || prompt.title}</h4>
                    <p className="text-sm text-muted line-clamp-2 mb-4">{prompt.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{prompt.views_count || 0} uses</span>
                      <span>{prompt.saveCount || 0} saves</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Empty States */}
        {activeTab !== 'Prompts' && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-surface border border-border rounded-xl">
            <h3 className="font-bold text-lg mb-2">No items here yet</h3>
            <p className="text-muted max-w-sm">This user hasn't added anything to this section yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
