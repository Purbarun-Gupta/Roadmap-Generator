import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Footer from "@/components/Footer";

const careers = ["Web Developer", "Data Scientist", "AI Engineer", "Machine Learning Engineer", "Cybersecurity Expert", "Cloud Engineer", "Mobile Developer", "DevOps Engineer"];
const skillLevels = ["Beginner", "Intermediate", "Advanced"];
const timeFrames = ["3 months", "6 months", "1 year", "2 years"];
const learningStyles = ["Videos", "Documentation", "Interactive Coding", "Projects"];

const assessmentQuestions = [
  { q: "Do you know programming?", options: ["None", "Basic", "Intermediate", "Advanced"] },
  { q: "Have you built technical projects before?", options: ["Yes", "No"] },
  { q: "How comfortable are you with problem solving?", options: ["Beginner", "Intermediate", "Advanced"] },
  { q: "What is your main goal?", options: ["Career switch", "Skill upgrade", "Learning for interest"] },
];

export default function GeneratorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [career, setCareer] = useState(searchParams.get("career") || "");
  const [level, setLevel] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [dailyHours, setDailyHours] = useState([3]);
  const [styles, setStyles] = useState<string[]>([]);
  const [assessment, setAssessment] = useState<Record<number, string>>({});

  const toggleStyle = (s: string) => setStyles((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const canNext = () => {
    if (step === 0) return !!career;
    if (step === 1) return !!level && !!timeFrame;
    if (step === 2) return styles.length > 0;
    if (step === 3) return Object.keys(assessment).length === assessmentQuestions.length;
    return true;
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/roadmap", { state: { career, level, timeFrame, dailyHours: dailyHours[0], styles, assessment } });
    }, 2500);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">Choose Your Career Goal</h2>
            <p className="text-muted-foreground text-sm">Select the tech career you want to pursue.</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {careers.map((c) => (
                <button
                  key={c}
                  onClick={() => setCareer(c)}
                  className={`p-4 rounded-xl text-left text-sm font-medium border transition-all duration-200 ${
                    career === c ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/30"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Skill Level & Timeline</h2>
              <p className="text-muted-foreground text-sm mt-1">Tell us about your experience and available time.</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Current Skill Level</label>
              <div className="flex gap-3">
                {skillLevels.map((s) => (
                  <button
                    key={s}
                    onClick={() => setLevel(s)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                      level === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Time Available</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeFrames.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeFrame(t)}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                      timeFrame === t ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Daily Study Time: {dailyHours[0]} hours</label>
              <Slider value={dailyHours} onValueChange={setDailyHours} min={1} max={8} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1 hr</span><span>8 hrs</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">Preferred Learning Style</h2>
            <p className="text-muted-foreground text-sm">Select all that apply.</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {learningStyles.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleStyle(s)}
                  className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                    styles.includes(s) ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground">Skill Assessment</h2>
            <p className="text-muted-foreground text-sm">Help us understand your current skills better.</p>
            {assessmentQuestions.map((aq, qi) => (
              <div key={qi}>
                <label className="text-sm font-medium text-foreground mb-3 block">{aq.q}</label>
                <div className="flex flex-wrap gap-2">
                  {aq.options.map((o) => (
                    <button
                      key={o}
                      onClick={() => setAssessment((prev) => ({ ...prev, [qi]: o }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        assessment[qi] === o ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/30"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-16">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">AI is building your personalized roadmap...</h2>
          <p className="text-muted-foreground">Analyzing your skills and career goals</p>
          <div className="mt-8 w-64 h-2 bg-muted rounded-full mx-auto overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full gradient-primary rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress bar */}
        <div className="flex gap-2 mb-10">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "gradient-primary" : "bg-muted"}`} />
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {renderStep()}
        </motion.div>

        <div className="flex justify-between mt-10">
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="gradient-primary text-primary-foreground border-0">
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleGenerate} disabled={!canNext()} className="gradient-primary text-primary-foreground border-0">
              Generate Roadmap <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
