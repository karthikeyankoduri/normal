import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResearchPage() {
  const { research, idea } = useProject();

  if (!research) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Research Data Found</h2>
        <p className="text-slate-400 mb-8">Start a new project to generate market research.</p>
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
          <h1 className="text-3xl font-bold mb-2">Market Research</h1>
          <p className="text-slate-400">AI-driven analysis for: <span className="text-primary">{idea?.description.substring(0, 50)}...</span></p>
        </div>
        <Link to="/dashboard/competitors">
          <Button variant="outline" className="group">
            Next: Competitors
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
        {/* Executive Summary */}
        <motion.div variants={item}>
          <Card className="p-8 border-l-4 border-l-primary">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-primary" />
              Executive Summary
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              {research.summary}
            </p>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Market Insights */}
          <motion.div variants={item} className="h-full">
            <Card className="p-6 h-full hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-4">Market Insights</h3>
              <ul className="space-y-3">
                {research.marketInsights.map((insight, i) => (
                  <li key={i} className="flex gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Trends */}
          <motion.div variants={item} className="h-full">
            <Card className="p-6 h-full hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold mb-4">Industry Trends</h3>
              <ul className="space-y-3">
                {research.trends.map((trend, i) => (
                  <li key={i} className="flex gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    {trend}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Opportunities */}
          <motion.div variants={item} className="h-full">
            <Card className="p-6 h-full hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold mb-4">Key Opportunities</h3>
              <ul className="space-y-3">
                {research.opportunities.map((opp, i) => (
                  <li key={i} className="flex gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0" />
                    {opp}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
