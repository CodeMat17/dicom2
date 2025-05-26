"use client";

import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Stories", href: "/our-stories" },
    { name: "Partnership", href: "/partnership" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Our Staff", href: "/our-staff" },
    { name: "Contact", href: "/contact-us" },
  ];

  const contactInfo = [
    {
      icon: <MapPin className='h-5 w-5' />,
      text: "Thinkers Corner, Enugu",
      href: "https://maps.google.com/?q=Godfrey+Okoye+University+Enugu",
    },
    {
      icon: <Mail className='h-5 w-5' />,
      text: "dicom@gouni.edu.ng",
      href: "mailto:dicom@gouni.edu.ng",
    },
  ];

  return (
    <footer className='bg-gray-950 text-white border-t'>
      <div className='max-w-7xl mx-auto px-4 pt-2 pb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 '>
          {/* Logo  */}
          <div className=''>
            <Link href='/'>
              <div className='flex items-center gap-2'>
                <div className='border-4 border-[#179BD7] rounded-full'>
                  <Image
                    alt=''
                    priority
                    width={60}
                    height={60}
                    src='/logo.webp'
                  />
                </div>

                <div className=' leading-tight sm:leading-5 text-white'>
                  <p className='font-semibold text-lg'>
                    Directorate of Competitions
                  </p>
                  <p className='text-sm'>Godfrey Okoye University</p>
                </div>
              </div>
            </Link>
            {/* Description */}
            <p className='mt-2 text-gray-400 max-w-md'>
              Empowering Students Through Competition and Excellence at Godfrey
              Okoye University, Enugu.
            </p>
          </div>

          {/* Contact Information */}
          <div className='flex md:justify-center'>
            <div className=''>
              <h3 className='text-lg font-semibold sm:mt-2'>Contact Us</h3>
              <ul className='space-y-4 mt-1'>
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <Link
                      href={info.href}
                      className='flex items-center gap-2 text-sm hover:text-gray-500 transition-colors'>
                      {info.icon}
                      <span>{info.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className='flex lg:justify-center'>
            <div>
              <h3 className='text-lg font-semibold'>Quick Links</h3>
              <ul className='space-y-2'>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-sm hover:text-gray-500 transition-colors'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-gray-700 mt-12 pt-8'>
          <p className='text-sm text-center '>
            © {currentYear} Directorate of Competitions, Godfrey Okoye
            University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
