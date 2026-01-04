import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const favoriteProducts = products.filter(p => favorites.some(f => f.id === p.id));

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8" data-aos="fade-up">
          <div className="flex items-center gap-4">
            <Link 
              to="/profile" 
              className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Mes Favoris
              </h1>
              <p className="text-muted-foreground">{favorites.length} produits</p>
            </div>
          </div>
          <Heart className="w-10 h-10 text-destructive fill-destructive" />
        </div>

        {/* Favorites Grid */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product, index) => (
              <div 
                key={product.id}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <ProductCard {...product} />
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-3 right-3 z-20 w-9 h-9 bg-destructive/90 text-white hover:bg-destructive rounded-full shadow-lg flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16" data-aos="fade-up">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Aucun favori
            </h2>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore ajoute de produits a vos favoris
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Decouvrir nos produits
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
