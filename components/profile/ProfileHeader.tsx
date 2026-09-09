import React from 'react';

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    bio: string;
    location: string;
    website: string;
    avatar: string;
  };
  isOwner: boolean;
  onEditClick?: () => void;
}

export function ProfileHeader({ user, isOwner, onEditClick }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 py-8 border-b border-border">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-surface border-4 border-black/5 dark:border-black/5 dark:border-white/5 shrink-0 flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-accent/20 to-accent/5">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name.charAt(0)
          )}
        </div>
        
        {/* Info */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted text-sm font-medium">@{user.username || user.name.toLowerCase().replace(/\s+/g, '')}</p>
          <p className="max-w-xl text-sm leading-relaxed mt-2 text-muted-foreground font-medium">{user.bio || 'Generative AI Specialist & Prompt Engineer. Designing high-efficiency prompts for Claude, ChatGPT, and Midjourney.'}</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-muted mt-2">
            {user.location && (
              <span className="flex items-center gap-1">
                {user.location.includes('United States') || user.location.includes('USA') ? '🇺🇸 ' : user.location.includes('United Kingdom') || user.location.includes('UK') ? '🇬🇧 ' : '📍 '} 
                {user.location}
              </span>
            )}
            {user.website && (
              <a href={user.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors">
                🔗 {user.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {isOwner ? (
          <>
            <button onClick={onEditClick} className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 transition-colors">
              Edit Profile
            </button>
            <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 transition-colors">
              Share
            </button>
          </>
        ) : (
          <>
            <button className="px-6 py-2 bg-accent text-black rounded-md text-sm font-bold hover:bg-accent-hover transition-colors">
              Follow
            </button>
            <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 transition-colors">
              Share
            </button>
          </>
        )}
      </div>
    </div>
  );
}
