"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import productsData from "../data/products.json";
import { Product } from "@/modules/shared/types";
import { useCart } from "@/modules/cart/context/CartContext";

type CategoryId = "todos" | "emprendimiento" | "escritura-viajes" | "maternidad" | "hogar-cocina" | "organizacion";

interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
}

const CATEGORIES: Category[] = [
  { id: "todos", name: "Todos", emoji: "✨" },
  { id: "emprendimiento", name: "Emprendimiento & Oficina", emoji: "🚀" },
  { id: "escritura-viajes", name: "Escritura & Viajes", emoji: "🗺️" },
  { id: "maternidad", name: "Maternidad & Familia", emoji: "🤰" },
  { id: "hogar-cocina", name: "Hogar & Cocina", emoji: "🍳" },
  { id: "organizacion", name: "Organización", emoji: "🔮" }
];

export const CatalogGrid: React.FC = () => {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = React.useState<CategoryId>("todos");
  const [searchFilter, setSearchFilter] = React.useState("");
  const products: Product[] = productsData as Product[];

  // Sync category and search query from URL search parameters on load
  React.useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search) {
      setSearchFilter(search);
    } else {
      setSearchFilter("");
    }
    if (category) {
      setActiveCategory(category as CategoryId);
    } else {
      setActiveCategory("todos");
    }
  }, [searchParams]);

  const getProductCategory = (id: string, name: string): CategoryId => {
    const lowerId = id.toLowerCase();
    const lowerName = name.toLowerCase();
    
    if (
      lowerId.includes("pedido") || 
      lowerId.includes("modista") || 
      lowerId.includes("ventas") || 
      lowerId.includes("profesionales")
    ) {
      return "emprendimiento";
    }
    
    if (
      lowerId.includes("viaje") || 
      lowerId.includes("bitacora") || 
      lowerId.includes("propongo") || 
      lowerName.includes("cuaderno")
    ) {
      return "escritura-viajes";
    }
    
    if (
      lowerId.includes("embarazada") || 
      lowerId.includes("tejidos")
    ) {
      return "maternidad";
    }
    
    if (
      lowerId.includes("recetario") || 
      lowerId.includes("taza")
    ) {
      return "hogar-cocina";
    }
    
    return "organizacion";
  };

  const getProductEmoji = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("taza")) return "☕";
    if (lower.includes("sticker")) return "✨";
    if (lower.includes("sobre")) return "📂";
    if (lower.includes("lista")) return "📝";
    if (lower.includes("block")) return "🟨";
    return "📔";
  };

  const filteredProducts = products.filter(product => {
    // 1. Filter by category
    const categoryMatches = activeCategory === "todos" || getProductCategory(product.id, product.name) === activeCategory;
    
    // 2. Filter by search text
    const searchMatches = !searchFilter.trim() || 
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
      product.description.toLowerCase().includes(searchFilter.toLowerCase());
      
    return categoryMatches && searchMatches;
  });

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col items-center mb-10 text-center">
        <span className="text-primary/70 text-xs font-mono uppercase tracking-widest mb-3">
          Colección Completa
        </span>
        <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-foreground font-bold">
          Catálogo La Pluma
        </h2>
        <div className="w-12 h-[1px] bg-primary mt-6 mb-4"></div>
        <p className="text-sm font-sans max-w-xl text-muted-foreground/80 leading-relaxed">
          Diseños exclusivos creados a mano. Encuadernaciones artesanales, tazas sublimadas, organizadores y más piezas únicas para acompañar tus días.
        </p>
      </div>

      {/* Active Search Filter Banner */}
      {searchFilter && (
        <div className="flex flex-col items-center mb-10 text-center bg-secondary/50 border border-border/80 py-4 px-6 rounded-lg max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary/70 font-bold">
            Búsqueda Activa
          </span>
          <span className="text-sm font-serif font-bold text-foreground mt-1">
            Resultados para: &ldquo;{searchFilter}&rdquo;
          </span>
          <button
            onClick={() => {
              setSearchFilter("");
              // clear search param from URL
              window.history.replaceState(null, "", window.location.pathname);
            }}
            className="mt-3 text-[10px] font-mono uppercase tracking-widest text-primary hover:text-foreground underline transition-colors"
          >
            Limpiar Filtro
          </button>
        </div>
      )}

      {/* Dynamic Category Pill Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === category.id
                ? "bg-primary text-primary-foreground border-primary shadow-md scale-95"
                : "bg-card text-foreground/80 border-border hover:border-muted-foreground/40 hover:bg-secondary/40"
            }`}
          >
            <span>{category.emoji}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            {/* Contenedor de Imagen */}
            <div className="relative aspect-square w-full bg-secondary overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-colors duration-300 z-10"></div>
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider z-20 shadow-md">
                  {product.discount}% OFF
                </div>
              )}

              {/* Imagen Placeholder / Real */}
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-tr from-accent/20 to-muted/30">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {getProductEmoji(product.name)}
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-primary/70 uppercase max-w-[80%] truncate">
                  {product.fabric.split(" ")[0]}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono mt-1">
                  {product.paper.split(" ")[0]} {product.paper.includes("hojas") ? "Hojas" : ""}
                </span>
              </div>

              {/* Botón rápido "Ver perfil" */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <Link
                  href={`/producto/${product.id}`}
                  className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-mono py-2 px-4 rounded-md border border-border shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-200 uppercase tracking-wider"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>

            {/* Información del Producto */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="mb-2">
                <Link
                  href={`/producto/${product.id}`}
                  className="text-base font-serif font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                >
                  {product.name}
                </Link>
              </div>
              
              <div className="text-xs font-mono text-muted-foreground/80 mb-4 line-clamp-2 min-h-[2rem]">
                {product.description}
              </div>

              <div className="mt-auto pt-4 border-t border-border flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    Precio:
                  </span>
                  <div className="flex flex-col items-end">
                    {product.isConsult ? (
                      <span className="text-sm font-mono font-bold text-primary animate-pulse">
                        Consulte Costo
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {product.originalPrice && (
                          <span className="text-xs font-mono line-through text-muted-foreground/75">
                            ${product.originalPrice}
                          </span>
                        )}
                        <span className="text-base font-mono font-bold text-primary">
                          ${product.price} UYU
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {product.isConsult ? (
                  <a
                    href={`https://wa.me/59899695791?text=${encodeURIComponent(`¡Hola! Me gustaría hacerte una consulta por el producto "${product.name}" Gracias!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono py-2.5 px-4 rounded-md transition-all duration-200 uppercase tracking-wider font-bold shadow text-center block"
                  >
                    Consultar WhatsApp
                  </a>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-mono py-2.5 px-4 rounded-md transition-all duration-200 uppercase tracking-wider font-bold shadow"
                  >
                    Añadir al Carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
