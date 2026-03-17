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
     /* ---------------- DATA SCIENTIST ---------------- */

    "Data Scientist": [
      {
        title: "Python & Data Fundamentals",
        duration: "3 weeks",
        topics: ["Python Basics", "NumPy", "Pandas"],
        resources: ["Python Docs", "Kaggle Learn"],
        projects: ["Data Cleaning Project"],
        status: "upcoming"
      },
      {
        title: "Data Analysis & Visualization",
        duration: "3 weeks",
        topics: ["Matplotlib", "Seaborn", "Exploratory Data Analysis"],
        resources: ["Kaggle Microcourses", "DataCamp"],
        projects: ["EDA on Real Dataset"],
        status: "upcoming"
      },
      {
        title: "Statistics & Probability",
        duration: "4 weeks",
        topics: ["Probability Distributions", "Hypothesis Testing", "Regression"],
        resources: ["StatQuest", "Khan Academy"],
        projects: ["Statistical Analysis Report"],
        status: "upcoming"
      },
      {
        title: "Machine Learning Basics",
        duration: "4 weeks",
        topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"],
        resources: ["Scikit-learn Docs", "Andrew Ng ML Course"],
        projects: ["Predictive Model Project"],
        status: "upcoming"
      },
      {
        title: "Data Science Capstone",
        duration: "4 weeks",
        topics: ["Feature Engineering", "Model Deployment", "Data Storytelling"],
        resources: ["Kaggle Competitions", "Medium Articles"],
        projects: ["End-to-End Data Science Project"],
        status: "upcoming"
      }
    ],

    /* ---------------- AI ENGINEER ---------------- */

    "AI Engineer": [
      {
        title: "Programming & Math Foundations",
        duration: "4 weeks",
        topics: ["Python for AI", "Linear Algebra", "Probability Basics"],
        resources: ["MIT OpenCourseWare", "Khan Academy"],
        projects: ["Matrix Operations in Python"],
        status: "upcoming"
      },
      {
        title: "Machine Learning Fundamentals",
        duration: "4 weeks",
        topics: ["Regression", "Classification", "Model Evaluation"],
        resources: ["Scikit-learn Docs", "Coursera ML Course"],
        projects: ["Spam Email Classifier"],
        status: "upcoming"
      },
      {
        title: "Deep Learning",
        duration: "5 weeks",
        topics: ["Neural Networks", "TensorFlow", "PyTorch"],
        resources: ["DeepLearning.ai", "PyTorch Tutorials"],
        projects: ["Image Classifier"],
        status: "upcoming"
      },
      {
        title: "Advanced AI Systems",
        duration: "4 weeks",
        topics: ["Computer Vision", "Natural Language Processing", "Transformers"],
        resources: ["HuggingFace Docs", "Fast.ai"],
        projects: ["Chatbot AI Project"],
        status: "upcoming"
      },
      {
        title: "AI Deployment & MLOps",
        duration: "3 weeks",
        topics: ["Model Deployment", "Docker", "Model Monitoring"],
        resources: ["AWS ML Docs", "Kubeflow Guides"],
        projects: ["Deploy AI API"],
        status: "upcoming"
      }
    ],

    /* ---------------- MACHINE LEARNING ENGINEER ---------------- */

    "Machine Learning Engineer": [
      {
        title: "Python & Math Foundations",
        duration: "3 weeks",
        topics: ["Python Programming", "Linear Algebra", "Statistics"],
        resources: ["Khan Academy", "Python Docs"],
        projects: ["Math Simulation in Python"],
        status: "upcoming"
      },
      {
        title: "Machine Learning Algorithms",
        duration: "4 weeks",
        topics: ["Regression Models", "Decision Trees", "Clustering"],
        resources: ["Scikit-learn Docs", "Andrew Ng ML"],
        projects: ["House Price Predictor"],
        status: "upcoming"
      },
      {
        title: "Deep Learning",
        duration: "4 weeks",
        topics: ["Neural Networks", "CNN", "RNN"],
        resources: ["DeepLearning.ai", "PyTorch Tutorials"],
        projects: ["Image Recognition Model"],
        status: "upcoming"
      },
      {
        title: "ML Systems & Optimization",
        duration: "4 weeks",
        topics: ["Feature Engineering", "Hyperparameter Tuning", "Model Optimization"],
        resources: ["Google ML Crash Course", "Kaggle"],
        projects: ["Optimized ML Pipeline"],
        status: "upcoming"
      },
      {
        title: "Production ML & Deployment",
        duration: "3 weeks",
        topics: ["MLOps", "Docker", "Model Serving"],
        resources: ["Kubeflow Docs", "AWS ML"],
        projects: ["Deploy ML Model API"],
        status: "upcoming"
      }
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

const topicVideos: Record<string, string> = {
  "HTML5 Semantics": "https://www.youtube.com/watch?v=kGW8Al_cga4",
  "CSS Flexbox & Grid": "https://www.youtube.com/watch?v=JJSoEo8JSnc",
  "Responsive Design": "https://www.youtube.com/watch?v=srvUrASNj0s",

  "Variables & Functions": "https://www.youtube.com/watch?v=W6NZfCO5SIk",
  "DOM Manipulation": "https://www.youtube.com/watch?v=0ik6X4DJKCc",
  "Async/Await": "https://www.youtube.com/watch?v=V_Kr9OSfDeU",

  "Components & Props": "https://www.youtube.com/watch?v=SqcY0GlETPk",
  "State Management": "https://www.youtube.com/watch?v=O6P86uwfdR0",
  "Hooks & Context": "https://www.youtube.com/watch?v=TNhaISOUy6Q",

  "Node.js": "https://www.youtube.com/watch?v=TlB_eWDSMt4",
  "REST APIs": "https://www.youtube.com/watch?v=-MTSQjw5DrM",
  "Database Design": "https://www.youtube.com/watch?v=ztHopE5Wnpc",

  "Authentication": "https://www.youtube.com/watch?v=mbsmsi7l3r4",
  "Cloud Deployment": "https://www.youtube.com/watch?v=71wSzpLyW9k",
  "CI/CD": "https://www.youtube.com/watch?v=scEDHsr3APg"
};

const projectVideos: Record<string, string> = {
  "Personal Portfolio Page": "https://www.youtube.com/watch?v=bmpI252DmiI",
  "Interactive Quiz App": "https://www.youtube.com/watch?v=PBcqGxrr9g8",
  "Task Manager App": "https://www.youtube.com/watch?v=pCA4qpQDZD8",
  "Blog API": "https://www.youtube.com/watch?v=G6D9cBaLViA",
  "Full-Stack E-commerce App": "https://www.youtube.com/watch?v=AN3t-OmdyKA",

  "Hello World Project": "https://www.youtube.com/watch?v=UB1O30fR-EE",
  "Intermediate Project": "https://www.youtube.com/watch?v=jS4aFq5-91M",
  "Advanced Project": "https://www.youtube.com/watch?v=nu_pCVPKzTk",
  "Capstone Project": "https://www.youtube.com/watch?v=4UZrsTqkcW4"
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
                              <span
                                key={t}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const url = topicVideos[t];
                                  if (url) window.open(url, "_blank");
                                }}
                                className="text-[11px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 font-medium cursor-pointer hover:text-[#10b981]"
                              >
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
                        <span className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5 font-medium"><Clock size={14} /> {stage.duration}</span>
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
                            {stage.topics.map(t => (
                              <span
                                key={t}
                                onClick={() => {
                                  const url = topicVideos[t];
                                  if (url) window.open(url, "_blank");
                                }}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 cursor-pointer hover:text-[#10b981]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-[#10b981] uppercase tracking-widest">Milestone Projects</p>
                          <div className="flex flex-wrap gap-2">
                            {stage.projects.map(p => (
                              <span
                                key={p}
                                onClick={() => {
                                  const url = projectVideos[p];
                                  if (url) window.open(url, "_blank");
                                }}
                                className="px-3 py-1.5 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-lg text-xs font-bold cursor-pointer hover:bg-[#10b981]/20"
                              >
                                {p}
                              </span>
                            ))}
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