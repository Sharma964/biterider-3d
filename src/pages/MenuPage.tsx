import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Plus } from "lucide-react";
import { restaurants, menuItems } from "@/data/mockData";
import { useCart } from "@/context/CartContext";

const MenuPage = () => {
  const { id } = useParams();
  const { addItem, setIsOpen } = useCart();
  const restaurant = restaurants.find((r) => r.id === id);
  const items = menuItems.filter((i) => i.restaurantId === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Restaurant not found.</p>
      </div>
    );
  }

  const categories = [...new Set(items.map((i) => i.category))];

  const handleAdd = (item: typeof items[0]) => {
    addItem(item);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto">
          <Link to="/restaurants" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="font-display font-extrabold text-3xl text-foreground">{restaurant.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary fill-primary" /> {restaurant.rating}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {restaurant.deliveryTime}</span>
            <span>{restaurant.cuisine} · {restaurant.priceRange}</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-6 py-12">
        {categories.map((cat) => (
          <div key={cat} className="mb-12">
            <h2 className="font-display font-bold text-xl text-foreground mb-6 border-b border-glass-border pb-3">
              {cat}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {items.filter((i) => i.category === cat).map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-4 flex gap-4 group"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-display font-bold text-primary">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAdd(item)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-display font-semibold hover:brightness-110 transition-all glow-primary"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
