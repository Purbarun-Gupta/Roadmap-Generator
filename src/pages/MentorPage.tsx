import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "What should I learn after Python?",
  "Best beginner projects for machine learning?",
  "How long does it take to become a web developer?",
  "What are the most in-demand tech skills?",
];

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI Career Mentor. Ask me anything about your learning path, career goals, or what to study next. 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateResponse = (userMsg: string) => {
    setIsTyping(true);
    const responses: Record<string, string> = {
      default: `Great question! Based on current industry trends, I'd recommend focusing on building practical projects alongside your theoretical learning. This combination helps solidify concepts and builds your portfolio.\n\nWould you like me to suggest specific projects for your current skill level?`,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: responses.default }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    simulateResponse(msg);
  };

  return (
    <div className="min-h-screen bg-background pt-16 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-6 max-w-3xl flex flex-col">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> AI Mentor Chat
          </h1>
          <p className="text-sm text-muted-foreground">Ask anything about your career learning path.</p>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === "assistant" ? "gradient-primary" : "bg-accent"}`}>
                {m.role === "assistant" ? <Bot className="w-4 h-4 text-primary-foreground" /> : <User className="w-4 h-4 text-accent-foreground" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                m.role === "assistant" ? "bg-card border border-border/50 text-foreground" : "gradient-primary text-primary-foreground"
              }`}>
                {m.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"><Bot className="w-4 h-4 text-primary-foreground" /></div>
              <div className="px-4 py-3 rounded-2xl bg-card border border-border/50">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedPrompts.map((p) => (
              <button key={p} onClick={() => handleSend(p)} className="px-3 py-2 rounded-xl text-xs font-medium border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all">
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your AI mentor..."
            className="flex-1 px-4 py-3 rounded-xl bg-card border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <Button onClick={() => handleSend()} disabled={!input.trim()} className="gradient-primary text-primary-foreground border-0 px-4">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
