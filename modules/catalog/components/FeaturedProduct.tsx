"use client";

import React, { useState } from "react";
import { useCart } from "@/modules/cart/context/CartContext";

const IMAGES = [
  "/checklist_1.png",
  "/checklist_2.png",
  "/checklist_3.png",
  "/checklist_4.png",
  "/checklist_5.png"
];

export const FeaturedProduct: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(IMAGES[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = {
      id: "checklist-artesanal-calma",
      name: "Talonario Checklist ~ Calma",
      price: 300,
      description: "Edición limitada del taller.",
      images: [IMAGES[0]],
      fabric: "Papelería Artesanal",
      paper: "100 hojas de 90g",
      inStock: true,
      isConsult: false
    };

    // Add to cart quantity times
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    alert(`¡Agregamos ${quantity} ${quantity === 1 ? "unidad" : "unidades"} de "${product.name}" al carrito!`);
  };

  const handleBuyNow = () => {
    const text = `¡Hola! Me gustaría comprar ${quantity} ${quantity === 1 ? "unidad" : "unidades"} del Talonario Checklist ~ Calma ($300 UYU c/u). Gracias!`;
    const url = `https://wa.me/59899695791?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="pt-2 pb-6 md:py-20 px-6 max-w-7xl mx-auto w-full font-sans select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        
        {/* Mobile Product Title - Renders at the very top only on mobile viewports */}
        <div className="block lg:hidden">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary/80 mb-2 block">
            Edición limitada
          </span>
          <h2 className="text-3xl font-serif text-foreground font-bold tracking-tight">
            Talonario Checklist ~ Calma
          </h2>
        </div>

        {/* Left Column: Visual Area (Photo & Micro-Gallery) */}
        <div className="lg:col-span-6 space-y-4 lg:space-y-6">
          {/* Main Large Active Image Frame */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border bg-muted/20 shadow-md">
            <img
              src={selectedImage}
              alt="Talonario Checklist Calma La Pluma"
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Micro-Gallery Grid */}
          <div className="grid grid-cols-5 gap-3">
            {IMAGES.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === img
                    ? "border-primary shadow-xs opacity-100 scale-95"
                    : "border-border hover:border-muted-foreground/40 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Vista ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Checkout & Inspirational Copy Panel */}
        <div className="lg:col-span-6 space-y-5 lg:space-y-8 lg:pl-4">
          
          {/* Product Header Block */}
          <div className="space-y-1.5 lg:space-y-3">
            {/* Desktop Product Title - Desktop only */}
            <div className="hidden lg:block">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary/80 mb-2 block">
                Edición limitada
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif text-foreground font-bold tracking-tight lg:leading-tight">
                Talonario Checklist ~ Calma
              </h2>
            </div>
            {/* Price Tag - Renders on all screen sizes below visual gallery */}
            <div className="flex flex-row items-center justify-between lg:justify-start lg:gap-12">
              <span className="text-2xl font-mono font-bold text-primary">$300,00 UYU</span>
              {/* Quantity Selector */}
              <div className="flex flex-row items-center gap-3">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Cantidad:
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 text-lg leading-none hover:text-primary font-mono text-muted-foreground transition-all duration-200"
                  >
                    -
                  </button>
                  <span className="text-sm font-mono font-bold text-foreground min-w-[1rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-1 text-lg leading-none hover:text-primary font-mono text-muted-foreground transition-all duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Parameters & Action Buttons */}
          <div className="space-y-4 lg:space-y-6 pt-2">
            {/* Shopping CTAs */}
            <div className="flex flex-row gap-2 lg:gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 border border-primary text-primary hover:bg-primary/5 text-[10px] lg:text-xs font-mono py-3.5 px-2 lg:px-6 rounded-md transition-all duration-200 uppercase tracking-widest font-bold text-center block"
              >
                Agregar al Carrito
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-primary hover:bg-primary/95 text-primary-foreground text-[10px] lg:text-xs font-mono py-3.5 px-2 lg:px-6 rounded-md transition-all duration-200 uppercase tracking-widest font-bold shadow-md text-center block"
              >
                Comprar Ahora
              </button>
            </div>
          </div>

          {/* Custom Inspirational Copywriting Blocks */}
          <div className="space-y-3 lg:space-y-5 text-sm md:text-base leading-relaxed text-muted-foreground/90">
            <p className="font-serif italic font-bold text-foreground/80 border-l-2 border-primary pl-4 py-1">
              “Escribir para ordenar, respirar para crear” es el latido detrás de este talonario.
            </p>
            <p>
              Diseñado como un refugio de organización diaria. Sentí el placer genuino de materializar tus ideas pendientes y tachar cada meta cumplida con tu propio trazo, sin presiones y respetando tu tiempo.
            </p>

            {/* Spec List */}
            <ul className="space-y-2 pt-2 text-xs font-mono uppercase tracking-wide text-foreground/90">
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">▪</span> Tamaño ideal de cartera: A6 (14,8 x 10,5 cm)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">▪</span> 100 hojas de papel premium ecológico de 90 gramos
              </li>
            </ul>



          </div>

        </div>

      </div>
    </section>
  );
};
