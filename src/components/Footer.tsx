import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Leaf } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-leaf-dark text-primary-foreground">
      {/* Decorative Wave */}
      <div className="relative h-16 -mt-16">
        <svg
          className="absolute bottom-0 w-full h-16"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(142 70% 25%)"
            d="M0,64 L0,32 Q360,0 720,32 T1440,32 L1440,64 Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="VitaDrinks" className="h-16 w-auto brightness-0 invert" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              100% jus naturels et smoothies bio du Cameroun. 
              Sans sucres ajoutés, sans conservateurs, juste la nature dans votre verre.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-lime" />
              Liens Rapides
            </h4>
            <ul className="space-y-2">
              {["Accueil", "Produits", "Vendeurs", "À Propos", "Contact"].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link === "Accueil" ? "" : link.toLowerCase().replace(" ", "-")}`}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-lime" />
              Support
            </h4>
            <ul className="space-y-2">
              {["FAQ", "Livraison", "Retours", "Paiements", "Devenir Vendeur"].map((link) => (
                <li key={link}>
                  <Link 
                    to="#"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-lime" />
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-5 h-5 shrink-0 text-secondary" />
                <span>Douala, Cameroun<br />Quartier Bonamoussadi</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-5 h-5 shrink-0 text-secondary" />
                <span>+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-5 h-5 shrink-0 text-secondary" />
                <span>contact@vitadrinks.cm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 VitaDrinks. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-sm text-primary-foreground/60">
            <Link to="#" className="hover:text-primary-foreground transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="#" className="hover:text-primary-foreground transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
