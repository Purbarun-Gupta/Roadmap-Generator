import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSearch, Loader2, ArrowRight, Shield, Zap, BarChart3, CheckCircle2, Info, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

export default function ResumeAnalyzerPage() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { skills: string[]; missing: string[]; path: string[] }>(null);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        skills: ["Python", "SQL", "Excel", "Data Visualization"],
        missing: ["Statistics", "Machine Learning", "Deep Learning", "Feature Engineering", "Model Deployment"],
        path: ["Python Advanced", "Statistics & Probability", "Data Analysis", "Machine Learning Fundamentals", "Deep Learning", "Portfolio Projects"],
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#02060c] text-slate-200 pt-24 relative overflow-hidden flex flex-col font-sans">
      {/* Ultra-subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#10b981 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

      <div className="container mx-auto px-8 max-w-[1300px] relative z-10 flex-grow">
        
        {/* Header - Cleaner Typography */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h1 className="text-5xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Resume Career <span className="text-[#10b981] font-light">Analyzer</span>
          </h1>
          <p className="text-slate-400 text-lg max-w- leading-relaxed">
            Upload your professional profile to generate an AI-driven gap analysis and strategic career roadmap.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          
          {/* Main Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {!uploaded && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleUpload}
                  className="p-16 rounded-[2rem] bg-[#0a0f18]/50 border border-white/5 hover:border-[#10b981]/20 transition-all group flex flex-col items-center justify-center text-center cursor-pointer relative"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 group-hover:border-[#10b981]/30 transition-all">
                    <Upload size={32} className="text-slate-400 group-hover:text-[#10b981] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2">Upload Resume</h3>
                  <p className="text-slate-500 mb-8 text-sm">PDF or DOCX supported. Your data remains private.</p>
                  <Button variant="outline" className="rounded-xl px-8 border-white/10 hover:bg-white/5 text-slate-300">
                    Select File
                  </Button>
                </motion.div>
              )}

              {analyzing && (
                <motion.div key="loading" className="text-center py-24 bg-[#0a0f18]/30 rounded-[2rem] border border-white/5">
                  <Loader2 className="w-10 h-10 text-[#10b981] animate-spin mx-auto mb-6 opacity-80" />
                  <p className="text-slate-400 font-medium tracking-wide italic">Processing document structure...</p>
                </motion.div>
              )}

              {result && !analyzing && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Skills Cards - Refined Borders */}
                    <div className="p-8 rounded-[2rem] bg-[#0a0f18]/50 border border-white/5 shadow-sm">
                      <h3 className="text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-6">Existing Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.skills.map((s) => (
                          <span key={s} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-xs font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-[#0a0f18]/50 border border-white/5 shadow-sm">
                      <h3 className="text-sm font-semibold text-rose-400/80 uppercase tracking-widest mb-6">Identified Gaps</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.missing.map((s) => (
                          <span key={s} className="px-3 py-1.5 rounded-lg bg-rose-500/5 border border-rose-500/10 text-rose-300/80 text-xs font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Roadmap Section - Clean List Style */}
                  <div className="p-10 rounded-[2rem] bg-[#0d0d1a]/40 border border-[#1c1c3a]/50">
                    <h3 className="text-xl font-medium text-white mb-8">Data Science Specialization Path</h3>
                    <div className="space-y-3 mb-10">
                      {result.path.map((p, i) => (
                        <div key={p} className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-colors">
                          <span className="text-xs font-mono text-slate-500">0{i + 1}</span>
                          <span className="text-sm text-slate-300">{p}</span>
                          <ChevronRight size={14} className="ml-auto text-slate-600" />
                        </div>
                      ))}
                    </div>
                    <Link to="/generator">
                      <Button className="w-full h-14 bg-[#10b981] hover:bg-[#10b981]/90 text-[#02060c] font-semibold rounded-xl transition-all">
                        View Interactive Roadmap
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Lighter Visual Weight */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-[2rem] bg-[#0d0d1a]/40 border border-[#1c1c3a]/50">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <Clock size={14} /> Workflow
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Document Parsing", active: true },
                  { label: "Entity Extraction", active: uploaded },
                  { label: "Market Calibration", active: !!result },
                  { label: "Path Optimization", active: !!result }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-1.5 h-1.5 rounded-full ${step.active ? "bg-[#10b981]" : "bg-slate-800"}`} />
                    <span className={`text-sm font-medium ${step.active ? "text-slate-200" : "text-slate-600"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle Advice Card
            <div className="p-8 rounded-[2rem] bg-[#0a0f18]/50 border border-white/5 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-500/5 flex items-center justify-center">
                  <Info className="text-blue-400/70" size={16} />
                </div>
                <h3 className="text-sm font-semibold text-slate-300">Analysis Tips</h3>
              </div>
              <ul className="space-y-4 text-xs leading-relaxed text-slate-500">
                <li className="flex gap-3 italic">
                  "Ensure your experience section uses chronological formatting for best results."
                </li>
                <li className="flex gap-3 italic">
                  "Include specific technical tools to improve gap-detection accuracy."
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}