"use client";

import React from "react";
import { ComboDetail } from "@/modules/catalog/components/ComboDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ComboDetailPage({ params }: PageProps) {
  const { id } = React.use(params);

  return <ComboDetail id={id} />;
}
