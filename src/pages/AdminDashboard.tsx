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
  ShoppingBag,
  Store,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  CreditCard,
  Send,
  Eye,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import { Progress } from "@/components/ui/progress";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [progressValues, setProgressValues] = useState<number[]>([0, 0, 0, 0, 0]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
  }, []);

  // Animated progress bars
  useEffect(() => {
    const targetValues = [85, 72, 60, 45, 38];
    const timer = setTimeout(() => {
      setProgressValues(targetValues);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Animated counters
  const [animatedStats, setAnimatedStats] = useState({
    orders: 0,
    revenue: 0,
    customers: 0,
    sellers: 0,
  });

  useEffect(() => {
    const targets = { orders: 6370, revenue: 3100, customers: 32, sellers: 58 };
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
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const colors = useMemo(
    () => ({
      primary: "hsl(142 70% 45%)",
      secondary: "hsl(32 95% 55%)",
      accent: "hsl(45 100% 50%)",
      red: "hsl(0 84% 60%)",
      blue: "hsl(210 100% 50%)",
      purple: "hsl(270 70% 55%)",
      muted: "hsl(142 20% 45%)",
      border: "hsl(142 20% 88%)",
    }),
    [],
  );

  const overviewItems = useMemo(
    () => [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "projects", label: "Projets", icon: Package },
      { id: "analytics", label: "Statistiques", icon: BarChart3 },
      { id: "reports", label: "Rapports", icon: Eye },
    ],
    [],
  );

  const businessItems = useMemo(
    () => [
      { id: "store", label: "Boutique", icon: Store },
      { id: "outlet", label: "Points de vente", icon: ShoppingBag },
      { id: "products", label: "Produits", icon: Package },
    ],
    [],
  );

  const otherItems = useMemo(
    () => [
      { id: "chat", label: "Chat", icon: MessageSquare, badge: 3 },
    ],
    [],
  );

  // Orders data
  const orders = useMemo(
    () => [
      { id: "63270", name: "Sac à dos", status: "Livré", statusColor: "bg-primary text-white" },
      { id: "63055", name: "Canapé jaune", status: "En attente", statusColor: "bg-orange text-white" },
      { id: "15555", name: "Mobilier", status: "En attente", statusColor: "bg-orange text-white" },
    ],
    [],
  );

  // Last orders
  const lastOrders = useMemo(
    () => [
      { name: "Chaise Noire", store: "VitaJuice Zone", price: 89, color: "bg-foreground" },
      { name: "Canapé Rouge", store: "VitaJuice Zone", price: 100, color: "bg-secondary" },
      { name: "Lampe de table", store: "VitaJuice Zone", price: 130, color: "bg-primary" },
    ],
    [],
  );

  // Best products
  const bestProducts = useMemo(
    () => [
      { name: "Orange Mangue", store: "VitaJuice Zone", type: "Top", stars: 5 },
      { name: "Detox Vert", store: "VitaJuice Zone", type: "Best Selling", stars: 4 },
      { name: "Tropical Mix", store: "VitaJuice Zone", type: "Popular", stars: 4 },
    ],
    [],
  );

  // Revenue data with animated values
  const revenueData = useMemo(
    () => [
      { name: "Dim", thisWeek: 1100, lastWeek: 800 },
      { name: "Lun", thisWeek: 1600, lastWeek: 1200 },
      { name: "Mar", thisWeek: 1400, lastWeek: 1000 },
      { name: "Mer", thisWeek: 2000, lastWeek: 1500 },
      { name: "Jeu", thisWeek: 1800, lastWeek: 1400 },
      { name: "Ven", thisWeek: 3100, lastWeek: 2200 },
      { name: "Sam", thisWeek: 2800, lastWeek: 2000 },
    ],
    [],
  );

  // Customer distribution (donut chart)
  const customerData = useMemo(
    () => [
      { name: "Clients actuels", value: 68, color: colors.primary },
      { name: "Nouveaux clients", value: 32, color: colors.secondary },
    ],
    [colors],
  );

  // Earnings chart data
  const earningsData = useMemo(
    () => [
      { name: "Profit", value: 85, color: colors.primary },
      { name: "Croissance", value: 72, color: colors.secondary },
      { name: "Ventes", value: 60, color: colors.blue },
    ],
    [colors],
  );

  // Transactions
  const transactions = useMemo(
    () => [
      { name: "PayPal", date: "Avr 05, 2022 at 21:44", amount: "+$29.49", color: "bg-blue-500" },
      { name: "Payoneer", date: "Fév 14, 2022 at 03:56", amount: "+$175.63", color: "bg-orange" },
      { name: "MasterCard", date: "Jan 14, 2022 at 16:56", amount: "-$32.75", color: "bg-secondary" },
      { name: "Western Union", date: "Jan 14, 2022 at 16:56", amount: "-$200.63", color: "bg-accent" },
    ],
    [],
  );

  // Best products table
  const bestProductsTable = useMemo(
    () => [
      { name: "Marc John", team: "Equipe A", type: "Mode", deals: "120+", delivery: 15, pending: 5, progress: 85 },
      { name: "Alex John", team: "Equipe A", type: "Mobilier", deals: "200+", delivery: 100, pending: 100, progress: 72 },
      { name: "James William", team: "Equipe A", type: "Mode", deals: "500+", delivery: 200, pending: 101, progress: 60 },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[hsl(142_30%_96%)]">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-56 bg-[hsl(142_40%_97%)] transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 p-4" data-aos="fade-right">
            <Link to="/" className="flex items-center gap-2">
              <AnimatedLogo size="sm" />
              <span className="text-sm font-semibold text-primary">VitaDrinks</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4">
            {/* Overview Section */}
            <div className="mb-4">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Aperçu
              </p>
              {overviewItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  data-aos="fade-right"
                  data-aos-delay={index * 50}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                    activeSection === item.id
                      ? "bg-primary text-white shadow-md"
                      : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Business Section */}
            <div className="mb-4">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Business
              </p>
              {businessItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  data-aos="fade-right"
                  data-aos-delay={(index + 4) * 50}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                    activeSection === item.id
                      ? "bg-primary text-white shadow-md"
                      : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Other Items */}
            <div className="border-t border-border pt-4">
              {otherItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  data-aos="fade-right"
                  data-aos-delay={(index + 7) * 50}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                    activeSection === item.id
                      ? "bg-primary text-white shadow-md"
                      : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-3" data-aos="fade-up">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start gap-2 text-foreground/70 hover:text-primary hover:bg-primary/10">
                <LogOut className="h-4 w-4" />
                Déconnexion
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

      {/* Main Content */}
      <div className="lg:pl-56">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[hsl(142_30%_96%)]/80 backdrop-blur-xl">
          <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground" data-aos="fade-down">
                Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">Tous les détails sur vos ventes...</p>
            </div>

            {/* Search */}
            <div className="hidden lg:flex flex-1 max-w-md" data-aos="fade-down" data-aos-delay="100">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher personnes, documents, produits..."
                  className="h-9 rounded-full bg-card pl-9 border-border/50 text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2" data-aos="fade-down" data-aos-delay="200">
              <Button variant="ghost" size="icon" className="rounded-full relative h-9 w-9 bg-card">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Top Row - Orders, Last Orders, Best Products, Earnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Orders Card */}
            <div className="bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground text-sm">Commandes</h3>
                <span className="text-xs text-primary flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +0.51%
                </span>
              </div>
              <div className="space-y-2">
                {orders.map((order, i) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                    data-aos="fade-right"
                    data-aos-delay={i * 100}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Package className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{order.name}</p>
                        <p className="text-[10px] text-muted-foreground">ID: {order.id}</p>
                      </div>
                    </div>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", order.statusColor)}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Last Orders Card */}
            <div className="bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <h3 className="font-semibold text-foreground text-sm mb-3">Dernières Commandes</h3>
              <div className="space-y-2">
                {lastOrders.map((order, i) => (
                  <div
                    key={order.name}
                    className="flex items-center justify-between py-2"
                    data-aos="fade-right"
                    data-aos-delay={i * 100 + 100}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn("w-8 h-8 rounded-lg", order.color)} />
                      <div>
                        <p className="text-xs font-medium text-foreground">{order.name}</p>
                        <p className="text-[10px] text-muted-foreground">{order.store}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                      ${order.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Products Card */}
            <div className="bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <h3 className="font-semibold text-foreground text-sm mb-3">Meilleurs Produits</h3>
              <div className="space-y-2">
                {bestProducts.map((product, i) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between py-2"
                    data-aos="fade-right"
                    data-aos-delay={i * 100 + 200}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{product.name}</p>
                        <p className="text-[10px] text-muted-foreground">{product.store}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(product.stars)].map((_, idx) => (
                        <span key={idx} className="text-accent text-xs">★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Card */}
            <div className="bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground text-sm">Revenus</h3>
                <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground">
                  Voir Plus <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <select className="text-[10px] bg-muted rounded px-2 py-1 border-0">
                  <option>Mensuel</option>
                  <option>Hebdomadaire</option>
                </select>
                <div className="flex gap-1 ml-auto">
                  {earningsData.map((item, i) => (
                    <div
                      key={item.name}
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <BarChart3 className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {earningsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Middle Row - Revenue Chart, Customers Donut, Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Revenue Chart */}
            <div className="lg:col-span-5 bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground text-sm">Revenus</h3>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Cette semaine
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    Semaine dernière
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">
                ${animatedStats.revenue.toLocaleString()}
              </div>
              <div className="h-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.muted} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={colors.muted} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={10} stroke={colors.muted} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 100%)',
                        border: '1px solid hsl(142 20% 88%)',
                        borderRadius: '8px',
                        fontSize: '11px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="thisWeek"
                      stroke={colors.primary}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorThisWeek)"
                      animationDuration={2000}
                      animationEasing="ease-out"
                    />
                    <Area
                      type="monotone"
                      dataKey="lastWeek"
                      stroke={colors.muted}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#colorLastWeek)"
                      animationDuration={2000}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Customers Donut Chart */}
            <div className="lg:col-span-3 bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground text-sm">Clients</h3>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Actuels
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Nouveaux
                  </span>
                </div>
              </div>
              <div className="relative h-36 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerData}
                      innerRadius={45}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="transparent"
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">{animatedStats.customers}%</span>
                  <span className="text-[10px] text-muted-foreground">Total</span>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="text-center">
                  <p className="text-xs font-semibold text-primary">+18%</p>
                  <p className="text-[10px] text-muted-foreground">Journalier</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-secondary">+14%</p>
                  <p className="text-[10px] text-muted-foreground">Hebdo</p>
                </div>
              </div>
            </div>

            {/* Transactions + Quick Transfer */}
            <div className="lg:col-span-4 space-y-4">
              {/* Transactions */}
              <div className="bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">Transactions</h3>
                  <Button variant="ghost" size="sm" className="text-xs h-6 text-muted-foreground">
                    Voir tout
                  </Button>
                </div>
                <div className="space-y-2">
                  {transactions.map((tx, i) => (
                    <div
                      key={tx.name}
                      className="flex items-center justify-between py-1"
                      data-aos="fade-left"
                      data-aos-delay={i * 50}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", tx.color)}>
                          <CreditCard className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{tx.name}</p>
                          <p className="text-[9px] text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <span className={cn("text-xs font-bold", tx.amount.startsWith('+') ? 'text-primary' : 'text-secondary')}>
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Transfer */}
              <div className="bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up" data-aos-delay="300">
                <h3 className="font-semibold text-foreground text-sm mb-3">Transfert Rapide</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-muted-foreground">Numéro de carte</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        placeholder="4566 8526 95548"
                        className="h-8 text-xs rounded-lg"
                      />
                      <div className="flex gap-1">
                        <div className="w-6 h-4 bg-blue-600 rounded-sm" />
                        <div className="w-6 h-4 bg-secondary rounded-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] text-muted-foreground">Montant</label>
                      <Input
                        placeholder="$ 5,000.99"
                        className="h-8 text-xs rounded-lg mt-1"
                      />
                    </div>
                    <Button size="sm" className="h-8 w-8 rounded-lg mt-5 bg-primary hover:bg-primary/90">
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Best Products Table */}
          <div className="bg-card rounded-2xl p-4 shadow-sm" data-aos="fade-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground text-sm">Meilleurs Produits</h3>
              <select className="text-xs bg-muted rounded-lg px-3 py-1.5 border-0">
                <option>Mensuel</option>
                <option>Hebdomadaire</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    <th className="text-left pb-3 font-medium">Nom</th>
                    <th className="text-left pb-3 font-medium">Équipe</th>
                    <th className="text-left pb-3 font-medium">Type</th>
                    <th className="text-left pb-3 font-medium">Total Deals</th>
                    <th className="text-left pb-3 font-medium">Livraison</th>
                    <th className="text-left pb-3 font-medium">En attente</th>
                    <th className="text-left pb-3 font-medium">Progrès</th>
                  </tr>
                </thead>
                <tbody>
                  {bestProductsTable.map((row, i) => (
                    <tr
                      key={row.name}
                      className="border-t border-border/50"
                      data-aos="fade-up"
                      data-aos-delay={i * 100}
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold">
                            {row.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">{row.name}</p>
                            <p className="text-[10px] text-primary">Actif</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{row.team}</td>
                      <td className="py-3 text-xs text-muted-foreground">{row.type}</td>
                      <td className="py-3 text-xs font-medium text-foreground">{row.deals}</td>
                      <td className="py-3 text-xs text-muted-foreground">{row.delivery}</td>
                      <td className="py-3 text-xs text-muted-foreground">{row.pending}</td>
                      <td className="py-3 w-32">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={progressValues[i] || 0}
                            className="h-2 flex-1 transition-all duration-1000"
                          />
                          <span className="text-[10px] text-muted-foreground w-8">
                            {progressValues[i] || 0}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
