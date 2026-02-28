import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"artist" | "audience">("audience");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card border border-border rounded-2xl p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              {mode === "login" ? "Welcome back" : "Join the stage"}
            </h2>
            <p className="text-muted-foreground text-sm font-body mb-6">
              {mode === "login"
                ? "Sign in to your Tentertain account"
                : "Create your account and step into the spotlight"}
            </p>

            {/* Role selector (signup only) */}
            {mode === "signup" && (
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setRole("artist")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-body font-semibold border transition-colors ${
                    role === "artist"
                      ? "bg-greenroom-accent/10 border-greenroom-accent/40 text-greenroom-accent"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🎭 I'm an Artist
                </button>
                <button
                  onClick={() => setRole("audience")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-body font-semibold border transition-colors ${
                    role === "audience"
                      ? "bg-boxoffice-accent/10 border-boxoffice-accent/40 text-boxoffice-accent"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🎟️ I'm Audience
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Backend integration needed
                alert("Login functionality requires backend setup. Enable Lovable Cloud to proceed!");
              }}
              className="space-y-4"
            >
              {mode === "signup" && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-muted border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-muted border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-muted border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                {mode === "login" ? "Sign In" : "Create Account"}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            <p className="text-center text-muted-foreground text-xs font-body mt-6">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-primary hover:underline font-semibold"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
