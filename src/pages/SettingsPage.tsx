import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, CreditCard, Bell, Zap, Save } from 'lucide-react';

export default function SettingsPage() {
  const [zapierUrl, setZapierUrl] = useState('');
  const [zapierMarketingUrl, setZapierMarketingUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('zapier_webhook_url');
    if (savedUrl) setZapierUrl(savedUrl);
    
    const savedMarketingUrl = localStorage.getItem('zapier_marketing_webhook_url');
    if (savedMarketingUrl) setZapierMarketingUrl(savedMarketingUrl);

    const savedInstagramUrl = localStorage.getItem('zapier_instagram_webhook_url');
    if (savedInstagramUrl) setInstagramUrl(savedInstagramUrl);

    const savedLinkedinUrl = localStorage.getItem('zapier_linkedin_webhook_url');
    if (savedLinkedinUrl) setLinkedinUrl(savedLinkedinUrl);

    const savedTwitterUrl = localStorage.getItem('zapier_twitter_webhook_url');
    if (savedTwitterUrl) setTwitterUrl(savedTwitterUrl);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('zapier_webhook_url', zapierUrl);
    localStorage.setItem('zapier_marketing_webhook_url', zapierMarketingUrl);
    localStorage.setItem('zapier_instagram_webhook_url', instagramUrl);
    localStorage.setItem('zapier_linkedin_webhook_url', linkedinUrl);
    localStorage.setItem('zapier_twitter_webhook_url', twitterUrl);
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#FF4F00]" />
          Integrations
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Zapier Webhook URL (General / Deployment)</label>
            <p className="text-xs text-slate-500 mb-2">
              Used for auto-deploying websites.
            </p>
            <input 
              type="url" 
              value={zapierUrl}
              onChange={(e) => setZapierUrl(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="w-full px-4 py-2 rounded-lg glass-input text-white placeholder:text-slate-600" 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Instagram Webhook URL</label>
              <input 
                type="url" 
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                className="w-full px-4 py-2 rounded-lg glass-input text-white placeholder:text-slate-600" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">LinkedIn Webhook URL</label>
              <input 
                type="url" 
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                className="w-full px-4 py-2 rounded-lg glass-input text-white placeholder:text-slate-600" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Twitter Webhook URL</label>
              <input 
                type="url" 
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                className="w-full px-4 py-2 rounded-lg glass-input text-white placeholder:text-slate-600" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Zapier Webhook URL (Bulk Marketing)</label>
            <p className="text-xs text-slate-500 mb-2">
              Used for syncing ALL marketing content across platforms at once.
            </p>
            <input 
              type="url" 
              value={zapierMarketingUrl}
              onChange={(e) => setZapierMarketingUrl(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="w-full px-4 py-2 rounded-lg glass-input text-white placeholder:text-slate-600" 
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} isLoading={isSaving} className="bg-[#FF4F00] hover:bg-[#FF4F00]/90 text-white border-none">
              <Save className="w-4 h-4 mr-2" />
              Save Integrations
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Profile Settings
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg glass-input text-white" defaultValue="Demo User" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg glass-input text-white" defaultValue="user@example.com" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-400" />
          Subscription & Billing
        </h2>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <div className="font-bold text-white">Pro Plan</div>
            <div className="text-sm text-slate-400">Next billing date: Oct 24, 2024</div>
          </div>
          <Button variant="outline" size="sm">Manage Subscription</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-400" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Email Notifications</span>
            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Marketing Updates</span>
            <div className="w-10 h-6 bg-slate-700 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
