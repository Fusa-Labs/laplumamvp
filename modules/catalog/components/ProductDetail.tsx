"use client";

import React, { useState } from "react";
import Link from "next/link";
import productsData from "../data/products.json";
import { Product } from "@/modules/shared/types";
import { useCart } from "@/modules/cart/context/CartContext";
import { Header } from "@/modules/shared/components/layout/Header";
import { Footer } from "@/modules/shared/components/layout/Footer";

interface ProductDetailProps {
  id: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const { addToCart } = useCart();
  const [copied, setCopied] = useState(false);

  const product = (productsData as Product[]).find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center text-center p-12 space-y-6 font-sans">
          <span className="text-6xl">🔍</span>
          <h2 className="text-2xl font-serif font-bold text-foreground">
            Cuaderno No Encontrado
          </h2>
          <p className="text-sm text-muted-foreground/80 max-w-sm">
            El modelo que estás buscando no forma parte de la colección actual de La Pluma o ha cambiado de ID.
          </p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-mono py-2.5 px-6 rounded-md uppercase tracking-wider font-bold shadow-md"
          >
            Volver a la Tienda
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="flex-grow py-12 px-6 max-w-7xl mx-auto w-full font-sans select-none">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs font-mono text-muted-foreground hover:text-foreground uppercase tracking-widest flex items-center gap-2"
          >
            ← Volver a la Colección
          </Link>
        </div>

        {/* Product Profile Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: High-fidelity Graphic Frame */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="aspect-square bg-gradient-to-tr from-accent/20 to-muted/30 border border-border rounded-lg flex flex-col items-center justify-center p-12 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-colors duration-300"></div>
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
                  {product.discount}% OFF
                </div>
              )}

              <span className="text-8xl mb-6 group-hover:scale-105 transition-transform duration-300">
                {product.name.toLowerCase().includes("taza") ? "☕" : 
                 product.name.toLowerCase().includes("sticker") ? "✨" :
                 product.name.toLowerCase().includes("sobre") ? "📂" :
                 product.name.toLowerCase().includes("lista") ? "📝" :
                 product.name.toLowerCase().includes("block") ? "🟨" : "📔"}
              </span>
              <h1 className="text-xl font-serif font-bold text-foreground mb-1">
                {product.name}
              </h1>
              <span className="text-xs font-mono font-bold tracking-widest text-primary/70 uppercase">
                {product.fabric.split(" ")[0]}
              </span>
              
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Cosido a Mano
              </div>
            </div>
            
            <div className="text-[10px] text-muted-foreground/80 font-mono text-center leading-relaxed">
              * Nota: Las telas son ilustrativas y forradas de manera 100% artesanal, por lo que cada pieza es única e irrepetible.
            </div>
          </div>

          {/* Right Column: Specification & Action Panel */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-primary/70 text-xs font-mono uppercase tracking-widest block mb-2">
                  Colección Oficial La Pluma
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price Tag */}
              <div className="py-4 border-y border-border flex justify-between items-center">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Valor:
                </span>
                <div className="flex flex-col items-end">
                  {product.isConsult ? (
                    <span className="text-xl font-mono font-bold text-primary animate-pulse">
                      Consulte Costo
                    </span>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      {product.originalPrice && (
                        <span className="text-sm font-mono line-through text-muted-foreground/75">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-mono font-bold text-primary">
                        ${product.price} UYU
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Craft Specs Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Detalles del Taller
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-md border border-border bg-secondary/15 space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Material / Tapa
                    </span>
                    <span className="text-xs font-serif font-bold text-foreground block">
                      {product.fabric}
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-md border border-border bg-secondary/15 space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Papel Interior
                    </span>
                    <span className="text-xs font-serif font-bold text-foreground block">
                      {product.paper}
                    </span>
                  </div>

                  <div className="p-4 rounded-md border border-border bg-secondary/15 space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Apertura Total
                    </span>
                    <span className="text-xs font-serif font-bold text-foreground block">
                      180° Grados Plano
                    </span>
                  </div>

                  <div className="p-4 rounded-md border border-border bg-secondary/15 space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Encuadernación
                    </span>
                    <span className="text-xs font-serif font-bold text-foreground block">
                      Cosido e hilo encerado
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Descripción
                </h3>
                <p className="text-sm text-muted-foreground/95 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Envíos Info */}
              <div className="p-4 bg-accent/15 border border-accent/30 rounded-md text-xs text-muted-foreground space-y-2">
                <div className="font-bold text-primary uppercase font-mono tracking-wider">
                  📦 Logística de Envíos en Uruguay:
                </div>
                <p className="leading-relaxed">
                  • **DAC (Agencia):** Despachos en tres cruces todos los viernes de tarde.  
                  • **Cadetería Privada:** Entregas en Montevideo coordinadas con 48 hs hábiles.
                </p>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-4">
              {product.isConsult ? (
                <a
                  href={`https://wa.me/59899695791?text=${encodeURIComponent(`¡Hola! Me gustaría hacerte una consulta por el producto "${product.name}" Gracias!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono py-3.5 px-6 rounded-md transition-all duration-200 uppercase tracking-widest font-bold shadow-md text-center block"
                >
                  Consultar por WhatsApp
                </a>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-mono py-3.5 px-6 rounded-md transition-all duration-200 uppercase tracking-widest font-bold shadow-md"
                >
                  Añadir al Carrito
                </button>
              )}
              
              <button
                onClick={handleShare}
                className="bg-card hover:bg-secondary text-foreground border border-border text-xs font-mono py-3.5 px-6 rounded-md transition-all duration-200 uppercase tracking-wider font-bold shadow"
              >
                {copied ? "¡Enlace Copiado!" : "Compartir Perfil"}
              </button>
            </div>

          </div>

        </div>

      </main>
      <Footer />
    </>
  );
};
