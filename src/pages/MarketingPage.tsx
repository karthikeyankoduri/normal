import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Linkedin, Twitter, Calendar, Zap, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MarketingPage() {
  const { marketing, marketingImage, idea } = useProject();
  const [activeTab, setActiveTab] = useState<'Instagram' | 'LinkedIn' | 'Twitter'>('Instagram');
  const [isScheduling, setIsScheduling] = useState(false);

  const [isSyncingAll, setIsSyncingAll] = useState(false);

  if (!marketing || marketing.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Marketing Content Generated</h2>
        <p className="text-slate-400 mb-8">Start a new project to generate content.</p>
        <Link to="/dashboard/new">
          <Button>Start New Project</Button>
        </Link>
      </div>
    );
  }

  const activePost = marketing.find(p => p.platform === activeTab);

  const handleSchedule = async () => {
    let zapierUrl = '';

    switch (activeTab) {
      case 'Instagram':
        zapierUrl = localStorage.getItem('zapier_instagram_webhook_url') || '';
        break;
      case 'LinkedIn':
        zapierUrl = localStorage.getItem('zapier_linkedin_webhook_url') || '';
        break;
      case 'Twitter':
        zapierUrl = localStorage.getItem('zapier_twitter_webhook_url') || '';
        break;
    }
    
    if (!zapierUrl) {
      alert(`Please configure your ${activeTab} Webhook URL in Settings first.`);
      return;
    }

    setIsScheduling(true);

    try {
      await fetch(zapierUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          event_type: 'schedule_post',
          platform: activeTab,
          caption: activePost?.caption,
          hashtags: activePost?.hashtags,
          timestamp: new Date().toISOString()
        })
      });

      setTimeout(() => {
        setIsScheduling(false);
        alert(`Content for ${activeTab} scheduled successfully via Zapier!`);
      }, 1500);

    } catch (error) {
      console.error('Scheduling failed:', error);
      setIsScheduling(false);
      alert('Failed to trigger Zapier webhook.');
    }
  };

  const handleSyncAll = async () => {
    const zapierMarketingUrl = localStorage.getItem('zapier_marketing_webhook_url');
    
    if (!zapierMarketingUrl) {
      alert('Please configure your Bulk Marketing Webhook URL in Settings first.');
      return;
    }

    setIsSyncingAll(true);

    try {
      await fetch(zapierMarketingUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          event_type: 'sync_all_marketing',
          project_description: idea?.description,
          marketing_content: marketing,
          image_url: marketingImage,
          timestamp: new Date().toISOString()
        })
      });

      setTimeout(() => {
        setIsSyncingAll(false);
        alert('All marketing content synced to Zapier successfully!');
      }, 2000);

    } catch (error) {
      console.error('Sync failed:', error);
      setIsSyncingAll(false);
      alert('Failed to trigger Zapier webhook.');
    }
  };

  const tabs = [
    { id: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { id: 'Twitter', icon: Twitter, color: 'text-sky-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketing Content</h1>
          <p className="text-slate-400">AI-generated social media strategy.</p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={handleSyncAll} 
            isLoading={isSyncingAll} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          >
            <Zap className="w-4 h-4 mr-2" />
            Sync All to Zapier
          </Button>
          <Link to="/dashboard/funding">
            <Button variant="outline" className="group">
              Next: Funding & Investors
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Tabs & Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white/10 text-white border border-primary/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${tab.color}`} />
                {tab.id}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Caption</label>
                  <textarea 
                    className="w-full h-40 bg-slate-950/50 border border-white/10 rounded-xl p-4 text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                    defaultValue={activePost?.caption}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Hashtags</label>
                  <div className="flex flex-wrap gap-2">
                    {activePost?.hashtags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-white/5">
                  <div className="text-sm text-slate-500">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Recommended time: Tomorrow at 10:00 AM
                  </div>
                  <Button onClick={handleSchedule} isLoading={isScheduling} className="bg-[#FF4F00] hover:bg-[#FF4F00]/90 text-white border-none">
                    <Zap className="w-4 h-4 mr-2" />
                    Schedule via Zapier
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Image Preview */}
        <div className="lg:col-span-1">
          <Card className="p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Generated Visual
            </h3>
            <div className="flex-1 bg-slate-950 rounded-xl border border-white/10 overflow-hidden relative group min-h-[300px]">
              {marketingImage ? (
                <img 
                  src={marketingImage} 
                  alt="AI Generated Marketing Visual" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                     <p className="text-slate-400 text-sm">
                       Generating visual...
                     </p>
                  </div>
                </>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="outline" size="sm">Regenerate Image</Button>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500 text-center">
              Powered by Gemini Imagen 3
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
