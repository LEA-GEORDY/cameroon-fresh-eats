import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Settings as SettingsIcon, 
  ChevronLeft, 
  ChevronRight,
  Bell, 
  Globe, 
  Moon, 
  Share2, 
  Shield, 
  FileText,
  HelpCircle,
  LogOut,
  Smartphone
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AOS from "aos";
import "aos/dist/aos.css";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VitaDrinks',
          text: 'Decouvrez VitaDrinks - La plateforme de jus naturels et smoothies bio du Cameroun !',
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Lien copie dans le presse-papier !');
    }
  };

  const settingsGroups = [
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Recevoir les alertes de commandes",
          action: (
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          )
        },
        {
          icon: Moon,
          label: "Mode sombre",
          description: "Activer le theme sombre",
          action: (
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode}
            />
          )
        },
        {
          icon: Globe,
          label: "Langue",
          description: language === "fr" ? "Francais" : "English",
          action: (
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-input bg-card text-sm"
            >
              <option value="fr">Francais</option>
              <option value="en">English</option>
            </select>
          )
        }
      ]
    },
    {
      title: "Application",
      items: [
        {
          icon: Share2,
          label: "Partager l'application",
          description: "Invitez vos amis",
          onClick: handleShare
        },
        {
          icon: Smartphone,
          label: "Telecharger l'app",
          description: "Disponible sur iOS et Android",
          link: "#"
        }
      ]
    },
    {
      title: "Legal",
      items: [
        {
          icon: Shield,
          label: "Politique de confidentialite",
          description: "Comment nous protegeons vos donnees",
          link: "/privacy"
        },
        {
          icon: FileText,
          label: "Conditions d'utilisation",
          description: "Nos termes et conditions",
          link: "/terms"
        },
        {
          icon: HelpCircle,
          label: "Centre d'aide",
          description: "FAQ et support",
          link: "/help"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8" data-aos="fade-up">
            <Link 
              to="/profile" 
              className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Parametres
              </h1>
              <p className="text-muted-foreground">Gerez vos preferences</p>
            </div>
          </div>

          {/* Settings Groups */}
          <div className="space-y-6">
            {settingsGroups.map((group, groupIndex) => (
              <div 
                key={group.title}
                data-aos="fade-up"
                data-aos-delay={groupIndex * 100}
              >
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
                  {group.title}
                </h2>
                <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    const content = (
                      <div className={`flex items-center justify-between p-4 ${
                        itemIndex > 0 ? 'border-t border-border' : ''
                      } ${item.link || item.onClick ? 'hover:bg-muted/50 cursor-pointer' : ''} transition-colors`}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        {item.action || (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    );

                    if (item.link) {
                      return (
                        <Link key={item.label} to={item.link}>
                          {content}
                        </Link>
                      );
                    }

                    if (item.onClick) {
                      return (
                        <button key={item.label} onClick={item.onClick} className="w-full text-left">
                          {content}
                        </button>
                      );
                    }

                    return <div key={item.label}>{content}</div>;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-8" data-aos="fade-up">
            <button className="w-full flex items-center justify-center gap-3 p-4 bg-destructive/10 text-destructive rounded-2xl hover:bg-destructive/20 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Deconnexion</span>
            </button>
          </div>

          {/* Version */}
          <p className="text-center text-sm text-muted-foreground mt-8" data-aos="fade-up">
            VitaDrinks v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
