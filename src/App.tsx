import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index.tsx";
import GeneratorPage from "./pages/GeneratorPage.tsx";
import RoadmapPage from "./pages/RoadmapPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import ProgressPage from "./pages/ProgressPage.tsx";
import MentorPage from "./pages/MentorPage.tsx";
import SkillGapPage from "./pages/SkillGapPage.tsx";
import ResourcesPage from "./pages/ResourcesPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage.tsx";
import StudyPlannerPage from "./pages/StudyPlannerPage.tsx";
import ModulePage from "./pages/ModulePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/skill-gap" element={<SkillGapPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/study-planner" element={<StudyPlannerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
