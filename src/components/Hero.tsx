import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, TrendingUp } from "lucide-react";
import { Button, Reveal, fadeUp, staggerContainer, Parallax, WhatsAppIcon, waUrl } from "./ui";
import { CONTACTS } from "../types";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-bounty-amber/20 via-bounty-saffron/10 to-transparent blur-3xl mesh-blob" />
        <div className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-bounty-emerald/15 to-transparent blur-3xl mesh-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-bounty-gold/10 to-transparent blur-3xl mesh-blob" style={{ animationDelay: "-12s" }} />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dot-grid" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-bounty-ink/10 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-bounty-forest backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bounty-amber opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bounty-amber" />
                </span>
                Now accepting Spring 2026 orders
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Premium poultry,{" "}
              <span className="italic text-bounty-amber">engineered</span> for{" "}
              <span className="relative inline-block">
                <span className="shimmer-text">serious farmers.</span>
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 8 Q 50 2, 100 8 T 200 8"
                    stroke="#D97706"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-bounty-ink/70 sm:text-xl"
            >
              Bounty Chickens delivers genetics that perform. Broilers that hit market weight in 35 days. Layers that lay 320+ eggs per year. Backed by science, raised with care, guaranteed to outperform.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={waUrl(CONTACTS[0].phone, `Hello ${CONTACTS[0].name}, I'd like to place an order with Bounty Chickens. Please share your current stock and prices. Thank you!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-medium text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#1ebe5b] hover:scale-[1.02] active:scale-[0.98] btn-glow"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Order on WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#shop">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse products
                </Button>
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-bounty-cream bg-gradient-to-br from-bounty-amber to-bounty-forest"
                      style={{ filter: `hue-rotate(${i * 40}deg)` }}
                    />
                  ))}
                </div>
                <div className="text-bounty-ink/70">
                  <span className="font-semibold text-bounty-ink">50,000+</span> farmers trust us
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-bounty-amber text-bounty-amber" />
                ))}
                <span className="ml-1 font-semibold">4.9</span>
                <span className="text-bounty-ink/60">(2,847 reviews)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Hero visual */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <Parallax offset={40}>
              <div className="relative">
                {/* Main image card */}
                <div className="relative overflow-hidden rounded-3xl border border-bounty-ink/10 bg-white shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/27083552/pexels-photo-27083552.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Premium broiler chickens in modern facility"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bounty-ink/40 via-transparent to-transparent" />

                  {/* Floating badge top-left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="absolute left-6 top-6"
                  >
                    <div className="glass-dark rounded-2xl px-4 py-3 text-bounty-cream">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-bounty-saffron" />
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wider opacity-80">
                            Certified
                          </div>
                          <div className="text-sm font-semibold">USDA Organic</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating badge bottom-right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-6 right-6"
                  >
                    <div className="glass-dark rounded-2xl px-4 py-3 text-bounty-cream">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bounty-amber/20">
                          <TrendingUp className="h-5 w-5 text-bounty-saffron" />
                        </div>
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wider opacity-80">
                            Avg. yield
                          </div>
                          <div className="text-lg font-bold tabular">+23%</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating decorative card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: -3 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-8 -left-8 hidden sm:block"
                >
                  <div className="glass rotate-[-3deg] rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-bounty-amber to-bounty-gold">
                        <span className="text-2xl">🥚</span>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-bounty-ink/60">
                          Layer production
                        </div>
                        <div className="text-xl font-bold tabular">320+ eggs</div>
                        <div className="text-xs text-bounty-ink/60">per year, per hen</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Parallax>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Reveal delay={600} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-bounty-ink/40">
          <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-bounty-ink/40 to-transparent" />
        </div>
      </Reveal>
    </section>
  );
}
