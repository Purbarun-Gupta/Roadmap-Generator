import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">CareerAI</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/generator" className="hover:text-foreground transition-colors">Features</Link>
            <Link to="/" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 CareerAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
