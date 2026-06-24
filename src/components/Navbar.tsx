import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { QuoteModal } from "./QuoteModal";
import { cn } from "../utils/cn";

const links = [
  { href: "#shop", label: "Shop" },
  { href: "#products", label: "For Farmers" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
              scrolled
                ? "bg-[#0A1F44] shadow-[0_8px_30px_rgba(10,31,68,0.3)]"
                : "bg-[#0A1F44]/95 backdrop-blur-xl"
            )}
          >
            <a href="#" className="flex items-center gap-3" aria-label="Bounty Chickens home">
              <CartoonChickenLogo />
              <div className="leading-tight">
                <div className="font-serif text-2xl font-bold tracking-tight text-bounty-cream sm:text-3xl">
                  Bounty
                </div>
                <div className="-mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-bounty-saffron sm:text-[11px]">
                  Chickens
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-bounty-cream/85 transition-colors hover:bg-white/10 hover:text-bounty-cream"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={() => setQuoteOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-bounty-amber px-4 py-2 text-sm font-semibold text-bounty-ink transition-all hover:bg-bounty-saffron hover:scale-[1.02]"
              >
                <FileText className="h-4 w-4" />
                Get a Quote
              </button>
              <Link
                to="/admin"
                className="rounded-full px-3 py-2 text-sm font-medium text-bounty-cream/70 transition-colors hover:bg-white/10 hover:text-bounty-cream"
              >
                Admin
              </Link>
            </div>

            <button
              className="rounded-full p-2 text-bounty-cream md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mx-4 mt-2 rounded-3xl bg-[#0A1F44] p-6 text-bounty-cream shadow-2xl md:hidden"
            >
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base font-medium hover:bg-white/10"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setQuoteOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-bounty-amber px-4 py-3 text-base font-semibold text-bounty-ink"
                  >
                    <FileText className="h-5 w-5" />
                    Get a Quote
                  </button>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-white/15 px-4 py-3 text-center text-base font-medium"
                  >
                    Admin Login
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

function CartoonChickenLogo() {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A1F44] to-[#1e3a8a] ring-2 ring-bounty-saffron/60 shadow-[0_6px_20px_rgba(10,31,68,0.4)]">
      {/* Cartoon chicken SVG */}
      <svg viewBox="0 0 64 64" className="h-11 w-11">
        {/* Sun burst background */}
        <circle cx="32" cy="32" r="28" fill="#FBBF24" opacity="0.15" />

        {/* Body - plump white chicken */}
        <ellipse cx="32" cy="38" rx="16" ry="14" fill="#FBF7EF" />

        {/* Wing */}
        <path
          d="M 22 36 Q 18 42 22 48 Q 28 50 32 46 Q 30 40 28 36 Z"
          fill="#E8DCC4"
          stroke="#0A1F44"
          strokeWidth="0.8"
        />

        {/* Neck and head */}
        <ellipse cx="42" cy="26" rx="8" ry="9" fill="#FBF7EF" />

        {/* Comb (red) */}
        <path
          d="M 38 16 Q 40 12 42 16 Q 44 11 46 16 Q 48 12 48 18 Q 44 20 40 20 Q 38 18 38 16 Z"
          fill="#DC2626"
          stroke="#991B1B"
          strokeWidth="0.6"
        />

        {/* Eye */}
        <circle cx="44" cy="24" r="1.8" fill="#0A1F44" />
        <circle cx="44.5" cy="23.3" r="0.6" fill="white" />

        {/* Beak (orange) */}
        <path
          d="M 48 26 L 54 27 L 48 29 Z"
          fill="#F59E0B"
          stroke="#92400E"
          strokeWidth="0.5"
        />

        {/* Wattle (red) */}
        <path
          d="M 45 29 Q 46 33 44 33 Q 42 32 44 29 Z"
          fill="#DC2626"
        />

        {/* Tail feathers */}
        <path
          d="M 18 34 Q 10 28 12 22 Q 16 26 18 30 Z"
          fill="#E8DCC4"
          stroke="#0A1F44"
          strokeWidth="0.6"
        />
        <path
          d="M 18 36 Q 8 34 10 28 Q 14 30 18 34 Z"
          fill="#FBF7EF"
          stroke="#0A1F44"
          strokeWidth="0.6"
        />
        <path
          d="M 18 38 Q 10 40 12 46 Q 16 42 18 40 Z"
          fill="#E8DCC4"
          stroke="#0A1F44"
          strokeWidth="0.6"
        />

        {/* Legs (orange) */}
        <line x1="28" y1="50" x2="28" y2="56" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="36" y1="50" x2="36" y2="56" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="26" y1="56" x2="30" y2="56" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="34" y1="56" x2="38" y2="56" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {/* Subtle shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
    </div>
  );
}
