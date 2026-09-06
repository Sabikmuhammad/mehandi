"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const navBackground = isScrolled 
    ? "bg-secondary/95 backdrop-blur-md shadow-sm text-primary" 
    : isHome 
      ? "bg-transparent text-white" 
      : "bg-transparent text-primary";

  const logoColor = isScrolled || !isHome ? "text-primary" : "text-white";
  const menuIconColor = isScrolled || !isHome ? "text-primary" : "text-white";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBackground}`}
      >
        <div className="container-custom h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start z-50">
            <span className={`font-serif text-xl md:text-2xl font-medium leading-tight tracking-wide ${logoColor}`}>
              RAIHANA
            </span>
            <span className={`text-[0.6rem] md:text-xs tracking-[0.2em] uppercase ${logoColor} opacity-80`}>
              Mehendi Artistry
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm uppercase tracking-widest hover:text-highlight transition-colors ${
                  pathname === link.href ? "text-highlight" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="px-6 py-2 border border-current rounded hover:bg-highlight hover:text-white hover:border-highlight transition-colors text-sm uppercase tracking-widest"
            >
              Book Your Date
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className={`w-6 h-6 ${menuIconColor}`} />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-secondary flex flex-col pt-24 px-6 pb-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-serif text-primary"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                className="mt-8"
              >
                <Link
                  href="/book"
                  className="inline-block px-8 py-3 bg-primary text-secondary rounded uppercase tracking-widest text-sm"
                >
                  Book Your Date
                </Link>
              </motion.div>
            </nav>
            
            <div className="mt-auto pt-8 border-t border-primary/20">
              <p className="text-primary/70 text-sm">Where Every Detail Tells a Story.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
