import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, ChevronLeft } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import AOS from "aos";
import "aos/dist/aos.css";

const Privacy = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const sections = [
    {
      title: "1. Collecte des donnees",
      content: "Nous collectons les informations que vous nous fournissez lors de l'inscription, des commandes et de l'utilisation de notre plateforme. Cela inclut : nom, prenom, adresse email, numero de telephone, adresse de livraison et informations de paiement."
    },
    {
      title: "2. Utilisation des donnees",
      content: "Vos donnees sont utilisees pour : traiter vos commandes, ameliorer nos services, vous envoyer des communications marketing (avec votre consentement), assurer la securite de la plateforme et respecter nos obligations legales."
    },
    {
      title: "3. Protection des donnees",
      content: "Nous mettons en oeuvre des mesures de securite techniques et organisationnelles pour proteger vos donnees contre tout acces non autorise, modification, divulgation ou destruction. Vos donnees de paiement sont traitees de maniere securisee via nos partenaires Orange Money et MTN Mobile Money."
    },
    {
      title: "4. Partage des donnees",
      content: "Nous ne vendons jamais vos donnees personnelles. Nous pouvons partager vos informations avec : les vendeurs (pour la livraison), nos prestataires de services de paiement et les autorites competentes si la loi l'exige."
    },
    {
      title: "5. Cookies et technologies similaires",
      content: "Notre plateforme utilise des cookies pour ameliorer votre experience de navigation, analyser l'utilisation du site et personnaliser le contenu. Vous pouvez gerer vos preferences de cookies dans les parametres de votre navigateur."
    },
    {
      title: "6. Vos droits",
      content: "Vous avez le droit d'acceder a vos donnees, de les rectifier, de les supprimer, de limiter leur traitement et de vous opposer a leur utilisation a des fins marketing. Pour exercer ces droits, contactez-nous a privacy@vitadrinks.cm."
    },
    {
      title: "7. Conservation des donnees",
      content: "Nous conservons vos donnees aussi longtemps que necessaire pour fournir nos services et respecter nos obligations legales. Les donnees de compte sont conservees jusqu'a la suppression de votre compte. Les donnees de transaction sont conservees pendant 5 ans."
    },
    {
      title: "8. Securite des mineurs",
      content: "Notre service n'est pas destine aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de donnees personnelles concernant les mineurs."
    },
    {
      title: "9. Transferts internationaux",
      content: "Vos donnees sont principalement traitees au Cameroun. En cas de transfert vers d'autres pays, nous nous assurons que des garanties appropriees sont en place pour proteger vos donnees."
    },
    {
      title: "10. Modifications de la politique",
      content: "Nous pouvons modifier cette politique de confidentialite a tout moment. Les modifications seront publiees sur cette page avec une nouvelle date de mise a jour. Nous vous encourageons a consulter regulierement cette page."
    },
    {
      title: "11. Contact",
      content: "Pour toute question concernant cette politique de confidentialite ou vos donnees personnelles, contactez notre Delegue a la Protection des Donnees a : privacy@vitadrinks.cm ou +237 6XX XXX XXX."
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
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="font-display text-4xl font-bold text-foreground">
                Politique de Confidentialite
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

          {/* Intro */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8" data-aos="fade-up">
            <p className="text-foreground leading-relaxed">
              Chez VitaDrinks, nous accordons une grande importance a la protection de votre vie privee. 
              Cette politique explique comment nous collectons, utilisons et protegeons vos informations personnelles.
            </p>
          </div>

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
          <div className="mt-12 p-6 bg-card rounded-2xl text-center shadow-card" data-aos="fade-up">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">
              Vos donnees sont en securite avec nous
            </p>
            <p className="text-sm text-muted-foreground">
              Nous utilisons les technologies les plus avancees pour proteger vos informations personnelles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
