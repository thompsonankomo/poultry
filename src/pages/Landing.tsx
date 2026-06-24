import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import {
  SocialProof,
  ShopProducts,
  Features,
  Products,
  Benefits,
  Testimonials,
  Pricing,
  Contact,
  FAQ,
  CTA,
  Footer,
} from "../components/sections";

export function Landing() {
  const location = useLocation();

  // Scroll to hash target on route change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen bg-bounty-cream text-bounty-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ShopProducts />
        <Features />
        <Products />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Contact />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
