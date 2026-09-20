"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const drawerRef = useRef<HTMLDialogElement>(null);

  // The bar starts transparent over the hero and condenses into glass once
  // the page moves — so the hero is never framed by a hard slab. A passive
  // scroll listener that only ever flips one boolean keeps this off the
  // critical path during scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change.
  useEffect(() => setIsOpen(false), [pathname]);

  // The drawer is a native <dialog>: focus trapping, Escape, inerting the
  // page behind it and scroll locking all come from the platform.
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    if (isOpen && !el.open) el.showModal();
    if (!isOpen && el.open) el.close();
  }, [isOpen]);

  return (
    <>
      <ScrollProgress />

      <header className="fixed top-0 inset-x-0 z-50">
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
            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
            >
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
                        ? "bg-gold text-ink-900 shadow-gold"
                        : "text-white/75 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/* Desktop CTA */}
              <Link
                href="/contact-us"
                className="group hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-azure/50 hover:bg-azure/15"
              >
                Contact
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* Mobile trigger */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="lg:hidden rounded-xl border border-white/10 bg-white/5 p-2.5 text-white transition-colors hover:bg-white/10"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
              >
                <Menu aria-hidden className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <dialog
        ref={drawerRef}
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === drawerRef.current) drawerRef.current?.close();
        }}
        aria-label="Navigation menu"
        className="lg:hidden m-0 ml-auto h-full max-h-none w-[86%] max-w-sm bg-transparent p-0 text-white backdrop:bg-ink-900/80 backdrop:backdrop-blur-md"
      >
        <div className="relative flex h-full flex-col border-l border-white/10 bg-ink-800 shadow-lift">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-brand/40 blur-[90px]"
          />

          <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5">
            <span className="eyebrow text-white/70">Menu</span>
            <button
              type="button"
              onClick={() => drawerRef.current?.close()}
              className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="relative flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6"
          >
            {navLinks.map((link, i) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-azure/20 to-transparent font-semibold text-white"
                      : "text-white/75 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden className="font-mono text-[11px] text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.name}
                  </span>
                  {isActive && (
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}

            <div className="mt-auto pt-6">
              <Link
                href="/contact-us"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-4 font-semibold text-ink-900 shadow-gold transition-colors hover:bg-gold/90"
              >
                Get in touch
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      </dialog>
    </>
  );
}
