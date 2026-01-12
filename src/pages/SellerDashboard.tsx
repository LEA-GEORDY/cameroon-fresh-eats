import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Package, ShoppingBag, MessageCircle, Settings, 
  Plus, Users, ChevronRight, Bell, Search, Menu, 
  LogOut, HelpCircle, TrendingUp, DollarSign, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddProductModal from "@/components/AddProductModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const SellerDashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [sellerId, setSellerId] = useState<string | null>(null);

  // Animated counters
  const [animatedStats, setAnimatedStats] = useState({
    sales: 0,
    purchases: 0,
    orders: 0,
    views: 0
  });

  useEffect(() => {
    const targets = { sales: 2450000, purchases: 45, orders: 128, views: 3420 };
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
        purchases: Math.floor(targets.purchases * easeOut),
        orders: Math.floor(targets.orders * easeOut),
        views: Math.floor(targets.views * easeOut),
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Fetch seller ID
  useEffect(() => {
    const fetchSeller = async () => {
      if (user) {
        const { data } = await supabase
          .from('sellers')
          .select('id')
          .eq('user_id', user.id)
          .single();
        if (data) setSellerId(data.id);
      }
    };
    fetchSeller();
  }, [user]);

  const recentOrders = [
    { id: "#VD-001", customer: "Marie K.", amount: "15,000 FCFA", status: "Livré", statusColor: "bg-primary" },
    { id: "#VD-002", customer: "Jean-Paul M.", amount: "8,500 FCFA", status: "En cours", statusColor: "bg-secondary" },
    { id: "#VD-003", customer: "Aminata D.", amount: "22,000 FCFA", status: "Confirmé", statusColor: "bg-orange" },
    { id: "#VD-004", customer: "Pierre E.", amount: "12,000 FCFA", status: "En attente", statusColor: "bg-muted-foreground" },
  ];

  const topProducts = [
    { name: "Orange Mangue Passion", sold: 45, revenue: "36,000 FCFA" },
    { name: "Détox Vert Énergie", sold: 38, revenue: "36,100 FCFA" },
    { name: "Tropical Paradise", sold: 32, revenue: "24,000 FCFA" },
  ];

  const activities = [
    { text: "Nouvelle commande reçue de Marie K.", time: "Il y a 5 min", color: "bg-primary" },
    { text: "Produit 'Bissap Premium' bientôt en rupture de stock", time: "Il y a 1h", color: "bg-orange" },
    { text: "Avis 5 étoiles reçu pour 'Orange Mangue'", time: "Il y a 3h", color: "bg-secondary" },
  ];

  const navItems = [
    { id: "overview", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "products", label: "Mes Produits", icon: Package },
    { id: "orders", label: "Commandes", icon: ShoppingBag },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-primary to-primary/90 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 rounded-r-[2rem] shadow-2xl`}>
        <div className="flex flex-col h-full text-white">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-bold">V</span>
              </div>
              <div>
                <span className="font-display text-lg font-bold block">VitaDrinks</span>
                <span className="text-xs text-white/60">Espace Vendeur</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-white text-primary shadow-lg"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </nav>

          {/* Add Product Button */}
          <div className="px-4 pb-4">
            <Button 
              onClick={() => setShowAddProduct(true)}
              className="w-full bg-white text-primary hover:bg-white/90 rounded-xl py-6 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un Produit
            </Button>
          </div>

          {/* Quit Button */}
          <div className="p-4 border-t border-white/10">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl">
                <LogOut className="w-5 h-5" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-foreground">Tableau de bord</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 w-40" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="font-bold text-white text-sm">VD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Ventes Totales", value: `${animatedStats.sales.toLocaleString()} FCFA`, icon: DollarSign, color: "from-primary to-primary/80", change: "+12%" },
                  { label: "Commandes", value: animatedStats.orders, icon: ShoppingBag, color: "from-secondary to-secondary/80", change: "+8%" },
                  { label: "Produits Vendus", value: animatedStats.purchases, icon: Package, color: "from-orange to-orange/80", change: "+15%" },
                  { label: "Vues Boutique", value: animatedStats.views.toLocaleString(), icon: Eye, color: "from-lime to-lime/80", change: "+23%" },
                ].map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-white/80 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-white/70">
                      <span className="text-green-300">{stat.change}</span> ce mois
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground">Commandes Récentes</h3>
                    <Button variant="link" className="text-primary text-sm p-0 h-auto">Voir tout</Button>
                  </div>
                  <div className="space-y-3">
                    {recentOrders.map((order, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${order.statusColor}`} />
                          <div>
                            <p className="font-medium text-sm">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-primary">{order.amount}</p>
                          <p className="text-xs text-muted-foreground">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground">Produits Populaires</h3>
                    <Button variant="link" className="text-primary text-sm p-0 h-auto">Voir tout</Button>
                  </div>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.sold} vendus</p>
                        </div>
                        <p className="font-semibold text-sm text-secondary">{product.revenue}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground">Activité Récente</h3>
                  </div>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
                        <div>
                          <p className="text-sm text-foreground">{activity.text}</p>
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
            <div className="flex items-center justify-center h-64 bg-card rounded-2xl shadow-card border border-border/50">
              <div className="text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-bold text-xl text-foreground">{navItems.find(n => n.id === activeTab)?.label}</h2>
                <p className="text-muted-foreground mt-2">Cette section sera bientôt disponible</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      <AddProductModal 
        isOpen={showAddProduct} 
        onClose={() => setShowAddProduct(false)}
        onProductAdded={() => {}}
        sellerId={sellerId || ""}
      />
    </div>
  );
};

export default SellerDashboard;
