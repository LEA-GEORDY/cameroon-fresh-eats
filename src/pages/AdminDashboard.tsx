import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Store,
  Users,
  DollarSign,
  TrendingUp,
  Percent,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AnimatedLogo from "@/components/AnimatedLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import noDataImg from "@/assets/empty-states/no-data.png";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
  }, []);

  // Animated counters
  const [animatedStats, setAnimatedStats] = useState({
    orders: 0,
    revenue: 0,
    customers: 0,
    sellers: 0,
    commission: 0,
    bottles: 0,
  });

  useEffect(() => {
    const targets = { orders: 1256, revenue: 2450000, customers: 3420, sellers: 58, commission: 24500, bottles: 8750 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        orders: Math.floor(targets.orders * easeOut),
        revenue: Math.floor(targets.revenue * easeOut),
        customers: Math.floor(targets.customers * easeOut),
        sellers: Math.floor(targets.sellers * easeOut),
        commission: Math.floor(targets.commission * easeOut),
        bottles: Math.floor(targets.bottles * easeOut),
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const colors = useMemo(
    () => ({
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
      orange: "hsl(var(--orange))",
      muted: "hsl(var(--muted-foreground))",
      border: "hsl(var(--border))",
    }),
    [],
  );

  const navItems = useMemo(
    () => [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "users", label: "Utilisateurs", icon: Users },
      { id: "products", label: "Produits", icon: Package },
      { id: "orders", label: "Commandes", icon: ShoppingBag },
      { id: "sellers", label: "Vendeurs", icon: Store },
      { id: "analytics", label: "Statistiques", icon: BarChart3 },
      { id: "security", label: "Securite", icon: Shield },
      { id: "settings", label: "Parametres", icon: Settings },
    ],
    [],
  );

  const recentOrders = useMemo(
    () => [
      { id: "CMD-1001", product: "Orange Mangue x5", status: "Livre", amount: "4,000 FCFA" },
      { id: "CMD-1002", product: "Detox Vert x3", status: "En cours", amount: "2,850 FCFA" },
      { id: "CMD-1003", product: "Tropical x2", status: "En attente", amount: "1,500 FCFA" },
    ],
    [],
  );

  const topSellers = useMemo(
    () => [
      { name: "Fruits du Soleil", sales: 420, revenue: "336,000 FCFA" },
      { name: "Bio Nature Plus", sales: 290, revenue: "275,500 FCFA" },
      { name: "Saveurs d'Afrique", sales: 180, revenue: "144,000 FCFA" },
    ],
    [],
  );

  const topProducts = useMemo(
    () => [
      { name: "Orange Mangue Passion", bottles: 1250, profit: "High" },
      { name: "Detox Vert Energie", bottles: 980, profit: "Medium" },
      { name: "Tropical Paradise", bottles: 750, profit: "High" },
    ],
    [],
  );

  const salesData = useMemo(
    () => [
      { name: "Lun", jus: 140, smoothies: 100, detox: 80 },
      { name: "Mar", jus: 100, smoothies: 120, detox: 60 },
      { name: "Mer", jus: 160, smoothies: 90, detox: 100 },
      { name: "Jeu", jus: 120, smoothies: 140, detox: 90 },
      { name: "Ven", jus: 200, smoothies: 100, detox: 140 },
      { name: "Sam", jus: 150, smoothies: 110, detox: 120 },
      { name: "Dim", jus: 180, smoothies: 130, detox: 150 },
    ],
    [],
  );

  const revenueData = useMemo(
    () => [
      { name: "Jan", current: 180000, previous: 100000 },
      { name: "Fev", current: 140000, previous: 120000 },
      { name: "Mar", current: 210000, previous: 160000 },
      { name: "Avr", current: 170000, previous: 140000 },
      { name: "Mai", current: 240000, previous: 180000 },
      { name: "Jui", current: 200000, previous: 160000 },
    ],
    [],
  );

  const categoryData = useMemo(
    () => [
      { name: "Jus de fruits", value: 45, color: colors.primary },
      { name: "Smoothies", value: 30, color: colors.secondary },
      { name: "Detox", value: 15, color: colors.orange },
      { name: "Energie", value: 10, color: colors.accent },
    ],
    [colors],
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livre": return "bg-primary/10 text-primary";
      case "En cours": return "bg-secondary/10 text-secondary";
      case "En attente": return "bg-orange/10 text-orange";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 p-6" data-aos="fade-right">
            <Link to="/" className="flex items-center gap-3">
              <AnimatedLogo size="sm" />
              <div className="leading-tight">
                <div className="text-sm font-semibold">VitaDrinks</div>
                <div className="text-xs text-muted-foreground">Admin Panel</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-4">
            <div className="px-3 pb-2 text-xs font-medium text-muted-foreground">Gestion</div>
            {navItems.slice(0, 4).map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                data-aos="fade-right"
                data-aos-delay={index * 50}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}

            <div className="px-3 pb-2 pt-4 text-xs font-medium text-muted-foreground">Business</div>
            {navItems.slice(4).map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                data-aos="fade-right"
                data-aos-delay={(index + 4) * 50}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4" data-aos="fade-up">
            <Link to="/">
              <Button variant="outline" className="w-full justify-start gap-2 rounded-xl">
                <LogOut className="h-4 w-4" />
                Deconnexion
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-muted lg:hidden"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <h1 className="font-display text-lg font-semibold text-foreground">
                {navItems.find(n => n.id === activeSection)?.label || "Dashboard"}
              </h1>
            </div>

            <div className="hidden flex-1 items-center justify-center lg:flex">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher vendeurs, produits, commandes..."
                  className="h-11 rounded-2xl bg-muted/50 pl-10"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-xl relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-xs rounded-full flex items-center justify-center">5</span>
              </Button>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {activeSection === "dashboard" && (
            <>
              {/* Top stats */}
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
                <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-5 text-white" data-aos="fade-up" data-aos-delay="0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Commandes totales</p>
                      <p className="text-3xl font-bold mt-1">{animatedStats.orders.toLocaleString()}</p>
                      <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +0.5% cette semaine
                      </p>
                    </div>
                    <ShoppingBag className="w-10 h-10 text-white/30" />
                  </div>
                </div>
                
                <div className="rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 p-5 text-white" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Revenus totaux</p>
                      <p className="text-2xl font-bold mt-1">{animatedStats.revenue.toLocaleString()} F</p>
                      <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +2.1% ce mois
                      </p>
                    </div>
                    <DollarSign className="w-10 h-10 text-white/30" />
                  </div>
                </div>
                
                <div className="rounded-2xl bg-gradient-to-br from-orange to-orange/80 p-5 text-white" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Commission (1%)</p>
                      <p className="text-2xl font-bold mt-1">{animatedStats.commission.toLocaleString()} F</p>
                      <p className="text-xs text-white/70 mt-1">{animatedStats.bottles.toLocaleString()} bouteilles vendues</p>
                    </div>
                    <Percent className="w-10 h-10 text-white/30" />
                  </div>
                </div>
                
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card" data-aos="fade-up" data-aos-delay="300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Vendeurs actifs</p>
                      <p className="text-3xl font-bold text-foreground mt-1">{animatedStats.sellers}</p>
                      <p className="text-xs text-primary mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +3 ce mois
                      </p>
                    </div>
                    <Store className="w-10 h-10 text-muted-foreground/30" />
                  </div>
                </div>
              </section>

              {/* Charts Row */}
              <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
                {/* Sales by Category */}
                <div className="xl:col-span-4 rounded-2xl border border-border bg-card p-5 shadow-card" data-aos="fade-up">
                  <h2 className="text-sm font-semibold text-foreground mb-4">Ventes par categorie</h2>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                        <CartesianGrid stroke={colors.border} strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke={colors.muted} />
                        <YAxis hide />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Bar dataKey="jus" fill={colors.primary} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="smoothies" fill={colors.secondary} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="detox" fill={colors.orange} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-3 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" />Jus</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary" />Smoothies</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange" />Detox</span>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div className="xl:col-span-5 rounded-2xl border border-border bg-card p-5 shadow-card" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-foreground">Evolution des revenus</h2>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-primary" />Ce mois
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-secondary" />Mois dernier
                      </span>
                    </div>
                  </div>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                        <CartesianGrid stroke={colors.border} strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke={colors.muted} />
                        <YAxis hide />
                        <Tooltip cursor={{ stroke: colors.border }} />
                        <Line type="monotone" dataKey="current" stroke={colors.primary} strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="previous" stroke={colors.secondary} strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category Distribution */}
                <div className="xl:col-span-3 rounded-2xl border border-border bg-card p-5 shadow-card" data-aos="fade-up" data-aos-delay="200">
                  <h2 className="text-sm font-semibold text-foreground mb-4">Repartition</h2>
                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="transparent"
                        >
                          {categoryData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                    {categoryData.map((cat, i) => (
                      <span key={i} className="flex items-center gap-1 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                        {cat.name} ({cat.value}%)
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Tables Row */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card" data-aos="fade-up">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-foreground">Commandes recentes</h2>
                    <Button variant="ghost" size="sm" className="text-primary text-xs">Voir tout</Button>
                  </div>
                  <div className="space-y-3">
                    {recentOrders.map((order, i) => (
                      <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30" data-aos="fade-left" data-aos-delay={i * 50}>
                        <div>
                          <p className="font-medium text-sm text-foreground">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.product}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <p className="text-xs text-foreground font-medium mt-1">{order.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Sellers */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-foreground">Meilleurs vendeurs</h2>
                    <Button variant="ghost" size="sm" className="text-primary text-xs">Voir tout</Button>
                  </div>
                  <div className="space-y-3">
                    {topSellers.map((seller, i) => (
                      <div key={seller.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/30" data-aos="fade-left" data-aos-delay={i * 50}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{seller.name}</p>
                            <p className="text-xs text-muted-foreground">{seller.sales} ventes</p>
                          </div>
                        </div>
                        <p className="text-xs text-primary font-medium">{seller.revenue}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-foreground">Produits populaires</h2>
                    <Button variant="ghost" size="sm" className="text-primary text-xs">Voir tout</Button>
                  </div>
                  <div className="space-y-3">
                    {topProducts.map((product, i) => (
                      <div key={product.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/30" data-aos="fade-left" data-aos-delay={i * 50}>
                        <div>
                          <p className="font-medium text-sm text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.bottles} bouteilles</p>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${product.profit === 'High' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                          {product.profit === 'High' ? 'Rentable' : 'Moyen'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Other sections - Empty States */}
          {activeSection !== "dashboard" && (
            <div className="flex items-center justify-center min-h-[60vh]" data-aos="zoom-in">
              <div className="text-center max-w-md">
                <img 
                  src={noDataImg} 
                  alt="Empty state" 
                  className="w-48 h-48 mx-auto mb-6 object-contain"
                />
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Section {navItems.find(n => n.id === activeSection)?.label}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Cette fonctionnalite sera bientot disponible. Restez connecte!
                </p>
                <Button onClick={() => setActiveSection("dashboard")} className="rounded-xl">
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

export default AdminDashboard;
