import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiStar, FiMapPin, FiChevronRight, FiPlay } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { sellers } from "@/data/products";
import AnimatedCounter from "@/components/AnimatedCounter";
import HeroCarousel from "@/components/HeroCarousel";
import AOS from "aos";
import "aos/dist/aos.css";
import communityVideo from "@/assets/community-video.mp4";

const Index = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true, 
      easing: "ease-out-cubic",
      offset: 50 
    });
  }, []);

  const inspiringPhrases = [
    "La fraicheur du Cameroun dans chaque gorgee",
    "Des saveurs authentiques, un gout unique",
    "Votre sante, notre priorite",
  ];

  const testimonials = [
    {
      name: "Marie K.",
      location: "Douala",
      text: "Les jus sont vraiment frais et delicieux ! La livraison est rapide et le service client excellent.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Jean-Paul M.",
      location: "Yaounde",
      text: "Enfin une plateforme qui met en avant les producteurs locaux. Les smoothies detox sont incroyables !",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Aminata D.",
      location: "Bafoussam",
      text: "Qualite exceptionnelle, on sent vraiment la fraicheur des fruits. Je recommande vivement !",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Pierre E.",
      location: "Kribi",
      text: "Le Bissap est exactement comme celui de ma grand-mère. Un vrai délice nostalgique !",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Fatou N.",
      location: "Garoua",
      text: "Commander est simple et la qualité est toujours au rendez-vous. Mes enfants adorent !",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Samuel T.",
      location: "Limbé",
      text: "Les shots au gingembre m'ont changé la vie. Plus d'énergie chaque matin !",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Grace O.",
      location: "Bamenda",
      text: "Le service est impeccable et les produits sont 100% naturels. Je suis cliente fidèle !",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
  ];

  // Seller descriptions
  const sellerDescriptions: { [key: string]: string } = {
    "seller1": "Jus tropicaux frais pressés chaque matin",
    "seller2": "Smoothies bio certifiés pour votre bien-être",
    "seller3": "Recettes africaines authentiques et savoureuses",
    "seller4": "Shots énergisants au gingembre camerounais",
    "seller5": "Créations gourmandes au cacao premium",
    "seller6": "Boissons traditionnelles revisitées avec passion",
    "seller7": "Fruits exotiques cueillis à la main",
    "seller8": "Super-aliments africains pour votre santé",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Clean design with circular carousel */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-40 w-64 h-64 bg-secondary/15 rounded-full blur-2xl" />
        </div>
        
        {/* Curved decorative element */}
        <div className="absolute bottom-0 left-0 w-full h-32">
          <svg viewBox="0 0 1440 120" className="w-full h-full fill-muted/30">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - No logo here */}
            <div className="space-y-8">
              <div className="space-y-6" data-aos="fade-right" data-aos-delay="200">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  La <span className="text-primary">Nature</span> dans{" "}
                  <span className="bg-gradient-to-r from-secondary via-orange to-primary bg-clip-text text-transparent">
                    Votre Verre
                  </span>.
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  {inspiringPhrases[0]}. Decouvrez les meilleurs producteurs de jus naturels du Cameroun.
                </p>
              </div>

              {/* Buttons - Rounded pill style */}
              <div className="flex flex-wrap gap-4" data-aos="fade-right" data-aos-delay="400">
                <Link to="/products">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all font-semibold hover:scale-105"
                  >
                    Explorer
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-10 py-6 text-lg rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold hover:scale-105"
                  >
                    En Savoir Plus
                  </Button>
                </Link>
              </div>

              {/* Stats - Animated counters */}
              <div className="flex flex-wrap gap-8 pt-8" data-aos="fade-up" data-aos-delay="600">
                {[
                  { value: "100%", label: "Naturel", color: "text-primary" },
                  { value: "50+", label: "Produits", color: "text-secondary" },
                  { value: "20+", label: "Vendeurs", color: "text-orange" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center relative">
                    <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-orange rounded-full opacity-50" style={{ display: index === 0 ? 'block' : 'none' }} />
                    <p className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>
                      <AnimatedCounter end={stat.value} duration={2000} />
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Circular Carousel */}
            <div data-aos="zoom-out" data-aos-delay="300">
              <HeroCarousel />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-primary/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Sellers Section - With animated descriptions */}
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sellers.map((seller, index) => (
              <Link
                key={seller.id}
                to={`/seller/${seller.id}`}
                className="group"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-border/50 p-4 text-center">
                  {/* Logo */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl overflow-hidden shadow-lg mb-4 bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-500">
                    <img 
                      src={seller.logo}
                      alt={seller.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {seller.name}
                  </h3>
                  
                  {/* Animated Description */}
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-fade-in">
                    {sellerDescriptions[seller.id] || seller.description}
                  </p>
                  
                  {/* Location */}
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                    <FiMapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{seller.location.split(',')[0]}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <FiStar className="w-3 h-3 text-accent fill-accent" />
                    <span className="font-semibold text-xs">{seller.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Video Background */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={communityVideo} type="video/mp4" />
          </video>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/85 to-orange/80" />
        
        <div className="container relative mx-auto px-4 text-center" data-aos="fade-up">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Rejoignez la Communaute VitaDrinks
            </h2>
            <p className="text-lg sm:text-xl text-white/90">
              {inspiringPhrases[1]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse"
                >
                  Creer un Compte Client
                </Button>
              </Link>
              <Link to="/seller/register">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/20 rounded-full px-8 font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                >
                  Devenir Vendeur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - With photos and animated text */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-6 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 group"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                {/* Avatar and Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all duration-300">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FiStar 
                      key={i} 
                      className="w-4 h-4 text-accent fill-accent group-hover:scale-110 transition-transform duration-300" 
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>

                {/* Animated Text */}
                <p className="text-foreground/80 italic text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
