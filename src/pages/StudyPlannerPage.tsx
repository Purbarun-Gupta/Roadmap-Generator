import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Brain, Sparkles, CheckCircle2, BookOpen, Code, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface PlanItem {
  time: string;
  topic: string;
  type: "learn" | "practice" | "project" | "review";
  duration: string;
}

interface DayPlan {
  day: string;
  items: PlanItem[];
}

const typeIcons = {
  learn: BookOpen,
  practice: Code,
  project: FileText,
  review: Brain,
};

const typeColors = {
  learn: "bg-primary/10 text-primary border-primary/20",
  practice: "bg-accent/10 text-accent border-accent/20",
  project: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  review: "bg-chart-4/10 text-chart-4 border-chart-4/20",
};

const sampleWeeklyPlan: DayPlan[] = [
  {
    day: "Monday",
    items: [
      { time: "9:00 AM", topic: "Python Fundamentals – Variables & Data Types", type: "learn", duration: "1.5 hrs" },
      { time: "11:00 AM", topic: "Practice: Coding Exercises on Loops", type: "practice", duration: "1 hr" },
      { time: "2:00 PM", topic: "Review: Previous Week Concepts", type: "review", duration: "30 min" },
    ],
  },
  {
    day: "Tuesday",
    items: [
      { time: "9:00 AM", topic: "Data Structures – Lists & Dictionaries", type: "learn", duration: "1.5 hrs" },
      { time: "11:00 AM", topic: "Mini Project: Student Grade Calculator", type: "project", duration: "2 hrs" },
    ],
  },
  {
    day: "Wednesday",
    items: [
      { time: "9:00 AM", topic: "Functions & Modules in Python", type: "learn", duration: "1.5 hrs" },
      { time: "11:00 AM", topic: "Practice: Build Utility Functions", type: "practice", duration: "1 hr" },
      { time: "2:00 PM", topic: "Read Documentation: Python Standard Library", type: "learn", duration: "1 hr" },
    ],
  },
  {
    day: "Thursday",
    items: [
      { time: "9:00 AM", topic: "Object-Oriented Programming Basics", type: "learn", duration: "1.5 hrs" },
      { time: "11:00 AM", topic: "Practice: OOP Exercises", type: "practice", duration: "1.5 hrs" },
    ],
  },
  {
    day: "Friday",
    items: [
      { time: "9:00 AM", topic: "Project: Build a CLI Task Manager", type: "project", duration: "2.5 hrs" },
      { time: "12:00 PM", topic: "Weekly Review & Self-Assessment", type: "review", duration: "1 hr" },
    ],
  },
  {
    day: "Saturday",
    items: [
      { time: "10:00 AM", topic: "Explore: APIs & HTTP Requests", type: "learn", duration: "1.5 hrs" },
      { time: "12:00 PM", topic: "Mini Project: Weather API App", type: "project", duration: "2 hrs" },
    ],
  },
  {
    day: "Sunday",
    items: [
      { time: "10:00 AM", topic: "Light Review: Week Highlights", type: "review", duration: "45 min" },
      { time: "11:00 AM", topic: "Plan Next Week's Goals", type: "review", duration: "30 min" },
    ],
  },
];

export default function StudyPlannerPage() {
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<DayPlan[] | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [studyHours, setStudyHours] = useState(3);
  const [goal, setGoal] = useState("Data Scientist");

  const generatePlan = () => {
    setGenerating(true);
    setTimeout(() => {
      setPlan(sampleWeeklyPlan);
      setGenerating(false);
      setSelectedDay(0);
      setCompletedItems(new Set());
    }, 2500);
  };

  const toggleComplete = (key: string) => {
    setCompletedItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const totalItems = plan ? plan.reduce((a, d) => a + d.items.length, 0) : 0;
  const completedCount = completedItems.size;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-5xl font-bold text-foreground">AI Daily Study Planner</h1>
          </div>
          <p className="text-muted-foreground mb-8 ml-[52px]">
            Let AI convert your career roadmap into a personalized daily & weekly schedule.
          </p>

          {/* Config Section */}
          {!plan && !generating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-card border border-border/50 mb-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">Configure Your Study Plan</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Career Goal</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {["Web Developer", "Data Scientist", "AI Engineer", "Cybersecurity Specialist", "Mobile Developer", "Cloud Engineer", "DevOps Engineer"].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Daily Study Hours: <span className="text-primary font-bold">{studyHours}h</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={studyHours}
                    onChange={(e) => setStudyHours(Number(e.target.value))}
                    className="w-full accent-primary mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 hour</span>
                    <span>8 hours</span>
                  </div>
                </div>
              </div>
              <Button onClick={generatePlan} className="gradient-primary text-primary-foreground font-semibold border-0 px-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate My Study Plan
              </Button>
            </motion.div>
          )}

          {/* Loading */}
          <AnimatePresence>
            {generating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-foreground font-display font-semibold text-lg">AI is building your personalized study plan...</p>
                <p className="text-muted-foreground text-sm mt-1">Optimizing for {studyHours}h/day as a {goal}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Plan Display */}
          {plan && !generating && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Progress bar */}
              <div className="p-5 rounded-2xl bg-card border border-border/50 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Weekly Progress</span>
                  <span className="text-sm font-bold text-primary">{completedCount}/{totalItems} tasks</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ width: totalItems > 0 ? `${(completedCount / totalItems) * 100}%` : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Day tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
                {daysOfWeek.map((day, i) => {
                  const dayPlan = plan[i];
                  const dayCompleted = dayPlan?.items.every((_, j) => completedItems.has(`${i}-${j}`));
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                        selectedDay === i
                          ? "gradient-primary text-primary-foreground shadow-lg"
                          : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                      }`}
                    >
                      {dayCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {day.slice(0, 3)}
                    </button>
                  );
                })}
              </div>

              {/* Day schedule */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  {daysOfWeek[selectedDay]}'s Schedule
                </h3>
                {plan[selectedDay]?.items.map((item, j) => {
                  const key = `${selectedDay}-${j}`;
                  const done = completedItems.has(key);
                  const Icon = typeIcons[item.type];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.05 }}
                      onClick={() => toggleComplete(key)}
                      className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                        done
                          ? "bg-primary/5 border-primary/20 opacity-70"
                          : "bg-card border-border/50 hover:border-primary/30 hover:shadow-md"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${typeColors[item.type]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-foreground ${done ? "line-through opacity-60" : ""}`}>
                          {item.topic}
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.time}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                          <span>•</span>
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        done ? "border-primary bg-primary" : "border-muted-foreground/30"
                      }`}>
                        {done && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Reset */}
              <div className="mt-8 flex gap-3">
                <Button variant="outline" onClick={() => { setPlan(null); setCompletedItems(new Set()); }}>
                  Generate New Plan
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
