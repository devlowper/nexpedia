import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Camera } from 'lucide-react';
import { api } from '@/lib/apiClient';
import { useAuth } from '@/hooks/useAuth';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const { refreshUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    socials: { twitter: '', linkedin: '', github: '' }
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || '',
        username: user.username || user.email?.split('@')[0] || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        socials: {
          twitter: user.socials?.twitter || '',
          linkedin: user.socials?.linkedin || '',
          github: user.socials?.github || ''
        }
      });
      setAvatarPreview(user.avatar || '');
    }
  }, [user, isOpen]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put('/api/users/profile', {
        ...formData,
        ...(avatarPreview ? { avatar: avatarPreview } : {})
      });
      await refreshUser();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, socials: { ...prev.socials, [field]: value } }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-base border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-primary">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="p-2 text-muted hover:text-primary transition-colors bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Profile Photo</label>
            <div className="flex items-center gap-4">
              {/* Avatar preview */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full bg-surface border-2 border-dashed border-border flex items-center justify-center overflow-hidden cursor-pointer hover:border-accent/50 transition-colors relative group"
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-muted">{formData.name.charAt(0) || 'U'}</span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                  <Camera size={18} className="text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-black dark:text-black cta-btn rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
                >
                  <Upload size={16} />
                  Upload Photo
                </button>
                {avatarPreview && avatarPreview !== user?.avatar && (
                  <button
                    type="button"
                    onClick={() => setAvatarPreview(user?.avatar || '')}
                    className="text-xs text-muted hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                )}
                <p className="text-xs text-muted">JPG, PNG or WebP. Max 2MB.</p>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-primary focus:border-accent/50 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">@</span>
                <input 
                  required
                  type="text" 
                  value={formData.username}
                  onChange={(e) => updateField('username', e.target.value)}
                  className="w-full bg-surface border border-border rounded-md pl-9 pr-4 py-2.5 text-primary focus:border-accent/50 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Bio</label>
            <textarea 
              rows={3}
              value={formData.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-primary focus:border-accent/50 outline-none transition-colors resize-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Location</label>
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="City, Country"
                className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-primary focus:border-accent/50 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Website</label>
              <input 
                type="url" 
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://..."
                className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-primary focus:border-accent/50 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="font-bold mb-4">Social Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-2">X / Twitter</label>
                <input 
                  type="text" 
                  value={formData.socials.twitter}
                  onChange={(e) => updateSocial('twitter', e.target.value)}
                  placeholder="Username (without @)"
                  className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-primary focus:border-accent/50 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-2">LinkedIn</label>
                <input 
                  type="url" 
                  value={formData.socials.linkedin}
                  onChange={(e) => updateSocial('linkedin', e.target.value)}
                  placeholder="Profile URL"
                  className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-primary focus:border-accent/50 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-2">GitHub</label>
                <input 
                  type="text" 
                  value={formData.socials.github}
                  onChange={(e) => updateSocial('github', e.target.value)}
                  placeholder="Username"
                  className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-primary focus:border-accent/50 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

        </form>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-4 bg-black/5 dark:bg-black/20">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 border border-border rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-accent text-black rounded-md text-sm font-bold hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
