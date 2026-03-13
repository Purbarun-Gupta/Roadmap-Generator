import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-8">
              <Compass className="w-4 h-4" />
              AI-Powered Career Planning
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-primary-foreground">Generate Your </span>
            <span className="text-gradient">AI-Powered</span>
            <span className="text-primary-foreground"> Career Roadmap</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-primary-foreground/60 mb-10 max-w-2xl mx-auto"
          >
            Get a personalized step-by-step learning path for any tech career.
            Powered by AI to adapt to your skills, goals, and schedule.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/generator">
              <Button size="lg" className="gradient-primary text-primary-foreground font-semibold text-base px-8 h-12 border-0 glow-shadow animate-pulse_glow">
                Generate My Roadmap
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/resources">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground/80 hover:bg-primary-foreground/10 font-semibold text-base px-8 h-12">
                Explore Careers
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
          >
            {[
              { value: "50K+", label: "Roadmaps Generated" },
              { value: "200+", label: "Career Paths" },
              { value: "95%", label: "User Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs md:text-sm text-primary-foreground/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
