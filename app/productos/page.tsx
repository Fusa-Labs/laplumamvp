"use client";

import React, { Suspense } from "react";
import { Header } from "@/modules/shared/components/layout/Header";
import { Footer } from "@/modules/shared/components/layout/Footer";
import { CatalogGrid } from "@/modules/catalog/components/CatalogGrid";

export default function ProductosPage() {
  return (
    <>
      <Header />
      <main className="flex-grow select-none bg-background">
        <Suspense fallback={
          <div className="py-20 text-center font-mono text-xs text-muted-foreground animate-pulse">
            Cargando catálogo...
          </div>
        }>
          <CatalogGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
