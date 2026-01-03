import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Package, ShoppingBag, MessageCircle, Settings, 
  Plus, Edit, Trash2, Eye, TrendingUp, DollarSign, Users, Star,
  ChevronRight, Bell, Search, Menu, X, LogOut, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Ventes totales", value: "156,000 FCFA", icon: DollarSign, change: "+12%" },
    { label: "Commandes", value: "45", icon: ShoppingBag, change: "+8%" },
    { label: "Produits", value: "12", icon: Package, change: "0" },
    { label: "Avis", value: "4.8", icon: Star, change: "+0.2" },
  ];

  const recentOrders = [
    { id: "VD001", customer: "Marie K.", product: "Orange Mangue Passion", amount: 2500, status: "En cours" },
    { id: "VD002", customer: "Jean P.", product: "Detox Vert Energie", amount: 3000, status: "Livre" },
    { id: "VD003", customer: "Aminata D.", product: "Tropical Paradise", amount: 2800, status: "En attente" },
  ];

  const products = [
    { id: "1", name: "Orange Mangue Passion", price: 2500, stock: 50, sales: 124 },
    { id: "2", name: "Detox Vert Energie", price: 3000, stock: 35, sales: 89 },
    { id: "3", name: "Tropical Paradise", price: 2800, stock: 42, sales: 156 },
  ];

  const navItems = [
    { id: "overview", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "products", label: "Produits", icon: Package },
    { id: "orders", label: "Commandes", icon: ShoppingBag },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "analytics", label: "Statistiques", icon: BarChart3 },
    { id: "settings", label: "Parametres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <Link to="/">
              <img src={logo} alt="VitaDrinks" className="h-12" />
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
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
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
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-semibold text-primary">FS</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Tableau de bord
                </h1>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouveau produit
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card rounded-2xl p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-primary">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Commandes recentes
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Client</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Produit</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Montant</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Statut</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-t border-border">
                          <td className="p-4 font-mono text-sm">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4">{order.product}</td>
                          <td className="p-4 font-medium">{order.amount.toLocaleString()} FCFA</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "Livre" ? "bg-primary/10 text-primary" :
                              order.status === "En cours" ? "bg-secondary/10 text-secondary" :
                              "bg-muted text-muted-foreground"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">
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

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Mes Produits
                </h1>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Plus className="w-5 h-5 mr-2" />
                  Ajouter un produit
                </Button>
              </div>

              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Produit</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Prix</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stock</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ventes</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-t border-border">
                          <td className="p-4 font-medium">{product.name}</td>
                          <td className="p-4">{product.price.toLocaleString()} FCFA</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              product.stock > 30 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                            }`}>
                              {product.stock} unites
                            </span>
                          </td>
                          <td className="p-4">{product.sales}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "orders" || activeTab === "messages" || activeTab === "analytics" || activeTab === "settings") && (
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

export default SellerDashboard;
