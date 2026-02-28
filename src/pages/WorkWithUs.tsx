import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Send,
  Music,
  Ticket,
  Zap,
  Heart,
  Loader2,
} from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(2000),
});

const WorkWithUs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      console.log("Sending email");
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: result.data.name,
          email: result.data.email,
          title: result.data.subject,
          message: result.data.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      console.log("Response ", response);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
    } catch {
      toast({
        title: "Failed to send",
        description:
          "Something went wrong. Please again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const highlights = [
    { icon: Music, text: "Venue partners & space owners" },
    { icon: Ticket, text: "Event organisers & curators" },
    { icon: Zap, text: "Technology & integration partners" },
    { icon: Heart, text: "Sponsors & patrons of the arts" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to tentertain
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-display text-sm font-bold text-foreground">
              tentertain
            </span>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Work With Us
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed">
              We're building the digital infrastructure for India's performing
              arts. If the vision resonates, we'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left — About the product */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                What we're building
              </h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Tentertain is the world's first "Butterfly Platform" for
                performing arts — one wing where artists prepare (the Green
                Room), and one where audiences celebrate (the Box Office). We're
                replacing scattered WhatsApp groups, word-of-mouth bookings, and
                manual venue-hunting with one elegant, Indian-first platform.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
                Whether you're a classical dancer from Thanjavur or a stand-up
                comic from Mumbai, we believe your next big break shouldn't
                depend on who you know. It should depend on what you do.
              </p>

              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                Who we're looking for
              </h3>
              <div className="space-y-3">
                {highlights.map((h) => (
                  <div
                    key={h.text}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                  >
                    <h.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80 text-sm font-body">
                      {h.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Get in touch
                </h2>
                <p className="text-muted-foreground text-sm font-body mb-6">
                  Drop us a line and we'll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full h-11 px-4 rounded-lg bg-muted border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs mt-1 font-body">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full h-11 px-4 rounded-lg bg-muted border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1 font-body">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full h-11 px-4 rounded-lg bg-muted border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    {errors.subject && (
                      <p className="text-destructive text-xs mt-1 font-body">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us what excites you about Tentertain..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                    {errors.message && (
                      <p className="text-destructive text-xs mt-1 font-body">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>

                {/* <p className="text-muted-foreground text-xs font-body mt-4 text-center">
                  Or write directly to <a href="mailto:sudhanvask29@gmail.com" className="text-primary hover:underline">sudhanvask29@gmail.com</a>
                </p> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
