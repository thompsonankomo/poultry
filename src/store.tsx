import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type Product,
  type Sale,
  type MortalityEvent,
  type StockAdjustment,
  type DashboardStats,
  INITIAL_PRODUCTS,
  STORAGE_KEYS,
  ADMIN_CREDENTIALS,
} from "./types";

// ================= Helpers =================
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Storage failed", e);
  }
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function startOfDay(d: Date = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function startOfWeek() {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay());
  return startOfDay(d);
}

function startOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
}

// ================= Context =================
interface StoreContextType {
  products: Product[];
  sales: Sale[];
  mortality: MortalityEvent[];
  adjustments: StockAdjustment[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addProduct: (p: Omit<Product, "id" | "sold">) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  recordSale: (sale: Omit<Sale, "id" | "date" | "total">) => Sale;
  deleteSale: (id: string) => void;
  recordMortality: (event: Omit<MortalityEvent, "id" | "date">) => void;
  deleteMortality: (id: string) => void;
  adjustStock: (adj: Omit<StockAdjustment, "id" | "date">) => void;
  stats: DashboardStats;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    load(STORAGE_KEYS.products, INITIAL_PRODUCTS)
  );
  const [sales, setSales] = useState<Sale[]>(() =>
    load(STORAGE_KEYS.sales, [])
  );
  const [mortality, setMortality] = useState<MortalityEvent[]>(() =>
    load(STORAGE_KEYS.mortality, [
      {
        id: "seed-1",
        count: 4,
        category: "broiler",
        cause: "Heat stress",
        notes: "Barn 3, afternoon spike",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: "seed-2",
        count: 2,
        category: "layer",
        cause: "Unknown",
        notes: "Found in morning check",
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
    ])
  );
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>(() =>
    load(STORAGE_KEYS.adjustments, [])
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    load(STORAGE_KEYS.auth, false)
  );

  useEffect(() => save(STORAGE_KEYS.products, products), [products]);
  useEffect(() => save(STORAGE_KEYS.sales, sales), [sales]);
  useEffect(() => save(STORAGE_KEYS.mortality, mortality), [mortality]);
  useEffect(() => save(STORAGE_KEYS.adjustments, adjustments), [adjustments]);
  useEffect(() => save(STORAGE_KEYS.auth, isAuthenticated), [isAuthenticated]);

  const login = (username: string, password: string) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAuthenticated(false);

  const addProduct = (p: Omit<Product, "id" | "sold">) => {
    setProducts((prev) => [...prev, { ...p, id: uid(), sold: 0 }]);
  };
  const updateProduct = (id: string, patch: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const recordSale = (sale: Omit<Sale, "id" | "date" | "total">): Sale => {
    const total = sale.quantity * sale.unitPrice;
    const newSale: Sale = {
      ...sale,
      id: uid(),
      date: new Date().toISOString(),
      total,
    };
    setSales((prev) => [newSale, ...prev]);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === sale.productId
          ? { ...p, stock: Math.max(0, p.stock - sale.quantity), sold: p.sold + sale.quantity }
          : p
      )
    );
    return newSale;
  };
  const deleteSale = (id: string) => {
    const sale = sales.find((s) => s.id === id);
    if (!sale) return;
    setSales((prev) => prev.filter((s) => s.id !== id));
    setProducts((prev) =>
      prev.map((p) =>
        p.id === sale.productId
          ? { ...p, stock: p.stock + sale.quantity, sold: Math.max(0, p.sold - sale.quantity) }
          : p
      )
    );
  };

  const recordMortality = (event: Omit<MortalityEvent, "id" | "date">) => {
    setMortality((prev) => [
      { ...event, id: uid(), date: new Date().toISOString() },
      ...prev,
    ]);
  };
  const deleteMortality = (id: string) => {
    setMortality((prev) => prev.filter((m) => m.id !== id));
  };

  const adjustStock = (adj: Omit<StockAdjustment, "id" | "date">) => {
    const newAdj: StockAdjustment = {
      ...adj,
      id: uid(),
      date: new Date().toISOString(),
    };
    setAdjustments((prev) => [newAdj, ...prev]);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== adj.productId) return p;
        let newStock = p.stock;
        if (adj.type === "in") newStock += adj.quantity;
        else if (adj.type === "out") newStock = Math.max(0, p.stock - adj.quantity);
        else newStock = Math.max(0, adj.quantity);
        return { ...p, stock: newStock };
      })
    );
  };

  const stats: DashboardStats = (() => {
    const today = startOfDay();
    const week = startOfWeek();
    const month = startOfMonth();
    const salesToday = sales.filter((s) => new Date(s.date).getTime() >= today);
    const salesWeek = sales.filter((s) => new Date(s.date).getTime() >= week);
    const deathsMonth = mortality.filter(
      (m) => new Date(m.date).getTime() >= month
    );
    return {
      totalStockValue: products.reduce((sum, p) => sum + p.stock * p.price, 0),
      totalUnitsInStock: products.reduce((sum, p) => sum + p.stock, 0),
      totalSoldToday: salesToday.reduce((sum, s) => sum + s.quantity, 0),
      totalRevenueToday: salesToday.reduce((sum, s) => sum + s.total, 0),
      totalRevenueWeek: salesWeek.reduce((sum, s) => sum + s.total, 0),
      totalDeathsThisMonth: deathsMonth.reduce((sum, m) => sum + m.count, 0),
      lowStockCount: products.filter((p) => p.active && p.stock < 20).length,
    };
  })();

  return (
    <StoreContext.Provider
      value={{
        products,
        sales,
        mortality,
        adjustments,
        isAuthenticated,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        recordSale,
        deleteSale,
        recordMortality,
        deleteMortality,
        adjustStock,
        stats,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
