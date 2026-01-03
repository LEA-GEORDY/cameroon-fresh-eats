import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Users, Package, ShoppingBag, Settings, 
  Shield, TrendingUp, DollarSign, Store, AlertTriangle,
  Bell, Search, Menu, LogOut, BarChart3, CheckCircle2, XCircle, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Revenus totaux", value: "2,450,000 FCFA", icon: DollarSign, change: "+15%" },
    { label: "Utilisateurs", value: "1,234", icon: Users, change: "+23%" },
    { label: "Vendeurs", value: "45", icon: Store, change: "+8%" },
    { label: "Commandes", value: "567", icon: ShoppingBag, change: "+12%" },
  ];

  const pendingSellers = [
    { id: "S001", name: "Jus Naturels Douala", email: "jnd@email.com", date: "01/01/2026", status: "En attente" },
    { id: "S002", name: "Bio Fresh Yaounde", email: "bfy@email.com", date: "02/01/2026", status: "En attente" },
    { id: "S003", name: "Fruits Tropicaux", email: "ft@email.com", date: "03/01/2026", status: "En attente" },
  ];

  const recentActivities = [
    { type: "user", message: "Nouvel utilisateur inscrit: Marie K.", time: "Il y a 5 min" },
    { type: "order", message: "Nouvelle commande VD-789 de 15,000 FCFA", time: "Il y a 15 min" },
    { type: "seller", message: "Demande de vendeur: Bio Fresh Yaounde", time: "Il y a 1h" },
    { type: "alert", message: "Stock faible: Orange Mangue Passion (Fruits du Soleil)", time: "Il y a 2h" },
  ];

  const navItems = [
    { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "users", label: "Utilisateurs", icon: Users },
    { id: "sellers", label: "Vendeurs", icon: Store },
    { id: "products", label: "Produits", icon: Package },
    { id: "orders", label: "Commandes", icon: ShoppingBag },
    { id: "analytics", label: "Analytiques", icon: BarChart3 },
    { id: "security", label: "Securite", icon: Shield },
    { id: "settings", label: "Parametres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-foreground text-primary-foreground transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-primary-foreground/20">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="VitaDrinks" className="h-10 brightness-0 invert" />
              <span className="text-xs font-semibold bg-secondary px-2 py-0.5 rounded text-secondary-foreground">
                ADMIN
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-primary-foreground/20">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start gap-3 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <LogOut className="w-5 h-5" />
                Deconnexion
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 h-16">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </Button>
              <div className="w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Tableau de bord Admin
              </h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card rounded-2xl p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-medium text-primary">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Pending Sellers */}
                <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Vendeurs en attente
                    </h2>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
                      {pendingSellers.length} en attente
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {pendingSellers.map((seller) => (
                      <div key={seller.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Store className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{seller.name}</p>
                            <p className="text-xs text-muted-foreground">{seller.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                            <XCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Activites recentes
                    </h2>
                  </div>
                  <div className="p-4 space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-xl transition-colors">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          activity.type === "user" ? "bg-primary/10" :
                          activity.type === "order" ? "bg-secondary/10" :
                          activity.type === "seller" ? "bg-accent/10" :
                          "bg-destructive/10"
                        }`}>
                          {activity.type === "user" && <Users className="w-4 h-4 text-primary" />}
                          {activity.type === "order" && <ShoppingBag className="w-4 h-4 text-secondary" />}
                          {activity.type === "seller" && <Store className="w-4 h-4 text-accent" />}
                          {activity.type === "alert" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "overview" && (
            <div className="flex items-center justify-center h-64 bg-card rounded-2xl shadow-card">
              <div className="text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Section {navItems.find(n => n.id === activeTab)?.label}
                </h2>
                <p className="text-muted-foreground mt-2">
                  Cette section sera bientot disponible
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
