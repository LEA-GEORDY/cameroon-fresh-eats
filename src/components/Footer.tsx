import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Leaf, Download } from "lucide-react";
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
              Sans sucres ajoutes, sans conservateurs, juste la nature dans votre verre.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            {/* App Download */}
            <div className="pt-4 space-y-2">
              <p className="text-sm font-medium">Telecharger l'application</p>
              <div className="flex gap-2">
                <a href="#" className="flex items-center gap-2 px-3 py-2 bg-foreground/90 rounded-lg hover:bg-foreground transition-colors">
                  <Download className="w-4 h-4" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-70">Disponible sur</p>
                    <p className="text-xs font-semibold">App Store</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 px-3 py-2 bg-foreground/90 rounded-lg hover:bg-foreground transition-colors">
                  <Download className="w-4 h-4" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-70">Telecharger sur</p>
                    <p className="text-xs font-semibold">Play Store</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-lime" />
              Liens Rapides
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Accueil</Link></li>
              <li><Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Produits</Link></li>
              <li><Link to="/sellers" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Vendeurs</Link></li>
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">A Propos</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-lime" />
              Support
            </h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/delivery" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Livraison</Link></li>
              <li><Link to="/returns" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Retours</Link></li>
              <li><Link to="/payments" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Paiements</Link></li>
              <li><Link to="/seller/register" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Devenir Vendeur</Link></li>
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
            2024 VitaDrinks. Tous droits reserves.
          </p>
          <div className="flex gap-4 text-sm text-primary-foreground/60">
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
              Politique de confidentialite
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
