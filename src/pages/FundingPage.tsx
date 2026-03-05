import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Calendar, 
  MapPin,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

export default function FundingPage() {
  const { funding, idea } = useProject();

  if (!funding || funding.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Funding Opportunities Found</h2>
        <p className="text-slate-400 mb-8">Start a new project or wait for the agent to finish researching.</p>
        <Link to="/dashboard/new">
          <Button>Start New Project</Button>
        </Link>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Investor': return <Users className="w-5 h-5 text-blue-400" />;
      case 'Funding Program': return <DollarSign className="w-5 h-5 text-emerald-400" />;
      case 'Event': return <Calendar className="w-5 h-5 text-purple-400" />;
      default: return <Briefcase className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Funding & Investment</h1>
          <p className="text-slate-400">Potential investors and funding programs for your startup.</p>
        </div>
        <Link to="/dashboard/deploy">
          <Button variant="outline" className="group">
            Next: Deployment Status
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {funding.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 h-full flex flex-col hover:border-primary/30 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{item.type}</span>
                  </div>
                </div>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-primary transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <p className="text-slate-300 text-sm mb-6 flex-1">
                {item.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                  <span className="italic">"{item.relevance}"</span>
                </div>
              </div>

              <div className="mt-6">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full group/btn">
                    Visit Website
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Investment Readiness</h2>
            <p className="text-slate-300 mb-6">
              Our AI agent has identified these opportunities based on your business idea: 
              <span className="text-primary font-medium"> "{idea?.description.substring(0, 100)}..."</span>. 
              Before reaching out, ensure your pitch deck and financial projections are ready.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Verified Links
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Location Matched
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Industry Specific
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                Real-time Search
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 aspect-square rounded-2xl bg-slate-900/50 border border-white/10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
            <DollarSign className="w-24 h-24 text-primary relative z-10" />
          </div>
        </div>
      </Card>
    </div>
  );
}
