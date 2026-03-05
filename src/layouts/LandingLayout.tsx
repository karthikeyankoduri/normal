import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

export const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="text-slate-950 w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Waymaker</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Log In</Link>
          <Link to="/dashboard/new">
            <Button size="sm" variant="primary">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 mt-20">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2024 Waymaker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
