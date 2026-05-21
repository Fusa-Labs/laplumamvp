"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/modules/shared/components/layout/Header";
import { Footer } from "@/modules/shared/components/layout/Footer";

export const ShippingContent: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      title: "📦 ¿Cómo despachan los envíos al interior de Uruguay?",
      content:
        "Todos los despachos hacia el interior del país se realizan a través de la agencia DAC (Grupo Agencia). Despachamos todos los días viernes a última hora de la tarde desde la terminal Tres Cruces. Te enviaremos el código de rastreo por mail para que puedas seguir el paquete en tiempo real.",
    },
    {
      title: "🚚 ¿Tienen envíos dentro de Montevideo?",
      content:
        "Sí, contamos con un servicio de cadetería privada propia que realiza entregas de lunes a viernes en Montevideo. La entrega se realiza dentro de las 48 hs hábiles posteriores a la acreditación de la compra, y coordinamos previamente la franja horaria para tu mayor comodidad.",
    },
    {
      title: "📍 ¿Se puede retirar el pedido en persona?",
      content:
        "¡Por supuesto! Podés elegir retirar tu pedido de forma gratuita directamente en nuestro taller ubicado en las inmediaciones de Parque Rodó, Montevideo. Una vez finalices la simulación de pedido, coordinaremos por mail la fecha y hora de retiro.",
    },
    {
      title: "💳 ¿Cuáles son los costos de envío?",
      content:
        "Los envíos por DAC se realizan bajo la modalidad de 'flete a pagar en destino', por lo que abonás el costo oficial de DAC al recibir el paquete en tu domicilio o al retirarlo en la agencia de tu localidad. El servicio de cadetería privada en Montevideo tiene un costo fijo de $180 pesos uruguayos.",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow py-16 px-6 max-w-4xl mx-auto w-full font-sans select-none">
        
        <div className="space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-primary/70 text-xs font-mono uppercase tracking-widest block">
              Logística & Envíos
            </span>
            <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight">
              Preguntas Frecuentes
            </h1>
            <div className="w-12 h-[1px] bg-primary mx-auto mt-4"></div>
          </div>

          {/* Graphics frame */}
          <div className="aspect-video bg-gradient-to-tr from-accent/20 to-muted/30 border border-border rounded-lg flex items-center justify-center text-6xl">
            📦🇺🇾🚚
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-5 text-left font-serif font-bold text-foreground hover:bg-secondary/20 transition-colors"
                >
                  <span className="text-sm md:text-base">{faq.title}</span>
                  <span className="text-xs font-mono text-muted-foreground pl-4">
                    {activeAccordion === index ? "[Cerrar -]" : "[Ver +]"}
                  </span>
                </button>
                
                {activeAccordion === index && (
                  <div className="p-5 border-t border-border bg-secondary/5 text-xs md:text-sm text-muted-foreground/90 leading-relaxed font-sans">
                    {faq.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border flex justify-center">
            <Link
              href="/"
              className="bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-mono py-3 px-8 rounded-md uppercase tracking-widest font-bold shadow-md"
            >
              Volver a la Tienda
            </Link>
          </div>

        </div>

      </main>
      <Footer />
    </>
  );
};
