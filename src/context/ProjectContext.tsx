import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  BusinessIdea, 
  ResearchResult, 
  Competitor, 
  WebsiteContent, 
  SocialPost,
  FundingOpportunity,
  generateResearch,
  generateCompetitors,
  generateWebsite,
  generateMarketing,
  generateMarketingImage,
  generateFunding
} from '@/services/ai';

interface Project {
  id: string;
  name: string;
  description: string;
  industry?: string;
  targetAudience?: string;
  location?: string;
  research: ResearchResult | null;
  competitors: Competitor[];
  website: WebsiteContent | null;
  marketing: SocialPost[];
  marketingImage: string | null;
  funding: FundingOpportunity[];
  created_at?: string;
  updated_at?: string;
}

interface ProjectContextType {
  idea: BusinessIdea | null;
  research: ResearchResult | null;
  competitors: Competitor[];
  website: WebsiteContent | null;
  marketing: SocialPost[];
  marketingImage: string | null;
  funding: FundingOpportunity[];
  isGenerating: boolean;
  progress: string;
  projects: Project[];
  currentProjectId: string | null;
  startProject: (idea: BusinessIdea) => Promise<void>;
  loadProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  createNewProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [idea, setIdea] = useState<BusinessIdea | null>(null);
  const [research, setResearch] = useState<ResearchResult | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [website, setWebsite] = useState<WebsiteContent | null>(null);
  const [marketing, setMarketing] = useState<SocialPost[]>([]);
  const [marketingImage, setMarketingImage] = useState<string | null>(null);
  const [funding, setFunding] = useState<FundingOpportunity[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const storedProjects = localStorage.getItem('waymaker_projects');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const saveProject = async (projectData: Partial<Project>, overrideId?: string, overrideIdea?: BusinessIdea) => {
    const id = overrideId || currentProjectId || Math.random().toString(36).substring(2, 11);
    const activeIdea = overrideIdea || idea;
    
    const fullProject: Project = {
      id,
      name: projectData.name || activeIdea?.description.substring(0, 20) || 'Untitled Project',
      description: activeIdea?.description || '',
      industry: activeIdea?.industry,
      targetAudience: activeIdea?.targetAudience,
      location: activeIdea?.location,
      research: projectData.research ?? research,
      competitors: projectData.competitors ?? competitors,
      website: projectData.website ?? website,
      marketing: projectData.marketing ?? marketing,
      marketingImage: projectData.marketingImage ?? marketingImage,
      funding: projectData.funding ?? funding,
      updated_at: new Date().toISOString(),
      created_at: projects.find(p => p.id === id)?.created_at || new Date().toISOString()
    };

    try {
      const storedProjects = localStorage.getItem('waymaker_projects');
      let currentProjects: Project[] = storedProjects ? JSON.parse(storedProjects) : [];
      
      const existingIndex = currentProjects.findIndex(p => p.id === id);
      if (existingIndex >= 0) {
        currentProjects[existingIndex] = fullProject;
      } else {
        currentProjects.push(fullProject);
      }
      
      localStorage.setItem('waymaker_projects', JSON.stringify(currentProjects));
      
      if (!currentProjectId) setCurrentProjectId(id);
      fetchProjects();
      return id;
    } catch (error) {
      console.error("Failed to save project:", error);
      return id;
    }
  };

  const createNewProject = () => {
    setIdea(null);
    setResearch(null);
    setCompetitors([]);
    setWebsite(null);
    setMarketing([]);
    setMarketingImage(null);
    setFunding([]);
    setCurrentProjectId(null);
  };

  const loadProject = async (id: string) => {
    try {
      const storedProjects = localStorage.getItem('waymaker_projects');
      if (!storedProjects) return;
      
      const currentProjects: Project[] = JSON.parse(storedProjects);
      const data = currentProjects.find(p => p.id === id);
      
      if (data) {
        setIdea({
          description: data.description,
          industry: data.industry,
          targetAudience: data.targetAudience,
          location: data.location
        });
        setResearch(data.research);
        setCompetitors(data.competitors);
        setWebsite(data.website);
        setMarketing(data.marketing);
        setMarketingImage(data.marketingImage);
        setFunding(data.funding);
        setCurrentProjectId(data.id);
      }
    } catch (error) {
      console.error("Failed to load project:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const storedProjects = localStorage.getItem('waymaker_projects');
      if (storedProjects) {
        const currentProjects: Project[] = JSON.parse(storedProjects);
        const updatedProjects = currentProjects.filter(p => p.id !== id);
        localStorage.setItem('waymaker_projects', JSON.stringify(updatedProjects));
        
        if (currentProjectId === id) {
          createNewProject();
        }
        fetchProjects();
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const startProject = async (newIdea: BusinessIdea) => {
    const projectId = Math.random().toString(36).substring(2, 11);
    const projectName = newIdea.description.substring(0, 50).trim() || 'New Project';
    
    // Local accumulators to avoid React state async race conditions during generation
    let accumulatedResearch: ResearchResult | null = null;
    let accumulatedCompetitors: Competitor[] = [];
    let accumulatedWebsite: WebsiteContent | null = null;
    let accumulatedMarketing: SocialPost[] = [];
    let accumulatedMarketingImage: string | null = null;
    let accumulatedFunding: FundingOpportunity[] = [];

    setIdea(newIdea);
    setResearch(null);
    setCompetitors([]);
    setWebsite(null);
    setMarketing([]);
    setMarketingImage(null);
    setFunding([]);
    setIsGenerating(true);
    setCurrentProjectId(projectId);
    
    const syncAndSave = async (updates: Partial<Project>) => {
      if (updates.research !== undefined) accumulatedResearch = updates.research;
      if (updates.competitors !== undefined) accumulatedCompetitors = updates.competitors;
      if (updates.website !== undefined) accumulatedWebsite = updates.website;
      if (updates.marketing !== undefined) accumulatedMarketing = updates.marketing;
      if (updates.marketingImage !== undefined) accumulatedMarketingImage = updates.marketingImage;
      if (updates.funding !== undefined) accumulatedFunding = updates.funding;

      await saveProject({
        name: projectName,
        research: accumulatedResearch,
        competitors: accumulatedCompetitors,
        website: accumulatedWebsite,
        marketing: accumulatedMarketing,
        marketingImage: accumulatedMarketingImage,
        funding: accumulatedFunding,
      }, projectId, newIdea);
    };

    // Initial save to establish the project record
    await syncAndSave({});
    
    try {
      // 1. Research
      setProgress('Researching market trends...');
      const researchData = await generateResearch(newIdea);
      setResearch(researchData);
      await syncAndSave({ research: researchData });

      // 2. Competitors
      setProgress('Analyzing competitors...');
      const competitorsData = await generateCompetitors(newIdea);
      setCompetitors(competitorsData);
      await syncAndSave({ competitors: competitorsData });

      // 3. Website
      setProgress('Generating website structure...');
      const websiteData = await generateWebsite(newIdea);
      setWebsite(websiteData);
      await syncAndSave({ website: websiteData });

      // 4. Marketing Content
      setProgress('Creating marketing copy...');
      const marketingData = await generateMarketing(newIdea);
      setMarketing(marketingData);
      await syncAndSave({ marketing: marketingData });

      // 5. Marketing Image
      setProgress('Generating brand visuals...');
      const image = await generateMarketingImage(newIdea);
      setMarketingImage(image);
      await syncAndSave({ marketingImage: image });

      // 6. Funding Opportunities
      setProgress('Finding funding opportunities...');
      const fundingData = await generateFunding(newIdea);
      setFunding(fundingData);
      await syncAndSave({ funding: fundingData });

      setProgress('Finalizing...');
    } catch (error) {
      console.error("Project generation failed:", error);
    } finally {
      setIsGenerating(false);
      setProgress('');
    }
  };

  return (
    <ProjectContext.Provider value={{
      idea,
      research,
      competitors,
      website,
      marketing,
      marketingImage,
      funding,
      isGenerating,
      progress,
      projects,
      currentProjectId,
      startProject,
      loadProject,
      deleteProject,
      createNewProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
