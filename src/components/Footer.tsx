import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin, FiYoutube, FiLinkedin } from "react-icons/fi";
import AnimatedLogo from "@/components/AnimatedLogo";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-primary/20" />
      
      {/* Decorative Wave */}
      <div className="relative h-20 -mt-20">
        <svg
          className="absolute bottom-0 w-full h-20"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--foreground))" />
              <stop offset="100%" stopColor="hsl(var(--foreground))" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,80 L0,40 Q360,0 720,40 T1440,40 L1440,80 Z"
          />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 py-12 sm:py-16 text-primary-foreground">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="space-y-4 sm:space-y-6">
            <div className="brightness-0 invert">
              <AnimatedLogo size="lg" />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              100% jus naturels et smoothies bio du Cameroun. 
              Des saveurs authentiques, un gout unique.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full bg-primary-foreground/10 hover:bg-destructive hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full bg-primary-foreground/10 hover:bg-blue-600 hover:text-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* App Download with Official Logos */}
            <div className="pt-4 space-y-3">
              <p className="text-sm font-semibold">Telecharger l'application</p>
              <div className="flex gap-3 flex-wrap">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" 
                    alt="App Store" 
                    className="h-9 sm:h-10 w-auto"
                  />
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" 
                    alt="Play Store" 
                    className="h-9 sm:h-10 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              Liens Rapides
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/products", label: "Produits" },
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
            <h4 className="font-display text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              Support
            </h4>
            <ul className="space-y-2 sm:space-y-3">
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
            <h4 className="font-display text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70 group">
                <FiMapPin className="w-5 h-5 shrink-0 text-primary group-hover:scale-110 transition-transform" />
                <span>Douala, Cameroun<br />Quartier Bonamoussadi</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70 group">
                <FiPhone className="w-5 h-5 shrink-0 text-secondary group-hover:scale-110 transition-transform" />
                <a href="tel:+237600000000" className="hover:text-secondary transition-colors">+237 6XX XXX XXX</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70 group">
                <FiMail className="w-5 h-5 shrink-0 text-orange group-hover:scale-110 transition-transform" />
                <a href="mailto:contact@vitadrinks.cm" className="hover:text-orange transition-colors">contact@vitadrinks.cm</a>
              </li>
            </ul>

            {/* Payment Methods with Official Logos */}
            <div className="mt-6 pt-6 border-t border-primary-foreground/20">
              <p className="text-sm font-semibold mb-3">Moyens de paiement</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png" 
                  alt="Orange Money" 
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain bg-white rounded-md p-1"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/1200px-New-mtn-logo.jpg" 
                  alt="MTN MoMo" 
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain bg-white rounded-md p-1"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" 
                  alt="PayPal" 
                  className="h-7 sm:h-8 w-auto object-contain bg-white rounded-md px-2 py-1"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" 
                  alt="Visa" 
                  className="h-7 sm:h-8 w-auto object-contain bg-white rounded-md px-2 py-1"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" 
                  alt="Mastercard" 
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain bg-white rounded-md p-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-primary-foreground/60 text-center md:text-left">
            2024 VitaDrinks. Tous droits reserves.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-primary-foreground/60">
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
