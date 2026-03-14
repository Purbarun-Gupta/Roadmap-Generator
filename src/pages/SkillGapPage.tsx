import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, AlertCircle, Lightbulb, Search, PlusCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const allSkills = ["HTML/CSS", "JavaScript", "Python", "React", "Node.js", "SQL", "Git", "TypeScript", "Docker", "AWS", "Machine Learning", "Data Analysis", "REST APIs", "Testing", "CI/CD"];

export default function SkillGapPage() {
  const [inputSkills, setInputSkills] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [knownSkills, setKnownSkills] = useState<string[]>([]);

  const handleAnalyze = () => {
    const parsed = inputSkills.split(",").map((s) => s.trim()).filter(Boolean);
    setKnownSkills(parsed);
    setAnalyzed(true);
  };

  const missing = allSkills.filter((s) => !knownSkills.some((k) => k.toLowerCase() === s.toLowerCase()));
  const recommended = missing.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#02060c] text-white pt-16 relative overflow-hidden">
      {/* Background Grid Pattern - Shrunk dots for cleaner look */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Shrunk Header Section */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-tight text-white mb-2">
              Skill Gap <span className="text-[#10b981]">Analyzer</span>
            </h1>
            <p className="text-gray-400 text-sm">Pinpoint the technical gaps in your profile and learn what's next.</p>
          </div>

          {/* Compact Input Area - Matched to image_232e27.png */}
          <div className="p-5 rounded-2xl bg-[#0a0f18] border border-white/5 mb-8 shadow-xl">
            <div className="flex items-center gap-2 mb-3 text-[#10b981]">
              <Search size={14} className="stroke-[3px]" />
              <label className="text-[10px] font-black uppercase tracking-[0.15em]">Inventory Your Skills</label>
            </div>
            <textarea
              value={inputSkills}
              onChange={(e) => setInputSkills(e.target.value)}
              placeholder="e.g. HTML, CSS, React..."
              className="w-full px-4 py-3 rounded-xl bg-[#02060c] border border-white/10 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#10b981]/40 transition-all resize-none h-24 text-base mb-4 font-medium"
            />
            <Button 
              onClick={handleAnalyze} 
              className="w-full h-12 bg-[#10b981] hover:bg-[#10b981]/90 text-[#02060c] font-bold text-md rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
            >
              Run Analysis <ArrowRight size={18} className="stroke-[3px]" />
            </Button>
          </div>

          {analyzed && (
            <div className="grid md:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Missing & Known Skills */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-7 space-y-6">
                
                {/* Missing Skills - Improved spacing from image_238557.png */}
                <div className="p-6 rounded-2xl bg-[#0a0f18] border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" /> Missing Skills ({missing.length})
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-1">
                    {missing.map((s) => (
                      <div key={s} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0 group">
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{s}</span>
                        <div className="flex items-center gap-3">
                           <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter hidden sm:block">Priority Gap</span>
                           <div className="w-20 h-1 bg-[#1a1f2e] rounded-full overflow-hidden">
                             <div className="h-full bg-red-500/20 w-full" />
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Validated Skills Shrunk */}
                <div className="p-5 rounded-2xl bg-[#0a0f18] border border-white/5">
                  <h3 className="text-[10px] font-black text-gray-500 mb-3 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-[#10b981]" /> Mastery Identified
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {knownSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-[#10b981]/5 text-[#10b981] text-[10px] font-bold border border-[#10b981]/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Recommended - Matched to image_2388b8.png Style */}
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-5">
                <div className="p-6 rounded-[2rem] bg-[#0d0d1a] border border-[#1c1c3a] shadow-2xl sticky top-20">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[#1c1c3a] flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-[#8b5cf6]" />
                    </div>
                    <h3 className="text-md font-bold text-white uppercase tracking-wider">Learn Next</h3>
                  </div>

                  <div className="space-y-2">
                    {recommended.map((s, i) => (
                      <motion.div 
                        key={s} 
                        whileHover={{ scale: 1.01, backgroundColor: "#16162d" }}
                        className="group flex items-center gap-4 px-4 py-3.5 rounded-xl bg-[#131325] border border-[#1c1c3a] transition-all cursor-pointer"
                      >
                        <span className="text-[10px] font-bold text-[#8b5cf6] bg-[#8b5cf6]/10 w-7 h-7 rounded-md flex items-center justify-center">
                          #{i + 1}
                        </span>
                        <span className="text-xs font-bold text-white flex-1">{s}</span>
                        <PlusCircle className="w-4 h-4 text-gray-600 group-hover:text-[#10b981] transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-xl bg-[#8b5cf6]/5 border border-[#8b5cf6]/10">
                    <p className="text-[10px] text-gray-400 leading-relaxed text-center">
                      Closing these gaps improves hiring odds by <span className="text-[#10b981] font-bold">42%</span>.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          )}
        </motion.div>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}