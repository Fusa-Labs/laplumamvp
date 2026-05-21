"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onSearchOpen,
}) => {
  const pathname = usePathname();

  const handleCombosClick = (e: React.MouseEvent) => {
    onClose();
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 left-0 right-0 bg-card border-b border-border shadow-lg flex flex-col p-6 space-y-4 md:hidden z-50 animate-in slide-in-from-top duration-200">
      <button
        onClick={() => {
          onClose();
          onSearchOpen();
        }}
        className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-border/40 text-left w-full"
      >
        Buscar
      </button>
      <Link
        href="/"
        onClick={handleCombosClick}
        className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-border/40"
      >
        Combos
      </Link>
      <Link
        href="/productos"
        onClick={onClose}
        className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-border/40"
      >
        Productos
      </Link>
      <Link
        href="/nosotros"
        onClick={onClose}
        className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-border/40"
      >
        El Taller
      </Link>
      <Link
        href="/envios"
        onClick={onClose}
        className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground py-2"
      >
        Envíos
      </Link>
    </div>
  );
};
