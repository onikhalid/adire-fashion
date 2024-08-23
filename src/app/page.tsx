'use client'
import { FeaturedProducts, Hero } from "@/components/layout";
import React from "react";



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <FeaturedProducts />
    </main>
  );
}
