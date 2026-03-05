/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingLayout } from '@/layouts/LandingLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import LandingPage from '@/pages/LandingPage';
import NewProjectPage from '@/pages/NewProjectPage';
import ResearchPage from '@/pages/ResearchPage';
import CompetitorsPage from '@/pages/CompetitorsPage';
import WebsitePage from '@/pages/WebsitePage';
import MarketingPage from '@/pages/MarketingPage';
import FundingPage from '@/pages/FundingPage';
import DeployPage from '@/pages/DeployPage';
import SettingsPage from '@/pages/SettingsPage';
import { ProjectProvider } from '@/context/ProjectContext';

import ProjectsPage from '@/pages/ProjectsPage';

export default function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout><LandingPage /></LandingLayout>} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/projects" replace />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="new" element={<NewProjectPage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="competitors" element={<CompetitorsPage />} />
            <Route path="website" element={<WebsitePage />} />
            <Route path="marketing" element={<MarketingPage />} />
            <Route path="funding" element={<FundingPage />} />
            <Route path="deploy" element={<DeployPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProjectProvider>
  );
}
