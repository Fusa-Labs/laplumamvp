"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/modules/cart/context/CartContext";
import { CartDrawer } from "@/modules/cart/components/CartDrawer";
import { CheckoutModal } from "@/modules/cart/components/CheckoutModal";
import { SearchDrawer } from "@/modules/search/components/SearchDrawer";
import { MobileMenu } from "@/modules/shared/components/layout/MobileMenu";
import { resolveSearchDestination } from "@/modules/search/utils/resolveSearch";

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [desktopQuery, setDesktopQuery] = useState("");
  
  const desktopSearchRef = useRef<HTMLFormElement>(null);

  // Sync dark theme setting, click-out, and Escape listeners
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopSearchRef.current && 
        !desktopSearchRef.current.contains(e.target as Node)
      ) {
        setIsDesktopSearchOpen(false);
      }
    };
    if (isDesktopSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDesktopSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDesktopSearchOpen(false);
      }
    };
    if (isDesktopSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDesktopSearchOpen]);

  const handleDesktopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desktopQuery.trim()) return;
    setIsDesktopSearchOpen(false);
    setDesktopQuery("");
    router.push(resolveSearchDestination(desktopQuery));
  };

  const handleCombosClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Sincronizar estado inicial de Dark Mode
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("la_pluma_theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add("dark");
        setDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setDarkMode(false);
      }
    } catch (e) {
      console.error("Theme reading error", e);
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    try {
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("la_pluma_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("la_pluma_theme", "light");
      }
    } catch (e) {
      console.error("Theme setting error", e);
    }
  };

  const handleCheckoutTrigger = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <header className="border-b border-border bg-card sticky top-0 z-40 select-none font-sans transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-1 group"
          >
            <img
              src={darkMode ? "/Diseño sin título (29).png" : "/Diseño sin título (30).png"}
              alt="Logo La Pluma"
              style={{ transform: 'translateY(-4px)' }}
              className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
            <span className="text-lg font-serif font-bold text-foreground tracking-tight">
              La Pluma
            </span>
          </Link>

          {/* Navigation Links (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider">
            <Link
              href="/"
              onClick={handleCombosClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Combos
            </Link>
            <Link
              href="/productos"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/nosotros"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              El Taller
            </Link>
            <Link
              href="/envios"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Envíos
            </Link>
          </nav>

          {/* Actions panel */}
          <div className="flex items-center gap-3">
            {/* Desktop Inline Search Bar */}
            {isDesktopSearchOpen && (
              <form 
                ref={desktopSearchRef}
                onSubmit={handleDesktopSearchSubmit} 
                className="hidden md:flex items-center relative animate-in slide-in-from-right-3 duration-200"
              >
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={desktopQuery}
                  onChange={(e) => setDesktopQuery(e.target.value)}
                  className="bg-secondary/60 border border-border/80 rounded-full pl-4 pr-8 py-1.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/60 w-48 shadow-inner transition-all"
                  autoFocus
                />
                {desktopQuery && (
                  <button
                    type="button"
                    onClick={() => setDesktopQuery("")}
                    className="absolute right-3 text-[10px] text-muted-foreground hover:text-foreground p-1 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </form>
            )}

            {/* Search Icon Button (Left of Instagram on Desktop) */}
            <button
              onClick={() => {
                if (isDesktopSearchOpen && desktopQuery.trim()) {
                  setIsDesktopSearchOpen(false);
                  setDesktopQuery("");
                  router.push(resolveSearchDestination(desktopQuery));
                } else {
                  setIsDesktopSearchOpen(!isDesktopSearchOpen);
                }
              }}
              className="hidden md:flex p-2 text-[#a07040] hover:bg-secondary/40 rounded-md transition-colors flex items-center justify-center"
              title="Buscar en la tienda"
              aria-label="Buscar en la tienda"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5 text-[#a07040] dark:text-[#fef3c7] transition-colors duration-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* Instagram Link (Left of Cart) */}
            <a
              href="https://www.instagram.com/lapluma.uy/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-secondary/40 rounded-md transition-colors flex items-center justify-center"
              title="Seguinos en Instagram"
              aria-label="Instagram de La Pluma"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5 text-[#a07040] dark:text-[#fef3c7] transition-colors duration-200"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeWidth={2} />
              </svg>
            </a>

            {/* 1. Cart Trigger Action */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground hover:bg-secondary/40 rounded-md transition-colors flex items-center gap-1.5"
              aria-label="Abrir Carrito"
            >
              {/* Custom Tote Bag (Toad Bar Style) Shopping Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5 text-[#a07040] dark:text-[#fef3c7] transition-colors duration-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 8V6a4 4 0 1 1 8 0v2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16l-1.5 12.5a2 2 0 0 1-2 1.5h-9a2 2 0 0 1-2-1.5L4 8z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[9px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* 2. Dark Mode Toggle Button with Brown Icon (Middle) */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-[#a07040] hover:bg-secondary/40 rounded-md transition-colors flex items-center justify-center"
              title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {darkMode ? (
                // Sun Icon (Brown)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M5.25 12h-2.25m16.5 0h-2.25m-9.034-7.034l1.591 1.591M16.5 16.5l1.591 1.591m-9.034 9.034l1.591-1.591M16.5 7.5l1.591-1.591M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
                </svg>
              ) : (
                // Moon Icon (Brown)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>

            {/* 3. Mobile Hamburger Menu Button (Right-most) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-secondary/40 rounded-md transition-colors flex items-center justify-center"
              title="Menú"
            >
              {isMobileMenuOpen ? (
                // Close Icon (X)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onSearchOpen={() => setIsSearchOpen(true)}
        />
      </header>

      {/* Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckoutTrigger}
      />

      {/* Checkout Modal Overlay */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Search Drawer Overlay */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
