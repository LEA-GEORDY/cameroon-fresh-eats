import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Leaf, 
  Truck, 
  Shield, 
  Minus, 
  Plus,
  ChevronLeft,
  Share2,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== id
  ).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Produit non trouvé
          </h2>
          <Link to="/products">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        sellerId: product.sellerId,
        sellerName: product.sellerName,
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Produits</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted shadow-card">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-bold rounded-full">
                  Nouveau
                </span>
              )}
              {product.isBio && (
                <span className="absolute top-4 right-4 px-4 py-2 bg-leaf-light text-leaf-dark text-sm font-bold rounded-full flex items-center gap-1">
                  <Leaf className="w-4 h-4" /> Bio
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="font-display text-4xl font-bold text-foreground">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-accent fill-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews} avis)
              </span>
            </div>

            {/* Seller */}
            <p className="text-muted-foreground">
              Par{" "}
              <Link to={`/seller/${product.sellerId}`} className="text-primary font-medium hover:underline">
                {product.sellerName}
              </Link>
            </p>

            {/* Description */}
            <p className="text-foreground text-lg leading-relaxed">
              {product.longDescription}
            </p>

            {/* Volume */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium">Volume:</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">
                {product.volume}
              </span>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Ingrédients:</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-3 py-1 bg-leaf-light text-leaf-dark text-sm rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Bienfaits:</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-foreground">
                {product.price.toLocaleString()}
              </span>
              <span className="text-xl text-muted-foreground mb-1">FCFA</span>
            </div>

            {/* Stock */}
            <div className={`flex items-center gap-2 ${product.inStock ? "text-primary" : "text-destructive"}`}>
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-primary" : "bg-destructive"}`} />
              {product.inStock ? `En stock (${product.stockCount} disponibles)` : "Rupture de stock"}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-foreground text-xl">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button
                size="lg"
                variant="hero"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Ajouter au Panier
              </Button>

              <Button variant="outline" size="lg" className="gap-2">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-leaf-light">
                  <Leaf className="w-5 h-5 text-leaf" />
                </div>
                <span className="text-sm">100% Naturel</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-secondary/20">
                  <Truck className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm">Livraison 24-48h</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm">Qualité Certifiée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Produits Similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
