import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, BookOpen, FolderKanban, Clock, Target, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const stats = [
  { icon: TrendingUp, label: "Career Readiness", value: "65%", color: "text-primary" },
  { icon: BookOpen, label: "Topics Completed", value: "8 / 20", color: "text-accent" },
  { icon: FolderKanban, label: "Projects Built", value: "3", color: "text-primary" },
  { icon: Flame, label: "Learning Streak", value: "12 days", color: "text-accent" },
];

const recentActivity = [
  { title: "Completed: JavaScript Fundamentals", time: "2 hours ago" },
  { title: "Started: React & Modern Frontend", time: "1 day ago" },
  { title: "Completed: HTML & CSS Basics", time: "3 days ago" },
];

const upcomingTopics = ["State Management", "Hooks & Context API", "REST API Design", "Database Fundamentals"];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Track your learning progress and stay motivated.</p>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-card border border-border/50">
                <s.icon className={`w-6 h-6 ${s.color} mb-3`} />
                <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Motivational */}
          <div className="p-6 rounded-2xl gradient-primary mb-8">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary-foreground" />
              <div>
                <h3 className="font-display text-lg font-bold text-primary-foreground">You're 65% closer to becoming a Web Developer!</h3>
                <p className="text-primary-foreground/70 text-sm">Keep up the great work. Consistency is key.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((a) => (
                  <div key={a.title} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full gradient-primary mt-2 shrink-0" />
                    <div>
                      <div className="text-sm text-foreground">{a.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Topics */}
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="font-display font-semibold text-foreground mb-4">Upcoming Topics</h3>
              <div className="space-y-3">
                {upcomingTopics.map((t, i) => (
                  <div key={t} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50">
                    <span className="text-xs font-bold text-muted-foreground w-6">{i + 1}.</span>
                    <span className="text-sm text-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/roadmap"><Button variant="outline" size="sm">View Roadmap <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            <Link to="/progress"><Button variant="outline" size="sm">Progress Tracker <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            <Link to="/mentor"><Button variant="outline" size="sm">AI Mentor <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            <Link to="/skill-gap"><Button variant="outline" size="sm">Skill Gap Analyzer <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
