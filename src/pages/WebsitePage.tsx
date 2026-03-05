import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Eye, Rocket, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function WebsitePage() {
  const { website, idea } = useProject();
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'deployed'>('idle');

  if (!website) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Website Generated</h2>
        <p className="text-slate-400 mb-8">Start a new project to generate a website.</p>
        <Link to="/dashboard/new">
          <Button>Start New Project</Button>
        </Link>
      </div>
    );
  }

  const handleDeploy = async () => {
    const zapierUrl = localStorage.getItem('zapier_webhook_url');
    
    if (!zapierUrl) {
      alert('Please configure your Zapier Webhook URL in Settings first.');
      return;
    }

    setIsDeploying(true);
    setDeploymentStatus('deploying');

    try {
      await fetch(zapierUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Zapier usually accepts text/plain but json is better if supported
        },
        mode: 'no-cors', // Zapier webhooks often don't return CORS headers, so we use no-cors
        body: JSON.stringify({
          event_type: 'deploy_website',
          project_description: idea?.description,
          html_content: website.html,
          timestamp: new Date().toISOString()
        })
      });

      // Since we use no-cors, we can't check response.ok, so we assume success if no error thrown
      setTimeout(() => {
        setIsDeploying(false);
        setDeploymentStatus('deployed');
        alert('Website code sent to Zapier for deployment!');
      }, 2000);

    } catch (error) {
      console.error('Deployment failed:', error);
      setIsDeploying(false);
      setDeploymentStatus('idle');
      alert('Failed to trigger Zapier webhook. Check console for details.');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Website Builder</h1>
          <p className="text-slate-400">AI-generated landing page for: <span className="text-primary">{idea?.description.substring(0, 30)}...</span></p>
        </div>
        <div className="flex gap-4">
           <div className="bg-slate-900 p-1 rounded-lg border border-white/10 flex">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'preview' ? 'bg-primary text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4 inline-block mr-2" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'code' ? 'bg-primary text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4 inline-block mr-2" />
              Code
            </button>
          </div>

          {deploymentStatus === 'deployed' ? (
             <Link to="/dashboard/marketing">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                Next: Marketing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button 
              onClick={handleDeploy} 
              isLoading={isDeploying}
              className="bg-gradient-to-r from-primary to-secondary text-slate-950 border-none"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Deploy Website
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
        {viewMode === 'preview' ? (
          <iframe
            srcDoc={website.html}
            title="Website Preview"
            className="w-full h-full bg-white"
            sandbox="allow-scripts"
          />
        ) : (
          <div className="w-full h-full overflow-auto bg-[#1e1e1e] p-6">
            <pre className="font-mono text-sm text-blue-300">
              <code>{website.html}</code>
            </pre>
          </div>
        )}

        {/* Deployment Overlay */}
        {deploymentStatus === 'deploying' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Deploying to Global Edge Network...</h3>
              <p className="text-slate-400">Optimizing assets and propagating DNS.</p>
            </div>
          </div>
        )}

        {deploymentStatus === 'deployed' && viewMode === 'preview' && (
          <div className="absolute top-4 right-4 z-50">
             <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Live Preview
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
