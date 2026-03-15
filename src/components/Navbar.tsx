import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-glass-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary">
            <span className="font-display font-bold text-primary-foreground text-sm">CG</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            Cyber<span className="text-gradient-primary">Grub</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/restaurants" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Restaurants</Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ShoppingCart className="w-5 h-5 text-foreground" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center glow-primary">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
