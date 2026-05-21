"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/modules/shared/components/layout/Header";
import { Footer } from "@/modules/shared/components/layout/Footer";

export const AboutContent: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-grow py-16 px-6 max-w-4xl mx-auto w-full font-sans select-none">
        
        {/* Story Section */}
        <article className="space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-primary/70 text-xs font-mono uppercase tracking-widest block">
              Nuestra Historia
            </span>
            <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight">
              El Taller de La Pluma
            </h1>
            <div className="w-12 h-[1px] bg-primary mx-auto mt-4"></div>
          </div>

          {/* Intro Frame */}
          <div className="aspect-video bg-gradient-to-tr from-accent/20 to-muted/30 border border-border rounded-lg flex items-center justify-center text-6xl">
            📜✍️📔
          </div>

          <div className="space-y-6 text-sm text-muted-foreground/90 leading-relaxed font-sans">
            <p>
              En el corazón de nuestro taller familiar en Montevideo, cada pliegue de papel, cada corte y cada puntada cuenta una historia. **La Pluma** nace del amor por la encuadernación clásica y la papelería fina, rescatando técnicas tradicionales de costura de lomo expuesta y forrado artesanal para adaptarlas a la vida moderna.
            </p>
            <p>
              Nuestra filosofía se basa en tres pilares fundamentales que cuidamos rigurosamente en cada pieza que creamos:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 border border-border rounded-lg bg-card space-y-2">
                <span className="text-2xl">🧵</span>
                <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                  Costura a Mano
                </h3>
                <p className="text-[11px] text-muted-foreground/80 leading-normal">
                  Utilizamos hilo de algodón encerado importado para asegurar una apertura perfecta de 180° que no se deforma con el paso del tiempo.
                </p>
              </div>

              <div className="p-5 border border-border rounded-lg bg-card space-y-2">
                <span className="text-2xl">🌱</span>
                <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                  Papel Ecológico
                </h3>
                <p className="text-[11px] text-muted-foreground/80 leading-normal">
                  Todas nuestras hojas interiores son de papel ecológico de 75 grs, libre de cloro y certificado, protegiendo tanto tu pluma como el planeta.
                </p>
              </div>

              <div className="p-5 border border-border rounded-lg bg-card space-y-2">
                <span className="text-2xl">🎨</span>
                <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                  Telas Únicas
                </h3>
                <p className="text-[11px] text-muted-foreground/80 leading-normal">
                  Seleccionamos personalmente gabardinas floreadas, lino premium y jacquards pesados para vestir tus ideas con texturas inigualables.
                </p>
              </div>
            </div>

            <p className="pt-4">
              Creemos firmemente que en un mundo sobrecargado de pantallas y notificaciones digitales, el acto físico de volcar tus pensamientos, bocetos y listas sobre papel artesanal es un ritual terapéutico irremplazable. Esperamos que disfrutes de tu cuaderno La Pluma tanto como nosotros disfrutamos el proceso de crearlo para vos.
            </p>
          </div>

          <div className="pt-8 border-t border-border flex justify-center">
            <Link
              href="/productos"
              className="bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-mono py-3 px-8 rounded-md uppercase tracking-widest font-bold shadow-md"
            >
              Explorar Catálogo
            </Link>
          </div>

        </article>

      </main>
      <Footer />
    </>
  );
};
