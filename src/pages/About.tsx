import { Link } from "react-router-dom";
import { Leaf, Heart, Users, Award, Target, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "100% Naturel",
      description: "Nous nous engageons a offrir uniquement des produits naturels, sans additifs ni conservateurs.",
    },
    {
      icon: Heart,
      title: "Sante Avant Tout",
      description: "Chaque produit est selectionne pour ses bienfaits nutritionnels et son impact positif sur la sante.",
    },
    {
      icon: Users,
      title: "Communaute Locale",
      description: "Nous soutenons les producteurs locaux camerounais et contribuons a l'economie verte.",
    },
    {
      icon: Award,
      title: "Qualite Certifiee",
      description: "Tous nos produits sont controles et certifies bio par nos partenaires agrees.",
    },
  ];

  const stats = [
    { value: "50+", label: "Produits naturels" },
    { value: "20+", label: "Vendeurs verifies" },
    { value: "5000+", label: "Clients satisfaits" },
    { value: "10", label: "Regions couvertes" },
  ];

  const team = [
    { name: "Marie Kouam", role: "Fondatrice & CEO", image: "/placeholder.svg" },
    { name: "Jean Mballa", role: "Directeur Operations", image: "/placeholder.svg" },
    { name: "Aminata Diop", role: "Responsable Qualite", image: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <img src={logo} alt="VitaDrinks" className="h-20 mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              A Propos de <span className="text-primary">VitaDrinks</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              VitaDrinks est la premiere plateforme camerounaise dediee aux jus naturels 
              et smoothies bio. Notre mission est de connecter les producteurs locaux 
              aux consommateurs urbains tout en promouvant une alimentation saine.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Notre Mission</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Promouvoir une economie verte et une alimentation saine
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Alignes avec le Plan National de Developpement 2020-2030 du Cameroun, 
                nous travaillons a valoriser les produits agricoles locaux, 
                soutenir l'agriculture durable et encourager les habitudes alimentaires saines.
              </p>
              <ul className="space-y-3">
                {[
                  "Soutien aux producteurs locaux",
                  "Produits 100% naturels et bio",
                  "Livraison dans tout le Cameroun",
                  "Paiement mobile securise",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Globe className="w-32 h-32 text-primary animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Les principes qui guident chacune de nos actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group p-6 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Rejoignez l'aventure VitaDrinks
            </h2>
            <p className="text-muted-foreground text-lg">
              Que vous soyez consommateur a la recherche de produits sains ou 
              producteur local souhaitant vendre vos jus naturels, VitaDrinks est fait pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Decouvrir les Produits
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/seller/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  Devenir Vendeur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
