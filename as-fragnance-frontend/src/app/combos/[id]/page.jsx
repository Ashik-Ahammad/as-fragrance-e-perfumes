import React from "react";
import ComboDetailClient from "./ComboDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/combos/${id}`,
    { cache: "no-store" },
  );
  const combo = await res.json();
  if (!combo) return { title: "Combo Not Found | AS Fragrance" };
  return {
    title: `${combo.title} | AS Fragrance`,
    description:
      combo.description || `Get the ${combo.title} combo deal at AS Fragrance.`,
    openGraph: {
      title: combo.title,
      images: [{ url: combo.imageUrl || "/assets/defaultPerfumeImage.png" }],
    },
  };
}

export default async function ComboDetailPage({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/combos/${id}`,
    { cache: "no-store" },
  );
  const combo = await res.json();

  if (!combo || !combo._id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-stone-500">
        Combo not found.
      </div>
    );
  }

  return <ComboDetailClient combo={combo} />;
}
