"use client";

import React, { useState } from "react";
import Link from "next/link";
import combosData from "../data/combos.json";
import { Header } from "@/modules/shared/components/layout/Header";
import { Footer } from "@/modules/shared/components/layout/Footer";

interface Combo {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  emojis: string;
  gradient: string;
  accentColor: string;
  description: string;
  included: string[];
  originalPrice: number;
  price: number;
  isVoucher?: boolean;
}

interface ComboDetailProps {
  id: string;
}

export const ComboDetail: React.FC<ComboDetailProps> = ({ id }) => {
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode dynamically with documentElement classes
  React.useEffect(() => {
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

  const combo = (combosData as Combo[]).find((c) => c.id === id);

  if (!combo) {
    return (
      <>
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center text-center p-12 space-y-6 font-sans select-none">
          <span className="text-6xl">🔍</span>
          <h2 className="text-2xl font-serif font-bold text-foreground">
            Combo No Encontrado
          </h2>
          <p className="text-sm text-muted-foreground/80 max-w-sm">
            El combo especial que estás buscando no forma parte de la colección actual de La Pluma o ha cambiado de ID.
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

  const getComboImage = (id: string) => {
    switch (id) {
      case "combo-emprendedor-imparable": return "/catalogo/combo_emprendedor.png";
      case "combo-bitacora-del-alma": return "/catalogo/combo_bitacora.png";
      case "combo-escritorio-mistico": return "/catalogo/combo_mistico.png";
      case "combo-maternidad-dulce": return "/catalogo/combo_maternidad.png";
      case "combo-chef-creativo": return "/catalogo/combo_chef.png";
      case "vale-obsequio": return "/catalogo/combo_voucher.png";
      default: return "/catalogo/combo_emprendedor.png";
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate discount percentage
  const discountPercent = combo.originalPrice > 0 
    ? Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)
    : 0;

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
            ← Volver a los Combos
          </Link>
        </div>

        {/* Combo Split Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: High-fidelity Graphic Frame */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="aspect-square bg-gradient-to-tr from-accent/20 to-muted/30 border border-border rounded-lg flex flex-col items-center justify-center relative overflow-hidden group min-h-[300px] sm:min-h-[400px]">
              
              {/* Combo Image */}
              <img
                src={getComboImage(combo.id)}
                alt={combo.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75 z-10"></div>
              
              {/* Discount Badge */}
              {discountPercent > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
                  {discountPercent}% OFF
                </div>
              )}

              {/* Top Left Badge */}
              <div className="absolute top-4 left-4 bg-amber-600/90 text-amber-50 text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
                {combo.badge}
              </div>

              {/* Centered Emoji Overlay */}
              <div className="relative z-20 flex flex-col items-center space-y-2 text-white">
                <span className="text-6xl drop-shadow-lg filter brightness-110">
                  {combo.emojis}
                </span>
              </div>
            </div>
            
            <div className="text-[10px] text-muted-foreground/80 font-mono text-center leading-relaxed">
              * Nota: Los combos contienen productos elaborados 100% a mano en nuestro taller de Montevideo.
            </div>
          </div>

          {/* Right Column: Specification & Action Panel */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-primary/70 text-xs font-mono uppercase tracking-widest block mb-2">
                  {combo.tagline}
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
                  {combo.name}
                </h1>
              </div>

              {/* Price Tag */}
              <div className="py-4 border-y border-border flex justify-between items-center">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Valor Promocional:
                </span>
                <div className="flex flex-col items-end">
                  {combo.isVoucher ? (
                    <span className="text-xl font-mono font-bold text-primary">
                      Monto Libre a Elección
                    </span>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      {combo.originalPrice > 0 && (
                        <span className="text-sm font-mono line-through text-muted-foreground/75">
                          ${combo.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl font-mono font-bold text-primary">
                        ${combo.price} UYU
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Included Items List */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  ¿Qué incluye este Combo Especial?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {combo.included.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-md border border-border bg-secondary/15">
                      <span className="text-base">📔</span>
                      <span className="text-xs font-mono text-foreground font-semibold leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Detalles del Combo
                </h3>
                <p className="text-sm text-muted-foreground/95 leading-relaxed whitespace-pre-line font-light">
                  {combo.description}
                </p>
              </div>

              {/* Custom Voucher Info (if applicable) */}
              {combo.isVoucher && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-md text-xs text-amber-900/90 dark:text-amber-200/90 space-y-2">
                  <div className="font-bold uppercase font-mono tracking-wider text-amber-700 dark:text-amber-300">
                    🎁 ¿Cómo funciona el Vale de Obsequio?
                  </div>
                  <p className="leading-relaxed">
                    Es la opción perfecta si querés regalar un cuaderno pero preferís que la persona elija sus propios detalles del taller. Nosotros le preparamos una hermosa tarjeta física o digital de regalo para que pueda explorar nuestro catálogo de telas hiladas a mano, tipos de costura expuesta e interiores.
                  </p>
                </div>
              )}

              {/* Envíos Info */}
              <div className="p-4 bg-accent/15 border border-accent/30 rounded-md text-xs text-muted-foreground space-y-2">
                <div className="font-bold text-primary uppercase font-mono tracking-wider">
                  📦 Logística y Entrega:
                </div>
                <p className="leading-relaxed">
                  • **DAC (Agencia):** Envios a todo el interior despachados todos los viernes.  
                  • **Cadetería Privada:** Entregas locales en Montevideo coordinadas en 48 hs.
                </p>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/59899695791?text=${encodeURIComponent(
                  combo.isVoucher
                    ? "¡Hola! Me gustaría hacer una consulta por el Vale de Obsequio de La Pluma para hacer un regalo personalizado. ¡Gracias!"
                    : `¡Hola! Me gustaría hacerte una consulta para adquirir el Combo ${combo.name} especial de La Pluma. ¡Gracias!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono py-3.5 px-6 rounded-md transition-all duration-200 uppercase tracking-widest font-bold shadow-md text-center block"
              >
                Consultar por WhatsApp
              </a>
              
              <button
                onClick={handleShare}
                className="bg-card hover:bg-secondary text-foreground border border-border text-xs font-mono py-3.5 px-6 rounded-md transition-all duration-200 uppercase tracking-wider font-bold shadow"
              >
                {copied ? "¡Enlace Copiado!" : "Compartir Combo"}
              </button>
            </div>

          </div>

        </div>

      </main>
      <Footer />
    </>
  );
};
