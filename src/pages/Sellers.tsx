import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, ChevronRight, Store, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { sellers } from "@/data/products";

const Sellers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const regions = ["all", "Douala", "Yaounde", "Bafoussam", "Garoua", "Maroua"];

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" ||
      seller.location.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nos Vendeurs
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Decouvrez les producteurs locaux de jus naturels et smoothies bio au Cameroun.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl shadow-card p-4 md:p-6 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un vendeur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="h-12 px-4 rounded-xl border-2 border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Toutes les regions</option>
              {regions.slice(1).map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sellers Grid */}
        {filteredSellers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSellers.map((seller, index) => (
              <Link
                key={seller.id}
                to={`/seller/${seller.id}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Banner */}
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
                    <div className="absolute -bottom-10 left-6">
                      <div className="w-20 h-20 rounded-2xl bg-card shadow-lg flex items-center justify-center border-4 border-card">
                        <Store className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    {seller.verified && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Verifie
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-14">
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {seller.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{seller.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {seller.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-accent fill-accent" />
                          <span className="font-semibold">{seller.rating}</span>
                        </div>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-sm text-muted-foreground">
                          {seller.productCount} produits
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Store className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              Aucun vendeur trouve
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos criteres de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sellers;
