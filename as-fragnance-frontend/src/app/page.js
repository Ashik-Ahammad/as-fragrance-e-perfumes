import dynamic from "next/dynamic";
import Banner from "@/components/home/Banner";

export const metadata = {
  title: "AS Fragrance | Premium Perfumes & Attar in Bangladesh",
  description: "Discover a wide range of authentic, premium perfumes, attars, and custom fragrance combos at AS Fragrance. Fast delivery across Bangladesh.",
  openGraph: {
    title: "AS Fragrance | Premium Perfumes & Attar",
    description: "Discover a wide range of authentic, premium perfumes and attars at AS Fragrance.",
    url: "https://asfragrance.com",
    siteName: "AS Fragrance",
    type: "website",
  },
};

// Lazy load components below the fold for better performance
const FeaturedPerfumes = dynamic(() => import("@/components/home/FeaturedPerfumes"), { ssr: true });
const FeaturedCombos = dynamic(() => import("@/components/home/FeaturedCombos"), { ssr: true });
const ReviewSection = dynamic(() => import("@/components/home/ReviewSection"), { ssr: true });
const ScentJourney = dynamic(() => import("@/components/home/ScentJourney"), { ssr: true });
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"), { ssr: true });
const NewsletterSection = dynamic(() => import("@/components/home/NewsletterSection"), { ssr: true });

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedPerfumes />
      <FeaturedCombos />
      <ReviewSection />
      <ScentJourney />
      <WhyChooseUs />
      <NewsletterSection />
    </div>
  );
}
