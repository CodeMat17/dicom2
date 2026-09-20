"use client";

import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoComponent from "./LogoComponent";
import { ScrollProgress } from "./ui/motion-primitives";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Achievements", href: "/achievements" },
  { name: "Gallery", href: "/gallery" },
  { name: "Partnership", href: "/partnership" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Our Staff", href: "/our-staff" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // The bar starts transparent over the hero and condenses into glass
  // once the page moves — so the hero is never framed by a hard slab.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close the drawer on route change and on Escape.
  useEffect(() => setIsOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div
          className={cn(
            "transition-all duration-500 ease-out-quint",
            scrolled
              ? "glass border-b border-white/10 shadow-lift"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <div
            className={cn(
              "max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between transition-all duration-500 ease-out-quint",
              scrolled ? "h-16" : "h-20"
            )}
          >
            <LogoComponent />

            {/* Desktop nav — a single pill rail */}
            <nav className="hidden lg:flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isActive
                        ? "text-ink-900"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {/* The gold pill slides between items via layoutId */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gold shadow-gold"
                        transition={springSnappy}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/* Desktop CTA */}
              <Link
                href="/contact-us"
                className="group hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-azure/50 hover:bg-azure/15"
              >
                Contact
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Mobile trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-ink-900/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col border-l border-white/10 bg-ink-800 shadow-lift"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <Aurora />

              <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5">
                <span className="eyebrow text-white/40">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="relative flex flex-1 flex-col gap-1 px-4 py-6">
                {navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.05,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg transition-all duration-300",
                          isActive
                            ? "bg-gradient-to-r from-azure/20 to-transparent font-semibold text-white"
                            : "text-white/55 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-white/25">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {link.name}
                        </span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="mt-auto"
                >
                  <Link
                    href="/contact-us"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-4 font-semibold text-ink-900 shadow-gold transition-colors hover:bg-gold/90"
                  >
                    Get in touch
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Local bloom for the drawer background. */
function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-brand/40 blur-[90px]"
    />
  );
}
