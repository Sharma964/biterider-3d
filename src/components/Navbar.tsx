import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LayoutDashboard, History, LogOut, User as UserIcon, LogIn } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/");
  };

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
          
          {isAuthenticated && user?.role === "CUSTOMER" && (
            <Link to="/my-orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <History className="w-4 h-4" /> My Orders
            </Link>
          )}

          {isAuthenticated && user?.role === "RESTAURANT" && (
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
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

          {isAuthenticated ? (
            <div className="flex items-center gap-4 pl-4 border-l border-glass-border">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-foreground truncate max-w-[100px]">{user.name}</span>
                <span className="text-[10px] text-muted-foreground capitalize">{user.role?.toLowerCase()}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
