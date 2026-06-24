import { motion } from "framer-motion";
import {
  Check,
  Zap,
  Heart,
  Leaf,
  Award,
  Truck,
  Shield,
  ChevronDown,
  ArrowRight,
  Star,
  Activity,
  Egg,
  Drumstick,
  Clock,
  BadgeCheck,
  Sparkles,
  Phone,
  Beef,
  Mail,
  MapPin,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Reveal, Section, Eyebrow, Counter, WhatsAppIcon, waUrl } from "./ui";
import { useStore } from "../store";
import { CONTACTS } from "../types";
import { cn } from "../utils/cn";

/* ================= SOCIAL PROOF ================= */
export function SocialProof() {
  const stats = [
    { value: 50000, suffix: "+", label: "Farming partners" },
    { value: 12, suffix: "M", label: "Birds placed yearly" },
    { value: 98, suffix: "%", label: "Livability rate" },
    { value: 35, suffix: "d", label: "To market weight" },
  ];

  const brands = [
    "Harvest Co-op",
    "Greenfield Farms",
    "Sunrise Poultry",
    "Heritage Ranch",
    "Valley Growers",
    "Prairie Fields",
    "Oakwood Ag",
    "Blue Ridge",
  ];

  return (
    <Section className="border-y border-bounty-ink/5 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-bounty-ink/50">
            Trusted by the nation's leading poultry operations
          </p>
        </Reveal>

        {/* Marquee */}
        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bounty-cream to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bounty-cream to-transparent z-10" />
          <div className="marquee flex gap-16 whitespace-nowrap">
            {[...brands, ...brands].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 font-serif text-2xl italic text-bounty-ink/40 transition-colors hover:text-bounty-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bounty-amber" />
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="text-center">
                <div className="font-serif text-5xl tracking-tight sm:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-medium text-bounty-ink/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================= SHOP PRODUCTS (RETAIL) ================= */
export function ShopProducts() {
  const { products } = useStore();
  const [cart, setCart] = useState<Record<string, number>>({});
  const activeProducts = products.filter((p) => p.active);

  const addToCart = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id: string) =>
    setCart((c) => ({
      ...c,
      [id]: Math.max(0, (c[id] || 0) - 1),
    }));

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const categoryIcon = (cat: string) => {
    if (cat === "eggs") return Egg;
    if (cat === "cuts") return Beef;
    return Drumstick;
  };

  return (
    <Section id="shop" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bounty-cream via-bounty-ivory to-bounty-cream" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Shop Our Products</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Farm-fresh poultry, <span className="italic text-bounty-amber">delivered daily.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-bounty-ink/70">
              From our farm to your table. Every chicken is raised antibiotic-free, ethically handled, and sealed in Bounty-branded packaging for lasting freshness.
            </p>
          </Reveal>
        </div>

        {/* Product grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {activeProducts.map((p, i) => {
            const Icon = categoryIcon(p.category);
            const qty = cart[p.id] || 0;
            const lowStock = p.stock < 20;
            return (
              <Reveal key={p.id} delay={i * 80}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-bounty-ink/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-bounty-amber/30 hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-bounty-ivory">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Plastic wrap effect overlay for chicken cuts */}
                    {p.category === "cuts" && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 mix-blend-overlay pointer-events-none" />
                        <div className="absolute inset-0 pointer-events-none" style={{
                          backgroundImage: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.15) 45%, transparent 50%, transparent 65%, rgba(255,255,255,0.12) 70%, transparent 75%)",
                        }} />
                      </>
                    )}

                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-bounty-amber px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-bounty-ink shadow-md">
                        {p.badge}
                      </span>
                    )}
                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass">
                      <Icon className="h-4 w-4 text-bounty-forest" />
                    </div>

                    {/* Bounty Chickens branded sticker overlay for chicken cuts */}
                    {p.category === "cuts" && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-bounty-forest via-bounty-emerald to-bounty-moss p-3 shadow-xl ring-1 ring-white/20 backdrop-blur-sm" style={{
                          transform: "rotate(-2deg)",
                        }}>
                          {/* Decorative pattern */}
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: "radial-gradient(circle, #FBF7EF 1px, transparent 1px)",
                            backgroundSize: "10px 10px",
                          }} />

                          <div className="relative flex items-center gap-2">
                            {/* Logo circle */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-bounty-amber to-bounty-gold shadow-md">
                              <svg viewBox="0 0 24 24" className="h-5 w-5 text-bounty-forest" fill="currentColor">
                                <path d="M12 2c-1.5 0-2.5 1-2.5 2.5 0 .8.3 1.4.8 2C8 7 6 9.5 6 13c0 3.5 2.5 6 6 6s6-2.5 6-6c0-3.5-2-6-4.3-6.5.5-.6.8-1.2.8-2C14.5 3 13.5 2 12 2z" />
                              </svg>
                            </div>

                            {/* Brand text */}
                            <div className="flex-1 min-w-0">
                              <div className="font-serif text-sm leading-none text-bounty-cream tracking-tight">
                                Bounty
                              </div>
                              <div className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-bounty-saffron">
                                Chickens
                              </div>
                              <div className="mt-1 flex items-center gap-1">
                                <div className="h-px flex-1 bg-bounty-saffron/40" />
                                <span className="text-[8px] font-semibold uppercase tracking-wider text-bounty-cream/80">
                                  Farm Fresh
                                </span>
                                <div className="h-px flex-1 bg-bounty-saffron/40" />
                              </div>
                            </div>

                            {/* Pack size badge */}
                            {p.packSize && (
                              <div className="flex shrink-0 flex-col items-center rounded-lg bg-bounty-amber px-2 py-1 shadow-md">
                                <span className="font-serif text-base leading-none tabular text-bounty-forest">
                                  {p.packSize}
                                </span>
                                <span className="text-[7px] font-bold uppercase tracking-wider text-bounty-forest/70">
                                  net wt
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {lowStock && p.category !== "cuts" && (
                      <div className="absolute bottom-3 left-3 right-3 rounded-full bg-red-500/90 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                        Only {p.stock} left
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-bounty-forest/70">
                      {p.category === "chicken"
                        ? "Whole Chicken"
                        : p.category === "cuts"
                        ? "Chicken Cuts"
                        : "Farm Eggs"}
                    </div>
                    <h3 className="mt-1 font-serif text-lg leading-snug tracking-tight">
                      {p.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-bounty-ink/60">
                      {p.description}
                    </p>

                    <div className="mt-4 flex items-baseline justify-between border-t border-bounty-ink/5 pt-4">
                      <div>
                        <div className="font-serif text-3xl tabular text-bounty-ink">
                          ${p.price.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-bounty-ink/50">per {p.unit}</div>
                      </div>
                      <div className="text-right text-[11px] text-bounty-ink/50">
                        <div>{p.sold} sold</div>
                        <div className="text-bounty-forest">{p.stock} in stock</div>
                      </div>
                    </div>

                    {/* Add to cart */}
                    <div className="mt-4 space-y-2">
                      {qty === 0 ? (
                        <>
                          <button
                            onClick={() => addToCart(p.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-bounty-ink py-3 text-sm font-medium text-bounty-cream transition-all hover:bg-bounty-forest active:scale-[0.98]"
                          >
                            <Plus className="h-4 w-4" />
                            Add to cart
                          </button>
                          <a
                            href={waUrl(
                              CONTACTS[0].phone,
                              `Hello ${CONTACTS[0].name}, I'd like to order:\n\n• ${p.name} — $${p.price.toFixed(2)} per ${p.unit}\n\nPlease confirm availability and delivery. Thank you!`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1ebe5b] active:scale-[0.98]"
                          >
                            <WhatsAppIcon className="h-4 w-4" />
                            Order on WhatsApp
                          </a>
                        </>
                      ) : (
                        <div className="flex items-center justify-between rounded-full border border-bounty-amber bg-bounty-amber/10 p-1">
                          <button
                            onClick={() => removeFromCart(p.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-bounty-ink transition-all hover:bg-bounty-cream"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold tabular">{qty}</span>
                          <button
                            onClick={() => addToCart(p.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-bounty-ink text-bounty-cream transition-all hover:bg-bounty-forest"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Sticky cart summary */}
        {totalItems > 0 && (() => {
          const orderLines = Object.entries(cart)
            .filter(([, q]) => q > 0)
            .map(([id, q]) => {
              const p = products.find((x) => x.id === id);
              if (!p) return null;
              return `• ${q}x ${p.name} @ $${p.price.toFixed(2)} = $${(q * p.price).toFixed(2)}`;
            })
            .filter(Boolean)
            .join("\n");
          const message = `Hello ${CONTACTS[0].name}, I'd like to place an order:\n\n🛒 *Order Details:*\n${orderLines}\n\n💰 *Total: $${totalPrice.toFixed(2)}*\n\nPlease confirm availability and delivery. Thank you!`;
          return (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2"
            >
              <a
                href={waUrl(CONTACTS[0].phone, message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-2xl ring-2 ring-white/30 backdrop-blur transition-all hover:bg-[#1ebe5b] hover:scale-[1.02]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <WhatsAppIcon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div>
                    <span className="font-semibold tabular">{totalItems}</span>{" "}
                    <span className="text-white/80">items ·</span>{" "}
                    <span className="font-semibold tabular">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="hidden h-5 w-px bg-white/30 sm:block" />
                  <span className="hidden font-semibold sm:block">
                    Order on WhatsApp →
                  </span>
                </div>
              </a>
            </motion.div>
          );
        })()}

        <Reveal delay={300} className="mt-12 text-center">
          <p className="text-sm text-bounty-ink/60">
            Need bulk orders or custom cuts?{" "}
            <a href="#contact" className="font-semibold text-bounty-forest underline-offset-4 hover:underline">
              Contact our sales team →
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ================= CONTACT ================= */
export function Contact() {
  return (
    <Section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Get In Touch</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Talk to our <span className="italic text-bounty-amber">team.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-bounty-ink/70">
              Our family is here to help you place your order, plan your flock, or answer any question. Reach out any day, 7am to 7pm.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CONTACTS.map((c, i) => {
            const message = `Hello ${c.name}, I'm reaching out about Bounty Chickens. `;
            return (
              <Reveal key={c.phone} delay={i * 100}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-bounty-ink/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#25D366]/40 hover:shadow-2xl">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#25D366]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] shadow-lg">
                      <WhatsAppIcon className="h-7 w-7 text-white" />
                    </div>
                    <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-bounty-forest/70">
                      {c.role}
                    </div>
                    <h3 className="mt-1 flex items-center gap-2 font-serif text-2xl tracking-tight">
                      {c.name}
                      <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-lg font-medium text-bounty-ink">
                      <Phone className="h-4 w-4 text-bounty-ink/50" />
                      <a href={`tel:${c.phone}`} className="hover:text-bounty-amber">
                        {c.phone}
                      </a>
                    </div>
                    <p className="mt-4 text-sm text-bounty-ink/60">
                      Available 7am – 7pm, 7 days a week
                    </p>
                  </div>

                  <a
                    href={waUrl(c.phone, message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white transition-all hover:bg-[#1ebe5b] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Message on WhatsApp
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={400}>
          <div className="mt-12 rounded-3xl border border-bounty-ink/10 bg-bounty-ivory/60 p-8 sm:p-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <MapPin className="h-5 w-5 text-bounty-forest" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Farm Location
                  </div>
                  <div className="mt-1 font-medium">Bounty Farms</div>
                  <div className="text-sm text-bounty-ink/60">Harare, Zimbabwe</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Mail className="h-5 w-5 text-bounty-forest" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Email Us
                  </div>
                  <a href="mailto:orders@bountychickens.co.zw" className="mt-1 font-medium hover:text-bounty-amber">
                    orders@bountychickens.co.zw
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Clock className="h-5 w-5 text-bounty-forest" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-bounty-ink/60">
                    Business Hours
                  </div>
                  <div className="mt-1 font-medium">Mon – Sun</div>
                  <div className="text-sm text-bounty-ink/60">7:00am – 7:00pm</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ================= FEATURES ================= */
export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Precision-bred genetics",
      desc: "Decades of selective breeding, refined with genomic selection to deliver measurable gains in FCR, growth rate, and shell quality.",
    },
    {
      icon: Heart,
      title: "Raised for resilience",
      desc: "Every flock is vaccinated, monitored, and conditioned in climate-controlled barns before delivery. They arrive ready to thrive.",
    },
    {
      icon: Leaf,
      title: "Sustainable by design",
      desc: "Lower feed conversion, fewer inputs, less waste. Our birds turn grain into protein more efficiently than any breed in their class.",
    },
    {
      icon: Truck,
      title: "White-glove delivery",
      desc: "Climate-controlled transport with real-time telemetry. Your birds arrive stress-free, hydrated, and performing from hour one.",
    },
    {
      icon: Activity,
      title: "Live flock analytics",
      desc: "Our proprietary dashboard tracks mortality, weight curves, and lay rates daily—so you can intervene before small issues become costly.",
    },
    {
      icon: Shield,
      title: "Ironclad guarantees",
      desc: "98% livability commitment. If your flock doesn't meet spec in the first 14 days, we replace or refund. No paperwork, no drama.",
    },
  ];

  return (
    <Section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Why Bounty</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Six reasons farms <span className="italic text-bounty-amber">switch</span> and never look back.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-bounty-ink/70">
              We engineered Bounty to close the gap between what farmers are told is possible and what they actually see in the barn.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-bounty-ink/10 bg-white/60 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-bounty-amber/40 hover:shadow-2xl">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-bounty-amber/0 to-bounty-amber/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bounty-cream to-bounty-sand ring-1 ring-bounty-ink/5">
                    <f.icon className="h-5 w-5 text-bounty-forest" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl tracking-tight">{f.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-bounty-ink/70">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================= PRODUCTS ================= */
export function Products() {
  const products = [
    {
      id: "broilers",
      icon: Drumstick,
      tag: "Broilers",
      title: "Bounty Grower 35",
      subtitle: "Market weight in 35 days. Not 42.",
      desc: "Our flagship broiler line. Bred for feed efficiency, breast yield, and uniform growth curves. Ideal for integrated processors and direct-market operations.",
      image:
        "https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=1200",
      stats: [
        { label: "Market weight", value: "2.5 kg" },
        { label: "Days to harvest", value: "35 d" },
        { label: "Feed conversion", value: "1.48 FCR" },
        { label: "Breast yield", value: "24%" },
      ],
      color: "amber",
    },
    {
      id: "layers",
      icon: Egg,
      tag: "Layers",
      title: "Bounty Layer Gold",
      subtitle: "320+ eggs. Year after year.",
      desc: "A brown-egg layer built for commercial consistency. Strong shells, deep-orange yolks, and a peak production curve that holds 10% longer than industry averages.",
      image:
        "https://images.pexels.com/photos/9331860/pexels-photo-9331860.jpeg?auto=compress&cs=tinysrgb&w=1200",
      stats: [
        { label: "Annual production", value: "320+ eggs" },
        { label: "Peak lay", value: "96%" },
        { label: "Shell strength", value: "4.2 kgf" },
        { label: "Yolk color", value: "DSM 12" },
      ],
      color: "emerald",
    },
  ];

  return (
    <Section id="products" dark className="relative overflow-hidden py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-bounty-amber/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-bounty-emerald/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow dark>The Lineup</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Two breeds.{" "}
              <span className="italic text-bounty-saffron">One standard</span>—the highest.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-bounty-cream/70">
              Whether you're raising birds for meat or eggs, our genetics give you the edge that compounds over every cycle.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bounty-ink via-bounty-ink/40 to-transparent" />
                  <div className="absolute left-6 top-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-bounty-saffron/30 bg-bounty-saffron/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-bounty-saffron backdrop-blur">
                      <p.icon className="h-3.5 w-3.5" />
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-serif text-3xl tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-bounty-saffron">{p.subtitle}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-bounty-cream/70">
                    {p.desc}
                  </p>

                  {/* Stats grid */}
                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-[11px] font-medium uppercase tracking-wider text-bounty-cream/50">
                          {s.label}
                        </div>
                        <div className="mt-1 font-serif text-2xl tabular text-bounty-cream">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button className="group/btn inline-flex items-center gap-2 text-sm font-medium text-bounty-cream transition-colors hover:text-bounty-saffron">
                      Explore {p.tag.toLowerCase()}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================= BENEFITS ================= */
export function Benefits() {
  return (
    <Section id="benefits" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>The Bounty Difference</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Better birds, <br />
                <span className="italic text-bounty-amber">better margins.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-lg text-bounty-ink/70">
                The numbers farmers care about—feed cost per kilo, livability, eggs per hen housed—are the numbers we've spent 40 years optimizing.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {[
                { title: "Lower feed cost per kilo", metric: "−18%" },
                { title: "Higher livability", metric: "+6 pts" },
                { title: "Longer peak production", metric: "+4 weeks" },
                { title: "Reduced antibiotic use", metric: "−42%" },
              ].map((item, i) => (
                <Reveal key={item.title} delay={300 + i * 80}>
                  <div className="flex items-center justify-between rounded-2xl border border-bounty-ink/10 bg-white/60 p-5 backdrop-blur transition-all hover:border-bounty-amber/40 hover:bg-white">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-bounty-amber/15">
                        <Check className="h-4 w-4 text-bounty-forest" strokeWidth={2.5} />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span className="font-serif text-2xl tabular text-bounty-forest">
                      {item.metric}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <Reveal delay={200}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-bounty-ink/10 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/33678224/pexels-photo-33678224.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Modern poultry farm at golden hour"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bounty-ink/60 via-transparent to-transparent" />

                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-dark rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bounty-amber/20">
                        <Sparkles className="h-5 w-5 text-bounty-saffron" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-bounty-cream/60">
                          Partner farm ROI
                        </div>
                        <div className="font-serif text-2xl text-bounty-cream">
                          +$48K <span className="text-sm font-normal text-bounty-cream/70">/ cycle</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card top-right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -top-4 hidden rounded-2xl border border-bounty-ink/10 bg-white p-4 shadow-xl sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bounty-emerald/10">
                    <Award className="h-5 w-5 text-bounty-emerald" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-bounty-ink/60">
                      Best in class
                    </div>
                    <div className="font-serif text-lg">FCR 2025</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ================= TESTIMONIALS ================= */
export function Testimonials() {
  const quotes = [
    {
      quote:
        "We switched our entire 80,000-head operation to Bounty two years ago. FCR dropped, livability climbed, and our processor now pays us a premium for uniformity. It's the single best decision we've made.",
      name: "Margaret Holloway",
      role: "Owner, Holloway Poultry Co.",
      location: "Georgia, USA",
      rating: 5,
    },
    {
      quote:
        "The analytics dashboard alone is worth the price. We catch health issues days earlier than before, and our vet bills have dropped 40%. Bounty isn't just selling birds—they're selling outcomes.",
      name: "David Chen",
      role: "Operations Director",
      location: "North Carolina",
      rating: 5,
    },
    {
      quote:
        "320 eggs per hen, year after year, with shells that don't crack in the carton. Our grocery accounts stopped complaining and started asking for more volume. That tells you everything.",
      name: "Amara Okonkwo",
      role: "Layer Farm Manager",
      location: "Texas",
      rating: 5,
    },
  ];

  return (
    <Section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bounty-cream via-bounty-ivory to-bounty-cream" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Farmer Voices</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Real farms. <span className="italic text-bounty-amber">Real numbers.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 100}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-bounty-ink/10 bg-white/70 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-bounty-amber/30 hover:shadow-2xl">
                <div className="mb-5 flex gap-1">
                  {[...Array(q.rating)].map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-bounty-amber text-bounty-amber" />
                  ))}
                </div>
                <p className="font-serif text-xl leading-relaxed tracking-tight text-bounty-ink">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4 border-t border-bounty-ink/10 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-bounty-amber to-bounty-forest font-serif text-lg text-bounty-cream">
                    {q.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold">
                      {q.name}
                      <BadgeCheck className="h-4 w-4 text-bounty-forest" />
                    </div>
                    <div className="text-sm text-bounty-ink/60">
                      {q.role} · {q.location}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================= PRICING ================= */
export function Pricing() {
  const plans = [
    {
      name: "Starter",
      desc: "For small operations testing the waters.",
      price: "1.85",
      unit: "per bird",
      min: "Min. 500 birds",
      features: [
        "Bounty Grower 35 or Layer Gold",
        "Standard vaccination protocol",
        "Email support, 48h response",
        "Digital flock dashboard",
        "Regional delivery",
      ],
      cta: "Start small",
      featured: false,
    },
    {
      name: "Grower",
      desc: "Our most popular tier for serious farms.",
      price: "1.62",
      unit: "per bird",
      min: "Min. 5,000 birds",
      features: [
        "Everything in Starter",
        "Premium vaccination + probiotic",
        "Priority support, 12h response",
        "On-site vet consultation (2x/cycle)",
        "Performance guarantee",
        "Feed-optimization coaching",
      ],
      cta: "Scale with us",
      featured: true,
    },
    {
      name: "Enterprise",
      desc: "For integrated operations at scale.",
      price: "Custom",
      unit: "",
      min: "50,000+ birds",
      features: [
        "Everything in Grower",
        "Dedicated flock manager",
        "Genetic customization",
        "24/7 vet hotline",
        "Quarterly business review",
        "Co-branded marketing support",
      ],
      cta: "Talk to sales",
      featured: false,
    },
  ];

  return (
    <Section id="pricing" dark className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-bounty-amber/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-bounty-emerald/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow dark>Pricing</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Simple pricing <span className="italic text-bounty-saffron">for every scale.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-bounty-cream/70">
              Volume discounts unlock at scale. All tiers include our livability guarantee.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[2rem] p-8 transition-all duration-500",
                  plan.featured
                    ? "bg-gradient-to-br from-bounty-amber to-bounty-gold text-bounty-ink shadow-[0_30px_80px_-20px_rgba(245,158,11,0.4)]"
                    : "border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-bounty-saffron/30"
                )}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-bounty-ink px-4 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-bounty-saffron">
                      Most popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-2xl">{plan.name}</h3>
                  <p className={cn("mt-1 text-sm", plan.featured ? "text-bounty-ink/80" : "text-bounty-cream/60")}>
                    {plan.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-baseline gap-1">
                  {plan.price !== "Custom" && <span className="text-lg">$</span>}
                  <span className="font-serif text-6xl tracking-tight">{plan.price}</span>
                  {plan.unit && (
                    <span className={cn("text-sm", plan.featured ? "text-bounty-ink/70" : "text-bounty-cream/60")}>
                      {plan.unit}
                    </span>
                  )}
                </div>
                <div className={cn("mt-2 text-xs", plan.featured ? "text-bounty-ink/70" : "text-bounty-cream/50")}>
                  {plan.min}
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px]">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.featured ? "text-bounty-ink" : "text-bounty-saffron"
                        )}
                        strokeWidth={2.5}
                      />
                      <span className={plan.featured ? "text-bounty-ink/90" : "text-bounty-cream/80"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    variant={plan.featured ? "primary" : "dark"}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================= FAQ ================= */
export function FAQ() {
  const faqs = [
    {
      q: "How do you guarantee livability?",
      a: "Every flock ships with our 98% 14-day livability guarantee. If mortality exceeds 2% in the first two weeks—due to any cause other than owner negligence—we replace the birds at no cost or refund the difference. No forms, no delays.",
    },
    {
      q: "What's the minimum order size?",
      a: "500 birds for our Starter tier, 5,000 for Grower, and 50,000+ for Enterprise. We can sometimes accommodate smaller orders through our regional co-op partners—reach out and we'll connect you.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We deliver across the continental US, Canada, Mexico, and the EU. International orders include full documentation, health certifications, and customs clearance support. Lead time is typically 6–8 weeks.",
    },
    {
      q: "Can I visit your facilities?",
      a: "Absolutely. We host farm tours monthly at our Georgia and North Carolina operations. You'll see our hatchery, grow-out barns, and quality-control lab. Tours include lunch and a one-on-one with our head geneticist.",
    },
    {
      q: "What vaccinations are included?",
      a: "Standard protocol covers Marek's, Newcastle, IB, IBD, and coccidiosis. Grower and Enterprise tiers add a premium probiotic package. We can customize vaccination schedules based on your region's disease pressure.",
    },
    {
      q: "How long does delivery take?",
      a: "Domestic orders typically arrive within 10–14 days of confirmation. We ship day-old chicks in climate-controlled vehicles with real-time temperature and humidity tracking. You'll receive a live tracking link.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Questions, <span className="italic text-bounty-amber">answered.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-all duration-500",
                    isOpen
                      ? "border-bounty-amber/40 bg-white shadow-lg"
                      : "border-bounty-ink/10 bg-white/50 hover:border-bounty-ink/20"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-xl tracking-tight">{f.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bounty-ink/5"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[15px] leading-relaxed text-bounty-ink/70">
                      {f.a}
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ================= CTA ================= */
export function CTA() {
  return (
    <Section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-bounty-amber/20 via-bounty-saffron/10 to-bounty-emerald/10" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bounty-amber/30 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-bounty-ink/10 bg-gradient-to-br from-bounty-ink to-bounty-forest p-10 text-bounty-cream shadow-2xl sm:p-16"
        >
          {/* Decorative shapes */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-bounty-amber/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-bounty-emerald/30 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-bounty-saffron/30 bg-bounty-saffron/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-bounty-saffron">
                <Clock className="h-3.5 w-3.5" />
                Fresh stock available daily
              </span>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Ready to place your{" "}
                <span className="italic text-bounty-saffron">order?</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-bounty-cream/70">
                Message us on WhatsApp for the fastest service. Our team replies within minutes during business hours. No forms, no waiting—just great chicken.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="flex flex-col gap-3">
                <a
                  href={waUrl(CONTACTS[0].phone, `Hello ${CONTACTS[0].name}, I'd like to place an order with Bounty Chickens. Please share your current stock and delivery options. Thank you!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#1ebe5b] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Order on WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${CONTACTS[0].phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-base font-medium text-bounty-cream transition-all hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  Call {CONTACTS[0].phone}
                </a>
                <p className="mt-2 text-center text-xs text-bounty-cream/50">
                  Replies within minutes · 7am – 7pm daily
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ================= FOOTER ================= */
export function Footer() {
  const columns = [
    {
      title: "Shop",
      links: ["Full Chicken — Dressed", "Full Chicken — Live", "Chicken Cuts — 1kg", "Chicken Cuts — 2kg"],
    },
    {
      title: "For Farmers",
      links: ["Bounty Grower 35", "Bounty Layer Gold", "Hatching eggs", "Starter chicks", "Feed programs"],
    },
    {
      title: "Company",
      links: ["About us", "Our genetics", "Sustainability", "Careers", "Press"],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Admin Login", href: "#/admin", isLink: true },
        { label: "Shop Products", href: "#shop" },
        { label: "Contact Us", href: "#contact" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-bounty-ink/10 bg-bounty-ink text-bounty-cream">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-bounty-amber/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-bounty-amber to-bounty-forest">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-bounty-cream" fill="currentColor">
                  <path d="M12 2c-1.5 0-2.5 1-2.5 2.5 0 .8.3 1.4.8 2C8 7 6 9.5 6 13c0 3.5 2.5 6 6 6s6-2.5 6-6c0-3.5-2-6-4.3-6.5.5-.6.8-1.2.8-2C14.5 3 13.5 2 12 2z" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-serif text-xl">Bounty</div>
                <div className="-mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-bounty-cream/50">
                  Chickens · Nkomo Family Farm
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bounty-cream/60">
              A family-owned Zimbabwean farm raising premium poultry for households, retailers, and commercial farmers since 2012.
            </p>
            <div className="mt-6 space-y-2 border-l-2 border-[#25D366]/40 pl-4">
              {CONTACTS.map((c) => {
                const message = `Hello ${c.name}, I'm reaching out about Bounty Chickens. `;
                return (
                  <a
                    key={c.phone}
                    href={waUrl(c.phone, message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-lg px-1 py-1 text-sm transition-all hover:bg-white/5"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-medium text-bounty-cream">
                        {c.name}
                        <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-bounty-cream/50">
                        {c.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-[#25D366] tabular text-xs">{c.phone}</div>
                      <ArrowRight className="h-3 w-3 text-[#25D366]" />
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-4">
              {["X", "IG", "in", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-medium transition-all hover:border-bounty-saffron hover:text-bounty-saffron"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-bounty-cream/50">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link: any) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : link.href;
                  const isLink = typeof link !== "string" && link.isLink;
                  return (
                    <li key={label}>
                      {isLink ? (
                        <Link
                          to={href.replace("#", "/").replace("//", "/")}
                          className="text-sm text-bounty-cream/80 transition-colors hover:text-bounty-saffron"
                        >
                          {label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="text-sm text-bounty-cream/80 transition-colors hover:text-bounty-saffron"
                        >
                          {label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="font-serif text-2xl">The Flock Report</h3>
              <p className="mt-2 text-sm text-bounty-cream/60">
                Monthly insights on poultry genetics, nutrition, and farm economics. No spam, ever.
              </p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="farmer@example.com"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm placeholder:text-bounty-cream/40 focus:border-bounty-saffron focus:outline-none"
              />
              <Button variant="dark" size="md">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-bounty-cream/50">
            © 2026 Bounty Chickens, Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-bounty-cream/50">
            <a href="#" className="hover:text-bounty-cream">Privacy</a>
            <a href="#" className="hover:text-bounty-cream">Terms</a>
            <a href="#" className="hover:text-bounty-cream">Biosecurity</a>
            <a href="#" className="hover:text-bounty-cream">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
