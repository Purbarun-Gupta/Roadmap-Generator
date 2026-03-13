import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileSearch, Loader2, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <FileSearch className="w-8 h-8 text-primary" /> Resume Career Analyzer
          </h1>
          <p className="text-muted-foreground mb-8">Upload your resume and get personalized career recommendations.</p>

          {!uploaded && (
            <div
              onClick={handleUpload}
              className="p-12 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-card cursor-pointer transition-all text-center group"
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
              <h3 className="font-display font-semibold text-foreground mb-2">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground">Supports PDF and DOCX formats</p>
            </div>
          )}

          {analyzing && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground">Analyzing your resume...</h3>
              <p className="text-sm text-muted-foreground mt-2">Identifying skills and career recommendations</p>
            </div>
          )}

          {result && !analyzing && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-3">Existing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((s) => <span key={s} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">{s}</span>)}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-3">Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missing.map((s) => <span key={s} className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium">{s}</span>)}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-3">Recommended Learning Path: Data Scientist</h3>
                <div className="space-y-2">
                  {result.path.map((p, i) => (
                    <div key={p} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50">
                      <span className="text-xs font-bold text-primary w-6">{i + 1}.</span>
                      <span className="text-sm text-foreground">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/generator">
                <Button className="gradient-primary text-primary-foreground border-0 w-full">
                  Generate Full Roadmap <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
