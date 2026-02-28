import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Music, Users, Calendar, Palette, Star, Mic, LogIn,
  Drama, Guitar, Drum, AudioLines, Clapperboard, Laugh,
  MapPin, Briefcase, GraduationCap, ChevronRight, PanelLeftOpen
} from "lucide-react";
import greenroomBg from "@/assets/greenroom-bg.jpg";
import LoginModal from "@/components/LoginModal";

const features = [
  { icon: Star, title: "Artist ID", desc: "Your digital portfolio — showcase your art form, past performances, photos, and reviews. Think of it as your artistic Aadhaar." },
  { icon: Mic, title: "The Gig Board", desc: "Find your next performance opportunity. Corporate events, indie plays, college fests, wedding sangeets — all in one place." },
  { icon: Calendar, title: "Space on Demand", desc: "Browse rehearsal halls, auditoriums, and open-air venues. Check availability, compare pricing, and lock dates instantly." },
  { icon: Palette, title: "Workshop Hub", desc: "Host a masterclass in Kathak or join one in beatboxing. Upskill, cross-pollinate, and grow your craft." },
  { icon: Users, title: "Collaboration Hub", desc: "Find a tabla player for your fusion band, a costume designer for your play, or a co-director for your next production." },
  { icon: Briefcase, title: "Manage Your Career", desc: "Track your bookings, earnings, reviews, and growth — all from a single dashboard built for the working artist." },
];

const categories = [
  { icon: Drama, name: "Theatre & Natak", desc: "Hindi theatre, Marathi Natak, English plays, experimental drama" },
  { icon: Music, name: "Classical Music", desc: "Hindustani, Carnatic, Ghazal, Qawwali, Sufi" },
  { icon: AudioLines, name: "Folk & Tribal", desc: "Lavani, Bhangra, Garba, Bihu, Chhau, Pandavani" },
  { icon: Palette, name: "Classical Dance", desc: "Bharatanatyam, Kathak, Odissi, Kuchipudi, Mohiniyattam" },
  { icon: Laugh, name: "Stand-up & Improv", desc: "Comedy, open mics, sketch comedy, improvisational theatre" },
  { icon: Guitar, name: "Indie & Contemporary", desc: "Indie bands, fusion artists, singer-songwriters, beatboxers" },
  { icon: Drum, name: "Percussion & Rhythm", desc: "Tabla, Mridangam, Djembe, Pakhawaj, drum circles" },
  { icon: Clapperboard, name: "Spoken Word & Poetry", desc: "Mushaira, poetry slams, storytelling, Dastangoi" },
  { icon: GraduationCap, name: "Workshops & Masterclasses", desc: "Learn from masters, attend residencies, skill-building sessions" },
  { icon: MapPin, name: "Venues & Spaces", desc: "Auditoriums, amphitheatres, rehearsal rooms, open-air stages" },
];

const GreenRoom = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [wingOpen, setWingOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex">

      {/* LEFT SIDE WING — hover-reveal categories */}
      <div
        className="fixed left-0 top-0 bottom-0 z-40 flex"
        onMouseEnter={() => setWingOpen(true)}
        onMouseLeave={() => setWingOpen(false)}
      >
        {/* Collapsed tab */}
        <motion.div
          animate={{ opacity: wingOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-full flex items-center justify-center cursor-pointer"
          style={{ background: "hsl(var(--card))", borderRight: "1px solid hsl(var(--border))" }}
        >
          <div className="flex flex-col items-center gap-3">
            <PanelLeftOpen className="w-4 h-4 text-greenroom-accent/60" />
            <span
              className="text-[10px] font-body tracking-widest text-muted-foreground/50 uppercase"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Categories
            </span>
          </div>
        </motion.div>

        {/* Expanded panel */}
        <AnimatePresence>
          {wingOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden h-full"
              style={{ background: "hsl(var(--card))", borderRight: "1px solid hsl(var(--border))" }}
            >
              <div className="w-[260px] h-full overflow-y-auto py-8 px-4">
                <p className="text-greenroom-accent text-[10px] font-body tracking-widest uppercase mb-5 px-1">Browse by Category</p>
                <nav className="space-y-0.5">
                  {categories.map((cat, i) => (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onMouseEnter={() => setHoveredCategory(cat.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`px-3 py-2.5 rounded-xl flex items-start gap-3 group transition-all duration-200 cursor-pointer ${
                        hoveredCategory === cat.name
                          ? "bg-greenroom-accent/10 border border-greenroom-accent/20"
                          : "border border-transparent hover:bg-greenroom-accent/5"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        hoveredCategory === cat.name ? "bg-greenroom-accent/20" : "bg-greenroom-accent/10"
                      }`}>
                        <cat.icon className="w-3.5 h-3.5 text-greenroom-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`block font-display text-sm font-semibold transition-colors ${
                          hoveredCategory === cat.name ? "text-greenroom-accent" : "text-foreground"
                        }`}>
                          {cat.name}
                        </span>
                        <AnimatePresence>
                          {hoveredCategory === cat.name && (
                            <motion.span
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="block text-xs text-muted-foreground font-body mt-0.5 leading-snug overflow-hidden"
                            >
                              {cat.desc}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MAIN CONTENT — offset for the collapsed tab */}
      <div className="flex-1 min-w-0 ml-10">

        {/* Hero */}
        <div className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0 greenroom-gradient" />
          <img src={greenroomBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-soft-light" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <motion.button
                onClick={() => navigate("/")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors font-body text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-greenroom-accent text-primary-foreground font-body font-semibold text-sm transition-colors hover:bg-greenroom-accent/90"
              >
                <LogIn className="w-4 h-4" />
                Login / Sign Up
              </motion.button>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="w-16 h-16 rounded-2xl bg-greenroom-accent/10 border border-greenroom-accent/20 flex items-center justify-center mx-auto mb-6">
                <Music className="w-8 h-8 text-greenroom-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-gradient-green">Green Room</h1>
              <p className="text-foreground/60 text-lg max-w-xl font-body">
                Where artists prepare, collaborate, and find their next stage. Built for India's performers.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <p className="text-greenroom-accent text-sm font-body tracking-widest uppercase mb-3">For Artists</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Everything You Need Backstage
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl font-body mb-8">
              We handle the logistics so you can focus on what you do best — perform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-greenroom-accent/30 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-greenroom-accent/10 flex items-center justify-center mb-4 group-hover:bg-greenroom-accent/20 transition-colors">
                    <f.icon className="w-5 h-5 text-greenroom-accent" />
                  </div>
                  <h3 className="font-display text-base font-semibold mb-2 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">How It Works</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Create Your Profile", desc: "Sign up, add your art form, upload media, and build your Artist ID." },
                { step: "02", title: "Discover Opportunities", desc: "Browse gigs, auditions, collaborations, and venues tailored to your craft." },
                { step: "03", title: "Connect & Collaborate", desc: "Reach out to fellow artists, venue owners, and event organisers directly." },
                { step: "04", title: "Take the Stage", desc: "Perform, get reviewed, grow your following, and build your career." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-greenroom-accent/10 border border-greenroom-accent/20 flex items-center justify-center mx-auto mb-3">
                    <span className="font-display text-base font-bold text-greenroom-accent">{item.step}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl greenroom-gradient border border-greenroom-accent/10 text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-gradient-green">
              Ready to take the stage?
            </h3>
            <p className="text-foreground/60 mb-8 font-body max-w-lg mx-auto">
              Join thousands of Indian performing artists who are building their careers on Tentertain.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLoginOpen(true)}
              className="px-10 py-4 rounded-xl bg-greenroom-accent text-primary-foreground font-display font-semibold tracking-wide glow-green transition-all duration-300"
            >
              Get Started — It's Free
            </motion.button>
          </motion.div>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default GreenRoom;
