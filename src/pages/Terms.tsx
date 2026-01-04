import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, ChevronLeft } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import AOS from "aos";
import "aos/dist/aos.css";

const Terms = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const sections = [
    {
      title: "1. Acceptation des conditions",
      content: "En accedant et en utilisant la plateforme VitaDrinks, vous acceptez d'etre lie par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service."
    },
    {
      title: "2. Description du service",
      content: "VitaDrinks est une plateforme de commerce electronique permettant aux vendeurs de proposer des jus naturels et smoothies bio aux clients au Cameroun. Nous agissons en tant qu'intermediaire entre les vendeurs et les acheteurs."
    },
    {
      title: "3. Inscription et compte",
      content: "Pour utiliser certaines fonctionnalites de notre plateforme, vous devez creer un compte. Vous etes responsable de maintenir la confidentialite de vos informations de connexion et de toutes les activites effectuees sous votre compte."
    },
    {
      title: "4. Commandes et paiements",
      content: "Toutes les commandes passees sur VitaDrinks sont soumises a disponibilite. Les prix sont affiches en Francs CFA (FCFA). Nous acceptons les paiements par Orange Money et MTN Mobile Money. Une commission de 1% est prelevee sur chaque vente pour les vendeurs."
    },
    {
      title: "5. Livraison",
      content: "Les delais de livraison varient selon la localisation. Nous nous efforcons de livrer dans les 24 a 48 heures dans les grandes villes du Cameroun. Les frais de livraison sont calcules en fonction de la distance et du poids de la commande."
    },
    {
      title: "6. Politique de retour",
      content: "Les produits perissables comme les jus frais ne peuvent etre retournes sauf en cas de defaut de qualite constate a la livraison. Tout probleme doit etre signale dans les 24 heures suivant la reception."
    },
    {
      title: "7. Responsabilite des vendeurs",
      content: "Les vendeurs sont responsables de la qualite de leurs produits, du respect des normes sanitaires et de la veracite des informations fournies. VitaDrinks se reserve le droit de suspendre tout vendeur ne respectant pas ces exigences."
    },
    {
      title: "8. Propriete intellectuelle",
      content: "Tout le contenu de la plateforme VitaDrinks, y compris les logos, textes, images et logiciels, est protege par les lois sur la propriete intellectuelle. Toute reproduction non autorisee est strictement interdite."
    },
    {
      title: "9. Protection des donnees",
      content: "Nous nous engageons a proteger vos donnees personnelles conformement a notre politique de confidentialite. Vos informations ne seront jamais vendues a des tiers sans votre consentement explicite."
    },
    {
      title: "10. Modification des conditions",
      content: "VitaDrinks se reserve le droit de modifier ces conditions a tout moment. Les utilisateurs seront informes des changements significatifs par email ou notification sur la plateforme."
    },
    {
      title: "11. Loi applicable",
      content: "Ces conditions sont regies par les lois de la Republique du Cameroun. Tout litige sera soumis a la juridiction des tribunaux competents de Douala."
    },
    {
      title: "12. Contact",
      content: "Pour toute question concernant ces conditions, veuillez nous contacter a contact@vitadrinks.cm ou par telephone au +237 6XX XXX XXX."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <Link to="/" className="inline-block mb-6">
              <AnimatedLogo size="lg" />
            </Link>
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="font-display text-4xl font-bold text-foreground">
                Conditions d'Utilisation
              </h1>
            </div>
            <p className="text-muted-foreground">
              Derniere mise a jour : Janvier 2024
            </p>
          </div>

          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
            data-aos="fade-right"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour a l'accueil
          </Link>

          {/* Content */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={section.title}
                className="bg-card rounded-2xl p-6 shadow-card"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl text-center" data-aos="fade-up">
            <p className="text-sm text-muted-foreground">
              En utilisant VitaDrinks, vous confirmez avoir lu et accepte ces conditions d'utilisation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
