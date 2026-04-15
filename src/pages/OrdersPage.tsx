import { useOrders } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const statusMap = {
    placed: { label: "Order Placed", icon: <Package className="w-5 h-5" />, color: "text-blue-400 bg-blue-400/10", step: 1 },
    preparing: { label: "Preparing Food", icon: <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}><Package className="w-5 h-5 text-amber-400" /></motion.div>, color: "text-amber-400 bg-amber-400/10", step: 2 },
    delivered: { label: "Delivered", icon: <CheckCircle className="w-5 h-5" />, color: "text-emerald-400 bg-emerald-400/10", step: 3 },
    cancelled: { label: "Cancelled", icon: <XCircle className="w-5 h-5" />, color: "text-rose-400 bg-rose-400/10", step: 0 },
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-extrabold text-4xl text-foreground">
            My <span className="text-gradient-primary">Orders</span>
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h2 className="text-xl font-display font-bold text-foreground mb-4">No orders placed yet</h2>
            <button
              onClick={() => navigate("/restaurants")}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold glow-primary"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${statusMap[order.status].color}`}>
                        {statusMap[order.status].icon}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()} · ₹{order.total}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-current ${statusMap[order.status].color.split(' ')[0]}`}>
                      {statusMap[order.status].label}
                    </div>
                  </div>

                  {order.status !== "cancelled" && (
                    <div className="relative mb-8 px-4">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2" />
                      <div 
                        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-1000" 
                        style={{ width: `${(statusMap[order.status].step / 3) * 100}%` }}
                      />
                      <div className="relative flex justify-between">
                        {[1, 2, 3].map((s) => (
                          <div
                            key={s}
                            className={`w-4 h-4 rounded-full border-2 transition-colors duration-500 ${
                              statusMap[order.status].step >= s ? "bg-primary border-primary glow-primary" : "bg-background border-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 bg-muted/30 rounded-xl p-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Items</p>
                      <p className="text-sm text-foreground line-clamp-1">
                        {order.items.map(i => `${i.name} x${i.quantity}`).join(", ")}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Address</p>
                      <p className="text-sm text-muted-foreground truncate">{order.address}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
