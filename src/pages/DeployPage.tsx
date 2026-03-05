import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Globe, Share2, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function DeployPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Deployment Status</h1>
        <p className="text-slate-400">Your business infrastructure is live and running.</p>
      </div>

      <div className="grid gap-6">
        <StatusCard 
          icon={Globe}
          title="Website Deployment"
          status="Live"
          details="Deployed to Edge Network (Vercel/Netlify)"
          link="https://agentic-ai-builder.com"
          color="text-emerald-400"
        />
        
        <StatusCard 
          icon={Share2}
          title="Social Media Automation"
          status="Active"
          details="Zapier workflows connected for Instagram, LinkedIn, Twitter"
          color="text-blue-400"
        />

        <StatusCard 
          icon={Zap}
          title="Backend API"
          status="Healthy"
          details="Serverless functions operational (99.9% uptime)"
          color="text-yellow-400"
        />
      </div>

      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 text-center">
        <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Your foundation is set. Now it's time to scale. Monitor your analytics, refine your marketing, and grow your customer base.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard/new">
            <Button variant="outline">Start New Project</Button>
          </Link>
          <Button className="bg-primary text-slate-950 hover:bg-primary/90">
            View Analytics Dashboard <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatusCard({ icon: Icon, title, status, details, link, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 flex items-center gap-6">
        <div className={`w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xl font-bold">{title}</h3>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {status}
            </span>
          </div>
          <p className="text-slate-400">{details}</p>
          {link && (
            <a href="#" className="text-primary text-sm mt-2 inline-block hover:underline">
              {link}
            </a>
          )}
        </div>
        <div className="hidden md:block">
          <CheckCircle2 className="w-8 h-8 text-emerald-500/50" />
        </div>
      </Card>
    </motion.div>
  );
}
