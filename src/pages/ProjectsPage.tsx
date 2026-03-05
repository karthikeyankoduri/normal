import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Trash2, ExternalLink, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectsPage() {
  const { projects, loadProject, deleteProject, createNewProject } = useProject();
  const navigate = useNavigate();

  const handleLoad = async (id: string) => {
    await loadProject(id);
    navigate('/dashboard/research');
  };

  const handleNew = () => {
    createNewProject();
    navigate('/dashboard/new');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-slate-400 mt-1">Manage and access your business execution plans.</p>
        </div>
        <Button onClick={handleNew} className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <Card className="col-span-full p-12 flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10 bg-transparent">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold">No projects found</h3>
            <p className="text-slate-400 mt-2 max-w-xs">
              You haven't created any projects yet. Start by defining your business idea.
            </p>
            <Button onClick={handleNew} variant="outline" className="mt-6">
              Create Your First Project
            </Button>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="group hover:border-primary/50 transition-all duration-300">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {project.updated_at ? new Date(project.updated_at).toLocaleDateString() : 'Recently'}
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-400 line-clamp-2 min-h-[2.5rem]">
                  {project.description}
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <Button 
                    onClick={() => handleLoad(project.id)}
                    className="flex-1 gap-2"
                  >
                    Open Project
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
