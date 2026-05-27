"use client";
import LoadingPage from "@/app/loading";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Banner() {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/banners`)
      .then((res) => res.json())
      .then((data) => {
        setSlides(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-screen lg:h-[calc(100vh-76px)] bg-zinc-900 flex items-center justify-center">
        <p className="text-white/40 text-sm">No banners configured.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen lg:h-[calc(100vh-76px)] bg-zinc-900">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={slides.length > 1}
        className="w-full h-full mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide._id}>
            {({ isActive }) => (
              <div className="relative w-full h-full flex items-center">
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    className="object-cover object-top"
                    priority={index === 0}
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-black/50 md:bg-transparent md:bg-linear-to-r md:from-black/80 md:via-black/50 md:to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center md:text-left">
                  <motion.div
                    className={`max-w-2xl mx-auto md:mx-0 ${
                      slide.align === "center"
                        ? "md:mx-auto md:text-center"
                        : "md:text-left"
                    }`}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                  >
                    <motion.p
                      variants={itemVariants}
                      className="text-amber-500 font-medium tracking-[0.15em] md:tracking-[0.2em] text-[10px] sm:text-xs md:text-sm lg:text-base mb-2 md:mb-4 uppercase"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.h1
                      variants={itemVariants}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-3 md:mb-6 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mb-5 md:mb-8 leading-relaxed max-w-xs sm:max-w-sm mx-auto md:mx-0 md:max-w-lg drop-shadow-md"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div variants={itemVariants}>

                      <Link
                        href={slide.buttonLink || "/shop"}
                        className="inline-flex items-center justify-center h-10 md:h-12 bg-white/10 hover:bg-white text-white hover:text-black border border-white/30 backdrop-blur-md rounded-none px-6 md:px-10 uppercase tracking-widest text-[10px] md:text-sm font-semibold transition-all duration-300 shadow-lg leading-none pt-0.5"
                      >
                        {slide.buttonText}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.6) !important;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          background-color: #f59e0b !important;
          transform: scale(1.2);
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: rgba(255, 255, 255, 0.6) !important;
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: white !important;
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
