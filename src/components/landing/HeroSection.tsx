import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    /* FIX: Changed items-center to items-start.
       FIX: Added pt-32 to push content down away from the fixed navbar.
    */
    <section className="relative min-h-[90vh] flex items-start justify-center bg-[#050b14] overflow-hidden pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "linear-gradient(hsl(180 100% 50% / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(180 100% 50% / 0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-white"
          >
            Generate Your <span className="text-primary">AI-Powered</span> Career Roadmap
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300/80 mb-10 max-w-2xl leading-relaxed"
          >
            Get a personalized step-by-step learning path for any tech career.
            Powered by AI to adapt to your skills, goals, and schedule.
          </motion.p>

          {/* Centered Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center w-full"
          >
            <Link to="/generator">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-[#050b14] font-bold text-lg px-10 h-14 shadow-[0_0_25px_rgba(20,255,236,0.3)] border-0 transition-all hover:scale-105">
                Generate My Roadmap
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-12 mt-12 w-full max-w-2xl border-t border-white/10 pt-10"
          >
            {[
              { value: "50K+", label: "Roadmaps" },
              { value: "200+", label: "Paths" },
              { value: "95%", label: "Happy Users" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="font-display text-3xl md:text-5xl font-extrabold text-primary drop-shadow-[0_0_8px_rgba(20,255,236,0.3)] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-gray-400 mt-2 font-semibold uppercase tracking-[0.15em] leading-tight opacity-70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}