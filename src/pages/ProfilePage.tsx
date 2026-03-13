import { useState } from "react";
import { motion } from "framer-motion";
import { User, Save, Target, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const [name, setName] = useState("Alex Johnson");
  const [careerGoal, setCareerGoal] = useState("Web Developer");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [hours, setHours] = useState("4");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Profile</h1>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground">{careerGoal} • {skillLevel}</p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { label: "Name", icon: User, value: name, onChange: setName, type: "text" },
              { label: "Career Goal", icon: Target, value: careerGoal, onChange: setCareerGoal, type: "select", options: ["Web Developer", "Data Scientist", "AI Engineer", "Cloud Engineer", "DevOps Engineer"] },
              { label: "Skill Level", icon: BookOpen, value: skillLevel, onChange: setSkillLevel, type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
              { label: "Study Hours Per Day", icon: Clock, value: hours, onChange: setHours, type: "number" },
            ].map((field) => (
              <div key={field.label} className="p-5 rounded-2xl bg-card border border-border/50">
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <field.icon className="w-4 h-4 text-primary" /> {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-background border border-border/50 text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-background border border-border/50 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                )}
              </div>
            ))}

            <Button onClick={handleSave} className="gradient-primary text-primary-foreground border-0 w-full">
              <Save className="w-4 h-4 mr-2" /> {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
