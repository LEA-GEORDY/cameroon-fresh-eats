import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useCart } from "@/contexts/CartContext";
import SearchModal from "@/components/SearchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/products", label: "Produits" },
    { path: "/about", label: "A Propos" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-lg' 
          : 'bg-card/30 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <AnimatedLogo size="md" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                <FiMapPin className="w-4 h-4 text-primary" />
                <span>Cameroun</span>
              </div>
              
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="hover:bg-primary/10 hover:text-primary transition-colors">
                <FiSearch className="w-5 h-5" />
              </Button>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-orange/10 hover:text-orange transition-colors">
                  <FiShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-secondary to-orange text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                  <FiUser className="w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="default" size="sm" className="gap-2 bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Connexion
                </Button>
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <FiSearch className="w-5 h-5" />
              </Button>
              <Link to="/cart" className="relative p-2">
                <FiShoppingCart className="w-6 h-6 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-secondary to-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden py-4 border-t border-border/50 animate-fade-in bg-card/90 backdrop-blur-xl rounded-b-2xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2 border-border" />
                <Link to="/profile" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  Mon Profil
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full gap-2 bg-gradient-to-r from-primary via-secondary to-orange text-white">
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
