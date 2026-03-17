import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Play, FileText, BookOpen, ExternalLink, Clock, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { getModuleContent, ModuleResource } from "@/data/moduleContent";

interface ModuleState {
  stageTitle: string;
  stageIndex: number;
  career: string;
  topics: string[];
  duration: string;
  resources: string[];
  projects: string[];
}

function ResourceCard({ resource, completed, onToggle }: { resource: ModuleResource; completed: boolean; onToggle: () => void }) {
  const iconMap = {
    video: <Play size={18} />,
    article: <FileText size={18} />,
    documentation: <BookOpen size={18} />,
    course: <GraduationCap size={18} />,
  };
  const colorMap = {
    video: "text-red-400 bg-red-500/10 border-red-500/20",
    article: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    documentation: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    course: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-2xl border transition-all group ${completed ? "bg-[#10b981]/5 border-[#10b981]/30" : "bg-[#0a0f18] border-white/5 hover:border-white/15"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${colorMap[resource.type]}`}>
            {iconMap[resource.type]}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-white text-sm mb-1 truncate">{resource.title}</h4>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="capitalize font-medium">{resource.type}</span>
              {resource.duration && (
                <span className="flex items-center gap-1"><Clock size={12} /> {resource.duration}</span>
              )}
              <span>{resource.source}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#10b981] hover:border-[#10b981]/30 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
          <button
            onClick={onToggle}
            className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${completed ? "bg-[#10b981] border-[#10b981] text-[#02060c]" : "bg-white/5 border-white/10 text-gray-500 hover:text-[#10b981] hover:border-[#10b981]/30"}`}
          >
            <CheckCircle2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const projectLinks: Record<string, string> = {
  "Personal Portfolio Page": "https://www.youtube.com/watch?v=bmpI252DmiI",
  "Interactive Quiz App": "https://www.youtube.com/watch?v=PBcqGxrr9g8",
  "Task Manager App": "https://www.youtube.com/watch?v=pCA4qpQDZD8",
  "Blog API": "https://github.com/nodejs/examples",
  "Full-Stack E-commerce App": "https://www.youtube.com/watch?v=AN3t-OmdyKA",

  "Data Cleaning Project": "https://www.youtube.com/watch?v=vmEHCJofslg",
  "EDA on Real Dataset": "https://www.youtube.com/watch?v=xi0vhXFPegw",
  "Statistical Analysis Report": "https://www.youtube.com/watch?v=xxpc-HPKN28",
  "Predictive Model Project": "https://www.youtube.com/watch?v=0Lt9w-BxKFQ",
  "End-to-End Data Science Project": "https://github.com/krishnaik06/Complete-Data-Science-Projects",

  "Spam Email Classifier": "https://www.youtube.com/watch?v=ZCVn4x5y7FY",
  "Image Classifier": "https://www.youtube.com/watch?v=tPYj3fFJGjk",
  "Chatbot AI Project": "https://www.youtube.com/watch?v=JgWm6sQwS_I",
  "Deploy AI API": "https://www.youtube.com/watch?v=0sOvCWFmrtA",

  "House Price Predictor": "https://www.youtube.com/watch?v=0Lt9w-BxKFQ",
  "Image Recognition Model": "https://www.youtube.com/watch?v=aircAruvnKk",
  "Optimized ML Pipeline": "https://github.com/ageron/handson-ml",
  "Deploy ML Model API": "https://www.youtube.com/watch?v=UbCWoMf80PY"
};

export default function ModulePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ModuleState | null;

  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());

  // Load completion state from localStorage
  useEffect(() => {
    if (!state) return;
    const key = `module_progress_${state.career}_${state.stageIndex}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setCompletedResources(new Set(JSON.parse(saved)));
    }
  }, [state]);

  if (!state) {
    return (
      <div className="min-h-screen bg-[#02060c] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No module selected</h1>
          <Button onClick={() => navigate(-1)} className="bg-[#10b981] text-[#02060c] font-bold">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const moduleContent = getModuleContent(state.stageTitle);
  const allResources = [...moduleContent.videos, ...moduleContent.documentation];
  const totalResources = allResources.length;
  const completedCount = completedResources.size;
  const progress = totalResources > 0 ? Math.round((completedCount / totalResources) * 100) : 0;

  const toggleResource = (title: string) => {
    setCompletedResources((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      // Persist
      const key = `module_progress_${state.career}_${state.stageIndex}`;
      localStorage.setItem(key, JSON.stringify([...next]));
      return next;
    });
  };

  const markModuleDone = () => {
    // Mark all resources as complete
    const allTitles = allResources.map((r) => r.title);
    const key = `module_progress_${state.career}_${state.stageIndex}`;
    localStorage.setItem(key, JSON.stringify(allTitles));

    // Mark stage as completed in roadmap
    const roadmapKey = `roadmap_status_${state.career}`;
    const savedStatuses = localStorage.getItem(roadmapKey);
    const statuses: Record<number, string> = savedStatuses ? JSON.parse(savedStatuses) : {};
    statuses[state.stageIndex] = "completed";
    localStorage.setItem(roadmapKey, JSON.stringify(statuses));

    navigate("/roadmap", { state: { career: state.career } });
  };

  return (
    <div className="min-h-screen bg-[#02060c] text-white pt-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/roadmap", { state: { career: state.career } })}
          className="flex items-center gap-2 text-gray-400 hover:text-[#10b981] transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Roadmap</span>
        </button>

        {/* Module Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Module {state.stageIndex + 1}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500 font-medium">{state.duration}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{state.stageTitle}</h1>
          <p className="text-gray-400">Complete the video lectures and documentation below, then mark the module as done.</p>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mt-5">
            {state.topics.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 font-medium">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="p-5 rounded-2xl bg-[#0a0f18] border border-white/5 mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Module Progress</span>
            <span className="text-sm font-bold text-[#10b981]">{completedCount}/{totalResources} completed</span>
          </div>
          <div className="w-full h-2.5 bg-[#1a1f2e] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399]"
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Video Lectures */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Play size={18} className="text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Video Lectures</h2>
            <span className="text-xs text-gray-500 font-medium">({moduleContent.videos.length})</span>
          </div>
          <div className="space-y-3">
            {moduleContent.videos.map((video) => (
              <ResourceCard
                key={video.title}
                resource={video}
                completed={completedResources.has(video.title)}
                onToggle={() => toggleResource(video.title)}
              />
            ))}
          </div>
        </motion.div>

        {/* Documentation & Articles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <BookOpen size={18} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Documentation & Resources</h2>
            <span className="text-xs text-gray-500 font-medium">({moduleContent.documentation.length})</span>
          </div>
          <div className="space-y-3">
            {moduleContent.documentation.map((doc) => (
              <ResourceCard
                key={doc.title}
                resource={doc}
                completed={completedResources.has(doc.title)}
                onToggle={() => toggleResource(doc.title)}
              />
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        {state.projects.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center">
                <GraduationCap size={18} className="text-[#10b981]" />
              </div>
              <h2 className="text-xl font-bold text-white">Milestone Projects</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {state.projects.map((p) => (
                <div key={p}
                  onClick={() => {
                    const url = projectLinks[p];
                    if (url) window.open(url, "_blank");
                  }}
                className="p-5 rounded-2xl bg-[#10b981]/5 border border-[#10b981]/20 hover:border-[#10b981]/40 transition-colors">
                  <h4 className="font-bold text-[#10b981] text-sm">{p}</h4>
                  <p className="text-xs text-gray-500 mt-1">Build this project to solidify your understanding</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mark as Done Button */}
        <div className="text-center pb-20">
          <Button
            onClick={markModuleDone}
            size="lg"
            className="bg-[#10b981] text-[#02060c] font-black h-16 px-14 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all text-lg"
          >
            <CheckCircle2 className="mr-3 w-6 h-6" /> Mark Module as Done
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
