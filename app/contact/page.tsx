"use client";

import React, { useState } from 'react';
import { getApiBaseUrl } from '@/lib/apiClient';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<{ loading: boolean; error: string | null; success: boolean }>({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const API = getApiBaseUrl();
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, error: data.error || 'Failed to send message', success: false });
      }
    } catch (error) {
      setStatus({ loading: false, error: 'Network error. Please try again later.', success: false });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Contact Us</h1>
      <p className="text-muted text-lg mb-12">
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-8 rounded-2xl border border-border shadow-sm">
        {status.success && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg">
            Your message has been sent successfully. We will get back to you soon!
          </div>
        )}
        
        {status.error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg">
            {status.error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-primary">Name</label>
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-base border border-border rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50" 
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-primary">Email</label>
            <input 
              type="email" 
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-base border border-border rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50" 
              placeholder="Your email address"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-semibold text-primary">Subject</label>
          <input 
            type="text" 
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-base border border-border rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50" 
            placeholder="How can we help?"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold text-primary">Message</label>
          <textarea 
            id="message" 
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-base border border-border rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y" 
            placeholder="Write your message here..."
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={status.loading}
          className="bg-accent hover:bg-accent/90 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          {status.loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
