import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Mail,
  MapPin,
  Phone,
  User,
  FileText,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "../store";
import { CONTACTS } from "../types";
import { waUrl, WhatsAppIcon } from "./ui";
import { cn } from "../utils/cn";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

export function QuoteModal({ open, onClose }: QuoteModalProps) {
  const { products } = useStore();
  const activeProducts = products.filter((p) => p.active);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    notes: "",
  });
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  type QuoteItem = {
    product: (typeof products)[number];
    quantity: number;
    subtotal: number;
  };

  const selectedItems: QuoteItem[] = useMemo(() => {
    const items: QuoteItem[] = [];
    for (const [id, qty] of Object.entries(quantities)) {
      if (qty <= 0) continue;
      const p = products.find((x) => x.id === id);
      if (p) {
        items.push({ product: p, quantity: qty, subtotal: p.price * qty });
      }
    }
    return items;
  }, [quantities, products]);

  const subtotal = selectedItems.reduce((sum, i) => sum + i.subtotal, 0);
  const totalUnits = selectedItems.reduce((sum, i) => sum + i.quantity, 0);

  // Delivery fee: Free within 40km of Bulawayo, otherwise custom
  const locationLower = form.location.toLowerCase();
  const isWithinBulawayo =
    locationLower.includes("bulawayo") ||
    locationLower.includes("40km") ||
    locationLower.length === 0;
  const deliveryStatus: "free" | "custom" | "unknown" = form.location
    ? isWithinBulawayo
      ? "free"
      : "custom"
    : "unknown";
  const deliveryFee = deliveryStatus === "free" ? 0 : 0;
  const total = subtotal + deliveryFee;

  const resetForm = () => {
    setForm({ name: "", phone: "", email: "", location: "", notes: "" });
    setQuantities({});
    setStep(1);
    setSubmitted(false);
  };

  const buildQuoteMessage = () => {
    const lines = [
      `📋 *NEW QUOTE REQUEST*`,
      ``,
      `*Customer:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : null,
      form.location ? `*Location:* ${form.location}` : null,
      ``,
      `*Items:*`,
      ...selectedItems.map(
        (i) =>
          `• ${i.quantity}x ${i.product.name} @ $${i.product.price.toFixed(
            2
          )} = $${i.subtotal.toFixed(2)}`
      ),
      ``,
      `*Subtotal:* $${subtotal.toFixed(2)}`,
      form.location
        ? deliveryStatus === "free"
          ? `*Delivery:* FREE (within 40km of Bulawayo)`
          : `*Delivery:* Custom quote required`
        : null,
      `*Total:* $${total.toFixed(2)}`,
      ``,
      form.notes ? `*Notes:* ${form.notes}` : null,
      ``,
      `— Sent via Bounty Chickens website`,
    ]
      .filter(Boolean)
      .join("\n");
    return lines;
  };

  const buildEmailBody = () => {
    const lines = [
      `Hello Bounty Chickens,`,
      ``,
      `I'd like to request a quote for the following:`,
      ``,
      ...selectedItems.map(
        (i) =>
          `- ${i.quantity}x ${i.product.name} ($${i.product.price.toFixed(
            2
          )} each) = $${i.subtotal.toFixed(2)}`
      ),
      ``,
      `Subtotal: $${subtotal.toFixed(2)}`,
      form.location
        ? deliveryStatus === "free"
          ? `Delivery: FREE (within 40km of Bulawayo)`
          : `Delivery: Custom quote required`
        : null,
      `Total: $${total.toFixed(2)}`,
      ``,
      `My details:`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      form.location ? `Location: ${form.location}` : null,
      form.notes ? `Notes: ${form.notes}` : null,
      ``,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join("\n");
    return lines;
  };

  const handleSubmitWhatsApp = () => {
    const message = buildQuoteMessage();
    const url = waUrl(CONTACTS[0].phone, message);
    window.open(url, "_blank");
    setSubmitted(true);
  };

  const handleSubmitEmail = () => {
    const subject = encodeURIComponent(
      `Quote Request from ${form.name} — ${totalUnits} items`
    );
    const body = encodeURIComponent(buildEmailBody());
    window.location.href = `mailto:orders@bountychickens.co.zw?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bounty-ink/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-bounty-cream shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-bounty-ink/10 bg-bounty-cream/95 px-6 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bounty-amber to-bounty-gold">
                  <FileText className="h-5 w-5 text-bounty-ink" />
                </div>
                <div>
                  <h2 className="font-serif text-xl tracking-tight">Get a Quote</h2>
                  <p className="text-xs text-bounty-ink/60">
                    Step {step} of 3 · Real-time pricing
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-bounty-ink/5"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-bounty-ink/5">
              <div
                className="h-full bg-gradient-to-r from-bounty-amber to-bounty-gold transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {!submitted ? (
              <div className="p-6">
                {/* Step 1: Customer info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl">Your details</h3>
                      <p className="mt-1 text-sm text-bounty-ink/60">
                        We'll use these to prepare your personalized quote.
                      </p>
                    </div>

                    <Field label="Full Name" icon={User}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Nkomo"
                        className="input"
                        autoFocus
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Phone" icon={Phone}>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="0771234567"
                          className="input"
                        />
                      </Field>
                      <Field label="Email (optional)" icon={Mail}>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className="input"
                        />
                      </Field>
                    </div>

                    <Field label="Delivery Location" icon={MapPin}>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g. Hillside, Bulawayo"
                        className="input"
                      />
                      <div className="mt-2 flex items-start gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-800">
                        <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span>
                          <strong>Free delivery</strong> on bulky purchases within 40km of Bulawayo.
                          Enter your location to confirm eligibility.
                        </span>
                      </div>
                    </Field>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-bounty-ink/10 py-3 text-sm font-semibold hover:bg-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        disabled={!form.name || !form.phone}
                        className="flex-1 rounded-xl bg-bounty-ink py-3 text-sm font-semibold text-bounty-cream hover:bg-bounty-forest disabled:opacity-40"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Products */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl">Select products</h3>
                      <p className="mt-1 text-sm text-bounty-ink/60">
                        Choose quantities. Price updates in real-time below.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {activeProducts.map((p) => {
                        const qty = quantities[p.id] || 0;
                        return (
                          <div
                            key={p.id}
                            className={cn(
                              "flex items-center gap-3 rounded-2xl border p-3 transition-all",
                              qty > 0
                                ? "border-bounty-amber bg-bounty-amber/5"
                                : "border-bounty-ink/10 bg-white"
                            )}
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-14 w-14 rounded-xl object-cover ring-1 ring-bounty-ink/10"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="truncate font-medium text-sm">{p.name}</div>
                              <div className="mt-0.5 flex items-baseline gap-2">
                                <span className="font-serif text-lg tabular">
                                  ${p.price.toFixed(2)}
                                </span>
                                <span className="text-xs text-bounty-ink/50">/ {p.unit}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  setQuantities((q) => ({
                                    ...q,
                                    [p.id]: Math.max(0, (q[p.id] || 0) - 1),
                                  }))
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-bounty-ink/10 bg-white transition-all hover:bg-bounty-ivory"
                                aria-label="Decrease"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-8 text-center font-semibold tabular">
                                {qty}
                              </span>
                              <button
                                onClick={() =>
                                  setQuantities((q) => ({
                                    ...q,
                                    [p.id]: (q[p.id] || 0) + 1,
                                  }))
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-bounty-ink text-bounty-cream transition-all hover:bg-bounty-forest"
                                aria-label="Increase"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Live total */}
                    <div className="rounded-2xl border border-bounty-ink/10 bg-bounty-ink p-4 text-bounty-cream">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-bounty-cream/70">Items</span>
                        <span className="tabular">{totalUnits}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-sm">
                        <span className="text-bounty-cream/70">Subtotal</span>
                        <span className="tabular">${subtotal.toFixed(2)}</span>
                      </div>
                      {form.location && (
                        <div className="mt-1 flex items-center justify-between text-sm">
                          <span className="text-bounty-cream/70">Delivery</span>
                          <span className="tabular">
                            {deliveryStatus === "free" ? (
                              <span className="text-emerald-400">FREE</span>
                            ) : deliveryStatus === "custom" ? (
                              <span className="text-bounty-saffron">Custom quote</span>
                            ) : (
                              <span className="text-bounty-cream/50">—</span>
                            )}
                          </span>
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-serif text-2xl tabular">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 rounded-xl border border-bounty-ink/10 py-3 text-sm font-semibold hover:bg-white"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        disabled={selectedItems.length === 0}
                        className="flex-1 rounded-xl bg-bounty-ink py-3 text-sm font-semibold text-bounty-cream hover:bg-bounty-forest disabled:opacity-40"
                      >
                        Review →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Submit */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl">Review your quote</h3>
                      <p className="mt-1 text-sm text-bounty-ink/60">
                        Everything look good? Submit via WhatsApp or email.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-bounty-ink/10 bg-white p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/50">
                        Customer
                      </div>
                      <div className="mt-1 font-medium">{form.name}</div>
                      <div className="text-sm text-bounty-ink/60">{form.phone}</div>
                      {form.email && (
                        <div className="text-sm text-bounty-ink/60">{form.email}</div>
                      )}
                      {form.location && (
                        <div className="mt-1 text-sm text-bounty-ink/60">📍 {form.location}</div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-bounty-ink/10 bg-white">
                      <div className="border-b border-bounty-ink/5 px-4 py-3">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-bounty-ink/50">
                          Items
                        </div>
                      </div>
                      <div className="divide-y divide-bounty-ink/5">
                        {selectedItems.map((i) => (
                          <div
                            key={i.product.id}
                            className="flex items-center justify-between px-4 py-3 text-sm"
                          >
                            <div>
                              <div className="font-medium">{i.product.name}</div>
                              <div className="text-xs text-bounty-ink/50">
                                {i.quantity} × ${i.product.price.toFixed(2)}
                              </div>
                            </div>
                            <div className="font-semibold tabular">
                              ${i.subtotal.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-bounty-ink/10 bg-bounty-ivory/50 px-4 py-3 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-bounty-ink/60">Subtotal</span>
                          <span className="tabular">${subtotal.toFixed(2)}</span>
                        </div>
                        {form.location && (
                          <div className="flex justify-between text-sm">
                            <span className="text-bounty-ink/60">Delivery</span>
                            <span className="tabular">
                              {deliveryStatus === "free" ? (
                                <span className="font-semibold text-emerald-700">FREE</span>
                              ) : deliveryStatus === "custom" ? (
                                <span className="text-bounty-amber">Custom quote</span>
                              ) : (
                                <span className="text-bounty-ink/40">—</span>
                              )}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-bounty-ink/10 pt-1">
                          <span className="font-semibold">Total</span>
                          <span className="font-serif text-xl tabular">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Field label="Additional Notes (optional)">
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Special requests, preferred delivery time, etc."
                        className="input resize-none"
                      />
                    </Field>

                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={handleSubmitWhatsApp}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white hover:bg-[#1ebe5b]"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Send via WhatsApp
                      </button>
                      <button
                        onClick={handleSubmitEmail}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-bounty-ink py-3 text-sm font-semibold text-bounty-cream hover:bg-bounty-forest"
                      >
                        <Mail className="h-4 w-4" />
                        Send via Email
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        className="text-xs font-semibold text-bounty-ink/60 hover:text-bounty-ink"
                      >
                        ← Edit order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="mt-6 font-serif text-2xl">Quote submitted!</h3>
                <p className="mt-2 text-sm text-bounty-ink/60">
                  We've received your request. Our team will get back to you shortly.
                </p>
                <div className="mt-6 rounded-xl bg-bounty-ivory p-4 text-left text-sm">
                  <div className="font-semibold">Need immediate help?</div>
                  <div className="mt-1 text-bounty-ink/70">
                    Call {CONTACTS[0].name}:{" "}
                    <a href={`tel:${CONTACTS[0].phone}`} className="font-semibold text-bounty-forest">
                      {CONTACTS[0].phone}
                    </a>
                  </div>
                  <div className="mt-1 text-bounty-ink/70">
                    Email:{" "}
                    <a
                      href="mailto:orders@bountychickens.co.zw"
                      className="font-semibold text-bounty-forest"
                    >
                      orders@bountychickens.co.zw
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="mt-6 rounded-xl bg-bounty-ink px-8 py-3 text-sm font-semibold text-bounty-cream hover:bg-bounty-forest"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: any;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-bounty-ink/60">
        {label}
      </label>
      <div className="relative mt-1.5">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bounty-ink/40" />
        )}
        <div className={cn(Icon && "[&>input]:pl-10 [&>textarea]:pl-10")}>{children}</div>
      </div>
    </div>
  );
}
