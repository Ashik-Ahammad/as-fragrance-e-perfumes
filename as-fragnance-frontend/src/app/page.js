import Banner from "@/components/Banner";
import FeaturedPerfumes from "@/components/FeaturedPerfumes";
import ReviewSection from "@/components/ReviewSection";
import ScentJourney from "@/components/ScentJourney";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedPerfumes></FeaturedPerfumes>
      <ReviewSection></ReviewSection>
      <ScentJourney></ScentJourney>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
