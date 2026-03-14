import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";
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
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: `Great question! Based on current industry trends, I'd recommend focusing on building practical projects alongside your theoretical learning.\n\nWould you like me to suggest specific projects for your current skill level?` 
      }]);
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
    <div className="min-h-screen bg-[#02060c] text-white pt-24 relative overflow-hidden flex flex-col">
      {/* Background Grid Pattern - image_232e27.png */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="flex-1 container mx-auto px-6 max-w-[1000px] relative z-10 flex flex-col pb-12">
        
        {/* Large Header - image_232719.png */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-white mb-4 flex items-center gap-4">
            AI Mentor <span className="text-[#10b981]">Chat</span>
          </h1>
          <p className="text-gray-400 text- md:text-xl max-w-2xl font-medium opacity-80">
            Get personalized career guidance and roadmap advice in real-time.
          </p>
        </div>

        {/* Chat Container - image_231417.png */}
        <div className="flex-1 bg-[#0a0f18] border border-white/5 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden min-h-[500px]">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                  m.role === "assistant" ? "bg-[#10b981]/10 text-[#10b981]" : "bg-white/5 text-gray-400"
                }`}>
                  {m.role === "assistant" ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className={`max-w-[75%] px-6 py-4 rounded-[1.5rem] text-sm md:text-base leading-relaxed ${
                  m.role === "assistant" 
                    ? "bg-[#02060c] border border-white/5 text-gray-200" 
                    : "bg-[#10b981] text-[#02060c] font-bold"
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 text-[#10b981] flex items-center justify-center animate-pulse">
                  <Bot size={20} />
                </div>
                <div className="px-6 py-4 rounded-[1.5rem] bg-[#02060c] border border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[#10b981]/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[#10b981]/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Action Area */}
          <div className="p-8 bg-[#02060c]/50 border-t border-white/5">
            {/* Suggested Prompts - image_231417.png */}
            <div className="flex flex-wrap gap-2 mb-6">
              {suggestedPrompts.map((p) => (
                <button 
                  key={p} 
                  onClick={() => handleSend(p)} 
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-white/10 bg-[#0a0f18] text-gray-400 hover:border-[#10b981]/40 hover:text-white hover:bg-[#10b981]/5 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input - image_2380d7.png style */}
            <div className="relative group">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask your AI mentor..."
                className="w-full pl-6 pr-16 py-5 rounded-2xl bg-[#02060c] border border-white/10 text-white focus:outline-none focus:border-[#10b981]/40 transition-all shadow-inner placeholder:text-gray-700 font-medium"
              />
              <button 
                onClick={() => handleSend()} 
                disabled={!input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#10b981] flex items-center justify-center text-[#02060c] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Send size={18} className="stroke-[2.5px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}