import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Users, Package, ShoppingBag, Settings, 
  Shield, TrendingUp, DollarSign, Store, AlertTriangle,
  Bell, Search, Menu, LogOut, BarChart3, CheckCircle2, XCircle, Eye,
  ArrowUpRight, ArrowDownRight, Calendar, Filter, Download, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedLogo from "@/components/AnimatedLogo";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const stats = [
    { label: "Revenus totaux", value: "2,450,000", suffix: "FCFA", icon: DollarSign, change: "+15%", positive: true, color: "from-primary to-lime" },
    { label: "Utilisateurs actifs", value: "1,234", icon: Users, change: "+23%", positive: true, color: "from-secondary to-orange" },
    { label: "Vendeurs verifies", value: "45", icon: Store, change: "+8%", positive: true, color: "from-purple-500 to-pink-500" },
    { label: "Commandes", value: "567", icon: ShoppingBag, change: "-2%", positive: false, color: "from-blue-500 to-cyan-500" },
  ];

  const pendingSellers = [
    { id: "S001", name: "Jus Naturels Douala", email: "jnd@email.com", date: "01/01/2026", status: "En attente", avatar: "JN" },
    { id: "S002", name: "Bio Fresh Yaounde", email: "bfy@email.com", date: "02/01/2026", status: "En attente", avatar: "BF" },
    { id: "S003", name: "Fruits Tropicaux", email: "ft@email.com", date: "03/01/2026", status: "En attente", avatar: "FT" },
  ];

  const recentOrders = [
    { id: "VD-789", customer: "Marie K.", amount: "15,000 FCFA", status: "Livre", date: "Il y a 2h" },
    { id: "VD-788", customer: "Jean P.", amount: "8,500 FCFA", status: "En cours", date: "Il y a 3h" },
    { id: "VD-787", customer: "Alice M.", amount: "22,000 FCFA", status: "En attente", date: "Il y a 5h" },
    { id: "VD-786", customer: "Paul D.", amount: "12,000 FCFA", status: "Livre", date: "Il y a 6h" },
  ];

  const recentActivities = [
    { type: "user", message: "Nouvel utilisateur inscrit: Marie K.", time: "Il y a 5 min" },
    { type: "order", message: "Nouvelle commande VD-789 de 15,000 FCFA", time: "Il y a 15 min" },
    { type: "seller", message: "Demande de vendeur: Bio Fresh Yaounde", time: "Il y a 1h" },
    { type: "alert", message: "Stock faible: Orange Mangue Passion", time: "Il y a 2h" },
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livre": return "bg-primary/10 text-primary";
      case "En cours": return "bg-secondary/10 text-secondary";
      case "En attente": return "bg-orange/10 text-orange";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-foreground via-foreground to-foreground/95 text-primary-foreground transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-2xl`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-primary-foreground/10">
            <Link to="/" className="flex items-center gap-3">
              <div className="brightness-0 invert">
                <AnimatedLogo size="md" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  ADMINISTRATION
                </span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-[1.02]"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:translate-x-1"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.id === "sellers" && (
                  <span className="ml-auto bg-orange text-white text-xs px-2 py-0.5 rounded-full">3</span>
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-primary-foreground/10">
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
          className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-6 h-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl hover:bg-muted lg:hidden transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground">
                  {navItems.find(n => n.id === activeTab)?.label || "Dashboard"}
                </h1>
                <p className="text-sm text-muted-foreground">Bienvenue, Administrateur</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-11 h-11 rounded-xl bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-muted">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-destructive to-orange text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  5
                </span>
              </Button>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3" data-aos="fade-down">
                <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                  <Calendar className="w-4 h-4" />
                  Aujourd'hui
                </Button>
                <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                  <Filter className="w-4 h-4" />
                  Filtrer
                </Button>
                <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                  <Download className="w-4 h-4" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                  <RefreshCw className="w-4 h-4" />
                  Actualiser
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className="relative bg-card rounded-2xl p-6 shadow-card overflow-hidden group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${stat.positive ? 'text-primary' : 'text-destructive'}`}>
                        {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    {stat.suffix && <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>}
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Pending Sellers */}
                <div className="lg:col-span-2 bg-card rounded-2xl shadow-card overflow-hidden" data-aos="fade-right">
                  <div className="p-6 border-b border-border flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">
                        Vendeurs en attente
                      </h2>
                      <p className="text-sm text-muted-foreground">Demandes de verification</p>
                    </div>
                    <span className="px-4 py-2 bg-gradient-to-r from-orange/10 to-secondary/10 text-orange text-sm font-semibold rounded-xl border border-orange/20">
                      {pendingSellers.length} en attente
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {pendingSellers.map((seller) => (
                      <div key={seller.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl hover:from-muted hover:to-muted/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
                            {seller.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{seller.name}</p>
                            <p className="text-sm text-muted-foreground">{seller.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-lg gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Approuver
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 rounded-lg gap-1">
                            <XCircle className="w-4 h-4" />
                            Refuser
                          </Button>
                          <Button size="sm" variant="ghost" className="rounded-lg">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-card rounded-2xl shadow-card overflow-hidden" data-aos="fade-left">
                  <div className="p-6 border-b border-border">
                    <h2 className="font-display text-xl font-bold text-foreground">
                      Activites recentes
                    </h2>
                    <p className="text-sm text-muted-foreground">Derniers evenements</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-xl transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          activity.type === "user" ? "bg-primary/10" :
                          activity.type === "order" ? "bg-secondary/10" :
                          activity.type === "seller" ? "bg-purple-500/10" :
                          "bg-destructive/10"
                        }`}>
                          {activity.type === "user" && <Users className="w-5 h-5 text-primary" />}
                          {activity.type === "order" && <ShoppingBag className="w-5 h-5 text-secondary" />}
                          {activity.type === "seller" && <Store className="w-5 h-5 text-purple-500" />}
                          {activity.type === "alert" && <AlertTriangle className="w-5 h-5 text-destructive" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground line-clamp-2">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-card rounded-2xl shadow-card overflow-hidden" data-aos="fade-up">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">
                      Commandes recentes
                    </h2>
                    <p className="text-sm text-muted-foreground">Dernieres transactions</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Voir tout
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Montant</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Statut</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Date</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 text-sm font-mono font-medium text-foreground">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{order.customer}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                          <td className="px-6 py-4 text-right">
                            <Button size="sm" variant="ghost" className="rounded-lg">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "overview" && (
            <div className="flex items-center justify-center h-96 bg-card rounded-2xl shadow-card" data-aos="zoom-in">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Section {navItems.find(n => n.id === activeTab)?.label}
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Cette section sera bientot disponible. Nous travaillons pour vous offrir la meilleure experience.
                </p>
                <Button className="mt-6 bg-gradient-to-r from-primary to-secondary text-white rounded-xl">
                  Recevoir une notification
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;