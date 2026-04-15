import { useOrders, OrderStatus } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, Package, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { orders, updateOrderStatus, clearAllOrders } = useOrders();

  const handleStatusUpdate = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    toast.success(`Order status updated to ${status}`);
  };

  const statusColors = {
    placed: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    preparing: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    delivered: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    cancelled: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-4xl text-foreground">
              Restaurant <span className="text-gradient-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-2">Manage incoming orders and track delivery status</p>
          </div>
          {orders.length > 0 && (
            <button 
              onClick={() => { if(confirm("Clear all order history?")) clearAllOrders(); }}
              className="px-4 py-2 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-sm font-semibold transition-colors"
            >
              Clear History
            </button>
          )}
        </div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-lg mx-auto"
          >
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h2 className="text-xl font-display font-bold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground">Orders from customers will appear here in real-time.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-glass-border">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-lg text-foreground">Order #{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.status === "placed" && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, "preparing")}
                          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold glow-primary hover:brightness-110 transition-all"
                        >
                          Start Preparing
                        </button>
                      )}
                      {order.status === "preparing" && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, "delivered")}
                          className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:brightness-110 transition-all"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {order.status !== "delivered" && order.status !== "cancelled" && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, "cancelled")}
                          className="p-2 rounded-lg border border-glass-border text-muted-foreground hover:text-rose-500 hover:border-rose-500/30 transition-all"
                          title="Cancel Order"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Items Ordered</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-foreground">{item.name} <span className="text-muted-foreground text-xs ml-1">× {item.quantity}</span></span>
                            <span className="font-semibold text-foreground">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="pt-3 border-t border-glass-border flex justify-between items-center font-display font-bold">
                          <span className="text-foreground">Total Revenue</span>
                          <span className="text-primary text-lg">₹{order.total}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Customer Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-primary mt-0.5" />
                            <span className="text-muted-foreground">{order.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{order.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Payment Method</h4>
                        <span className="px-3 py-1 rounded bg-muted text-foreground text-xs font-semibold capitalize">
                          {order.payment}
                        </span>
                      </div>
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

export default AdminDashboard;
