import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin, FiYoutube, FiLinkedin, FiHeart, FiSend } from "react-icons/fi";
import AnimatedLogo from "@/components/AnimatedLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-foreground">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          className="absolute -top-1 w-full h-24"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--orange))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            fill="url(#footerWave)"
            d="M0,0 C480,100 960,0 1440,80 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

      {/* Floating orbs decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-orange/10 rounded-full blur-2xl" />

      <div className="relative container mx-auto px-4 pt-20 pb-8">
        {/* Newsletter Section */}
        <div className="relative mb-12 p-8 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-orange/20 backdrop-blur-sm border border-primary-foreground/10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                Restez informé !
              </h3>
              <p className="text-primary-foreground/70">
                Recevez nos offres exclusives et nos nouveautés directement dans votre boîte mail.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-xl"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6">
                <FiSend className="w-4 h-4 mr-2" />
                S'abonner
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4 sm:space-y-6">
            <div className="brightness-0 invert">
              <AnimatedLogo size="lg" />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              100% jus naturels et smoothies bio du Cameroun. 
              Des saveurs authentiques, un goût unique.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { icon: FiFacebook, href: "https://facebook.com", color: "hover:bg-blue-600" },
                { icon: FiInstagram, href: "https://instagram.com", color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500" },
                { icon: FiTwitter, href: "https://twitter.com", color: "hover:bg-sky-500" },
                { icon: FiYoutube, href: "https://youtube.com", color: "hover:bg-red-600" },
                { icon: FiLinkedin, href: "https://linkedin.com", color: "hover:bg-blue-700" },
              ].map(({ icon: Icon, href, color }) => (
                <a 
                  key={href}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-2.5 rounded-xl bg-primary-foreground/10 ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                >
                  <Icon className="w-4 h-4 text-primary-foreground/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary rounded-full" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/products", label: "Produits" },
                { to: "/about", label: "À Propos" },
                { to: "/sellers", label: "Vendeurs" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-primary-foreground/60 hover:text-primary hover:translate-x-2 transition-all duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-secondary rounded-full" />
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/faq", label: "FAQ" },
                { to: "/delivery", label: "Livraison" },
                { to: "/returns", label: "Retours" },
                { to: "/seller/register", label: "Devenir Vendeur" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-primary-foreground/60 hover:text-secondary hover:translate-x-2 transition-all duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary transition-all duration-300 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange rounded-full" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60 group">
                <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary transition-colors">
                  <FiMapPin className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <span>Douala, Cameroun<br />Quartier Bonamoussadi</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60 group">
                <div className="p-2 rounded-lg bg-secondary/20 group-hover:bg-secondary transition-colors">
                  <FiPhone className="w-4 h-4 text-secondary group-hover:text-white transition-colors" />
                </div>
                <a href="tel:+237600000000" className="hover:text-secondary transition-colors">+237 6XX XXX XXX</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60 group">
                <div className="p-2 rounded-lg bg-orange/20 group-hover:bg-orange transition-colors">
                  <FiMail className="w-4 h-4 text-orange group-hover:text-white transition-colors" />
                </div>
                <a href="mailto:contact@vitadrinks.cm" className="hover:text-orange transition-colors">contact@vitadrinks.cm</a>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-6 pt-4 border-t border-primary-foreground/10">
              <p className="text-xs text-primary-foreground/50 mb-3">Moyens de paiement</p>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-primary-foreground/10 text-xs text-primary-foreground/70">Orange Money</div>
                <div className="px-3 py-1.5 rounded-lg bg-primary-foreground/10 text-xs text-primary-foreground/70">MTN MoMo</div>
                <div className="px-3 py-1.5 rounded-lg bg-primary-foreground/10 text-xs text-primary-foreground/70">Visa</div>
                <div className="px-3 py-1.5 rounded-lg bg-primary-foreground/10 text-xs text-primary-foreground/70">PayPal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50 flex items-center gap-1">
            © 2024 VitaDrinks. Fait avec <FiHeart className="w-3 h-3 text-red-500 fill-red-500" /> au Cameroun
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-primary-foreground/50">
            <Link to="/terms" className="hover:text-primary transition-colors duration-300">
              Conditions
            </Link>
            <Link to="/privacy" className="hover:text-secondary transition-colors duration-300">
              Confidentialité
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
