import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  Users, 
  Globe, 
  Share2, 
  Settings, 
  LogOut,
  Sparkles,
  Zap,
  DollarSign,
  FolderOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectChatbot } from '@/components/ProjectChatbot';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
          isActive 
            ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,240,255,0.1)] border border-primary/20" 
            : "text-slate-400 hover:text-white hover:bg-white/5"
        )
      }
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {/* Active Indicator */}
      <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full opacity-0 transition-opacity duration-200" />
    </NavLink>
  );
};


export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col h-screen sticky top-0 z-50">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="text-slate-950 w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Waymaker</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Workspace</div>
          <SidebarItem to="/dashboard/projects" icon={FolderOpen} label="My Projects" />
          <SidebarItem to="/dashboard/new" icon={PlusCircle} label="New Project" />
          <SidebarItem to="/dashboard/research" icon={Search} label="Research" />
          <SidebarItem to="/dashboard/competitors" icon={Users} label="Competitor Analysis" />
          <SidebarItem to="/dashboard/website" icon={Globe} label="Website Builder" />
          <SidebarItem to="/dashboard/marketing" icon={Share2} label="Marketing Content" />
          <SidebarItem to="/dashboard/funding" icon={DollarSign} label="Funding & Investors" />
          
          <div className="mt-8 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</div>
          <SidebarItem to="/dashboard/deploy" icon={Zap} label="Deployment Status" />
          <SidebarItem to="/dashboard/settings" icon={Settings} label="Settings" />
        </div>

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        {/* Background Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
        <ProjectChatbot />
      </main>
    </div>
  );
};
