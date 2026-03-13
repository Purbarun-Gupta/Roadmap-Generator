import { motion } from "framer-motion";
import { CheckCircle2, Clock, Circle, Flame, Target } from "lucide-react";
import Footer from "@/components/Footer";

const topics = {
  completed: ["HTML5 & Semantics", "CSS Flexbox & Grid", "Responsive Design", "JavaScript Variables", "DOM Manipulation", "Async/Await", "ES6+ Features", "Git Basics"],
  inProgress: ["React Components", "State Management", "Hooks"],
  remaining: ["Context API", "REST APIs", "Node.js", "Database Design", "Authentication", "Deployment", "CI/CD", "Testing", "Performance"],
};

export default function ProgressPage() {
  const total = topics.completed.length + topics.inProgress.length + topics.remaining.length;
  const progress = Math.round((topics.completed.length / total) * 100);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Progress Tracker</h1>
          <p className="text-muted-foreground mb-8">Monitor your learning journey.</p>

          {/* Overview Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
              <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-foreground">{topics.completed.length}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
              <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-foreground">{topics.inProgress.length}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
              <Circle className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-foreground">{topics.remaining.length}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-5 rounded-2xl bg-card border border-border/50 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Streak & ETA */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-card border border-border/50 flex items-center gap-3">
              <Flame className="w-8 h-8 text-accent" />
              <div>
                <div className="font-display text-xl font-bold text-foreground">12 Days</div>
                <div className="text-xs text-muted-foreground">Learning Streak</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/50 flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <div className="font-display text-xl font-bold text-foreground">~8 Weeks</div>
                <div className="text-xs text-muted-foreground">Est. Completion</div>
              </div>
            </div>
          </div>

          {/* Topic Lists */}
          {[
            { title: "Completed Topics", items: topics.completed, icon: CheckCircle2, color: "text-primary" },
            { title: "In Progress", items: topics.inProgress, icon: Clock, color: "text-accent" },
            { title: "Remaining Topics", items: topics.remaining, icon: Circle, color: "text-muted-foreground" },
          ].map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <section.icon className={`w-5 h-5 ${section.color}`} />
                {section.title} ({section.items.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.items.map((t) => (
                  <span key={t} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                    section.color === "text-primary" ? "bg-primary/10 text-primary border-primary/20" :
                    section.color === "text-accent" ? "bg-accent/10 text-accent border-accent/20" :
                    "bg-muted text-muted-foreground border-border"
                  }`}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
