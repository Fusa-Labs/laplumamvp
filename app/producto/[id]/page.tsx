"use client";

import React from "react";
import { ProductDetail } from "@/modules/catalog/components/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = React.use(params);

  return <ProductDetail id={id} />;
}
