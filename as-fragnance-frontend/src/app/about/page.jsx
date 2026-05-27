import React from "react";
import AboutClient from "@/components/client-components/AboutClient";

export const metadata = {
  title: "About Our Legacy | AS Fragrance",
  description: "Learn about AS Fragrance's journey, our commitment to honoring the Sunnah through premium scents, and our strict ethical benchmarks in truthful commerce.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}