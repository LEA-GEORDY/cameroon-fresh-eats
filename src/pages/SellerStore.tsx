import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, MessageCircle, Phone, Mail, Share2, Heart, ChevronLeft, Store as StoreIcon, Clock, ShieldCheck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { sellers, products } from "@/data/products";

const SellerStore = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("products");
  const [message, setMessage] = useState("");

  const seller = sellers.find((s) => s.id === id);
  const sellerProducts = products.filter((p) => p.sellerId === id);

  if (!seller) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <StoreIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground">Vendeur introuvable</h2>
          <Link to="/sellers" className="text-primary hover:underline mt-4 block">
            Retour aux vendeurs
          </Link>
        </div>
      </div>
    );
  }

  const reviews = [
    { id: 1, author: "Marie K.", rating: 5, date: "Il y a 2 jours", text: "Excellents produits, tres frais! Je recommande vivement." },
    { id: 2, author: "Jean P.", rating: 4, date: "Il y a 1 semaine", text: "Bonne qualite et livraison rapide. Juste un peu cher." },
    { id: 3, author: "Aminata D.", rating: 5, date: "Il y a 2 semaines", text: "Les meilleurs jus naturels que j'ai goutes!" },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // In real app, this would send to backend
    alert(`Message envoye: ${message}`);
    setMessage("");
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      {/* Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary via-secondary to-orange">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02bTAgMjBjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <Link 
          to="/sellers" 
          className="absolute top-4 left-4 p-2 rounded-full bg-card/20 backdrop-blur-sm text-primary-foreground hover:bg-card/40 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>

        <button className="absolute top-4 right-4 p-2 rounded-full bg-card/20 backdrop-blur-sm text-primary-foreground hover:bg-card/40 transition-colors">
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Section */}
        <div className="relative -mt-16 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-2xl bg-card shadow-elevated flex items-center justify-center border-4 border-card">
              <StoreIcon className="w-16 h-16 text-primary" />
            </div>

            {/* Info */}
            <div className="flex-1 pt-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display text-3xl font-bold text-foreground">
                  {seller.name}
                </h1>
                {seller.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    <ShieldCheck className="w-4 h-4" />
                    Verifie
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {seller.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  {seller.rating} (156 avis)
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {seller.productCount} produits
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Membre depuis 2022
                </span>
              </div>

              <p className="text-muted-foreground max-w-2xl">
                {seller.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contacter
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            {[
              { id: "products", label: "Produits" },
              { id: "reviews", label: "Avis" },
              { id: "contact", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sellerProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-2xl space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">{review.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contact" && (
          <div className="max-w-xl space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Envoyer un message
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ecrivez votre message..."
                className="w-full h-32 px-4 py-3 rounded-xl border-2 border-input bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <Button 
                onClick={handleSendMessage}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Envoyer le message
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Le vendeur sera notifie par email et repondra dans les plus brefs delais.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Informations de contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                  <span>+237 6XX XXX XXX</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <span>contact@{seller.name.toLowerCase().replace(/\s/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{seller.location}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerStore;
