import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CurtainReveal = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 1200);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Left curtain */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-1/2 curtain-left"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Right curtain */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 w-1/2 curtain-right"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Curtain fringe/tassels */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-primary/30 to-transparent z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          />

          {/* Center welcome text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-20 text-center"
          >
            <p className="font-display text-primary text-sm tracking-[0.4em] uppercase mb-2">Welcome to</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              <span className="text-primary">Tent</span>ertain
            </h1>
            <div className="w-16 h-px bg-primary/50 mx-auto mt-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurtainReveal;
