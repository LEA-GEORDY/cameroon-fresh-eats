import { useState } from "react";
import { Search, Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nos Produits
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explorez notre gamme de jus naturels et smoothies bio, 
            directement des producteurs camerounais.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-2xl shadow-card p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 rounded-xl border-2 border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="popular">Plus Populaires</option>
              <option value="price-low">Prix Croissant</option>
              <option value="price-high">Prix Décroissant</option>
              <option value="rating">Meilleures Notes</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Categories - Professional Design without emojis */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 border-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg scale-105"
                    : "bg-card text-foreground border-border hover:border-primary hover:shadow-md"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{sortedProducts.length}</span> produits trouvés
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍹</div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
