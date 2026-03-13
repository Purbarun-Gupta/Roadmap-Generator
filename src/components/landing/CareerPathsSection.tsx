import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Database, Brain, Shield, Smartphone, Cloud, Settings } from "lucide-react";

const paths = [
  { icon: Globe, title: "Web Developer", color: "from-blue-500 to-cyan-400" },
  { icon: Database, title: "Data Scientist", color: "from-emerald-500 to-teal-400" },
  { icon: Brain, title: "AI Engineer", color: "from-purple-500 to-pink-400" },
  { icon: Shield, title: "Cybersecurity Specialist", color: "from-red-500 to-orange-400" },
  { icon: Smartphone, title: "Mobile Developer", color: "from-indigo-500 to-violet-400" },
  { icon: Cloud, title: "Cloud Engineer", color: "from-sky-500 to-blue-400" },
  { icon: Settings, title: "DevOps Engineer", color: "from-amber-500 to-yellow-400" },
];

export default function CareerPathsSection() {
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
            Explore <span className="text-gradient">Career Paths</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Choose a path and let AI create your personalized roadmap.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {paths.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/generator?career=${encodeURIComponent(p.title)}`}
                className="group block p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <p.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
