import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin, FiYoutube, FiLinkedin, FiSend, FiHeart } from "react-icons/fi";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: "Merci!", description: "Vous êtes inscrit à notre newsletter" });
      setEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden bg-foreground">
      {/* Animated Wave Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-orange" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-16 text-primary-foreground">
        {/* Top Section - Newsletter */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
            <FiMail className="w-4 h-4" />
            <span className="text-sm font-medium">Newsletter</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Restez informé des nouveautés
          </h3>
          <p className="text-primary-foreground/70 mb-6">
            Recevez nos offres exclusives et les dernières actualités VitaDrinks
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-full px-6"
            />
            <Button 
              type="submit" 
              className="h-12 px-8 bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 rounded-full font-semibold"
            >
              <FiSend className="w-4 h-4 mr-2" />
              S'inscrire
            </Button>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-display text-xl font-bold">VitaDrinks</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              100% jus naturels et smoothies bio du Cameroun. 
              La fraîcheur de la nature dans votre verre.
            </p>
            
            {/* Social Icons - Redesigned */}
            <div className="flex gap-2">
              {[
                { icon: FiFacebook, href: "https://facebook.com", color: "hover:bg-blue-500" },
                { icon: FiInstagram, href: "https://instagram.com", color: "hover:bg-pink-500" },
                { icon: FiTwitter, href: "https://twitter.com", color: "hover:bg-sky-500" },
                { icon: FiYoutube, href: "https://youtube.com", color: "hover:bg-red-500" },
                { icon: FiLinkedin, href: "https://linkedin.com", color: "hover:bg-blue-600" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color} hover:text-white`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary">
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
                    className="text-primary-foreground/60 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-secondary">
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
                    className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-orange">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60 group">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <span className="pt-1">Douala, Cameroun<br />Bonamoussadi</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60 group">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                  <FiPhone className="w-4 h-4" />
                </div>
                <a href="tel:+237600000000" className="hover:text-secondary transition-colors">+237 6XX XXX XXX</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60 group">
                <div className="w-8 h-8 rounded-lg bg-orange/20 flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:text-white transition-all">
                  <FiMail className="w-4 h-4" />
                </div>
                <a href="mailto:contact@vitadrinks.cm" className="hover:text-orange transition-colors">contact@vitadrinks.cm</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & App Download */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-t border-primary-foreground/10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-primary-foreground/60">Paiements:</span>
            {["Orange Money", "MTN MoMo", "PayPal", "Visa", "Mastercard"].map((method) => (
              <span 
                key={method} 
                className="px-3 py-1.5 rounded-lg bg-primary-foreground/10 text-xs font-medium text-primary-foreground/80"
              >
                {method}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="h-10 px-4 rounded-lg bg-primary-foreground/10 flex items-center gap-2 hover:bg-primary-foreground/20 transition-colors">
              <span className="text-xl">🍎</span>
              <div className="text-left">
                <p className="text-[10px] text-primary-foreground/60">Télécharger sur</p>
                <p className="text-xs font-semibold">App Store</p>
              </div>
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="h-10 px-4 rounded-lg bg-primary-foreground/10 flex items-center gap-2 hover:bg-primary-foreground/20 transition-colors">
              <span className="text-xl">▶️</span>
              <div className="text-left">
                <p className="text-[10px] text-primary-foreground/60">Disponible sur</p>
                <p className="text-xs font-semibold">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-primary-foreground/10">
          <p className="text-xs text-primary-foreground/50 flex items-center gap-1">
            © 2024 VitaDrinks. Fait avec <FiHeart className="w-3 h-3 text-red-500 fill-red-500" /> au Cameroun
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-primary-foreground/50">
            <Link to="/terms" className="hover:text-primary transition-colors">Conditions</Link>
            <Link to="/privacy" className="hover:text-secondary transition-colors">Confidentialité</Link>
            <Link to="/cookies" className="hover:text-orange transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
