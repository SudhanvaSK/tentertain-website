import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Ticket, MapPin, Clock, Heart, Search, Zap, LogIn,
  Drama, Music, Laugh, AudioLines, Palette, Drum,
  CalendarDays, Star, Users, Sparkles, PanelRightOpen
} from "lucide-react";
import boxofficeBg from "@/assets/boxoffice-bg.jpg";
import LoginModal from "@/components/LoginModal";

const features = [
  { icon: Search, title: "Discover Performances", desc: "A curated feed of the best plays, concerts, and live shows happening in your city. No more 'I didn't know that was on!'" },
  { icon: Ticket, title: "Instant Ticketing", desc: "Two taps, one QR code, and you're in. From discovery to your seat in under a minute — no agents, no calls." },
  { icon: Heart, title: "Follow Your Favourites", desc: "Get notified when your favourite troupe, musician, or comedian announces a new show. Never miss a performance." },
  { icon: MapPin, title: "Venue Explorer", desc: "Find theatres, auditoriums, and cultural spaces near you with photos, seating charts, and directions." },
  { icon: CalendarDays, title: "Events Calendar", desc: "Plan your weekends around culture. See what's coming up — this week, this month, or this season." },
  { icon: Zap, title: "Exclusive Access", desc: "Early-bird tickets, backstage tours, and VIP experiences for premium events. Be more than just an audience." },
];

const genres = [
  { icon: Drama, name: "Theatre & Drama", desc: "Hindi, Marathi, English, experimental, and regional plays", examples: "Prithvi Theatre, NCPA, Rangsharda" },
  { icon: Music, name: "Classical & Devotional", desc: "Hindustani, Carnatic, Bhajans, Ghazal evenings", examples: "Dover Lane, Sawai Gandharva, Thyagaraja Aradhana" },
  { icon: Laugh, name: "Comedy & Stand-up", desc: "Stand-up specials, open mics, improv nights", examples: "Canvas Laugh Club, The Habitat" },
  { icon: AudioLines, name: "Folk & Regional", desc: "Lavani, Yakshagana, Nautanki, Baul, Pandavani", examples: "Surajkund Mela, Rann Utsav" },
  { icon: Palette, name: "Dance Performances", desc: "Bharatanatyam, Kathak, Odissi, contemporary, fusion", examples: "Nishagandhi Festival, Khajuraho Dance" },
  { icon: Drum, name: "Live Music & Concerts", desc: "Indie, Bollywood live, fusion, rock, sufi nights", examples: "NH7 Weekender, Magnetic Fields" },
  { icon: Users, name: "Kids & Family", desc: "Children's theatre, puppet shows, storytelling sessions", examples: "Ishara Puppet Theatre, Ranga Shankara" },
  { icon: Sparkles, name: "Festivals & Utsavs", desc: "Multi-day cultural festivals and art celebrations", examples: "Jaipur Lit Fest, Kala Ghoda, Serendipity" },
];

const BoxOffice = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [wingOpen, setWingOpen] = useState(false);
  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex">

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 mr-10">

        {/* Hero */}
        <div className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0 boxoffice-gradient" />
          <img src={boxofficeBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-soft-light" />
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
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-boxoffice-light text-foreground font-body font-semibold text-sm border border-boxoffice-accent/20 transition-colors hover:bg-boxoffice-light/90"
              >
                <LogIn className="w-4 h-4" />
                Login / Sign Up
              </motion.button>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="w-16 h-16 rounded-2xl bg-boxoffice-accent/10 border border-boxoffice-accent/20 flex items-center justify-center mx-auto mb-6">
                <Ticket className="w-8 h-8 text-boxoffice-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-gradient-crimson">Box Office</h1>
              <p className="text-foreground/60 text-lg max-w-xl font-body">
                Discover India's best live performances. Book tickets. Experience the magic.
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
            <p className="text-boxoffice-accent text-sm font-body tracking-widest uppercase mb-3">For Audiences</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Your Evening, Elevated
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl font-body mb-8">
              From discovery to your seat — a seamless experience designed for culture lovers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-boxoffice-accent/30 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-boxoffice-accent/10 flex items-center justify-center mb-4 group-hover:bg-boxoffice-accent/20 transition-colors">
                    <f.icon className="w-5 h-5 text-boxoffice-accent" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Discover", desc: "Browse performances by genre, city, date, or artist. Get personalised recommendations." },
                { step: "02", title: "Book", desc: "Select your seats, pay securely, and get your QR ticket — all in under a minute." },
                { step: "03", title: "Experience", desc: "Walk in, scan your code, and enjoy the show. Rate and review to help others discover great art." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-boxoffice-accent/10 border border-boxoffice-accent/20 flex items-center justify-center mx-auto mb-3">
                    <span className="font-display text-base font-bold text-boxoffice-accent">{item.step}</span>
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
            className="p-10 rounded-3xl boxoffice-gradient border border-boxoffice-accent/10 text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-gradient-crimson">
              Your next unforgettable evening awaits
            </h3>
            <p className="text-foreground/60 mb-8 font-body max-w-lg mx-auto">
              Thousands of performances across India. Find your next cultural experience.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLoginOpen(true)}
              className="px-10 py-4 rounded-xl bg-boxoffice-light text-foreground font-display font-semibold tracking-wide glow-crimson border border-boxoffice-accent/20 transition-all duration-300"
            >
              Explore Shows
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE WING — hover-reveal genres */}
      <div
        className="fixed right-0 top-0 bottom-0 z-40 flex flex-row-reverse"
        onMouseEnter={() => setWingOpen(true)}
        onMouseLeave={() => setWingOpen(false)}
      >
        {/* Collapsed tab */}
        <motion.div
          animate={{ opacity: wingOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-full flex items-center justify-center cursor-pointer"
          style={{ background: "hsl(var(--card))", borderLeft: "1px solid hsl(var(--border))" }}
        >
          <div className="flex flex-col items-center gap-3">
            <PanelRightOpen className="w-4 h-4 text-boxoffice-accent/60" />
            <span
              className="text-[10px] font-body tracking-widest text-muted-foreground/50 uppercase"
              style={{ writingMode: "vertical-rl" }}
            >
              Genres
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
              style={{ background: "hsl(var(--card))", borderLeft: "1px solid hsl(var(--border))" }}
            >
              <div className="w-[260px] h-full overflow-y-auto py-8 px-4">
                <p className="text-boxoffice-accent text-[10px] font-body tracking-widest uppercase mb-5 px-1">What Are You in the Mood For?</p>
                <nav className="space-y-0.5">
                  {genres.map((genre, i) => (
                    <motion.div
                      key={genre.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onMouseEnter={() => setHoveredGenre(genre.name)}
                      onMouseLeave={() => setHoveredGenre(null)}
                      className={`px-3 py-2.5 rounded-xl flex items-start gap-3 group transition-all duration-200 cursor-pointer ${
                        hoveredGenre === genre.name
                          ? "bg-boxoffice-accent/10 border border-boxoffice-accent/20"
                          : "border border-transparent hover:bg-boxoffice-accent/5"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        hoveredGenre === genre.name ? "bg-boxoffice-accent/20" : "bg-boxoffice-accent/10"
                      }`}>
                        <genre.icon className="w-3.5 h-3.5 text-boxoffice-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`block font-display text-sm font-semibold transition-colors ${
                          hoveredGenre === genre.name ? "text-boxoffice-accent" : "text-foreground"
                        }`}>
                          {genre.name}
                        </span>
                        <AnimatePresence>
                          {hoveredGenre === genre.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <span className="block text-xs text-muted-foreground font-body mt-0.5 leading-snug">
                                {genre.desc}
                              </span>
                              <span className="block text-xs text-boxoffice-accent/60 font-body italic mt-1">
                                {genre.examples}
                              </span>
                            </motion.div>
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

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default BoxOffice;
