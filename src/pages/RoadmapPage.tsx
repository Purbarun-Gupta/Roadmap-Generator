import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, BookOpen, FolderKanban, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface Stage {
  title: string;
  duration: string;
  topics: string[];
  resources: string[];
  projects: string[];
  status: "completed" | "in-progress" | "upcoming";
}

const generateRoadmap = (career: string): Stage[] => {
  const roadmaps: Record<string, Stage[]> = {
    "Web Developer": [
      { title: "HTML, CSS & Web Fundamentals", duration: "2 weeks", topics: ["HTML5 Semantics", "CSS Flexbox & Grid", "Responsive Design"], resources: ["MDN Web Docs", "freeCodeCamp"], projects: ["Personal Portfolio Page"], status: "upcoming" },
      { title: "JavaScript Fundamentals", duration: "3 weeks", topics: ["Variables & Functions", "DOM Manipulation", "Async/Await"], resources: ["JavaScript.info", "Eloquent JavaScript"], projects: ["Interactive Quiz App"], status: "upcoming" },
      { title: "React & Modern Frontend", duration: "4 weeks", topics: ["Components & Props", "State Management", "Hooks & Context"], resources: ["React Official Docs", "Scrimba"], projects: ["Task Manager App"], status: "upcoming" },
      { title: "Backend & APIs", duration: "3 weeks", topics: ["Node.js", "REST APIs", "Database Design"], resources: ["Node.js Docs", "The Odin Project"], projects: ["Blog API"], status: "upcoming" },
      { title: "Full-Stack Project & Deployment", duration: "4 weeks", topics: ["Authentication", "Cloud Deployment", "CI/CD"], resources: ["Vercel Docs", "AWS Free Tier"], projects: ["Full-Stack E-commerce App"], status: "upcoming" },
    ],
    default: [
      { title: "Foundation & Core Concepts", duration: "3 weeks", topics: ["Core Theory", "Basic Tools", "Environment Setup"], resources: ["Official Documentation", "Introductory Courses"], projects: ["Hello World Project"], status: "upcoming" },
      { title: "Intermediate Skills", duration: "4 weeks", topics: ["Advanced Concepts", "Best Practices", "Testing"], resources: ["Online Courses", "Technical Books"], projects: ["Intermediate Project"], status: "upcoming" },
      { title: "Advanced Topics", duration: "4 weeks", topics: ["Architecture", "Performance", "Security"], resources: ["Advanced Tutorials", "Conference Talks"], projects: ["Advanced Project"], status: "upcoming" },
      { title: "Portfolio & Job Preparation", duration: "3 weeks", topics: ["Portfolio Building", "Interview Prep", "Networking"], resources: ["LeetCode", "LinkedIn Learning"], projects: ["Capstone Project"], status: "upcoming" },
    ],
  };
  return roadmaps[career] || roadmaps.default;
};

export default function RoadmapPage() {
  const location = useLocation();
  const state = location.state as { career?: string } | null;
  const career = state?.career || "Web Developer";

  const [stages, setStages] = useState<Stage[]>(() => generateRoadmap(career));
  const [view, setView] = useState<"timeline" | "tree">("tree");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const toggleStatus = (i: number) => {
    setStages((prev) => prev.map((s, idx) => {
      if (idx !== i) return s;
      const next = s.status === "upcoming" ? "in-progress" : s.status === "in-progress" ? "completed" : "upcoming";
      return { ...s, status: next };
    }));
  };

  const completed = stages.filter((s) => s.status === "completed").length;
  const progress = Math.round((completed / stages.length) * 100);

  return (
    <div className="min-h-screen bg-[#02060c] text-white pt-20 relative overflow-hidden">
      {/* Background Grid Pattern from image_2fde03.png */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Header matched to image_2407ff.png */}
          <div className="max-w-3xl mb-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white">
              Your <span className="text-[#10b981]">{career}</span> Roadmap
            </h1>
            <p className="text-gray-400 text-lg">Follow these stages to reach your career goal.</p>
          </div>

          {/* Progress Section */}
          <div className="p-6 rounded-2xl bg-[#0a0f18] border border-white/5 mb-16 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">Overall Progress</span>
              <span className="text-sm font-bold text-[#10b981]">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#1a1f2e] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399]"
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* View Toggle Switch */}
          <div className="flex justify-center gap-4 mb-20">
            <Button 
              variant="ghost" 
              onClick={() => setView("timeline")}
              className={`rounded-full px-10 h-12 border transition-all ${view === "timeline" ? "bg-[#10b981] text-[#02060c] font-bold border-transparent shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-white/10 text-gray-400 hover:text-white"}`}
            >
              Timeline View
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setView("tree")}
              className={`rounded-full px-10 h-12 border transition-all ${view === "tree" ? "bg-[#10b981] text-[#02060c] font-bold border-transparent shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-white/10 text-gray-400 hover:text-white"}`}
            >
              Branching Tree View
            </Button>
          </div>

          {view === "tree" ? (
            /* BRANCHING TREE VIEW */
            <div className="relative">
              {/* Vertical Path Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#10b981]/40 via-white/5 to-transparent -translate-x-1/2 hidden md:block" />

              <div className="space-y-12 md:space-y-0">
                {stages.map((stage, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={i} className={`relative flex items-center justify-center md:justify-between w-full md:mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-[46%] z-10"
                      >
                        <div 
                          onClick={() => toggleStatus(i)}
                          className={`p-8 rounded-[2.5rem] border transition-all cursor-pointer group hover:scale-[1.02]
                            ${stage.status === 'completed' ? 'bg-[#10b981]/5 border-[#10b981]/40 shadow-[0_0_40px_rgba(16,185,129,0.1)]' : 
                              stage.status === 'in-progress' ? 'bg-orange-500/5 border-orange-500/40' : 'bg-[#0a0f18] border-white/10 hover:border-[#10b981]/50 shadow-xl'}`}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${stage.status === 'completed' ? 'bg-[#10b981] text-[#02060c]' : 'bg-[#1a1f2e] text-gray-500'}`}>
                              {stage.status === 'completed' ? <CheckCircle2 size={28} /> : <span className="text-xl font-black">{i + 1}</span>}
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Duration</p>
                                <p className="text-sm font-bold text-white">{stage.duration}</p>
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#10b981] transition-colors">{stage.title}</h3>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {stage.topics.slice(0, 3).map(t => (
                              <span key={t} className="text-[11px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-5 border-t border-white/5">
                            <span className="text-xs font-bold text-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity">Launch Module</span>
                            <ArrowRight className="text-[#10b981] w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Path Node */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#02060c] border-[3px] border-[#10b981] z-20 hidden md:block shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

                      {/* Horizontal Connector */}
                      <div className={`absolute top-1/2 -translate-y-1/2 h-[1px] bg-[#10b981]/20 hidden md:block
                        ${isLeft ? 'left-[46%] right-1/2' : 'left-1/2 right-[46%]'}`} 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* TIMELINE VIEW */
            <div className="max-w-3xl mx-auto space-y-5">
              {stages.map((stage, i) => (
                <div key={i} className={`bg-[#0a0f18] border rounded-2xl overflow-hidden transition-colors ${stage.status === 'completed' ? 'border-[#10b981]/30' : 'border-white/5'}`}>
                  <button onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className="w-full p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stage.status === 'completed' ? 'bg-[#10b981] text-[#02060c]' : 'bg-[#1a1f2e] text-gray-500'}`}>
                        {stage.status === 'completed' ? <CheckCircle2 size={24} /> : <span className="font-bold text-lg">{i + 1}</span>}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-lg text-white">{stage.title}</h4>
                        <span className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5 font-medium"><Clock size={14}/> {stage.duration}</span>
                      </div>
                    </div>
                    {expandedIdx === i ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                  </button>
                  {expandedIdx === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-6 pb-8 pt-2 border-t border-white/5">
                      <div className="grid md:grid-cols-2 gap-8 pt-6">
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-[#10b981] uppercase tracking-widest">Core Topics</p>
                           <div className="flex flex-wrap gap-2">
                             {stage.topics.map(t => <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400">{t}</span>)}
                           </div>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-[#10b981] uppercase tracking-widest">Milestone Projects</p>
                           <div className="flex flex-wrap gap-2">
                             {stage.projects.map(p => <span key={p} className="px-3 py-1.5 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-lg text-xs font-bold">{p}</span>)}
                           </div>
                        </div>
                      </div>
                      <div className="mt-10 flex justify-end">
                        <Button onClick={() => toggleStatus(i)} className="bg-[#10b981] text-[#02060c] font-black h-12 px-8 rounded-xl hover:bg-[#10b981]/90 transition-all shadow-lg shadow-[#10b981]/20">
                          {stage.status === 'upcoming' ? 'Begin Stage' : stage.status === 'in-progress' ? 'Mark as Done' : 'Restart Section'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Call to Action matched to image_239ec6.png */}
          <div className="mt-24 text-center pb-20">
            <Link to="/dashboard">
              <Button size="lg" className="bg-[#10b981] text-[#02060c] font-black h-16 px-14 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all text-lg">
                Update Dashboard <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>
      <Footer />
    </div>
  );
}