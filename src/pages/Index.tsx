import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiStar, FiMapPin, FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { sellers } from "@/data/products";
import AnimatedLogo from "@/components/AnimatedLogo";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  const inspiringPhrases = [
    "La fraicheur du Cameroun dans chaque gorgee",
    "Des saveurs authentiques, un gout unique",
    "Votre sante, notre priorite",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-orange/20 rounded-full blur-3xl animate-float" />

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 pt-24 pb-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div data-aos="fade-up" data-aos-delay="100">
              <AnimatedLogo size="xl" />
            </div>
            
            <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                Jus 100% Naturels du Cameroun
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight">
                La Nature dans{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-orange bg-clip-text text-transparent">Votre Verre</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
                {inspiringPhrases[0]}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
              <Link to="/products">
                <Button size="xl" variant="hero" className="group w-full sm:w-auto">
                  Decouvrir nos Produits
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="xl" variant="hero-outline" className="w-full sm:w-auto">
                  En Savoir Plus
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center pt-8" data-aos="fade-up" data-aos-delay="600">
              {[
                { value: "100%", label: "Naturel" },
                { value: "50+", label: "Produits" },
                { value: "20+", label: "Vendeurs" },
                { value: "5K+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
          <div className="w-8 h-12 rounded-full border-2 border-primary/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Sellers Section - Main Content */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12" data-aos="fade-up">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Nos Vendeurs Partenaires
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Decouvrez les meilleurs producteurs de jus naturels et smoothies bio au Cameroun
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sellers.map((seller, index) => (
              <Link
                key={seller.id}
                to={`/seller/${seller.id}`}
                className="group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-border/50">
                  {/* Banner */}
                  <div className="h-28 sm:h-32 bg-gradient-to-r from-primary via-secondary to-orange relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02bTAgMjBjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card shadow-lg flex items-center justify-center border-4 border-card overflow-hidden">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(seller.name)}&background=22c55e&color=fff&size=80&font-size=0.4`}
                          alt={seller.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 pt-10 sm:pt-14">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {seller.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-muted-foreground">
                      <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{seller.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground mt-3 line-clamp-2">
                      {seller.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <FiStar className="w-4 h-4 text-accent fill-accent" />
                          <span className="font-semibold text-sm">{seller.rating}</span>
                        </div>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {seller.productCount} produits
                        </span>
                      </div>
                      <FiChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-orange">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02bTAgMjBjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="container relative mx-auto px-4 text-center" data-aos="fade-up">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <div className="brightness-0 invert flex justify-center">
              <AnimatedLogo size="lg" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Rejoignez la Communaute VitaDrinks
            </h2>
            <p className="text-lg sm:text-xl text-white/80">
              {inspiringPhrases[1]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Creer un Compte Client
                </Button>
              </Link>
              <Link to="/seller/register">
                <Button size="lg" variant="hero-outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Devenir Vendeur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12" data-aos="fade-up">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ce que Disent nos Clients
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Decouvrez les avis de notre communaute
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                name: "Marie K.",
                location: "Douala",
                text: "Les jus sont vraiment frais et delicieux ! La livraison est rapide et le service client excellent.",
                rating: 5,
              },
              {
                name: "Jean-Paul M.",
                location: "Yaounde",
                text: "Enfin une plateforme qui met en avant les producteurs locaux. Les smoothies detox sont incroyables !",
                rating: 5,
              },
              {
                name: "Aminata D.",
                location: "Bafoussam",
                text: "Qualite exceptionnelle, on sent vraiment la fraicheur des fruits. Je recommande vivement !",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-6 bg-card rounded-2xl shadow-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-accent fill-accent" />
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
