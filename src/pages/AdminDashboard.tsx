import { useMemo, useState } from "react";
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
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
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

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const colors = useMemo(
    () => ({
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
      muted: "hsl(var(--muted-foreground))",
      border: "hsl(var(--border))",
    }),
    [],
  );

  const navItems = useMemo(
    () => [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "users", label: "Users", icon: Users },
      { id: "products", label: "Products", icon: Package },
      { id: "orders", label: "Orders", icon: ShoppingBag },
      { id: "sellers", label: "Sellers", icon: Store },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "security", label: "Security", icon: Shield },
      { id: "settings", label: "Settings", icon: Settings },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { label: "Orders", value: "1,256", delta: "+0.5%" },
      { label: "Revenue", value: "2,450,000 FCFA", delta: "+2.1%" },
      { label: "Customers", value: "3,420", delta: "+1.4%" },
      { label: "Sellers", value: "58", delta: "+0.8%" },
    ],
    [],
  );

  const orders = useMemo(
    () => [
      { name: "Backpack", status: "Delivered" },
      { name: "Yellow Sofa", status: "Pending" },
      { name: "Furniture", status: "Processing" },
    ],
    [],
  );

  const lastOrders = useMemo(
    () => [
      { name: "Black Chair", price: "8,500 FCFA", badge: "New" },
      { name: "Red Sofa", price: "22,000 FCFA", badge: "Hot" },
      { name: "Table Lamp", price: "4,000 FCFA", badge: "New" },
    ],
    [],
  );

  const bestProducts = useMemo(
    () => [
      { name: "Backpack", hint: "High profit" },
      { name: "Lenovo", hint: "Best selling" },
      { name: "Man Dress", hint: "Popular" },
    ],
    [],
  );

  const earnings = useMemo(
    () => [
      { name: "Mon", a: 14, b: 10, c: 9 },
      { name: "Tue", a: 10, b: 12, c: 8 },
      { name: "Wed", a: 16, b: 9, c: 10 },
      { name: "Thu", a: 12, b: 14, c: 11 },
      { name: "Fri", a: 20, b: 10, c: 14 },
      { name: "Sat", a: 15, b: 11, c: 12 },
      { name: "Sun", a: 18, b: 13, c: 15 },
    ],
    [],
  );

  const revenue = useMemo(
    () => [
      { name: "Jan", thisWeek: 18, lastWeek: 10 },
      { name: "Feb", thisWeek: 14, lastWeek: 12 },
      { name: "Mar", thisWeek: 21, lastWeek: 16 },
      { name: "Apr", thisWeek: 17, lastWeek: 14 },
      { name: "May", thisWeek: 24, lastWeek: 18 },
      { name: "Jun", thisWeek: 20, lastWeek: 16 },
    ],
    [],
  );

  const customers = useMemo(
    () => [
      { name: "Current", value: 68 },
      { name: "New", value: 32 },
    ],
    [],
  );

  const transactions = useMemo(
    () => [
      { method: "PayPal", amount: "-29,000" },
      { method: "Payoneer", amount: "+158,000" },
      { method: "MasterCard", amount: "-83,000" },
      { method: "Western Union", amount: "+200,000" },
    ],
    [],
  );

  const bestProductsTable = useMemo(
    () => [
      { name: "Mark John", team: "Team A", type: "Fashion", deals: 420, delivery: 95, pending: 5 },
      { name: "Alex John", team: "Team A", type: "Furniture", deals: 290, delivery: 92, pending: 8 },
      { name: "James William", team: "Team B", type: "Grocery", deals: 500, delivery: 90, pending: 10 },
    ],
    [],
  );

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
          <div className="flex items-center gap-3 p-6">
            <Link to="/" className="flex items-center gap-3">
              <AnimatedLogo size="sm" />
              <div className="leading-tight">
                <div className="text-sm font-semibold">e-commerce</div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-4">
            <div className="px-3 pb-2 text-xs font-medium text-muted-foreground">Overview</div>
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.id}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}

            <div className="px-3 pb-2 pt-4 text-xs font-medium text-muted-foreground">Business</div>
            {navItems.slice(4).map((item) => (
              <button
                key={item.id}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4">
            <Link to="/">
              <Button variant="outline" className="w-full justify-start gap-2 rounded-xl">
                <LogOut className="h-4 w-4" />
                Log Out
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
              <h1 className="font-display text-lg font-semibold text-foreground">Dashboard</h1>
            </div>

            <div className="hidden flex-1 items-center justify-center lg:flex">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for people, documents, goods..."
                  className="h-11 rounded-2xl bg-muted/50 pl-10"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-10 w-10 rounded-xl bg-primary/10" />
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {/* Top stats */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <span className="text-xs font-medium text-primary">{s.delta}</span>
                </div>
                <p className="mt-2 text-xl font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </section>

          {/* Cards grid like the reference */}
          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* Orders */}
            <div className="xl:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">Orders</h2>
                  <span className="text-xs text-muted-foreground">+0.5%</span>
                </div>
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.name} className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10" />
                        <span className="text-sm text-foreground">{o.name}</span>
                      </div>
                      <span
                        className={cn(
                          "rounded-lg px-2 py-1 text-xs font-medium",
                          o.status === "Delivered" && "bg-primary/10 text-primary",
                          o.status === "Pending" && "bg-secondary/10 text-secondary",
                          o.status === "Processing" && "bg-accent/15 text-foreground",
                        )}
                      >
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Last Orders */}
            <div className="xl:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">Last Orders</h2>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
                <div className="space-y-3">
                  {lastOrders.map((o) => (
                    <div key={o.name} className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{o.name}</p>
                        <p className="text-xs text-muted-foreground">{o.price}</p>
                      </div>
                      <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{o.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Products */}
            <div className="xl:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">Best Products</h2>
                  <span className="text-xs text-muted-foreground">Week</span>
                </div>
                <div className="space-y-3">
                  {bestProducts.map((p) => (
                    <div key={p.name} className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-secondary/10" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.hint}</p>
                        </div>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="xl:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">Earnings</h2>
                  <span className="text-xs text-muted-foreground">Weekly</span>
                </div>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={earnings} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                      <CartesianGrid stroke={colors.border} strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke={colors.muted} />
                      <YAxis hide />
                      <Tooltip cursor={{ fill: "transparent" }} />
                      <Bar dataKey="a" fill={colors.primary} radius={[8, 8, 0, 0]} />
                      <Bar dataKey="b" fill={colors.secondary} radius={[8, 8, 0, 0]} />
                      <Bar dataKey="c" fill={colors.accent} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Revenue */}
            <div className="xl:col-span-7">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">Revenue</h2>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: colors.primary }} />
                      This week
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: colors.secondary }} />
                      Last week
                    </span>
                  </div>
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenue} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                      <CartesianGrid stroke={colors.border} strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke={colors.muted} />
                      <YAxis hide />
                      <Tooltip cursor={{ stroke: colors.border }} />
                      <Line type="monotone" dataKey="thisWeek" stroke={colors.primary} strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="lastWeek" stroke={colors.secondary} strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Customers */}
            <div className="xl:col-span-5">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">Customers</h2>
                  <span className="text-xs text-muted-foreground">This month</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={customers}
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="transparent"
                        >
                          <cell />
                          <cell />
                          {customers.map((_, i) => (
                            <cell
                              // @ts-expect-error recharts uses lowercase Cell in runtime; TS types vary by version
                              key={i}
                            />
                          ))}
                        </Pie>
                        {/* Recharts typing workaround below */}
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Recharts PieChart requires <Cell>. We'll render it separately to avoid TS issues across versions. */}
                  <div className="flex flex-col justify-center gap-3">
                    <div className="rounded-xl bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground">Current Customers</div>
                      <div className="mt-1 text-lg font-semibold text-foreground">68%</div>
                    </div>
                    <div className="rounded-xl bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground">New Customers</div>
                      <div className="mt-1 text-lg font-semibold text-foreground">32%</div>
                    </div>
                  </div>
                </div>

                {/* Render Pie with Cell in a hidden chart for consistent colors across versions */}
                <div className="sr-only" aria-hidden>
                  <ResponsiveContainer width={1} height={1}>
                    <PieChart>
                      <Pie data={customers} dataKey="value">
                        {/* @ts-expect-error recharts types */}
                        <Cell fill={colors.primary} />
                        {/* @ts-expect-error recharts types */}
                        <Cell fill={colors.secondary} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: colors.primary }} />
                    Current
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: colors.secondary }} />
                    New
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom table */}
          <section className="mt-6 rounded-2xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-sm font-semibold text-foreground">Best Products</h2>
              <Button variant="outline" size="sm" className="rounded-xl">
                Weekly
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Team</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Total Deals</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Delivery</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Pending</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {bestProductsTable.map((row) => (
                    <tr key={row.name} className="hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm text-foreground">{row.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.team}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.type}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{row.deals}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{row.delivery}%</td>
                      <td className="px-4 py-3 text-sm text-foreground">{row.pending}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-border p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Transaction</h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  {transactions.map((t) => (
                    <div key={t.method} className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
                      <span className="text-sm text-foreground">{t.method}</span>
                      <span className={cn("text-sm font-medium", t.amount.startsWith("+") ? "text-primary" : "text-destructive")}>
                        {t.amount} FCFA
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-muted/30 p-4">
                  <h4 className="text-sm font-semibold text-foreground">Quick Transfer</h4>
                  <div className="mt-3 space-y-3">
                    <Input className="h-11 rounded-xl bg-background" placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input className="h-11 rounded-xl bg-background" placeholder="Amount" />
                      <Input className="h-11 rounded-xl bg-background" placeholder="Currency" />
                    </div>
                    <Button className="w-full rounded-xl">Send</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
