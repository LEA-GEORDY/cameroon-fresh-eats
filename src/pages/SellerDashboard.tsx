import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Package, ShoppingBag, MessageCircle, Settings, 
  Plus, Edit, Trash2, Eye, Users, ChevronRight, Bell, Search, Menu, 
  LogOut, HelpCircle, TrendingUp, DollarSign, BarChart3, Star, ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo.png";
import noOrdersImg from "@/assets/empty-states/no-orders.png";
import noDataImg from "@/assets/empty-states/no-data.png";
import AOS from "aos";
import "aos/dist/aos.css";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
  }, []);

  // Animated counters
  const [animatedStats, setAnimatedStats] = useState({
    sales: 0,
    orders: 0,
    revenue: 0,
    commission: 0
  });

  useEffect(() => {
    const targets = { sales: 1250, orders: 342, revenue: 875000, commission: 8750 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        sales: Math.floor(targets.sales * easeOut),
        orders: Math.floor(targets.orders * easeOut),
        revenue: Math.floor(targets.revenue * easeOut),
        commission: Math.floor(targets.commission * easeOut),
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const recentOrders = [
    { id: "CMD-001", customer: "Marie K.", product: "Orange Mangue x3", amount: "2,400 FCFA", status: "Livre" },
    { id: "CMD-002", customer: "Jean P.", product: "Detox Vert x2", amount: "1,900 FCFA", status: "En cours" },
    { id: "CMD-003", customer: "Aminata D.", product: "Tropical x5", amount: "3,750 FCFA", status: "En attente" },
    { id: "CMD-004", customer: "Paul E.", product: "Berry Blast x1", amount: "900 FCFA", status: "Livre" },
  ];

  const topProducts = [
    { name: "Orange Mangue Passion", sales: 245, revenue: "196,000 FCFA", rating: 4.8 },
    { name: "Detox Vert Energie", sales: 189, revenue: "179,550 FCFA", rating: 4.6 },
    { name: "Tropical Paradise", sales: 156, revenue: "117,000 FCFA", rating: 4.9 },
  ];

  const activities = [
    { text: "Nouvelle commande recue de Marie K.", time: "Il y a 5 min", type: "order" },
    { text: "Paiement de 45,000 FCFA confirme", time: "Il y a 1h", type: "payment" },
    { text: "Produit 'Gingembre Citron' en rupture de stock", time: "Il y a 3h", type: "alert" },
    { text: "Nouvel avis 5 etoiles sur Tropical Paradise", time: "Il y a 6h", type: "review" },
  ];

  const navItems = [
    { id: "overview", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "products", label: "Mes Produits", icon: Package },
    { id: "orders", label: "Commandes", icon: ShoppingBag },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "analytics", label: "Statistiques", icon: BarChart3 },
    { id: "settings", label: "Parametres", icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livre": return "bg-primary/10 text-primary";
      case "En cours": return "bg-secondary/10 text-secondary";
      case "En attente": return "bg-orange/10 text-orange";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 rounded-r-[2rem]`}>
        <div className="flex flex-col h-full text-white">
          {/* Logo */}
          <div className="p-6" data-aos="fade-right">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VitaDrinks" className="w-10 h-10 rounded-xl" />
              <span className="font-display text-lg font-bold">VitaDrinks</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                data-aos="fade-right"
                data-aos-delay={index * 50}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </button>
            ))}
          </nav>

          {/* Support Card */}
          <div className="p-4" data-aos="fade-up">
            <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-sm text-white/80">Besoin d'aide?</p>
              <Button variant="secondary" size="sm" className="mt-2 w-full rounded-xl">
                Support 24/7
              </Button>
            </div>
          </div>

          {/* Quit Button */}
          <div className="p-4">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl">
                <LogOut className="w-5 h-5" />
                Quitter
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
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-muted lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-foreground">
                {navItems.find(n => n.id === activeTab)?.label || "Tableau de bord"}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher..." 
                  className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 w-40"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                  4
                </span>
              </Button>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">Ma Boutique</p>
                  <p className="text-xs text-muted-foreground">Vendeur Premium</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="font-semibold text-white text-sm">MB</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-white" data-aos="fade-up" data-aos-delay="0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Ventes totales</p>
                      <p className="text-3xl font-bold mt-1">{animatedStats.sales.toLocaleString()}</p>
                      <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +12% ce mois
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-5 text-white" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Commandes</p>
                      <p className="text-3xl font-bold mt-1">{animatedStats.orders}</p>
                      <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +8% ce mois
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange to-orange/80 rounded-2xl p-5 text-white" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Revenus</p>
                      <p className="text-2xl font-bold mt-1">{animatedStats.revenue.toLocaleString()} FCFA</p>
                      <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +15% ce mois
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-5 border border-border shadow-card" data-aos="fade-up" data-aos-delay="300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Commission (1%)</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{animatedStats.commission.toLocaleString()} FCFA</p>
                      <p className="text-xs text-primary mt-1">Prelevee ce mois</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-card border border-border/50" data-aos="fade-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Commandes recentes</h3>
                    <Button variant="ghost" size="sm" className="text-primary">Voir tout</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-muted-foreground border-b border-border">
                          <th className="pb-3 font-medium">ID</th>
                          <th className="pb-3 font-medium">Client</th>
                          <th className="pb-3 font-medium">Produit</th>
                          <th className="pb-3 font-medium">Montant</th>
                          <th className="pb-3 font-medium">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {recentOrders.map((order, index) => (
                          <tr key={order.id} className="text-sm" data-aos="fade-left" data-aos-delay={index * 50}>
                            <td className="py-3 font-medium text-foreground">{order.id}</td>
                            <td className="py-3 text-foreground">{order.customer}</td>
                            <td className="py-3 text-muted-foreground">{order.product}</td>
                            <td className="py-3 font-medium text-foreground">{order.amount}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Produits populaires</h3>
                    <Button variant="ghost" size="sm" className="text-primary">Voir</Button>
                  </div>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div 
                        key={product.name} 
                        className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        data-aos="fade-right"
                        data-aos-delay={index * 50}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-foreground text-sm truncate">{product.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-accent fill-accent" />
                            <span className="text-xs font-medium">{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{product.sales} ventes</span>
                          <span className="text-primary font-medium">{product.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Feed */}
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50" data-aos="fade-up">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Activite recente</h3>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3"
                        data-aos="fade-left"
                        data-aos-delay={index * 50}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'order' ? 'bg-primary' :
                          activity.type === 'payment' ? 'bg-secondary' :
                          activity.type === 'alert' ? 'bg-orange' : 'bg-accent'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50" data-aos="fade-up" data-aos-delay="100">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Actions rapides</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Plus, label: "Ajouter produit", color: "from-primary to-primary/80" },
                      { icon: Package, label: "Gerer stock", color: "from-secondary to-secondary/80" },
                      { icon: MessageCircle, label: "Messages", color: "from-orange to-orange/80" },
                      { icon: BarChart3, label: "Statistiques", color: "from-accent to-accent/80" },
                    ].map((action, index) => (
                      <button
                        key={action.label}
                        className={`bg-gradient-to-r ${action.color} p-4 rounded-xl text-white text-center hover:opacity-90 transition-opacity`}
                        data-aos="zoom-in"
                        data-aos-delay={index * 50}
                      >
                        <action.icon className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">{action.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs - Empty States */}
          {activeTab !== "overview" && (
            <div className="flex items-center justify-center min-h-[60vh]" data-aos="zoom-in">
              <div className="text-center max-w-md">
                <img 
                  src={activeTab === "orders" ? noOrdersImg : noDataImg} 
                  alt="Empty state" 
                  className="w-48 h-48 mx-auto mb-6 object-contain"
                />
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Section {navItems.find(n => n.id === activeTab)?.label}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Cette fonctionnalite sera bientot disponible. Restez connecte!
                </p>
                <Button onClick={() => setActiveTab("overview")} className="rounded-xl">
                  Retour au tableau de bord
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
