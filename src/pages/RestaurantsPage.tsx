import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { restaurants } from "@/data/mockData";

const RestaurantCard = ({ restaurant, index }: { restaurant: typeof restaurants[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Link to={`/restaurant/${restaurant.id}`}>
      <motion.div
        whileHover={{ scale: 1.03, rotateY: 3, rotateX: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card overflow-hidden group cursor-pointer perspective-1000"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          {restaurant.featured && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-display font-bold glow-primary">
              Featured
            </span>
          )}
        </div>
        <div className="p-5 space-y-3">
          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-sm text-muted-foreground">{restaurant.cuisine} · {restaurant.priceRange}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="font-semibold text-foreground">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  </motion.div>
);

const RestaurantsPage = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display font-extrabold text-4xl text-foreground">
          Explore <span className="text-gradient-primary">Restaurants</span>
        </h1>
        <p className="text-muted-foreground mt-3">Discover the best food near you</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((r, i) => (
          <RestaurantCard key={r.id} restaurant={r} index={i} />
        ))}
      </div>
    </div>
  </div>
);

export default RestaurantsPage;
