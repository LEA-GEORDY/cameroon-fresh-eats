import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Camera, Moon, Sun, Globe, LogOut, ChevronRight, Heart, ShoppingBag, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";

const Profile = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("fr");
  const { favorites } = useFavorites();

  const user = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+237 6XX XXX XXX",
    location: "Douala, Cameroun",
    avatar: null,
  };

  const menuItems = [
    { icon: ShoppingBag, label: "Mes commandes", link: "/orders", count: 5 },
    { icon: Heart, label: "Mes favoris", link: "/favorites", count: favorites.length },
    { icon: Bell, label: "Notifications", link: "/notifications", count: 3 },
    { icon: Settings, label: "Parametres", link: "/settings" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="bg-card rounded-3xl shadow-card overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary via-secondary to-orange" />
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full bg-card border-4 border-card shadow-lg flex items-center justify-center">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <h1 className="font-display text-2xl font-bold text-foreground">
                {user.firstName} {user.lastName}
              </h1>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{user.location}</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Modifier le profil
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.link}
                className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                  index > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                      {item.count}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>

          {/* Preferences */}
          <div className="bg-card rounded-2xl shadow-card p-6 space-y-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Preferences
            </h2>

            {/* Theme */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "light" ? (
                  <Sun className="w-5 h-5 text-secondary" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
                <span className="text-foreground">Theme</span>
              </div>
              <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
                <button
                  onClick={() => setTheme("light")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    theme === "light" ? "bg-card shadow text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Jour
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    theme === "dark" ? "bg-card shadow text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Nuit
                </button>
              </div>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-foreground">Langue</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-xl border border-input bg-card text-foreground"
              >
                <option value="fr">Francais</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* Logout */}
          <Button
            variant="outline"
            className="w-full h-12 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Deconnexion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
