import React, { useState } from 'react';
import { X, Crown, Sparkles, DollarSign } from 'lucide-react';
import { api } from '@/lib/apiClient';

interface SubmitPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitPromptModal({ isOpen, onClose }: SubmitPromptModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Marketing');
  const [tags, setTags] = useState('');
  const [exampleOutput, setExampleOutput] = useState('');
  const [pricingType, setPricingType] = useState<'free' | 'paid'>('free');
  const [price, setPrice] = useState('Paid');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/submissions/submit', {
        title,
        description,
        content,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        exampleOutput,
        is_premium: pricingType === 'paid',
        price: pricingType === 'paid' ? (price || 'Paid') : 'Free',
      });
      // Optionally trigger a refresh or show success toast here
      setTitle('');
      setDescription('');
      setContent('');
      setTags('');
      setExampleOutput('');
      setPricingType('free');
      setPrice('Paid');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to submit prompt');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-base border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-primary">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Submit a Prompt</h2>
          <button onClick={onClose} className="p-2 text-muted hover:text-primary transition-colors bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Prompt Title</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. YouTube Ad Copy Generator"
              className="w-full bg-surface border border-border rounded-md px-4 py-3 text-primary focus:border-accent/50 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Short Description</label>
            <input 
              required
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe what this prompt does..."
              className="w-full bg-surface border border-border rounded-md px-4 py-3 text-primary focus:border-accent/50 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Prompt</label>
            <textarea 
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your prompt here. Use [brackets] for variables."
              className="w-full bg-surface border border-border rounded-md px-4 py-3 text-primary focus:border-accent/50 outline-none transition-colors resize-none font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">AI Tool</label>
              <select className="w-full bg-surface border border-border rounded-md px-4 py-3 text-primary focus:border-accent/50 outline-none transition-colors appearance-none">
                <option value="ChatGPT">ChatGPT</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
                <option value="Midjourney">Midjourney</option>
                <option value="DALL-E">DALL·E</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-4 py-3 text-primary focus:border-accent/50 outline-none transition-colors appearance-none">
                <option value="Photography">Photography</option>
                <option value="Logos & Icons">Logos & Icons</option>
                <option value="Vector Design">Vector Design</option>
                <option value="Video">Video</option>
                <option value="Viral Prompt">Viral Prompt</option>
                <option value="Mockup Prompt">Mockup Prompt</option>
                <option value="Master Prompt">Master Prompt</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Coding">Coding</option>
                <option value="Writing">Writing</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          {/* Pricing Model (Free vs Paid PRO) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Pricing Model</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPricingType('free')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                  pricingType === 'free'
                    ? 'bg-accent/15 border-accent/40 text-accent shadow-sm'
                    : 'bg-surface border-border text-muted hover:border-border/80'
                }`}
              >
                <Sparkles size={16} />
                <span>Free Prompt</span>
              </button>

              <button
                type="button"
                onClick={() => setPricingType('paid')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                  pricingType === 'paid'
                    ? 'bg-accent/15 border-accent/40 text-accent shadow-sm'
                    : 'bg-surface border-border text-muted hover:border-border/80'
                }`}
              >
                <Crown size={16} />
                <span>Paid (PRO)</span>
              </button>
            </div>

            {pricingType === 'paid' && (
              <div className="pt-2 animate-in fade-in duration-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <DollarSign size={15} />
                  </div>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. $4.99 or Paid / PRO"
                    className="w-full bg-surface border border-accent/40 rounded-md pl-9 pr-4 py-2.5 text-sm text-primary focus:border-accent outline-none transition-colors"
                  />
                </div>
                <p className="text-[11px] text-muted mt-1">
                  PRO prompts show an exclusive PRO badge in the Prompt Library.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Tags</label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="+ Add Tags (comma separated)"
              className="w-full bg-surface border border-border rounded-md px-4 py-3 text-primary focus:border-accent/50 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Example Output (Optional)</label>
            <textarea 
              rows={3}
              value={exampleOutput}
              onChange={(e) => setExampleOutput(e.target.value)}
              placeholder="Show an example of what the AI generates from this prompt..."
              className="w-full bg-surface border border-border rounded-md px-4 py-3 text-primary focus:border-accent/50 outline-none transition-colors resize-none text-sm"
            />
          </div>

          {/* Submission Notice */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3 text-sm">
            <span className="text-xl">ℹ️</span>
            <p className="text-accent/90">
              Your prompt will be reviewed before publication. You will receive <strong className="font-bold">1 credit</strong> after your prompt is approved.
            </p>
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
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </div>
    </div>
  );
}
