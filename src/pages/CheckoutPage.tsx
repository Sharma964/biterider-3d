import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, MapPin, Phone, CreditCard } from "lucide-react";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    address: "",
    phone: "",
    payment: "cash",
  });

  const deliveryFee = 3.99;
  const total = totalPrice + deliveryFee;

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <button onClick={() => navigate("/restaurants")} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold glow-primary">
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center glass-card p-12 max-w-md"
        >
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6 glow-accent" />
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">Order Placed!</h2>
          <p className="text-muted-foreground mb-2">Order #CG-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
          <p className="text-sm text-muted-foreground mb-6">Your food is being prepared and will arrive soon.</p>
          <button onClick={() => navigate("/")} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold glow-primary">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setPlaced(true);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-extrabold text-3xl text-foreground mb-8"
        >
          Checkout
        </motion.h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Delivery Details</h2>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Delivery Address</label>
                <input
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="123 Cyber Street, Neo City"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone Number</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Payment Method</h2>
              {(["cash", "card", "upi"] as const).map((method) => (
                <label key={method} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${form.payment === method ? "border-primary bg-primary/10" : "border-glass-border hover:border-muted-foreground"}`}>
                  <input type="radio" name="payment" value={method} checked={form.payment === method} onChange={() => setForm({ ...form, payment: method })} className="accent-primary" />
                  <span className="text-sm text-foreground capitalize font-body">{method === "cash" ? "Cash on Delivery" : method === "card" ? "Credit/Debit Card" : "UPI"}</span>
                </label>
              ))}
            </motion.div>
          </div>

          {/* Right: Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <div className="glass-card p-6 space-y-4 sticky top-24">
              <h2 className="font-display font-bold text-lg text-foreground">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="text-foreground font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-glass-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-foreground">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-glass-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold glow-primary hover:brightness-110 transition-all mt-4">
                Confirm Order
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
