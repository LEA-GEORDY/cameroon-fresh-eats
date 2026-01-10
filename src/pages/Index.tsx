import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiStar, FiMapPin, FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { sellers } from "@/data/products";
import AnimatedLogo from "@/components/AnimatedLogo";
import AnimatedCounter from "@/components/AnimatedCounter";
import AOS from "aos";
import "aos/dist/aos.css";
import heroBg from "@/assets/hero-bg.jpg";
import communityBg from "@/assets/community-bg.jpg";

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
    {
      name: "Pierre E.",
      location: "Kribi",
      text: "Le Bissap est exactement comme celui de ma grand-mère. Un vrai délice nostalgique !",
      rating: 5,
    },
    {
      name: "Fatou N.",
      location: "Garoua",
      text: "Commander est simple et la qualité est toujours au rendez-vous. Mes enfants adorent !",
      rating: 5,
    },
    {
      name: "Samuel T.",
      location: "Limbé",
      text: "Les shots au gingembre m'ont changé la vie. Plus d'énergie chaque matin !",
      rating: 5,
    },
    {
      name: "Grace O.",
      location: "Bamenda",
      text: "Le service est impeccable et les produits sont 100% naturels. Je suis cliente fidèle !",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Clean design without floating nav */}
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
            {/* Left Content */}
            <div className="space-y-8">
              <div data-aos="fade-right" data-aos-delay="100">
                <AnimatedLogo size="lg" />
              </div>
              
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
                    className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
                  >
                    Explorer
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-10 py-6 text-lg rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold"
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

            {/* Right Image - Clean without floating nav */}
            <div className="relative" data-aos="zoom-out" data-aos-delay="300">
              {/* Background decorative shape */}
              <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl rotate-3" />
              
              {/* Main image container - No floating nav overlay */}
              <div className="relative bg-card rounded-3xl overflow-hidden shadow-elevated">
                <img 
                  src={heroBg} 
                  alt="Jus naturels frais" 
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />

                {/* Floating badge */}
                <div className="absolute bottom-6 right-6 bg-card/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium">5K+ Clients satisfaits</span>
                  </div>
                </div>
              </div>
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

      {/* Sellers Section - Show all 8 with logos */}
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
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl overflow-hidden shadow-lg mb-4 bg-gradient-to-r from-primary/20 to-secondary/20">
                    <img 
                      src={seller.logo}
                      alt={seller.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {seller.name}
                  </h3>
                  
                  {/* Location */}
                  <div className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
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

      {/* CTA Section with Background Image */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${communityBg})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/85 to-orange/80" />
        
        <div className="container relative mx-auto px-4 text-center" data-aos="fade-up">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <div className="brightness-0 invert flex justify-center">
              <AnimatedLogo size="lg" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Rejoignez la Communaute VitaDrinks
            </h2>
            <p className="text-lg sm:text-xl text-white/90">
              {inspiringPhrases[1]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold">
                  Creer un Compte Client
                </Button>
              </Link>
              <Link to="/seller/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 rounded-full px-8 font-semibold">
                  Devenir Vendeur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - 7 testimonials */}
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
                className="p-6 bg-card rounded-2xl shadow-card"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic text-sm">"{testimonial.text}"</p>
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
