'use client'
import { FAQSection, FeaturedProducts, Hero, TestimonialsSection, TrendySection, WhatWeDoSection } from "@/components/layout";
import React from "react";



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <FeaturedProducts />
      <TrendySection />
      <WhatWeDoSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
