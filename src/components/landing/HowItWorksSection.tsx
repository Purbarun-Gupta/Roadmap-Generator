import { motion } from "framer-motion";
import { Target, ClipboardCheck, Brain, Route, Rocket } from "lucide-react";

const steps = [
  { icon: Target, title: "Enter Your Career Goal", desc: "Choose the tech career you want to pursue." },
  { icon: ClipboardCheck, title: "Complete Skill Assessment", desc: "Take a short quiz to evaluate your current skills." },
  { icon: Brain, title: "AI Analyzes Skill Gaps", desc: "Our AI identifies what you need to learn." },
  { icon: Route, title: "Get Your Personalized Roadmap", desc: "Receive a step-by-step learning plan." },
  { icon: Rocket, title: "Track Progress & Build Projects", desc: "Follow the roadmap and build your portfolio." },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Five simple steps to your career transformation.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-6 relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-1rem)] bg-border" />
              )}
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 relative z-10">
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="pb-10">
                <div className="text-xs font-semibold text-primary mb-1">Step {i + 1}</div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
