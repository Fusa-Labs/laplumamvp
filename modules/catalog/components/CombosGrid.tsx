"use client";

import React from "react";
import Link from "next/link";
import combosData from "../data/combos.json";

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

export const CombosGrid: React.FC = () => {
  const combos: Combo[] = combosData as Combo[];

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

  const getMiniDescription = (id: string) => {
    switch (id) {
      case "combo-emprendedor-imparable":
        return "La caja de herramientas definitiva para planificar y gestionar tu negocio con éxito.";
      case "combo-bitacora-del-alma":
        return "Un ritual de escritura impecable para volcar tus aventuras y pasiones sobre papel.";
      case "combo-escritorio-mistico":
        return "Sintonía y productividad diaria guiada por agendas perpetuas y listas místicas.";
      case "combo-maternidad-dulce":
        return "Un kit tierno diseñado para atesorar el crecimiento de tu bebé y sus prendas tejidas.";
      case "combo-chef-creativo":
        return "El set ideal para inmortalizar tus secretos culinarios y recetas familiares.";
      case "vale-obsequio":
        return "Sorprendé a alguien especial regalándole la libertad de elegir su propio cuaderno artesanal.";
      default:
        return "";
    }
  };

  return (
    <section className="pt-8 pb-16 w-full font-sans">
      <div className="flex flex-col items-center mb-16 text-center px-6">
        <h2 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight text-foreground font-bold leading-tight">
          Nuestros combos especiales
        </h2>
        <div className="w-12 h-[1px] bg-primary mt-6 mb-4"></div>
        <p className="text-sm md:text-base lg:text-[21px] font-sans max-w-3xl text-muted-foreground/80 leading-relaxed">
          Combinaciones exclusivas de nuestros productos más queridos del taller, diseñados como el regalo perfecto o el kit definitivo para tu rutina con descuentos especiales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border-y border-border w-full overflow-hidden">
        {combos.map((combo, idx) => (
          <Link
            key={combo.id}
            href={`/combo/${combo.id}`}
            className={`group relative flex flex-col justify-center items-center overflow-hidden transition-all duration-300 hover:bg-muted/15 p-8 md:p-12 lg:p-16 min-h-[380px] md:min-h-[440px] lg:min-h-[500px] cursor-pointer ${
              idx === 0
                ? "lg:col-span-2"
                : idx === 1
                ? "lg:col-span-1"
                : idx === 2
                ? "lg:col-span-1"
                : idx === 3
                ? "lg:col-span-2"
                : idx === 4
                ? "lg:col-span-2"
                : "lg:col-span-1"
            }`}
          >
            {/* Background Image Illustrative */}
            <img
              src={getComboImage(combo.id)}
              alt={combo.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0 select-none"
            />

            {/* Dark Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/85 group-hover:via-black/60 group-hover:to-black/90 transition-all duration-300 z-10" />

            {/* Content Body - Centered & Overlaid */}
            <div className="relative z-20 flex flex-col justify-center items-center text-white text-center space-y-4 max-w-2xl px-4 flex-grow">
              <div className="flex flex-col items-center justify-center space-y-4 my-auto">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-amber-50 leading-tight transition-transform duration-500 group-hover:scale-[1.02]">
                  {combo.name}
                </h3>
                <div className="w-12 h-[1px] bg-amber-200/40 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm md:text-base text-zinc-200/90 leading-relaxed font-sans font-light max-w-lg">
                  {getMiniDescription(combo.id)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
