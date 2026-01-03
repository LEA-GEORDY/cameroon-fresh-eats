import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import SearchModal from "@/components/SearchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { favorites } = useFavorites();
  
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favorites.length;

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/products", label: "Produits" },
    { path: "/sellers", label: "Vendeurs" },
    { path: "/about", label: "A Propos" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src={logo} 
                alt="VitaDrinks" 
                className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-colors duration-300 ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Cameroun</span>
              </div>
              
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="w-5 h-5" />
              </Button>
              
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5" />
                  {favCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {favCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="default" size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <User className="w-4 h-4" />
                  Connexion
                </Button>
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="w-5 h-5" />
              </Button>
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="w-6 h-6 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden py-4 border-t border-border/50 animate-fade-in-up">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl transition-colors ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2 border-border" />
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full gap-2 bg-gradient-to-r from-primary to-secondary">
                    <User className="w-4 h-4" />
                    Connexion
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
