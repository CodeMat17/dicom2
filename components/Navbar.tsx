"use client";

import { AlignRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./theme/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import LogoComponent from "./LogoComponent";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "about-us" },
    { name: "Achievements", href: "/achievements" },
    { name: "Partnership", href: "/partnership" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Our Staff", href: "/our-staff" },
    { name: "Contact US", href: "/contact-us" },
  ];

 

  return (
    <nav className=' shadow-lg sticky top-0 z-50 bg-[#213675]'>
      <div className='max-w-7xl mx-auto px-4 lg:px-6 py-2'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <LogoComponent />

          {/* Desktop Navigation */}
          <div className='hidden xl:flex '>
            {navLinks &&
              navLinks.map((link, i) => (
                <div key={i}>
                  <Link
                    href={link.href}
                    className='text-white hover:text-[#719BD7] px-3 py-2 rounded-md font-medium'>
                    {link.name}
                  </Link>
                </div>
              ))}
          </div>

          {/* Mobile menu button */}
          <div className='flex items-center gap-2'>
            <ThemeToggle />
            <div className="xl:hidden">
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
                      className='block px-4 py-2 font-medium text-lg'
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
