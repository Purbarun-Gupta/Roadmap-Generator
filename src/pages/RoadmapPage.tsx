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
  const [view, setView] = useState<"timeline" | "tree">("timeline");
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
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your <span className="text-gradient">{career}</span> Roadmap
          </h1>
          <p className="text-muted-foreground mb-8">Follow these stages to reach your career goal.</p>

          {/* Progress */}
          <div className="p-4 rounded-2xl bg-card border border-border/50 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* View toggle */}
          <div className="flex gap-2 mb-8">
            <Button variant={view === "timeline" ? "default" : "outline"} size="sm" onClick={() => setView("timeline")} className={view === "timeline" ? "gradient-primary text-primary-foreground border-0" : ""}>
              Timeline View
            </Button>
            <Button variant={view === "tree" ? "default" : "outline"} size="sm" onClick={() => setView("tree")} className={view === "tree" ? "gradient-primary text-primary-foreground border-0" : ""}>
              Skill Tree View
            </Button>
          </div>

          {view === "timeline" ? (
            <div className="space-y-4">
              {stages.map((stage, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-2xl border transition-all ${
                    stage.status === "completed" ? "border-primary/30 bg-primary/5" : stage.status === "in-progress" ? "border-accent/30 bg-accent/5" : "border-border/50 bg-card"
                  }`}
                >
                  <button
                    onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        stage.status === "completed" ? "gradient-primary" : stage.status === "in-progress" ? "gradient-accent" : "bg-muted"
                      }`}>
                        {stage.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-primary-foreground" /> : <span className="text-sm font-bold text-foreground">{i + 1}</span>}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{stage.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" /> {stage.duration}
                        </div>
                      </div>
                    </div>
                    {expandedIdx === i ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>

                  {expandedIdx === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"><BookOpen className="w-4 h-4 text-primary" /> Topics</div>
                        <div className="flex flex-wrap gap-2">
                          {stage.topics.map((t) => <span key={t} className="px-3 py-1 rounded-lg bg-muted text-xs text-muted-foreground">{t}</span>)}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"><BookOpen className="w-4 h-4 text-accent" /> Resources</div>
                        <div className="flex flex-wrap gap-2">
                          {stage.resources.map((r) => <span key={r} className="px-3 py-1 rounded-lg bg-accent/10 text-xs text-accent">{r}</span>)}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"><FolderKanban className="w-4 h-4 text-primary" /> Projects</div>
                        <div className="flex flex-wrap gap-2">
                          {stage.projects.map((p) => <span key={p} className="px-3 py-1 rounded-lg bg-primary/10 text-xs text-primary">{p}</span>)}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" onClick={() => toggleStatus(i)} variant="outline" className="text-xs">
                          {stage.status === "upcoming" ? "Start" : stage.status === "in-progress" ? "Complete" : "Reset"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            /* Skill Tree View */
            <div className="flex flex-col items-center gap-2">
              {stages.map((stage, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`px-6 py-4 rounded-2xl border text-center cursor-pointer transition-all hover:scale-105 ${
                    stage.status === "completed" ? "border-primary/30 bg-primary/10" : stage.status === "in-progress" ? "border-accent/30 bg-accent/10" : "border-border/50 bg-card"
                  }`} onClick={() => toggleStatus(i)}>
                    <div className="font-display font-semibold text-sm text-foreground">{stage.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stage.duration}</div>
                  </div>
                  {i < stages.length - 1 && <div className="w-0.5 h-8 bg-border" />}
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link to="/dashboard">
              <Button className="gradient-primary text-primary-foreground border-0">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
