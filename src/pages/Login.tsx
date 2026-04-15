import { useState } from "react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Store, ArrowRight, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const [role, setRole] = useState<UserRole>("CUSTOMER");
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    login(role, email);
    toast.success(`Logged in as ${role === "CUSTOMER" ? "Customer" : "Restaurant Partner"}`);
    
    if (role === "RESTAURANT") {
      navigate("/dashboard");
    } else {
      navigate("/restaurants");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 pt-24">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="font-display font-extrabold text-3xl text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Choose your account type to continue</p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1 bg-muted rounded-xl mb-8">
            <button
              onClick={() => setRole("CUSTOMER")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                role === "CUSTOMER" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-4 h-4" /> Customer
            </button>
            <button
              onClick={() => setRole("RESTAURANT")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                role === "RESTAURANT" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Store className="w-4 h-4" /> Partner
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  defaultValue="anypassword"
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-right">Forgot password?</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-display font-bold glow-primary hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Login <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Don't have an account? <span className="text-primary font-bold cursor-pointer hover:underline">Sign up</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
