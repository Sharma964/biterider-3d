import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Clock, Shield } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    {/* Ambient glow effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm text-accent">
            <Zap className="w-4 h-4" />
            <span className="font-body">Lightning-fast delivery</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight text-foreground">
            Food at the
            <br />
            <span className="text-gradient-primary">Speed of Light</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md font-body">
            Premium restaurants. Blazing delivery. A futuristic dining experience delivered right to your door.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display font-bold glow-primary hover:brightness-110 transition-all"
            >
              Order Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-card text-foreground font-display font-semibold hover:bg-muted transition-all"
            >
              Browse Restaurants
            </Link>
          </div>

          <div className="flex gap-8 pt-4">
            <Stat icon={<Clock className="w-4 h-4 text-accent" />} value="15 min" label="Avg. Delivery" />
            <Stat icon={<Shield className="w-4 h-4 text-accent" />} value="500+" label="Restaurants" />
            <Stat icon={<Zap className="w-4 h-4 text-accent" />} value="4.9★" label="Rating" />
          </div>
        </motion.div>

        {/* Right: Floating food visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full aspect-square max-w-lg">
            {/* Glow ring */}
            <div className="absolute inset-8 rounded-full border-2 border-primary/20 animate-pulse-glow" />
            <div className="absolute inset-16 rounded-full border border-accent/10 animate-pulse-glow" style={{ animationDelay: "1s" }} />

            {/* Floating food images */}
            <motion.img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop"
              alt="Delicious burger"
              className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 rounded-2xl object-cover shadow-2xl animate-float border border-glass-border"
            />
            <motion.img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=250&h=250&fit=crop"
              alt="Fresh pizza"
              className="absolute bottom-16 left-8 w-36 h-36 rounded-2xl object-cover shadow-2xl animate-float-delayed border border-glass-border"
            />
            <motion.img
              src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=250&h=250&fit=crop"
              alt="Hot ramen"
              className="absolute bottom-24 right-8 w-32 h-32 rounded-2xl object-cover shadow-2xl animate-float border border-glass-border"
              style={{ animationDelay: "2s" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Stat = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <p className="font-display font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

const FeaturedSection = () => {
  const featured = [
    { emoji: "🍔", name: "Burgers", count: "45+" },
    { emoji: "🍕", name: "Pizza", count: "38+" },
    { emoji: "🍜", name: "Asian", count: "52+" },
    { emoji: "🌮", name: "Mexican", count: "29+" },
    { emoji: "🍣", name: "Sushi", count: "33+" },
    { emoji: "🥗", name: "Healthy", count: "41+" },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Explore <span className="text-gradient-primary">Cuisines</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            From classic comfort food to exotic delicacies
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 text-center cursor-pointer group"
            >
              <span className="text-4xl block mb-3">{cat.emoji}</span>
              <h3 className="font-display font-semibold text-foreground text-sm">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.count} places</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Browse", desc: "Explore restaurants and menus near you", color: "text-primary" },
    { num: "02", title: "Order", desc: "Add your favorites and checkout securely", color: "text-accent" },
    { num: "03", title: "Track", desc: "Watch your delivery in real-time on map", color: "text-primary" },
    { num: "04", title: "Enjoy", desc: "Fresh food delivered to your doorstep", color: "text-accent" },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-16"
        >
          How It <span className="text-gradient-accent">Works</span>
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 text-center relative group"
            >
              <span className={`font-display font-extrabold text-5xl ${step.color} opacity-20 group-hover:opacity-40 transition-opacity`}>
                {step.num}
              </span>
              <h3 className="font-display font-bold text-lg text-foreground mt-4">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <FeaturedSection />
    <HowItWorks />

    {/* Footer */}
    <footer className="border-t border-glass-border py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-muted-foreground text-sm">
          © 2026 CyberGrub. Fueling the future, one meal at a time.
        </p>
      </div>
    </footer>
  </div>
);

export default LandingPage;
