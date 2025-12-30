import { Heart, ShoppingCart, Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  sellerId: string;
  sellerName: string;
  category: string;
  isNew?: boolean;
  isBio?: boolean;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  rating,
  reviews,
  sellerId,
  sellerName,
  category,
  isNew = false,
  isBio = true,
}: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image, sellerId, sellerName });
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full animate-pulse-soft">
              Nouveau
            </span>
          )}
          {isBio && (
            <span className="px-3 py-1 bg-leaf-light text-leaf-dark text-xs font-bold rounded-full flex items-center gap-1">
              <Leaf className="w-3 h-3" /> Bio
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {category}
          </span>

          {/* Name */}
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "text-accent fill-accent"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviews} avis)
            </span>
          </div>

          {/* Seller */}
          <p className="text-xs text-muted-foreground">
            Par <span className="text-primary font-medium">{sellerName}</span>
          </p>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div>
              <span className="text-2xl font-bold text-foreground">
                {price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground ml-1">FCFA</span>
            </div>
            <Button
              size="icon"
              variant="fresh"
              onClick={handleAddToCart}
              className="rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
