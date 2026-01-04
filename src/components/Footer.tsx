import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Leaf, Youtube, Linkedin } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Decorative Wave */}
      <div className="relative h-20 -mt-20">
        <svg
          className="absolute bottom-0 w-full h-20"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--foreground))"
            d="M0,80 L0,40 Q360,0 720,40 T1440,40 L1440,80 Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-6">
            <div className="brightness-0 invert">
              <AnimatedLogo size="lg" />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              100% jus naturels et smoothies bio du Cameroun. 
              Sans sucres ajoutes, sans conservateurs, juste la nature dans votre verre.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-foreground/10 hover:bg-destructive hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-foreground/10 hover:bg-blue-600 hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* App Download with Official Logos */}
            <div className="pt-4 space-y-3">
              <p className="text-sm font-semibold">Telecharger l'application</p>
              <div className="flex gap-3">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" 
                    alt="App Store" 
                    className="h-10 w-auto"
                  />
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" 
                    alt="Play Store" 
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/products", label: "Produits" },
                { to: "/sellers", label: "Vendeurs" },
                { to: "/about", label: "A Propos" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-primary-foreground/70 hover:text-primary hover:pl-2 transition-all duration-300 text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-secondary" />
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/faq", label: "FAQ" },
                { to: "/delivery", label: "Livraison" },
                { to: "/returns", label: "Retours" },
                { to: "/payments", label: "Paiements" },
                { to: "/seller/register", label: "Devenir Vendeur" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-primary-foreground/70 hover:text-secondary hover:pl-2 transition-all duration-300 text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-orange" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70 group">
                <MapPin className="w-5 h-5 shrink-0 text-primary group-hover:scale-110 transition-transform" />
                <span>Douala, Cameroun<br />Quartier Bonamoussadi</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70 group">
                <Phone className="w-5 h-5 shrink-0 text-secondary group-hover:scale-110 transition-transform" />
                <a href="tel:+237600000000" className="hover:text-secondary transition-colors">+237 6XX XXX XXX</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70 group">
                <Mail className="w-5 h-5 shrink-0 text-orange group-hover:scale-110 transition-transform" />
                <a href="mailto:contact@vitadrinks.cm" className="hover:text-orange transition-colors">contact@vitadrinks.cm</a>
              </li>
            </ul>

            {/* Payment Methods with Official Logos */}
            <div className="mt-6 pt-6 border-t border-primary-foreground/20">
              <p className="text-sm font-semibold mb-3">Moyens de paiement</p>
              <div className="flex flex-wrap gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png" 
                  alt="Orange Money" 
                  className="h-8 w-8 object-contain bg-white rounded-md p-1"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/1200px-New-mtn-logo.jpg" 
                  alt="MTN MoMo" 
                  className="h-8 w-8 object-contain bg-white rounded-md p-1"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" 
                  alt="PayPal" 
                  className="h-8 w-auto object-contain bg-white rounded-md px-2 py-1"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" 
                  alt="Visa" 
                  className="h-8 w-auto object-contain bg-white rounded-md px-2 py-1"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" 
                  alt="Mastercard" 
                  className="h-8 w-8 object-contain bg-white rounded-md p-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            2024 VitaDrinks. Tous droits reserves.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/60">
            <Link to="/terms" className="hover:text-primary transition-colors duration-300">
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className="hover:text-secondary transition-colors duration-300">
              Politique de confidentialite
            </Link>
            <Link to="/cookies" className="hover:text-orange transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;