import React from "react";
import PerfumeDetailClient from "./PerfumeDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/perfume/${id}`,
    {
      cache: "no-store",
    },
  );

  const perfume = await res.json();

  if (!perfume) {
    return {
      title: "Product Not Found | AS Fragrance",
    };
  }

  const title = `${perfume.perfumeTitle} - Premium Fragrance | AS Fragrance`;

  const description = perfume.description
    ? perfume.description.substring(0, 160)
    : `Experience the luxury of ${perfume.perfumeTitle}. Buy premium perfumes and attars from AS Fragrance in Dhaka, Bangladesh.`;

  return {
    title,
    description,
    keywords: [
      perfume.perfumeTitle,
      perfume.category,
      "luxury perfume BD",
      "AS Fragrance",
      "buy perfume online dhaka",
      "authentic attar bangladesh",
      "original perfume oil",
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: perfume.imageUrl || "/assets/defaultPerfumeImage.png",
          width: 800,
          height: 600,
          alt: perfume.perfumeTitle,
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `/shop/${id}`,
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/perfume/${id}`,
    {
      cache: "no-store",
    },
  );

  const perfume = await res.json();

  if (!perfume) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Product not found
      </div>
    );
  }

  return <PerfumeDetailClient perfume={perfume} />;
}
