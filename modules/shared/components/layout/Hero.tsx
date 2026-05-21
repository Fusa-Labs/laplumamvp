"use client";

import React, { useState, useEffect } from "react";

export const Hero: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode logo dynamically with documentElement classes
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
    <section className="relative overflow-hidden py-20 px-8 md:px-16 lg:px-24 flex items-end justify-start min-h-[58vh] bg-transparent z-0">
      {/* Background Video Frame - Fixed reveal */}
      <div className="fixed top-0 left-0 w-full h-[58vh] z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/Bookbinding.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Elegant warm golden-brown artisan tint overlay with soft opacity for high visibility */}
        <div className="absolute inset-0 bg-[#a07040]/30 dark:bg-[#a07040]/40 backdrop-blur-[1.5px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl text-left">
        {/* Dynamic Flex Logo + Title Hero Banner (Fijo en una sola fila, pegados al milímetro y alineados) */}
        <div className="flex flex-nowrap items-center justify-start gap-1.5 md:gap-3 text-left">
          <img
            src={darkMode ? "/Diseño sin título (29).png" : "/Diseño sin título (30).png"}
            alt="Logo La Pluma"
            style={{ transform: 'translateY(-12px)' }}
            className="h-14 xs:h-20 md:h-40 w-auto object-contain transition-all duration-300 filter drop-shadow-md brightness-110 flex-shrink-0"
          />
          <div className="flex flex-col justify-center space-y-0.5 md:space-y-2">
            <h1 className="text-4xl xs:text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-amber-50 tracking-tighter leading-none drop-shadow-md select-none">
              La Pluma
            </h1>
            <h2 className="text-[0.7rem] xs:text-[0.91rem] md:text-[1.16rem] lg:text-[1.29rem] font-mono text-amber-100/90 uppercase tracking-widest font-bold drop-shadow-sm select-none pl-1">
              Papelería & Encuadernación Artesanal
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
