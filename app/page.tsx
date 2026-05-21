"use client";

import React from "react";
import { Header } from "@/modules/shared/components/layout/Header";
import { Footer } from "@/modules/shared/components/layout/Footer";
import { Hero } from "@/modules/shared/components/layout/Hero";
import { CombosGrid } from "@/modules/catalog/components/CombosGrid";
import { FeaturedProduct } from "@/modules/catalog/components/FeaturedProduct";
import { TallerIntro } from "@/modules/catalog/components/TallerIntro";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-grow select-none relative bg-background">
        {/* Modular Artisan Hero Section */}
        <Hero />

        {/* Wrap rest of the content in a solid z-10 layer to slide up and cover the fixed video */}
        <div className="relative z-10 bg-background">
          {/* Combos Grid Section */}
          <CombosGrid />

          {/* Featured Product Section */}
          <FeaturedProduct />

          {/* Taller Intro Section */}
          <TallerIntro />
        </div>
      </main>

      <Footer />
    </>
  );
}
