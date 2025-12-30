import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Shield, Truck, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  const features = [
    {
      icon: Leaf,
      title: "100% Naturel",
      description: "Sans sucres ajoutés, sans conservateurs, juste des fruits frais.",
    },
    {
      icon: Shield,
      title: "Qualité Garantie",
      description: "Produits contrôlés et certifiés bio par nos partenaires locaux.",
    },
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Livraison dans tout le Cameroun en 24-48h.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Fresh Juices"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-foreground rounded-full text-sm font-medium backdrop-blur-sm border border-primary-foreground/20">
                <Leaf className="w-4 h-4" />
                Jus 100% Naturels du Cameroun
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
                La Nature dans{" "}
                <span className="text-secondary">Votre Verre</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-xl">
                Découvrez notre sélection de jus naturels et smoothies bio, 
                directement des producteurs camerounais à votre table.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Link to="/products">
                <Button size="xl" variant="hero" className="group w-full sm:w-auto">
                  Découvrir nos Produits
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="xl" variant="hero-outline" className="w-full sm:w-auto">
                  En Savoir Plus
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              {[
                { value: "100%", label: "Naturel" },
                { value: "50+", label: "Produits" },
                { value: "20+", label: "Vendeurs" },
                { value: "5K+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
          <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-leaf-light/30 to-transparent" />
        
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl gradient-nature flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Nos Catégories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explorez notre gamme variée de boissons naturelles
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group flex items-center gap-3 px-6 py-4 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-2">
                Produits Populaires
              </h2>
              <p className="text-muted-foreground">
                Les favoris de nos clients
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="group">
                Voir Tous les Produits
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-nature" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02bTAgMjBjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <img src={logo} alt="VitaDrinks" className="h-20 mx-auto brightness-0 invert" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              Rejoignez la Communauté VitaDrinks
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Que vous soyez un producteur local de jus naturels ou un amateur de boissons saines, 
              VitaDrinks est votre plateforme idéale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Créer un Compte Client
                </Button>
              </Link>
              <Link to="/seller/register">
                <Button size="lg" variant="hero-outline" className="w-full sm:w-auto">
                  Devenir Vendeur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Ce que Disent nos Clients
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Découvrez les avis de notre communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie K.",
                location: "Douala",
                text: "Les jus sont vraiment frais et délicieux ! La livraison est rapide et le service client excellent.",
                rating: 5,
              },
              {
                name: "Jean-Paul M.",
                location: "Yaoundé",
                text: "Enfin une plateforme qui met en avant les producteurs locaux. Les smoothies détox sont incroyables !",
                rating: 5,
              },
              {
                name: "Aminata D.",
                location: "Bafoussam",
                text: "Qualité exceptionnelle, on sent vraiment la fraîcheur des fruits. Je recommande vivement !",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-6 bg-card rounded-2xl shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
