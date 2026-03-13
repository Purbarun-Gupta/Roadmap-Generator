import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
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
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-primary" /> Skill Gap Analyzer
          </h1>
          <p className="text-muted-foreground mb-8">Enter your current skills and discover what you need to learn.</p>

          <div className="p-6 rounded-2xl bg-card border border-border/50 mb-8">
            <label className="text-sm font-medium text-foreground mb-3 block">Enter skills you already know (comma-separated)</label>
            <textarea
              value={inputSkills}
              onChange={(e) => setInputSkills(e.target.value)}
              placeholder="e.g. HTML/CSS, JavaScript, Python, Git"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none h-24"
            />
            <Button onClick={handleAnalyze} className="gradient-primary text-primary-foreground border-0 mt-4">
              Analyze Skill Gaps
            </Button>
          </div>

          {analyzed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Known Skills */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> Known Skills ({knownSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {knownSkills.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20">{s}</span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" /> Missing Skills ({missing.length})
                </h3>
                <div className="space-y-3">
                  {missing.map((s) => (
                    <div key={s} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{s}</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-destructive/60 rounded-full" style={{ width: "0%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" /> Recommended to Learn Next
                </h3>
                <div className="space-y-3">
                  {recommended.map((s, i) => (
                    <div key={s} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/5 border border-accent/10">
                      <span className="text-xs font-bold text-accent w-6">#{i + 1}</span>
                      <span className="text-sm text-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
