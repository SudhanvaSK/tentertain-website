import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Music, Sparkles, Ticket, Target, Zap,
  Users, Star
} from "lucide-react";

import greenroomBg from "@/assets/greenroom-bg.jpg";
import boxofficeBg from "@/assets/boxoffice-bg.jpg";
import Header from "./Header";
import CurtainReveal from "./CurtainReveal";

interface ButterflyLandingProps {
  hoveredSide: "none" | "left" | "right";
  onHoverChange: (side: "none" | "left" | "right") => void;
}

const ButterflyLanding = ({ hoveredSide, onHoverChange }: ButterflyLandingProps) => {
  const [curtainDone, setCurtainDone] = useState(false);
  const navigate = useNavigate();
  const onCurtainComplete = useCallback(() => setCurtainDone(true), []);



  return (
    <div className="min-h-screen bg-background">
      <CurtainReveal onComplete={onCurtainComplete} />
      <Header hoveredSide={hoveredSide} />

      {/* ===== HERO: Butterfly Wings ===== */}
      <section id="wings" className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row pt-16">

        {/* Center Brand — Animated Tent + entertain */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={curtainDone ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary/60 flex items-center justify-center bg-background/30 backdrop-blur-md glow-green">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <p className="text-muted-foreground text-xs md:text-sm font-body mt-1 tracking-widest uppercase">
              The Show Starts Here
            </p>
            {/* Hover hint */}
            <motion.p
              className="text-muted-foreground/40 text-[10px] font-body mt-3 tracking-wider"
              animate={{ opacity: hoveredSide !== "none" ? 0 : 0.6 }}
            >
              hover a wing to explore
            </motion.p>
          </motion.div>
        </div>

        {/* Vertical divider (desktop) */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={curtainDone ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent z-20 origin-center"
        />
        {/* Horizontal divider (mobile) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={curtainDone ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:hidden absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20 origin-center"
        />

        {/* GREEN ROOM — Left Wing */}
        <motion.div
          className="relative flex-1 cursor-pointer overflow-hidden group"
          onMouseEnter={() => onHoverChange("left")}
          onMouseLeave={() => onHoverChange("none")}
          onClick={() => navigate("/green-room")}
          initial={{ x: "-100%", opacity: 0 }}
          animate={curtainDone ? {
            x: 0,
            opacity: 1,
            flex: hoveredSide === "left" ? 1.3 : hoveredSide === "right" ? 0.7 : 1,
          } : {}}
          transition={{
            x: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.8 },
            flex: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          <div className="absolute inset-0 greenroom-gradient" />
          <img src={greenroomBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 py-16 md:py-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={curtainDone ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-center max-w-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-greenroom-accent/10 border border-greenroom-accent/20 flex items-center justify-center mx-auto mb-6">
                <Music className="w-7 h-7 text-greenroom-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground/90">
                Green Room
              </h2>
              <p className="text-foreground/50 text-sm md:text-base leading-relaxed mb-8 font-body">
                Where the magic is prepped. Build your portfolio, find your next gig, and connect with fellow creators.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-foreground/10 text-foreground/80 border border-foreground/20 font-display font-semibold text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-foreground/15"
              >
                Enter Green Room
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

        </motion.div>

        {/* BOX OFFICE — Right Wing */}
        <motion.div
          className="relative flex-1 cursor-pointer overflow-hidden group"
          onMouseEnter={() => onHoverChange("right")}
          onMouseLeave={() => onHoverChange("none")}
          onClick={() => navigate("/box-office")}
          initial={{ x: "100%", opacity: 0 }}
          animate={curtainDone ? {
            x: 0,
            opacity: 1,
            flex: hoveredSide === "right" ? 1.3 : hoveredSide === "left" ? 0.7 : 1,
          } : {}}
          transition={{
            x: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.8 },
            flex: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          <div className="absolute inset-0 boxoffice-gradient" />
          <img src={boxofficeBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 py-16 md:py-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={curtainDone ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-center max-w-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-boxoffice-accent/10 border border-boxoffice-accent/20 flex items-center justify-center mx-auto mb-6">
                <Ticket className="w-7 h-7 text-boxoffice-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground/90">
                Box Office
              </h2>
              <p className="text-foreground/50 text-sm md:text-base leading-relaxed mb-8 font-body">
                Where the magic is sold. Discover performances, book seats, and experience India's stage like never before.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-foreground/10 text-foreground/80 border border-foreground/20 font-display font-semibold text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-foreground/15"
              >
                Enter Box Office
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>



      {/* ===== ABOUT US ===== */}

      <section id="about" className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Who We Are — narrative header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-20"
          >
            <p className="text-primary text-sm font-body tracking-widest uppercase mb-4">Who We Are</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              We're building the home<br className="hidden md:block" /> India's performing arts never had.
            </h2>
            <p className="text-muted-foreground text-lg font-body leading-relaxed">
              From a Bharatanatyam recital in a Chennai sabha to a Nukkad Natak in a Delhi alley — India's performing arts have always lived on passion alone. We think they deserve more than that. We're a small team building a platform where artists can thrive and audiences can discover the extraordinary, without either having to fight for it.
            </p>
          </motion.div>

          {/* What We're Building */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <p className="text-primary text-sm font-body tracking-widest uppercase mb-10">What We're Building</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Less logistics, more craft",
                text: "An artist should spend their time creating, not chasing venue managers or negotiating bills. We're building the infrastructure that takes that burden off completely.",
              },
              {
                icon: Sparkles,
                title: "Two wings, one curtain",
                text: "Green Room is where artists prepare — portfolios, gigs, rehearsals, collaborations. Box Office is where audiences show up. Two sides of the same stage, built to talk to each other.",
              },
              {
                icon: Users,
                title: "For every kind of performer",
                text: "Whether you're a Kathak dancer in Lucknow, a stand-up comic in Pune, or a folk singer from rural Rajasthan — your art belongs here, not just on a WhatsApp group.",
              },
              {
                icon: Zap,
                title: "One roof, zero chaos",
                text: "Artist portfolios, venue bookings, ticket sales, audience discovery — all in one place. No more spreadsheets, no more middlemen, no more missed calls.",
              },
              {
                icon: Music,
                title: "Keeping heritage alive",
                text: "India holds one of the world's richest performing arts traditions. We're building the digital infrastructure to make sure it isn't lost to the next generation — it's found by them.",
              },
              {
                icon: Star,
                title: "Built by people who care",
                text: "We've queued for Prithvi Theatre tickets, watched Carnatic concerts in the rain, and sat in the last row of a Marathi Natak. We built this because we genuinely believe the arts deserve better.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-7 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 px-4 md:px-8 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed">
              A seamless way to prepare, perform, and experience India's stage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Green Room summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-greenroom-accent/20 bg-card group hover:border-greenroom-accent/40 transition-colors cursor-pointer"
              onClick={() => navigate("/green-room")}
            >
              <Music className="w-8 h-8 text-greenroom-accent mb-4" />
              <h3 className="font-display text-2xl font-bold text-gradient-green mb-3">Green Room</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                Build your Artist ID. Find gigs. Book spaces. Workshop your craft. Everything to prepare your performance.
              </p>
              <span className="text-greenroom-accent text-sm font-body font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>

            {/* Box Office summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-boxoffice-accent/20 bg-card group hover:border-boxoffice-accent/40 transition-colors cursor-pointer"
              onClick={() => navigate("/box-office")}
            >
              <Ticket className="w-8 h-8 text-boxoffice-accent mb-4" />
              <h3 className="font-display text-2xl font-bold text-gradient-crimson mb-3">Box Office</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                Discover performances. Book in two taps. Follow your favourite troupes. Never miss a show in your city.
              </p>
              <span className="text-boxoffice-accent text-sm font-body font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>
          </div>

          {/* Vision / Motto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-12 md:py-16 text-center max-w-3xl mx-auto"
          >
            <Star className="w-8 h-8 text-primary mx-auto mb-6 opacity-60" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Promise
            </h3>
            <blockquote className="border-l-2 border-primary/40 pl-6 md:pl-8 text-left">
              <p className="text-foreground/80 font-body text-lg md:text-xl italic leading-relaxed">
                "We are the digital backbone of the Indian stage. One elegant interface replacing a thousand frantic phone calls. Welcome to the stage, reimagined."
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">
              <span className="text-primary">Tent</span>ertain<span className="text-primary">.com</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm font-body">
            The Show Starts Here. © {new Date().getFullYear()} Tentertain. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button onClick={() => navigate("/green-room")} className="text-sm text-muted-foreground hover:text-greenroom-accent transition-colors font-body">Green Room</button>
            <button onClick={() => navigate("/box-office")} className="text-sm text-muted-foreground hover:text-boxoffice-accent transition-colors font-body">Box Office</button>
            <button onClick={() => navigate("/work-with-us")} className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">Work With Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ButterflyLanding;
