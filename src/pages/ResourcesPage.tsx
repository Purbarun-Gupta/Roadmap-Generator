import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, FileText, Filter } from "lucide-react";
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

export default function ResourcesPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const filtered = filter === "All" ? resources : resources.filter((r) => r.difficulty === filter);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Resource Library</h1>
          <p className="text-muted-foreground mb-8">Curated learning resources for every skill level.</p>

          <div className="flex items-center gap-2 mb-8">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {filters.map((f) => (
              <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}
                className={filter === f ? "gradient-primary text-primary-foreground border-0" : ""}>
                {f}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r, i) => {
              const Icon = typeIcon[r.type as keyof typeof typeIcon] || BookOpen;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary">{r.type}</span>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      r.difficulty === "Beginner" ? "bg-primary/10 text-primary" :
                      r.difficulty === "Intermediate" ? "bg-accent/10 text-accent" :
                      "bg-destructive/10 text-destructive"
                    }`}>{r.difficulty}</span>
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-2 group-hover:text-primary transition-colors">{r.title}</h3>
                  <div className="text-xs text-muted-foreground">{r.time} • {r.category}</div>
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
