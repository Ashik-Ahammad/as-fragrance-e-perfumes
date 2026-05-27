"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="py-24 bg-[#fcfaf8] flex justify-center">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-[#fcfaf8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.25em] block mb-3">
            Voices of Elegance
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-stone-500 font-light max-w-xl mx-auto text-sm leading-relaxed">
            Discover what our esteemed clientele have to say about their
            signature scents from AS Fragrance.
          </p>
        </div>

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-16"
          >
            {reviews.map((rev) => (
              <SwiperSlide key={rev._id} className="h-auto">
                <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full flex flex-col relative group hover:border-amber-100 transition-colors duration-300">
                  
                  <FaQuoteLeft className="absolute top-8 right-8 text-4xl text-stone-50 opacity-50 group-hover:text-amber-50 group-hover:scale-110 transition-all duration-500" />

                  {/* Perfume Name Badge */}
                  {rev.perfumeName && (
                    <div className="mb-5 relative z-10">
                      <span className="inline-block text-[9px] font-bold text-amber-700 uppercase tracking-[0.2em] border border-amber-200/60 bg-amber-50/50 px-3 py-1.5 rounded-full">
                        {rev.perfumeName}
                      </span>
                    </div>
                  )}

                  {/* Stars */}
                  <div className="flex text-amber-400 text-sm mb-6 relative z-10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= rev.rating ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-stone-600 text-sm font-light leading-relaxed flex-1 mb-8 relative z-10 italic">
                    "{rev.comment}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4 mt-auto border-t border-stone-100 pt-6 relative z-10">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 text-stone-400">
                      {rev.userImage ? (
                        <Image
                          src={rev.userImage}
                          alt={rev.userName}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <FiUser className="text-xl" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">
                        {rev.userName}
                      </p>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">
                        {new Date(rev.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #d6d3d1 !important;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background-color: #d97706 !important;
        }
      `}</style>
    </section>
  );
}
