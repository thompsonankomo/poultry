import { useState, useMemo } from "react";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Skull,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Boxes,
  AlertTriangle,
  Activity,
  CheckCircle2,
  X,
  Save,
  BarChart3,
  Phone,
  Menu,
  Store,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useStore } from "../store";
import type { Product, Sale } from "../types";
import { CONTACTS } from "../types";
import { cn } from "../utils/cn";

// ================= Login =================
export function AdminLogin() {
  const { login, isAuthenticated } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(username, password)) {
      navigate("/admin");
    } else {
      setError("Invalid credentials. Try admin / bounty2026");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bounty-ink p-4 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-bounty-amber/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-bounty-emerald/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-bounty-amber to-bounty-forest shadow-[0_10px_40px_rgba(245,158,11,0.3)]">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-bounty-cream" fill="currentColor">
              <path d="M12 2c-1.5 0-2.5 1-2.5 2.5 0 .8.3 1.4.8 2C8 7 6 9.5 6 13c0 3.5 2.5 6 6 6s6-2.5 6-6c0-3.5-2-6-4.3-6.5.5-.6.8-1.2.8-2C14.5 3 13.5 2 12 2z" />
            </svg>
          </div>
          <h1 className="mt-6 font-serif text-4xl text-bounty-cream">Bounty Admin</h1>
          <p className="mt-2 text-sm text-bounty-cream/60">
            Inventory & operations dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
        >
          <div className="space-y-5">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-bounty-cream/60">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-bounty-cream placeholder:text-bounty-cream/30 focus:border-bounty-saffron focus:outline-none"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-bounty-cream/60">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••••"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-bounty-cream placeholder:text-bounty-cream/30 focus:border-bounty-saffron focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-bounty-amber py-3.5 font-semibold text-bounty-ink transition-all hover:bg-bounty-saffron active:scale-[0.98]"
            >
              Sign in to Dashboard
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-bounty-cream/50">
            <div className="font-semibold text-bounty-cream/70">Demo credentials</div>
            <div className="mt-1 font-mono">admin / bounty2026</div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-sm text-bounty-cream/60 hover:text-bounty-saffron"
          >
            <Store className="h-4 w-4" />
            Back to public site
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
}

// ================= Layout =================
export function AdminLayout() {
  const { isAuthenticated, logout } = useStore();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const navItems = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/admin/inventory", label: "Inventory", icon: Package },
    { to: "/admin/sales", label: "Sales", icon: ShoppingCart },
    { to: "/admin/mortality", label: "Mortality", icon: Skull },
    { to: "/admin/products", label: "Product Catalog", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-bounty-cream text-bounty-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-bounty-ink/5 glass">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 md:hidden"
              onClick={() => setMobileMenu((v) => !v)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <NavLink to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-bounty-amber to-bounty-forest">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-bounty-cream" fill="currentColor">
                  <path d="M12 2c-1.5 0-2.5 1-2.5 2.5 0 .8.3 1.4.8 2C8 7 6 9.5 6 13c0 3.5 2.5 6 6 6s6-2.5 6-6c0-3.5-2-6-4.3-6.5.5-.6.8-1.2.8-2C14.5 3 13.5 2 12 2z" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-lg leading-none">Bounty Admin</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-bounty-ink/50">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </div>
              </div>
            </NavLink>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <div className="hidden flex-col items-end text-right sm:flex">
              <div className="text-xs font-semibold">Nkomo Family Farm</div>
              <div className="text-[10px] text-bounty-ink/50">
                {CONTACTS[0].phone}
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
              className="ml-3 inline-flex items-center gap-2 rounded-full border border-bounty-ink/10 bg-white px-4 py-2 text-sm font-medium transition-all hover:border-bounty-ink/30"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar */}
        <aside
          className={cn(
            "w-56 shrink-0 transition-all",
            mobileMenu ? "block" : "hidden md:block"
          )}
        >
          <nav className="sticky top-20 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-bounty-ink text-bounty-cream shadow-lg"
                      : "text-bounty-ink/70 hover:bg-bounty-ink/5 hover:text-bounty-ink"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}

            <div className="mt-4 border-t border-bounty-ink/10 pt-4">
              <NavLink
                to="/"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-bounty-ink/70 transition-all hover:bg-bounty-ink/5"
              >
                <Store className="h-4 w-4" />
                View public site
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  navigate("/admin/login");
                }}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-bounty-ink/70 transition-all hover:bg-red-500/10 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="sales" element={<Sales />} />
            <Route path="mortality" element={<Mortality />} />
            <Route path="products" element={<ProductCatalog />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ================= Dashboard =================
function Dashboard() {
  const { stats, sales, mortality, products } = useStore();

  // Last 7 days sales chart
  const last7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      const dayEnd = dayStart + 86400000;
      const daySales = sales.filter((s) => {
        const t = new Date(s.date).getTime();
        return t >= dayStart && t < dayEnd;
      });
      days.push({
        date: d.toLocaleDateString("en-US", { weekday: "short" }),
        revenue: daySales.reduce((sum, s) => sum + s.total, 0),
        units: daySales.reduce((sum, s) => sum + s.quantity, 0),
      });
    }
    return days;
  }, [sales]);

  // Product breakdown
  const productBreakdown = products
    .filter((p) => p.active)
    .map((p) => ({
      name: p.name.split("—")[0].trim(),
      stock: p.stock,
      sold: p.sold,
    }));

  const recentSales = sales.slice(0, 5);
  const recentDeaths = mortality.slice(0, 5);

  const statCards = [
    {
      label: "Stock Value",
      value: `$${stats.totalStockValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      trend: "Current",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      label: "Units in Stock",
      value: stats.totalUnitsInStock.toLocaleString(),
      icon: Boxes,
      trend: `${stats.lowStockCount} low stock`,
      color: "from-bounty-amber to-bounty-gold",
    },
    {
      label: "Revenue Today",
      value: `$${stats.totalRevenueToday.toFixed(2)}`,
      icon: TrendingUp,
      trend: `${stats.totalSoldToday} units sold`,
      color: "from-blue-500 to-blue-700",
    },
    {
      label: "Revenue This Week",
      value: `$${stats.totalRevenueWeek.toFixed(2)}`,
      icon: BarChart3,
      trend: "7-day total",
      color: "from-purple-500 to-purple-700",
    },
    {
      label: "Deaths This Month",
      value: stats.totalDeathsThisMonth.toLocaleString(),
      icon: AlertTriangle,
      trend: "Requires review",
      color: "from-red-500 to-red-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl tracking-tight">Operations Dashboard</h1>
          <p className="mt-1 text-sm text-bounty-ink/60">
            Real-time view of your farm's inventory, sales, and health.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Live data
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-bounty-ink/5 bg-white p-5 transition-all hover:shadow-lg"
          >
            <div className={cn("absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-20 blur-2xl", s.color)} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", s.color)}>
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/50">
                {s.label}
              </div>
              <div className="mt-1 font-serif text-3xl tabular tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-bounty-ink/50">{s.trend}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-bounty-ink/5 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl">Revenue · Last 7 days</h3>
              <p className="text-xs text-bounty-ink/50">Daily revenue and units sold</p>
            </div>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0A0F0C10" />
                <XAxis dataKey="date" stroke="#0A0F0C60" style={{ fontSize: 12 }} />
                <YAxis stroke="#0A0F0C60" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "#0A0F0C",
                    border: "none",
                    borderRadius: 12,
                    color: "#FBF7EF",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#D97706"
                  strokeWidth={3}
                  dot={{ fill: "#D97706", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-bounty-ink/5 bg-white p-6">
          <h3 className="font-serif text-xl">Stock by Product</h3>
          <p className="text-xs text-bounty-ink/50">Current inventory breakdown</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productBreakdown}
                  dataKey="stock"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={2}
                >
                  {productBreakdown.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#D97706", "#F59E0B", "#065F46", "#0B3B2E", "#FACC15"][i % 5]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0A0F0C",
                    border: "none",
                    borderRadius: 12,
                    color: "#FBF7EF",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {productBreakdown.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: ["#D97706", "#F59E0B", "#065F46", "#0B3B2E", "#FACC15"][i % 5] }}
                  />
                  <span className="text-bounty-ink/80 truncate max-w-[140px]">{p.name}</span>
                </div>
                <span className="font-semibold tabular">{p.stock}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity logs */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-bounty-ink/5 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl">Recent Sales</h3>
            <NavLink to="/admin/sales" className="text-xs font-semibold text-bounty-amber hover:underline">
              View all →
            </NavLink>
          </div>
          <div className="mt-4 space-y-3">
            {recentSales.length === 0 && (
              <div className="py-10 text-center text-sm text-bounty-ink/50">
                <ShoppingCart className="mx-auto mb-2 h-8 w-8 text-bounty-ink/20" />
                No sales recorded yet. <br />
                Record your first sale to see it here.
              </div>
            )}
            {recentSales.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-bounty-ink/5 p-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{s.productName}</div>
                    <div className="text-xs text-bounty-ink/50">
                      {s.customerName} · {s.quantity} @ ${s.unitPrice}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold tabular">${s.total.toFixed(2)}</div>
                  <div className="text-[10px] text-bounty-ink/50">
                    {new Date(s.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-bounty-ink/5 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl">Recent Mortality</h3>
            <NavLink to="/admin/mortality" className="text-xs font-semibold text-bounty-amber hover:underline">
              View all →
            </NavLink>
          </div>
          <div className="mt-4 space-y-3">
            {recentDeaths.length === 0 && (
              <div className="py-10 text-center text-sm text-bounty-ink/50">
                No mortality events recorded.
              </div>
            )}
            {recentDeaths.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-xl border border-bounty-ink/5 p-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-700">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {m.count} {m.category} died
                    </div>
                    <div className="text-xs text-bounty-ink/50">{m.cause}</div>
                  </div>
                </div>
                <div className="text-xs text-bounty-ink/50">
                  {new Date(m.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= Inventory =================
function Inventory() {
  const { products, updateProduct, deleteProduct, adjustStock } = useStore();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [adjusting, setAdjusting] = useState<Product | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (p: Product) => {
    if (confirm(`Delete "${p.name}"? This cannot be undone.`)) {
      deleteProduct(p.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl tracking-tight">Inventory</h1>
          <p className="mt-1 text-sm text-bounty-ink/60">
            Track stock, edit quantities, and manage your product inventory in real time.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bounty-ink/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-bounty-ink/10 bg-white py-2.5 pl-9 pr-4 text-sm focus:border-bounty-amber focus:outline-none sm:w-64"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-bounty-ink/5 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bounty-ink/10 bg-bounty-ivory/50">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                  Sold
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                  Value
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const low = p.stock < 20;
                const out = p.stock === 0;
                return (
                  <tr
                    key={p.id}
                    className="border-b border-bounty-ink/5 transition-colors hover:bg-bounty-ivory/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-12 w-12 rounded-xl object-cover ring-1 ring-bounty-ink/10"
                        />
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-bounty-ink/50">
                            {p.category} · per {p.unit}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold tabular">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <span className="font-semibold tabular">{p.stock}</span>
                      <span className="text-bounty-ink/50"> {p.unit}</span>
                    </td>
                    <td className="px-4 py-4 font-semibold tabular text-emerald-700">
                      {p.sold}
                    </td>
                    <td className="px-4 py-4 font-semibold tabular">
                      ${(p.stock * p.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      {out ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-700">
                          Out of stock
                        </span>
                      ) : low ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          <AlertTriangle className="h-3 w-3" /> Low
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <Activity className="h-3 w-3" /> Healthy
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setAdjusting(p)}
                          className="rounded-lg p-2 text-bounty-ink/60 hover:bg-bounty-ink/5 hover:text-bounty-ink"
                          title="Adjust stock"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditing(p)}
                          className="rounded-lg p-2 text-bounty-ink/60 hover:bg-bounty-ink/5 hover:text-bounty-ink"
                          title="Edit product"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="rounded-lg p-2 text-bounty-ink/60 hover:bg-red-500/10 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      <AnimatePresence>
        {editing && (
          <ProductEditModal
            product={editing}
            onClose={() => setEditing(null)}
            onSave={(patch) => {
              updateProduct(editing.id, patch);
              setEditing(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Adjust stock modal */}
      <AnimatePresence>
        {adjusting && (
          <StockAdjustModal
            product={adjusting}
            onClose={() => setAdjusting(null)}
            onAdjust={(type, quantity, reason) => {
              adjustStock({
                productId: adjusting.id,
                productName: adjusting.name,
                type,
                quantity,
                reason,
              });
              setAdjusting(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= Modals =================
function ProductEditModal({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (patch: Partial<Product>) => void;
}) {
  const [form, setForm] = useState(product);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bounty-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-bounty-cream p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Edit Product</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-bounty-ink/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Product Name">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price ($)">
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                className="input"
              />
            </Field>
            <Field label="Stock">
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                className="input"
              />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input resize-none"
            />
          </Field>
          <Field label="Badge (optional)">
            <input
              type="text"
              value={form.badge || ""}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="e.g. Best Seller"
              className="input"
            />
          </Field>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="h-4 w-4"
            />
            Active (visible on landing page)
          </label>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-bounty-ink/10 py-3 text-sm font-semibold hover:bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-bounty-ink py-3 text-sm font-semibold text-bounty-cream hover:bg-bounty-forest"
          >
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StockAdjustModal({
  product,
  onClose,
  onAdjust,
}: {
  product: Product;
  onClose: () => void;
  onAdjust: (type: "in" | "out" | "adjust", quantity: number, reason: string) => void;
}) {
  const [type, setType] = useState<"in" | "out" | "adjust">("in");
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bounty-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-bounty-cream p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl">Adjust Stock</h2>
            <p className="text-sm text-bounty-ink/60">{product.name}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-bounty-ink/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 rounded-xl bg-bounty-ivory p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-bounty-ink/60">Current stock</span>
            <span className="font-semibold tabular">
              {product.stock} {product.unit}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-bounty-ink/60">
              Adjustment Type
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(["in", "out", "adjust"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={cn(
                    "rounded-xl border py-2.5 text-sm font-medium capitalize transition-all",
                    type === t
                      ? "border-bounty-ink bg-bounty-ink text-bounty-cream"
                      : "border-bounty-ink/10 bg-white hover:bg-bounty-ivory"
                  )}
                >
                  {t === "in" ? "Stock In" : t === "out" ? "Stock Out" : "Set To"}
                </button>
              ))}
            </div>
          </div>

          <Field label="Quantity">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
              className="input"
            />
          </Field>

          <Field label="Reason">
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. New batch from barn 2"
              className="input"
            />
          </Field>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-bounty-ink/10 py-3 text-sm font-semibold hover:bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onAdjust(type, quantity, reason)}
            disabled={quantity <= 0 && type !== "adjust"}
            className="flex-1 rounded-xl bg-bounty-amber py-3 text-sm font-semibold text-bounty-ink hover:bg-bounty-saffron disabled:opacity-50"
          >
            Apply Adjustment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ================= Sales =================
function Sales() {
  const { sales, deleteSale, products, recordSale } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = sales.filter(
    (s) =>
      s.productName.toLowerCase().includes(query.toLowerCase()) ||
      s.customerName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl tracking-tight">Sales</h1>
          <p className="mt-1 text-sm text-bounty-ink/60">
            Record and track every transaction. Stock updates automatically.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-bounty-ink px-4 py-2.5 text-sm font-semibold text-bounty-cream hover:bg-bounty-forest"
        >
          <Plus className="h-4 w-4" />
          Record Sale
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bounty-ink/40" />
        <input
          type="text"
          placeholder="Search sales..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-bounty-ink/10 bg-white py-2.5 pl-9 pr-4 text-sm focus:border-bounty-amber focus:outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-bounty-ink/5 bg-white">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingCart className="mx-auto mb-3 h-10 w-10 text-bounty-ink/20" />
            <div className="font-medium">No sales yet</div>
            <div className="mt-1 text-sm text-bounty-ink/50">
              Click "Record Sale" to log your first transaction.
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bounty-ink/10 bg-bounty-ivory/50">
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-bounty-ink/5 transition-colors hover:bg-bounty-ivory/30"
                  >
                    <td className="px-4 py-3 text-xs">
                      {new Date(s.date).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium">{s.productName}</td>
                    <td className="px-4 py-3">
                      <div>{s.customerName}</div>
                      <div className="text-xs text-bounty-ink/50 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {s.customerPhone}
                      </div>
                    </td>
                    <td className="px-4 py-3 tabular">{s.quantity}</td>
                    <td className="px-4 py-3 font-semibold tabular">
                      ${s.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-bounty-ink/5 px-2 py-0.5 text-xs capitalize">
                        {s.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm("Delete this sale? Stock will be restored.")) deleteSale(s.id);
                        }}
                        className="rounded-lg p-2 text-bounty-ink/60 hover:bg-red-500/10 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <SaleFormModal
            products={products}
            onClose={() => setShowForm(false)}
            onSave={(data) => {
              recordSale(data);
              setShowForm(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SaleFormModal({
  products,
  onClose,
  onSave,
}: {
  products: Product[];
  onClose: () => void;
  onSave: (data: Omit<Sale, "id" | "date" | "total">) => void;
}) {
  const activeProducts = products.filter((p) => p.active && p.stock > 0);
  const [productId, setProductId] = useState(activeProducts[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<Sale["paymentMethod"]>("cash");

  const product = products.find((p) => p.id === productId);
  const total = product ? product.price * quantity : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bounty-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-bounty-cream p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Record Sale</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-bounty-ink/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Product">
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="input"
            >
              {activeProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price.toFixed(2)} ({p.stock} in stock)
                </option>
              ))}
            </select>
          </Field>

          <Field label="Quantity">
            <input
              type="number"
              min={1}
              max={product?.stock || 999}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Customer Name">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                className="input"
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0771234567"
                className="input"
              />
            </Field>
          </div>

          <Field label="Payment Method">
            <div className="grid grid-cols-4 gap-2">
              {(["cash", "ecocash", "transfer", "card"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={cn(
                    "rounded-xl border py-2.5 text-xs font-medium capitalize transition-all",
                    paymentMethod === m
                      ? "border-bounty-ink bg-bounty-ink text-bounty-cream"
                      : "border-bounty-ink/10 bg-white hover:bg-bounty-ivory"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </Field>

          <div className="rounded-xl bg-bounty-ink p-4 text-bounty-cream">
            <div className="flex items-center justify-between text-sm">
              <span className="text-bounty-cream/70">Subtotal</span>
              <span className="tabular">${total.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
              <span className="font-semibold">Total</span>
              <span className="font-serif text-2xl tabular">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-bounty-ink/10 py-3 text-sm font-semibold hover:bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                productId,
                productName: product?.name || "",
                quantity,
                unitPrice: product?.price || 0,
                customerName,
                customerPhone,
                paymentMethod,
              })
            }
            disabled={!productId || quantity < 1}
            className="flex-1 rounded-xl bg-bounty-amber py-3 text-sm font-semibold text-bounty-ink hover:bg-bounty-saffron disabled:opacity-50"
          >
            Confirm Sale
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ================= Mortality =================
function Mortality() {
  const { mortality, recordMortality, deleteMortality } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    count: 1,
    category: "broiler" as "broiler" | "layer",
    cause: "",
    notes: "",
  });

  const total = mortality.reduce((sum, m) => sum + m.count, 0);
  const broilers = mortality.filter((m) => m.category === "broiler").reduce((s, m) => s + m.count, 0);
  const layers = mortality.filter((m) => m.category === "layer").reduce((s, m) => s + m.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl tracking-tight">Mortality Log</h1>
          <p className="mt-1 text-sm text-bounty-ink/60">
            Track bird losses to identify patterns and improve flock health.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
          Record Death
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Deaths" value={total} icon={Skull} color="bg-red-500" />
        <StatCard label="Broilers Lost" value={broilers} icon={TrendingDown} color="bg-amber-500" />
        <StatCard label="Layers Lost" value={layers} icon={TrendingDown} color="bg-emerald-500" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-bounty-ink/5 bg-white">
        {mortality.length === 0 ? (
          <div className="py-20 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-500" />
            <div className="font-medium">No mortality events</div>
            <div className="mt-1 text-sm text-bounty-ink/50">
              Your flock is healthy. Record an event if something changes.
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bounty-ink/10 bg-bounty-ivory/50">
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Count
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Cause
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Notes
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mortality.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-bounty-ink/5 transition-colors hover:bg-red-50/30"
                  >
                    <td className="px-4 py-3 text-xs">
                      {new Date(m.date).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 font-semibold text-red-700 tabular">
                        {m.count}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize">{m.category}</td>
                    <td className="px-4 py-3">{m.cause || "—"}</td>
                    <td className="px-4 py-3 text-xs text-bounty-ink/60">
                      {m.notes || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm("Delete this mortality record?")) deleteMortality(m.id);
                        }}
                        className="rounded-lg p-2 text-bounty-ink/60 hover:bg-red-500/10 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bounty-ink/50 p-4 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-bounty-cream p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl">Record Mortality</h2>
                <button onClick={() => setShowForm(false)} className="rounded-full p-2 hover:bg-bounty-ink/5">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <Field label="Number of Birds">
                  <input
                    type="number"
                    min={1}
                    value={form.count}
                    onChange={(e) => setForm({ ...form, count: parseInt(e.target.value) || 1 })}
                    className="input"
                  />
                </Field>
                <Field label="Category">
                  <div className="grid grid-cols-2 gap-2">
                    {(["broiler", "layer"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setForm({ ...form, category: c })}
                        className={cn(
                          "rounded-xl border py-2.5 text-sm font-medium capitalize transition-all",
                          form.category === c
                            ? "border-bounty-ink bg-bounty-ink text-bounty-cream"
                            : "border-bounty-ink/10 bg-white hover:bg-bounty-ivory"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Cause">
                  <input
                    type="text"
                    value={form.cause}
                    onChange={(e) => setForm({ ...form, cause: e.target.value })}
                    placeholder="e.g. Disease, heat stress, predator"
                    className="input"
                  />
                </Field>
                <Field label="Notes">
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Barn, time, observations..."
                    className="input resize-none"
                  />
                </Field>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-bounty-ink/10 py-3 text-sm font-semibold hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    recordMortality(form);
                    setShowForm(false);
                    setForm({ count: 1, category: "broiler", cause: "", notes: "" });
                  }}
                  className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Record
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= Product Catalog =================
function ProductCatalog() {
  const { products, addProduct, deleteProduct, updateProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [newProd, setNewProd] = useState({
    name: "",
    price: 0,
    unit: "each" as Product["unit"],
    category: "chicken" as Product["category"],
    description: "",
    image: "",
    stock: 0,
    active: true,
    badge: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl tracking-tight">Product Catalog</h1>
          <p className="mt-1 text-sm text-bounty-ink/60">
            Manage the products shown on your public website.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-bounty-ink px-4 py-2.5 text-sm font-semibold text-bounty-cream hover:bg-bounty-forest"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="group overflow-hidden rounded-2xl border border-bounty-ink/5 bg-white transition-all hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden bg-bounty-ivory">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              {!p.active && (
                <div className="absolute inset-0 flex items-center justify-center bg-bounty-ink/60 text-sm font-semibold text-bounty-cream">
                  Hidden from site
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg leading-tight">{p.name}</h3>
                  <div className="mt-1 text-xs text-bounty-ink/50">
                    {p.category} · per {p.unit}
                  </div>
                </div>
                <div className="font-serif text-2xl tabular">${p.price.toFixed(2)}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => updateProduct(p.id, { active: !p.active })}
                  className="flex-1 rounded-lg border border-bounty-ink/10 py-2 text-xs font-semibold hover:bg-bounty-ivory"
                >
                  {p.active ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                  }}
                  className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bounty-ink/50 p-4 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-bounty-cream p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl">Add Product</h2>
                <button onClick={() => setShowForm(false)} className="rounded-full p-2 hover:bg-bounty-ink/5">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <Field label="Name">
                  <input
                    type="text"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="input"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Price">
                    <input
                      type="number"
                      step="0.01"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: parseFloat(e.target.value) || 0 })}
                      className="input"
                    />
                  </Field>
                  <Field label="Stock">
                    <input
                      type="number"
                      value={newProd.stock}
                      onChange={(e) => setNewProd({ ...newProd, stock: parseInt(e.target.value) || 0 })}
                      className="input"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Unit">
                    <select
                      value={newProd.unit}
                      onChange={(e) => setNewProd({ ...newProd, unit: e.target.value as any })}
                      className="input"
                    >
                      <option value="each">Each</option>
                      <option value="kg">Kilogram</option>
                      <option value="pack">Pack</option>
                      <option value="tray">Tray</option>
                    </select>
                  </Field>
                  <Field label="Category">
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                      className="input"
                    >
                      <option value="chicken">Whole Chicken</option>
                      <option value="cuts">Chicken Cuts</option>
                      <option value="eggs">Eggs</option>
                    </select>
                  </Field>
                </div>
                <Field label="Description">
                  <textarea
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="input resize-none"
                  />
                </Field>
                <Field label="Image URL">
                  <input
                    type="text"
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                    placeholder="https://..."
                    className="input"
                  />
                </Field>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-bounty-ink/10 py-3 text-sm font-semibold hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    addProduct(newProd);
                    setShowForm(false);
                    setNewProd({
                      name: "",
                      price: 0,
                      unit: "each",
                      category: "chicken",
                      description: "",
                      image: "",
                      stock: 0,
                      active: true,
                      badge: "",
                    });
                  }}
                  disabled={!newProd.name}
                  className="flex-1 rounded-xl bg-bounty-amber py-3 text-sm font-semibold text-bounty-ink hover:bg-bounty-saffron disabled:opacity-50"
                >
                  Add Product
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= Shared UI =================
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-bounty-ink/60">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-bounty-ink/5 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-white", color)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/50">
            {label}
          </div>
          <div className="font-serif text-2xl tabular">{value}</div>
        </div>
      </div>
    </div>
  );
}
