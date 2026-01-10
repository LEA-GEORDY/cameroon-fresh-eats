import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Package, ShoppingBag, MessageCircle, Settings, 
  Plus, Edit, Trash2, Eye, Users, ChevronRight, Bell, Search, Menu, 
  LogOut, HelpCircle, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo.png";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Animated counters
  const [animatedStats, setAnimatedStats] = useState({
    sales: 0,
    purchases: 0,
    orders: 0
  });

  useEffect(() => {
    const targets = { sales: 67343, purchases: 2343, orders: 35343 };
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
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const recentMembers = [
    { name: "Member Paulo", role: "User Member", amount: "+2343" },
    { name: "Member Paulo", role: "User Member", amount: "+2341" },
    { name: "Member Paulo", role: "User Member", amount: "+2341" },
    { name: "Member Paulo", role: "User Member", amount: "+2341" },
  ];

  const activities = [
    { text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.", color: "bg-primary" },
    { text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.", color: "bg-accent" },
    { text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.", color: "bg-secondary" },
  ];

  const navItems = [
    { id: "overview", label: "Home", icon: LayoutDashboard },
    { id: "user-control", label: "User Control", icon: Users, hasSubmenu: true },
    { id: "access-request", label: "Access Request", icon: ShoppingBag },
    { id: "admins", label: "Admins", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Sidebar - Green theme matching reference */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 rounded-r-[2rem]`}>
        <div className="flex flex-col h-full text-white">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">M</span>
              </div>
              <span className="font-display text-lg font-semibold">SoftTech</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.hasSubmenu && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </nav>

          {/* Illustration */}
          <div className="p-6">
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="w-20 h-20 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle className="w-10 h-10 text-white/80" />
              </div>
              <p className="text-xs text-white/70">24/7 Support</p>
            </div>
          </div>

          {/* Quit Button */}
          <div className="p-4">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10">
                <LogOut className="w-5 h-5" />
                Quit
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
              <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 w-40"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">Manu Arihim</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="font-semibold text-white text-sm">MA</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards - Matching reference design */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sales Card */}
                <div className="bg-primary rounded-3xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Sales</h3>
                  <p className="text-4xl font-bold mb-2">{animatedStats.sales.toLocaleString()}</p>
                  <p className="text-sm text-white/80">
                    <span className="text-green-300">+5.0%</span> Since Last Month
                  </p>
                </div>

                {/* Purchases Card */}
                <div className="bg-primary rounded-3xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Purchases</h3>
                  <p className="text-4xl font-bold mb-2">{animatedStats.purchases.toLocaleString()}</p>
                  <p className="text-sm text-white/80">
                    <span className="text-green-300">+3.0%</span> Since Last Month
                  </p>
                </div>

                {/* Orders Card */}
                <div className="bg-primary rounded-3xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Orders</h3>
                  <p className="text-4xl font-bold mb-2">{animatedStats.orders.toLocaleString()}</p>
                  <p className="text-sm text-white/80">
                    <span className="text-green-300">+8.0%</span> Since Last Month
                  </p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overview - Members List */}
                <div className="bg-card rounded-3xl p-6 shadow-card border border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Overview</h3>
                  <div className="space-y-4">
                    {recentMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <span className="text-primary font-semibold text-sm">{member.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Sale - Progress Circle */}
                <div className="bg-card rounded-3xl p-6 shadow-card border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Total Sale</h3>
                    <Button variant="link" className="text-primary text-sm p-0 h-auto">
                      View All
                    </Button>
                  </div>
                  <div className="flex items-center justify-center py-8">
                    <div className="relative w-40 h-40">
                      {/* Circular Progress */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-muted"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray={`${70 * 2.51} ${100 * 2.51}`}
                          strokeLinecap="round"
                          className="text-primary"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-foreground">70%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity */}
                <div className="bg-card rounded-3xl p-6 shadow-card border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Activity</h3>
                    <Button variant="link" className="text-primary text-sm p-0 h-auto">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {activity.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "overview" && (
            <div className="flex items-center justify-center h-64 bg-card rounded-3xl shadow-card border border-border/50">
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
