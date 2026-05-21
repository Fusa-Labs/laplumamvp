"use client";

import React from "react";
import Link from "next/link";

export const TallerIntro: React.FC = () => {
  return (
    <section className="pt-12 pb-20 md:py-20 px-6 max-w-7xl mx-auto w-full font-sans select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center lg:items-stretch">
        {/* Left Column: Emotional Biography */}
        <div className="lg:col-span-7 order-2 lg:order-1 lg:pt-2 lg:flex lg:flex-col">
          <div className="space-y-6 lg:mb-6">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif tracking-tight text-foreground font-bold leading-tight lg:leading-none">
              ¡Hola! Soy Paula.
            </h2>
            <div className="w-12 h-[1px] bg-primary my-4"></div>
            
            <div className="space-y-4 text-sm md:text-base lg:text-lg lg:leading-relaxed text-muted-foreground/90 max-w-2xl">
              <p>
                Para mí, encuadernar no es simplemente unir hojas de papel ecológico con hilos encerados; es el acto consciente de diseñar un cofre en blanco para atesorar tus pensamientos más profundos. Cada tela seleccionada con mimo y cada costura hecha rigurosamente a mano en nuestro taller de Montevideo es un ritual de paciencia concebido para durar y acompañarte en tu viaje diario.
              </p>
              <p>
                La Pluma nació del deseo de revivir la magia del papel y rescatar la lentitud del proceso artesanal frente a la velocidad del día a día. Cuando sostengas una de nuestras agendas o cuadernos, quiero que sientas esa calidez humana que solo el tiempo y la dedicación pueden infundir. Es una invitación abierta a detener el reloj, apagar las pantallas y volver a encontrarte en el trazo de tu propia letra sobre el papel.
              </p>
            </div>
          </div>

          <div className="pt-4 lg:pt-0 lg:mt-auto">
            <Link
              href="/nosotros"
              className="inline-block bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-mono py-3.5 px-8 rounded-md transition-all duration-200 uppercase tracking-widest font-bold shadow-md"
            >
              Conocé la historia de nuestro taller
            </Link>
          </div>
        </div>

        {/* Right Column: Breathtaking High-Fidelity Workshop Frame with Epigraph on PC */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="max-w-md w-full flex flex-col relative">
            {/* Mobile Epigraph - rendered above the image */}
            <span className="block lg:hidden text-xs font-mono font-bold uppercase tracking-widest text-primary/80 mb-2">
              El alma detrás de las costuras
            </span>
            <div className="relative group aspect-[4/5] rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Soft Ambient Shadow Overlay */}
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-colors duration-300 z-10"></div>
              <img
                src="/paula_taller.png"
                alt="Paula en el Taller de Encuadernación Artesanal La Pluma"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            {/* Epigraph - PC only, absolute positioned so it doesn't take grid height */}
            <span className="hidden lg:block absolute top-[calc(100%+0.875rem)] left-0 text-primary/70 text-[15px] font-mono uppercase tracking-widest pl-1 select-none text-left">
              El Alma Detrás de las Costuras
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
