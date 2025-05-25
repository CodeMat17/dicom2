"use client";

import { motion } from "framer-motion";
import { AlignRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoComponent from "./LogoComponent";
import ThemeToggle from "./theme/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Achievements", href: "/achievements" },
    { name: "Partnership", href: "/partnership" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Our Staff", href: "/our-staff" },
    { name: "Contact US", href: "/contact-us" },
  ];

  return (
    <nav className='shadow-lg sticky top-0 z-50 bg-[#213675]'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 py-2'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <LogoComponent />

          {/* Desktop Navigation */}
          <div className='hidden xl:flex items-center space-x-1'>
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <div key={i} className='relative'>
                  <Link
                    href={link.href}
                    className={`relative px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[#719BD7]"
                        : "text-white hover:text-[#719BD7]"
                    }`}>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId='activeIndicator'
                        className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#719BD7] rounded-full'
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className='flex items-center gap-2'>
            <ThemeToggle />
            <div className='xl:hidden'>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className='xl:hidden'>
                  <AlignRight className='h-7 w-7 text-3xl font-bold text-white' />
                </SheetTrigger>
                <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                  <div className='flex flex-col h-full pt-8'>
                    {navLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className={`block px-4 py-2 font-medium text-lg transition-colors duration-200 ${
                          pathname === link.href
                            ? "text-[#719BD7]"
                            : "hover:text-[#719BD7]"
                        }`}
                        onClick={() => setIsOpen(false)}>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
