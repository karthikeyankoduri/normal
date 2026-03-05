import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function CompetitorsPage() {
  const { competitors } = useProject();

  if (!competitors || competitors.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Competitor Data Found</h2>
        <p className="text-slate-400 mb-8">Start a new project to analyze competitors.</p>
        <Link to="/dashboard/new">
          <Button>Start New Project</Button>
        </Link>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Competitor Analysis</h1>
          <p className="text-slate-400">Top 5 competitors identified by our agents.</p>
        </div>
        <Link to="/dashboard/website">
          <Button variant="outline" className="group">
            Next: Website Builder
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6"
      >
        {competitors.map((comp, index) => (
          <motion.div key={index} variants={item}>
            <Card className="p-6 hover:border-primary/30 transition-colors group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {comp.name}
                    </h3>
                    <a 
                      href={comp.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {/* Strengths */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Strengths
                      </h4>
                      <ul className="space-y-2">
                        {comp.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Weaknesses
                      </h4>
                      <ul className="space-y-2">
                        {comp.weaknesses.map((w, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-red-500 mt-2 shrink-0" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gaps */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Gaps & Opportunities
                      </h4>
                      <ul className="space-y-2">
                        {comp.gaps.map((g, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-yellow-500 mt-2 shrink-0" />
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
