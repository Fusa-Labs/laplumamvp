"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import productsData from "@/modules/catalog/data/products.json";
import combosData from "@/modules/catalog/data/combos.json";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  name: string;
  type: "producto" | "combo" | "categoria";
  categoryName?: string;
  url: string;
  description?: string;
  emoji?: string;
}

const CATEGORIES = [
  { id: "emprendimiento", name: "Emprendimiento & Oficina", emoji: "🚀" },
  { id: "escritura-viajes", name: "Escritura & Viajes", emoji: "🗺️" },
  { id: "maternidad", name: "Maternidad & Familia", emoji: "🤰" },
  { id: "hogar-cocina", name: "Hogar & Cocina", emoji: "🍳" },
  { id: "organizacion", name: "Organización", emoji: "🔮" }
];

export const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on drawer open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Build searchable database
  const searchDatabase: SearchItem[] = [
    // 1. Categories
    ...CATEGORIES.map(cat => ({
      id: cat.id,
      name: cat.name,
      type: "categoria" as const,
      url: `/productos?category=${cat.id}`,
      emoji: cat.emoji,
      description: "Explorar categoría completa"
    })),
    // 2. Combos
    ...combosData.map(combo => ({
      id: combo.id,
      name: combo.name,
      type: "combo" as const,
      url: `/combo/${combo.id}`,
      emoji: "🎁",
      description: combo.description || "Combo especial con descuento"
    })),
    // 3. Products
    ...productsData.map(p => ({
      id: p.id,
      name: p.name,
      type: "producto" as const,
      url: `/productos?search=${encodeURIComponent(p.name)}`,
      emoji: p.name.toLowerCase().includes("taza") ? "☕" : "📔",
      description: p.description
    }))
  ];

  // Filtering based on input query
  const filteredResults = query.trim() === ""
    ? []
    : searchDatabase.filter(item => {
        const matchesName = item.name.toLowerCase().includes(query.toLowerCase());
        const matchesDesc = item.description?.toLowerCase().includes(query.toLowerCase()) || false;
        const matchesType = item.type.toLowerCase().includes(query.toLowerCase());
        return matchesName || matchesDesc || matchesType;
      });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/productos?search=${encodeURIComponent(query.trim())}`);
  };

  const handleItemClick = (url: string) => {
    onClose();
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Slide-out Sidebar drawer (to the left from the right edge) */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-md h-full bg-card border-l border-border shadow-2xl flex flex-col z-10 transition-transform duration-300 animate-in slide-in-from-right"
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary/70">
              Buscador Global
            </span>
            <span className="text-lg font-serif font-bold text-foreground">
              Buscar en la tienda
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-secondary/60 rounded-md transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Cerrar búsqueda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search input form */}
        <div className="p-6 border-b border-border/60 bg-muted/20">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar productos, combos, categorías..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/60 transition-all shadow-inner"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4 text-muted-foreground/80 absolute left-3.5 top-1/2 -translate-y-1/2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </form>
        </div>

        {/* Content results area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {query.trim() === "" ? (
            // Pre-search suggestions
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 block">
                Sugerencias de Categorías
              </span>
              <div className="grid grid-cols-1 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleItemClick(`/productos?category=${cat.id}`)}
                    className="flex items-center gap-3 p-3 bg-card border border-border/80 hover:border-primary/50 hover:bg-secondary/40 rounded-lg text-left transition-all duration-200 group"
                  >
                    <span className="text-xl bg-background p-1.5 rounded-md border border-border/60 group-hover:scale-105 transition-transform">
                      {cat.emoji}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                        {cat.name}
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                        Categoría
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            // Results list
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Resultados encontrados ({filteredResults.length})
                </span>
                {filteredResults.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="text-[9px] font-mono uppercase tracking-wider text-primary hover:underline"
                  >
                    Ver todo en catálogo
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {filteredResults.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleItemClick(item.url)}
                    className="w-full flex items-start gap-3 p-3 bg-card border border-border/80 hover:border-primary/40 hover:bg-secondary/30 rounded-lg text-left transition-all duration-200 group"
                  >
                    <span className="text-xl bg-background p-2 rounded-md border border-border/50 flex-shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                      {item.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-serif font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.name}
                        </span>
                        <span className={`text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                          item.type === "combo" 
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/50"
                            : item.type === "categoria"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200/50"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/50"
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground line-clamp-1 mt-1 font-sans">
                        {item.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // No results
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <span className="text-3xl mb-3">🔍</span>
              <span className="text-xs font-serif font-bold text-foreground block">
                No encontramos resultados
              </span>
              <span className="text-[10px] text-muted-foreground max-w-[200px] mt-1 leading-normal">
                Probá con otra palabra clave o presioná Enter para buscar en catálogo
              </span>
              <button
                onClick={handleSearchSubmit}
                className="mt-4 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground text-[10px] font-mono uppercase tracking-widest rounded-md transition-all shadow-sm"
              >
                Buscar de todos modos
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/10 text-center">
          <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">
            Presioná Esc para cerrar • Envíos a todo el país 🇺🇾
          </span>
        </div>
      </div>
    </div>
  );
};
