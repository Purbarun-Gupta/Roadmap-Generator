import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, FileText, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const resources = [
  { title: "The Complete Web Developer Bootcamp", type: "Course", difficulty: "Beginner", time: "40 hours", category: "Web Development" },
  { title: "JavaScript: Understanding the Weird Parts", type: "Video", difficulty: "Intermediate", time: "12 hours", category: "JavaScript" },
  { title: "Python for Data Science Handbook", type: "Article", difficulty: "Beginner", time: "6 hours", category: "Python" },
  { title: "React Official Documentation", type: "Article", difficulty: "Beginner", time: "8 hours", category: "React" },
  { title: "Machine Learning Crash Course", type: "Course", difficulty: "Intermediate", time: "15 hours", category: "Machine Learning" },
  { title: "Docker for Beginners", type: "Video", difficulty: "Beginner", time: "4 hours", category: "DevOps" },
  { title: "Advanced TypeScript Patterns", type: "Article", difficulty: "Advanced", time: "3 hours", category: "TypeScript" },
  { title: "AWS Cloud Practitioner", type: "Course", difficulty: "Beginner", time: "20 hours", category: "Cloud" },
  { title: "System Design Interview Prep", type: "Course", difficulty: "Advanced", time: "10 hours", category: "System Design" },
];

const typeIcon = { Course: BookOpen, Video: Video, Article: FileText };

const resourceLinks: Record<string, string> = {
  "The Complete Web Developer Bootcamp": "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
  "JavaScript: Understanding the Weird Parts": "https://www.youtube.com/watch?v=Bv_5Zv5c-Ts",
  "Python for Data Science Handbook": "https://jakevdp.github.io/PythonDataScienceHandbook/",
  "React Official Documentation": "https://react.dev/learn",
  "Machine Learning Crash Course": "https://developers.google.com/machine-learning/crash-course",
  "Docker for Beginners": "https://www.youtube.com/watch?v=fqMOX6JJhGo",
  "Advanced TypeScript Patterns": "https://www.typescriptlang.org/docs/",
  "AWS Cloud Practitioner": "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/",
  "System Design Interview Prep": "https://www.youtube.com/watch?v=UzLMhqg3_Wc"
};

export default function ResourcesPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const filtered = filter === "All" ? resources : resources.filter((r) => r.difficulty === filter);

  return (
    <div className="min-h-screen bg-[#02060c] text-white pt-24 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* Large Title - Matched to image_232719.png */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Resource <span className="text-[#10b981]">Library</span>
            </h1>
            <p className="text-gray-400 text- max-w-3xl font-medium opacity-80">
              Curated learning resources for every skill level to bridge your technical gaps.
            </p>
          </div>

          {/* Filters & Search - Integrated style from image_2380d7.png and image_231f1c.png */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0a0f18] border border-white/5 shadow-xl">
              <div className="flex items-center gap-2 px-3 text-[#10b981]">
                <Filter size={14} className="stroke-[3px]" />
                <span className="text-[10px] font-black uppercase tracking-widest mr-2">Filter By</span>
              </div>
              {filters.map((f) => (
                <Button
                  key={f}
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={`rounded-xl text-[11px] font-bold px-5 h-9 transition-all ${filter === f
                    ? "bg-[#10b981] text-[#02060c] hover:bg-[#10b981]/90 shadow-lg shadow-[#10b981]/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {f}
                </Button>
              ))}
            </div>

            {/* Sub-search box style from your analyzer input */}
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#10b981] transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#0a0f18] border border-white/5 text-sm focus:outline-none focus:border-[#10b981]/30 transition-all placeholder:text-gray-700 font-medium"
              />
            </div>
          </div>

          {/* Full Grid Layout - Coverage increased to cover the page mostly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {filtered.map((r, i) => {
              const Icon = typeIcon[r.type as keyof typeof typeIcon] || BookOpen;
              return (
                <motion.div
                  onClick={() => {
                    const url = resourceLinks[r.title];
                    if (url) window.open(url, "_blank");
                  }}
                  key={r.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group p-6 rounded-[2rem] bg-[#0a0f18] border border-white/5 hover:border-[#10b981]/30 shadow-2xl transition-all flex flex-col h-full cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#10b981] stroke-[2.5px]" />
                      </div>
                      <span className="text-[11px] font-black text-[#10b981] uppercase tracking-wider">{r.type}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-tighter ${r.difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10" :
                      r.difficulty === "Intermediate" ? "bg-purple-500/10 text-purple-500 border border-purple-500/10" :
                        "bg-rose-500/10 text-rose-500 border border-rose-500/10"
                      }`}>
                      {r.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4 leading-snug group-hover:text-[#10b981] transition-colors flex-1">
                    {r.title}
                  </h3>

                  <div className="flex items-center justify-between pt-5 border-t border-white/5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>{r.time}</span>
                    <span className="text-gray-400 group-hover:text-white transition-colors">{r.category}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}