import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Package, ShoppingBag, MessageCircle, Settings, 
  Search, Menu, LogOut, TrendingUp, Users, Truck, Calendar,
  MoreHorizontal, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import logo from "@/assets/logo.png";
import noOrdersImg from "@/assets/empty-states/no-orders.png";
import noDataImg from "@/assets/empty-states/no-data.png";
import AOS from "aos";
import "aos/dist/aos.css";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [progressValues, setProgressValues] = useState({
    onDelivery: 0,
    shipped: 0,
    confirmed: 0,
    pending: 0,
  });

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
  }, []);

  // Animated progress bars
  useEffect(() => {
    const targets = { onDelivery: 65, shipped: 45, confirmed: 80, pending: 30 };
    const timer = setTimeout(() => {
      setProgressValues(targets);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Animated counters
  const [animatedStats, setAnimatedStats] = useState({
    network: 0,
    revenue: 0,
    customers: 0,
    delivery: 0,
  });

  useEffect(() => {
    const targets = { network: 742, revenue: 23.43, customers: 14030, delivery: 1162 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        network: Math.floor(targets.network * easeOut),
        revenue: parseFloat((targets.revenue * easeOut).toFixed(2)),
        customers: Math.floor(targets.customers * easeOut),
        delivery: Math.floor(targets.delivery * easeOut),
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Revenue chart data
  const revenueData = useMemo(() => [
    { name: "Dim", food: 25000, photography: 18000, room: 12000 },
    { name: "Lun", food: 32000, photography: 22000, room: 15000 },
    { name: "Mar", food: 28000, photography: 35000, room: 18000 },
    { name: "Mer", food: 45000, photography: 28000, room: 22000 },
    { name: "Jeu", food: 38000, photography: 42000, room: 28000 },
    { name: "Ven", food: 52000, photography: 35000, room: 32000 },
    { name: "Sam", food: 48000, photography: 38000, room: 25000 },
  ], []);

  // Order summary data
  const orderSummary = useMemo(() => [
    { label: "En livraison", value: "125K", progress: 65, color: "bg-secondary" },
    { label: "Expédiés", value: "52K", progress: 45, color: "bg-primary" },
    { label: "Confirmés", value: "420K", progress: 80, color: "bg-orange" },
    { label: "En attente", value: "24K", progress: 30, color: "bg-muted-foreground" },
  ], []);

  // Recent orders
  const recentOrders = useMemo(() => [
    { 
      id: "001",
      name: "Gâteau Choco Deluxe", 
      location: "DPD Messenger.co", 
      price: "$87.00", 
      qty: "2",
      status: "Processing",
      avatar: "bg-gradient-to-r from-amber-600 to-amber-800"
    },
    { 
      id: "002",
      name: "Burger Signature", 
      location: "CDF San Loem Store", 
      price: "$27.00", 
      qty: "1",
      status: "Approved",
      avatar: "bg-gradient-to-r from-orange-500 to-red-500"
    },
  ], []);

  // Trending menus
  const trendingMenus = useMemo(() => [
    { name: "Gâteau Choco Deluxe", orders: 120, trend: "+12%", avatar: "bg-gradient-to-r from-amber-600 to-amber-800" },
    { name: "Orange Mangue Fresh", orders: 98, trend: "+8%", avatar: "bg-gradient-to-r from-orange-400 to-yellow-400" },
    { name: "Detox Vert Energie", orders: 85, trend: "+15%", avatar: "bg-gradient-to-r from-green-500 to-emerald-400" },
  ], []);

  const navItems = useMemo(() => [
    { id: "overview", icon: LayoutDashboard },
    { id: "orders", icon: ShoppingBag },
    { id: "products", icon: Package },
    { id: "messages", icon: MessageCircle },
    { id: "settings", icon: Settings },
  ], []);

  const colors = useMemo(() => ({
    primary: "hsl(142 70% 45%)",
    secondary: "hsl(32 95% 55%)",
    orange: "hsl(25 100% 50%)",
  }), []);

  return (
    <div className="min-h-screen bg-[hsl(30_40%_96%)] flex">
      {/* Sidebar - Icon only */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-16 bg-card border-r border-border transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col items-center py-4`}>
        {/* Logo */}
        <div className="mb-8" data-aos="fade-down">
          <Link to="/">
            <img src={logo} alt="VitaDrinks" className="w-10 h-10 rounded-xl" />
          </Link>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              data-aos="fade-right"
              data-aos-delay={index * 50}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeTab === item.id
                  ? "bg-primary text-white shadow-lg"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div data-aos="fade-up">
          <Link to="/">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
              <LogOut className="w-5 h-5" />
            </button>
          </Link>
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
      <div className="flex-1 lg:pl-16">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[hsl(30_40%_96%)]/80 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-muted lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-card rounded-full shadow-sm border border-border/50 w-80">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher menus, commandes..." 
                  className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="font-semibold text-white text-sm">MB</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Title */}
              <div data-aos="fade-down">
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Network */}
                <div className="bg-card rounded-2xl p-5 shadow-sm" data-aos="fade-up">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Network</p>
                      <p className="text-3xl font-bold text-foreground">{animatedStats.network}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-card rounded-2xl p-5 shadow-sm" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                      <p className="text-3xl font-bold text-foreground">${animatedStats.revenue.toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Total Customers */}
                <div className="bg-card rounded-2xl p-5 shadow-sm" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Customers</p>
                      <p className="text-3xl font-bold text-foreground">{animatedStats.customers.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange" />
                    </div>
                  </div>
                </div>

                {/* Total Delivery */}
                <div className="bg-card rounded-2xl p-5 shadow-sm" data-aos="fade-up" data-aos-delay="300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Delivery</p>
                      <p className="text-3xl font-bold text-foreground">{animatedStats.delivery}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Truck className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Chart & Order Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-card rounded-2xl p-5 shadow-sm" data-aos="fade-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Revenue</h3>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        Food
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                        Photography
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange" />
                        Room
                      </span>
                      <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg">
                        Mensuel <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-foreground mb-4">
                    $45,600
                  </div>

                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorPhoto" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorRoom" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.orange} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={colors.orange} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(142 20% 88%)" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          tickLine={false} 
                          axisLine={false} 
                          fontSize={11} 
                          stroke="hsl(142 20% 45%)"
                        />
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
                          dataKey="food"
                          stroke={colors.primary}
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorFood)"
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                        <Area
                          type="monotone"
                          dataKey="photography"
                          stroke={colors.secondary}
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorPhoto)"
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                        <Area
                          type="monotone"
                          dataKey="room"
                          stroke={colors.orange}
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorRoom)"
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-card rounded-2xl p-5 shadow-sm" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Résumé commandes</h3>
                    <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg">
                      Mensuel <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {orderSummary.map((item, index) => (
                      <div key={item.label} data-aos="fade-left" data-aos-delay={index * 100}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-foreground">{item.label}</span>
                          <span className="text-sm font-semibold text-foreground">{item.value}</span>
                        </div>
                        <Progress 
                          value={progressValues[item.label === "En livraison" ? "onDelivery" : 
                                 item.label === "Expédiés" ? "shipped" :
                                 item.label === "Confirmés" ? "confirmed" : "pending"]} 
                          className="h-2 transition-all duration-1000"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders & Trending Menus */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Order Request */}
                <div className="bg-card rounded-2xl p-5 shadow-sm" data-aos="fade-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Commandes récentes</h3>
                    <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg">
                      Mensuel <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          <th className="text-left pb-3 font-medium">Item</th>
                          <th className="text-left pb-3 font-medium">Location</th>
                          <th className="text-left pb-3 font-medium">Prix</th>
                          <th className="text-left pb-3 font-medium">Qté</th>
                          <th className="text-left pb-3 font-medium">Statut</th>
                          <th className="text-left pb-3 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr 
                            key={order.id} 
                            className="border-t border-border/50"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                          >
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full ${order.avatar} flex items-center justify-center`}>
                                  <Package className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xs font-medium text-foreground">{order.name}</span>
                              </div>
                            </td>
                            <td className="py-3 text-xs text-muted-foreground">{order.location}</td>
                            <td className="py-3 text-xs font-medium text-foreground">{order.price}</td>
                            <td className="py-3 text-xs text-muted-foreground">{order.qty}</td>
                            <td className="py-3">
                              <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                                order.status === "Approved" 
                                  ? "bg-primary/10 text-primary" 
                                  : "bg-secondary/10 text-secondary"
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Daily Trending Menus */}
                <div className="bg-card rounded-2xl p-5 shadow-sm" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Menus tendance</h3>
                    <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg">
                      Mensuel <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {trendingMenus.map((menu, index) => (
                      <div 
                        key={menu.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        data-aos="fade-left"
                        data-aos-delay={index * 100}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${menu.avatar} flex items-center justify-center`}>
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{menu.name}</p>
                            <p className="text-[10px] text-muted-foreground">{menu.orders} commandes</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-primary">{menu.trend}</span>
                      </div>
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
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Section {navItems.find(n => n.id === activeTab)?.id || activeTab}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Cette fonctionnalité sera bientôt disponible. Restez connecté!
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
