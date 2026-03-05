import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Rocket, 
  Target, 
  Globe, 
  Share2, 
  Zap, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </Card>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="relative pl-8 pb-12 border-l border-white/10 last:border-0">
    <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-slate-900 border border-primary text-primary flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(0,240,255,0.3)]">
      {number}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Business Builder
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Turn Your Idea Into a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text">
                Live Business — Instantly
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              From market research to a deployed website and marketing content. 
              Launch your next venture in minutes with our autonomous AI agents.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard/new">
                <Button size="lg" className="w-full sm:w-auto group">
                  Start Building Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Live Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Launch</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our AI agents handle the heavy lifting so you can focus on your vision.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Target} 
            title="Market Research" 
            description="Deep dive analysis of your target audience, industry trends, and market opportunities."
          />
          <FeatureCard 
            icon={Rocket} 
            title="Competitor Analysis" 
            description="Identify top competitors, their strengths, weaknesses, and gaps you can exploit."
          />
          <FeatureCard 
            icon={Globe} 
            title="Instant Website" 
            description="Generate a fully responsive, SEO-optimized landing page ready for deployment."
          />
          <FeatureCard 
            icon={Share2} 
            title="Social Marketing" 
            description="Create weeks worth of engaging social media content and visuals for all platforms."
          />
          <FeatureCard 
            icon={Zap} 
            title="Auto-Deployment" 
            description="Seamlessly deploy your site and schedule content via Zapier integration."
          />
          <FeatureCard 
            icon={CheckCircle2} 
            title="Actionable Plan" 
            description="Get a step-by-step execution roadmap tailored to your specific business idea."
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-6 py-20 bg-white/5 rounded-3xl border border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">From Idea to Execution in <span className="text-primary">6 Steps</span></h2>
            <div className="space-y-2">
              <StepCard number="1" title="Describe Your Idea" description="Tell us about your business concept, target audience, and goals." />
              <StepCard number="2" title="AI Agents Analyze" description="Our agents research the market and analyze competitors." />
              <StepCard number="3" title="Strategy Generation" description="We build a comprehensive business strategy and roadmap." />
              <StepCard number="4" title="Asset Creation" description="Website code, marketing copy, and visuals are generated." />
              <StepCard number="5" title="Review & Refine" description="You have full control to tweak and customize everything." />
              <StepCard number="6" title="Launch" description="Deploy your site and schedule your marketing campaign." />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-[100px] rounded-full" />
            <Card className="relative z-10 p-2 bg-slate-900/80 border-slate-800">
              <div className="rounded-lg overflow-hidden border border-white/10">
                <div className="bg-slate-950 p-4 border-b border-white/10 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-4 px-3 py-1 bg-slate-900 rounded-md text-xs text-slate-500 font-mono flex-1">
                    waymaker.com/dashboard
                  </div>
                </div>
                <div className="p-8 space-y-6 bg-slate-900/50">
                  <div className="flex gap-4">
                    <div className="w-1/3 space-y-3">
                      <div className="h-20 rounded-lg bg-white/5 animate-pulse" />
                      <div className="h-8 rounded-lg bg-white/5 animate-pulse" />
                      <div className="h-8 rounded-lg bg-white/5 animate-pulse" />
                    </div>
                    <div className="w-2/3 space-y-4">
                      <div className="h-32 rounded-lg bg-white/10 border border-primary/20 animate-pulse" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 rounded-lg bg-white/5 animate-pulse" />
                        <div className="h-24 rounded-lg bg-white/5 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Business?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Join thousands of entrepreneurs using Waymaker to build faster.
          </p>
          <Link to="/dashboard/new">
            <Button size="lg" className="w-full sm:w-auto shadow-[0_0_30px_rgba(0,240,255,0.4)]">
              Start Building for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
