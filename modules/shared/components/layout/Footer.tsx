"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  const handleCombosClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Observer class mutation on documentElement to sync dark mode logo dynamically
  useEffect(() => {
    try {
      const observer = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setDarkMode(isDark);
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
      });

      // Initial check
      setDarkMode(document.documentElement.classList.contains("dark"));

      return () => observer.disconnect();
    } catch (e) {
      console.error("MutationObserver not supported", e);
    }
  }, []);

  return (
    <footer className="border-t border-border bg-card mt-auto select-none font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-2.5 md:py-12 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8">
        
        {/* Brand Sign */}
        <div className="flex flex-col items-center md:items-start space-y-1 md:space-y-2">
          <div className="flex items-center -space-x-2">
            <img
              src={darkMode ? "/Diseño sin título (29).png" : "/Diseño sin título (30).png"}
              alt="Logo La Pluma"
              style={{ transform: 'translateY(-12px)' }}
              className="h-16 w-auto object-contain transition-all duration-300"
            />
            <span className="text-2xl font-serif font-bold text-foreground tracking-tight">
              La Pluma
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground/95 tracking-wide">
            Papelería y encuadernación artesanal
          </span>
        </div>

        {/* Links & Socials Wrapper (Side-by-side on both mobile and desktop) */}
        <div className="flex flex-row items-start justify-center gap-12 md:gap-24">
          {/* Links Grid */}
          <div className="flex flex-col items-center md:items-start gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <Link
              href="/"
              onClick={handleCombosClick}
              className="hover:text-foreground transition-colors"
            >
              Combos
            </Link>
            <Link
              href="/productos"
              className="hover:text-foreground transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/nosotros"
              className="hover:text-foreground transition-colors"
            >
              El Taller
            </Link>
            <Link
              href="/envios"
              className="hover:text-foreground transition-colors"
            >
              Envíos
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <a
              href="https://www.instagram.com/lapluma.uy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linktr.ee/lapluma.uy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkTree
            </a>
            <a
              href="https://www.whatsapp.com/catalog/59899695791/?app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://open.spotify.com/playlist/0hEyGlZNMIYwfiJJsjjbmn?si=91e5ea07ce3f42dc&nd=1&dlsi=77c1a7c1ec394212"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors md:whitespace-nowrap text-center md:text-left block md:inline-block"
            >
              Playlist -
              <br className="md:hidden" />
              <span> Todo esto Soy Yo</span>
            </a>
          </div>
        </div>

        {/* Location Signature */}
        <div className="text-center md:text-right space-y-1">
          <div className="text-[10px] font-mono text-muted-foreground">
            Hecho a mano en Montevideo, Uruguay 🇺🇾
          </div>
          <div className="text-[9px] text-muted-foreground/60">
            © {new Date().getFullYear()} La Pluma. Todos los derechos reservados.
          </div>
        </div>

      </div>
    </footer>
  );
};
