import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Map, BarChart3, BookOpen, TrendingUp, MessageCircle, FolderKanban, FileSearch, CalendarDays } from "lucide-react";

const features = [
  { icon: Map, title: "AI Roadmap Generator", desc: "Get a step-by-step learning path tailored to your career goals.", path: "/generator" },
  { icon: BarChart3, title: "Skill Gap Analyzer", desc: "Identify missing skills and get targeted recommendations.", path: "/skill-gap" },
  { icon: BookOpen, title: "Learning Resource Finder", desc: "Curated courses, tutorials, and articles for every topic.", path: "/resources" },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Track your learning journey with visual progress metrics.", path: "/progress" },
  { icon: MessageCircle, title: "AI Mentor Chat", desc: "Get instant answers to your learning questions from AI.", path: "/mentor" },
  { icon: FolderKanban, title: "Project Recommendations", desc: "Build real-world projects to strengthen your portfolio.", path: "/roadmap" },
  { icon: FileSearch, title: "Resume Career Analyzer", desc: "Upload your resume and get career path recommendations.", path: "/resume-analyzer" },
  { icon: CalendarDays, title: "Daily Study Planner", desc: "Convert your roadmap into a manageable daily schedule.", path: "/study-planner" },
];

export default function FeaturesSection() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to <span className="text-gradient">Accelerate</span> Your Career
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful AI-driven tools designed to guide you from where you are to where you want to be.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
