// ================= Types =================
export interface Product {
  id: string;
  name: string;
  price: number;
  unit: "each" | "kg" | "tray" | "pack";
  category: "chicken" | "cuts" | "eggs";
  description: string;
  image: string;
  stock: number;
  sold: number;
  active: boolean;
  badge?: string;
  packSize?: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  customerName: string;
  customerPhone: string;
  paymentMethod: "cash" | "ecocash" | "transfer" | "card";
  date: string;
}

export interface MortalityEvent {
  id: string;
  count: number;
  category: "broiler" | "layer";
  cause: string;
  notes: string;
  date: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  type: "in" | "out" | "adjust";
  quantity: number;
  reason: string;
  date: string;
}

export interface DashboardStats {
  totalStockValue: number;
  totalUnitsInStock: number;
  totalSoldToday: number;
  totalRevenueToday: number;
  totalRevenueWeek: number;
  totalDeathsThisMonth: number;
  lowStockCount: number;
}

// ================= Contact Info =================
export const CONTACTS = [
  { name: "Thompson Nkomo", phone: "0771734760", role: "Sales & Orders" },
  { name: "Primrose Nkomo", phone: "0772390576", role: "Accounts & Billing" },
  { name: "Octavia Nkomo", phone: "0787863168", role: "Customer Care" },
];

// ================= Initial Product Catalog =================
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Full Chicken — Dressed",
    price: 8.0,
    unit: "each",
    category: "chicken",
    description:
      "Premium whole chicken, cleaned and dressed, ready to cook. Farm-fresh, antibiotic-free, and vacuum-sealed for freshness.",
    image:
      "https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 120,
    sold: 48,
    active: true,
    badge: "Best Seller",
  },
  {
    id: "prod-002",
    name: "Full Chicken — Live (Not Dressed)",
    price: 7.5,
    unit: "each",
    category: "chicken",
    description:
      "Healthy, farm-raised live broilers. Ideal for buyers who prefer to dress at home or for traditional preparation.",
    image:
      "https://images.pexels.com/photos/27083552/pexels-photo-27083552.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 240,
    sold: 92,
    active: true,
  },
  {
    id: "prod-003",
    name: "Chicken Cuts — 1kg Pack",
    price: 4.0,
    unit: "pack",
    category: "cuts",
    description:
      "Freshly butchered mixed chicken cuts (thighs, drumsticks, wings). Sealed in Bounty-branded packaging for lasting freshness.",
    image:
      "https://images.pexels.com/photos/13376576/pexels-photo-13376576.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 85,
    sold: 156,
    active: true,
    badge: "Value Pick",
    packSize: "1kg",
  },
  {
    id: "prod-004",
    name: "Chicken Cuts — 2kg Pack",
    price: 8.25,
    unit: "pack",
    category: "cuts",
    description:
      "Double-size pack of premium mixed cuts. Family-friendly portioning, sealed in Bounty-branded packaging and chilled daily.",
    image:
      "https://images.pexels.com/photos/13376576/pexels-photo-13376576.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 64,
    sold: 78,
    active: true,
    packSize: "2kg",
  },
  {
    id: "prod-005",
    name: "Farm Fresh Eggs — Tray of 30",
    price: 6.0,
    unit: "tray",
    category: "eggs",
    description:
      "Thirty farm-fresh eggs from free-range layers. Clean, uniform shells and rich yolks — perfect for households, bakeries, and retailers.",
    image:
      "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 48,
    sold: 112,
    active: true,
    badge: "Fresh Daily",
  },
];

// ================= Admin Credentials =================
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "bounty2026",
};

// ================= Storage Keys =================
export const STORAGE_KEYS = {
  products: "bounty_products_v1",
  sales: "bounty_sales_v1",
  mortality: "bounty_mortality_v1",
  adjustments: "bounty_adjustments_v1",
  auth: "bounty_auth_v1",
};
