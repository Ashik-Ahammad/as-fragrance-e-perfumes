"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FiInfo,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiSend,
  FiAward,
  FiMapPin,
  FiArrowLeft,
  FiUser,
} from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import PurchaseOptions from "@/components/perfume/PurchaseOptions";

const PerfumeDetailClient = ({ perfume }) => {
  const [isMounted, setIsMounted] = useState(false);

  // --- Review States ---
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Fetch Reviews
    if (perfume?._id) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/${perfume._id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((err) => console.error("Failed to fetch reviews", err));
    }
  }, [perfume?._id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a star rating.");
    if (!comment.trim()) return toast.error("Please write a comment.");

    setIsSubmittingReview(true);
    try {
      const { data: tokenData } = await authClient.token();
      const jwtToken = tokenData?.token;

      if (!jwtToken) {
        toast.error("Authentication failed. Please login again.");
        setIsSubmittingReview(false);
        return;
      }

      const reviewPayload = {
        perfumeId: perfume._id,
        perfumeName: perfume.perfumeTitle,
        userId: user.id,
        userName: user.name || "Valued Customer",
        userImage: user.image || null,
        rating,
        comment,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(reviewPayload),
      });

      if (res.ok) {
        toast.success("Review posted successfully!");
        setComment("");
        setRating(0);

        const newReviewsRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/${perfume._id}`,
        );
        const newReviews = await newReviewsRes.json();
        setReviews(newReviews);
      } else {
        toast.error("Failed to post review");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!isMounted) return null;

  const siteUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}`;

  const productUrl = `${siteUrl}/shop/${perfume?._id}`;

  const encodedUrl = encodeURIComponent(productUrl);

  const encodedTitle = encodeURIComponent(
    perfume?.perfumeTitle || "Discover this premium fragrance",
  );

  const finalImageUrl = perfume?.imageUrl || "/assets/defaultPerfumeImage.png";

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">

        <div className="flex items-center justify-between border-b border-stone-100 pb-6 mb-8 lg:mb-12">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-orange-500 transition-colors group"
          >
            <FiArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
            <span>Back to Shop</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <div className="lg:col-span-5 relative group lg:sticky lg:top-24 z-10 w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-stone-50 shadow-2xl border border-stone-100 flex items-center justify-center">

              <div className="absolute inset-0 flex items-center justify-center bg-stone-50/50 z-0">
                <div className="w-8 h-8 border-2 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
              </div>

              <Image
                src={finalImageUrl}
                alt={perfume?.perfumeTitle || "Perfume"}
                fill
                priority
                placeholder="empty"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 z-10"
              />

              <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.05)_100%)] pointer-events-none"></div>
            </div>

            <div className="absolute top-6 left-6 z-30">
              <span className="px-5 py-2 bg-white/90 backdrop-blur-md border border-white/50 text-amber-700 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                {perfume?.category}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400">
                <span>Product</span>
                <span>/</span>
                <span>{perfume?.category}</span>
                <span>/</span>

                <span className="text-stone-800 font-semibold">
                  {perfume?.perfumeTitle}
                </span>
              </nav>

              {/* ========================= */}
              {/* SHARE BUTTONS */}
              {/* ========================= */}

              <div className="flex items-center gap-3 text-stone-400">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mr-1">
                  Share:
                </span>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_CLIENT_URL}/shop/${perfume?._id}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  <FiFacebook className="text-sm" />
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_CLIENT_URL}/shop/${perfume?._id}`,
                  )}&text=${encodeURIComponent(
                    perfume?.perfumeTitle || "Discover this premium fragrance",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  <FiTwitter className="text-sm" />
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_CLIENT_URL}/shop/${perfume?._id}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  <FiLinkedin className="text-sm" />
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_CLIENT_URL}/shop/${perfume?._id}`,
                  )}&text=${encodeURIComponent(
                    perfume?.perfumeTitle || "Discover this premium fragrance",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  <FiSend className="text-sm" />
                </a>
              </div>
            </div>

            {/* Title + Stock + Average Rating */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 leading-tight">
                  {perfume?.perfumeTitle}
                </h1>

                {/* --- Average Rating Summary --- */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex text-amber-400 text-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= Math.round(avgRating) ? (
                          <FaStar />
                        ) : (
                          <FaRegStar />
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-stone-500 font-medium border-l border-stone-200 pl-3">
                    {reviews.length}{" "}
                    {reviews.length === 1 ? "Review" : "Reviews"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 border border-stone-100 rounded-full shrink-0 mt-2 sm:mt-0 w-max">
                <span
                  className={`w-2 h-2 rounded-full ${
                    perfume?.stock === "InStock"
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-rose-500"
                  }`}
                ></span>

                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                  {perfume?.stock === "InStock" ? "In Stock" : "Sold Out"}
                </span>
              </div>
            </div>

            <p className="text-stone-500 text-sm sm:text-base leading-relaxed mb-8 font-light">
              {perfume?.description}
            </p>

            <div className="mb-8 space-y-4">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">
                Performance Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {perfume?.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-3.5 p-4 bg-stone-50/50 rounded-2xl border border-stone-100/80 hover:border-amber-200 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 text-amber-600">
                      <FiAward className="text-base" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-stone-800 uppercase tracking-wide mb-0.5">
                        {feature.title}
                      </span>

                      <p className="text-xs text-stone-500 font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-stone-100 mb-8" />

            <PurchaseOptions
              perfume={perfume}
              basePrice={perfume?.price}
              stock={perfume?.stock}
            />

            <div className="mt-10 p-6 sm:p-8 bg-stone-50 rounded-[2rem] border border-stone-100 space-y-6">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-4">
                Secure Payment & Delivery Methods
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-100">
                  <FiTruck className="text-emerald-600 text-lg" />

                  <div>
                    <span className="text-xs font-bold text-stone-800">
                      Cash On Delivery
                    </span>

                    <p className="text-[10px] text-stone-400">
                      Available Nationwide
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-100">
                  <FiSend className="text-pink-600 text-lg" />

                  <div>
                    <span className="text-xs font-bold text-stone-800">
                      Mobile Banking
                    </span>

                    <p className="text-[10px] text-stone-400">bKash & Nagad</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-100">
                  <FiInfo className="text-blue-600 text-lg" />

                  <div>
                    <span className="text-xs font-bold text-stone-800">
                      Secure Bank Transfer
                    </span>

                    <p className="text-[10px] text-stone-400">Visa & Cards</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-200/60 pt-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                      <FiMapPin className="text-base" />
                    </div>

                    <div>
                      <span className="text-xs font-bold text-stone-800">
                        Delivery Charges
                      </span>

                      <p className="text-[10px] text-stone-400">
                        Standard shipping rates
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 text-xs font-medium">
                    <span className="px-3 py-1.5 bg-stone-50 rounded-lg border border-stone-100">
                      Inside Dhaka:
                      <strong className="ml-1 text-stone-900">BDT 60</strong>
                    </span>

                    <span className="px-3 py-1.5 bg-stone-50 rounded-lg border border-stone-100">
                      Outside Dhaka:
                      <strong className="ml-1 text-stone-900">BDT 120</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 bg-stone-50 rounded-[2rem] border border-stone-100">
              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block mb-2">
                  Top Notes
                </span>

                <p className="text-xs text-stone-700 font-medium leading-relaxed">
                  {perfume?.topNotes || "Not specified"}
                </p>
              </div>

              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block mb-2">
                  Heart Notes
                </span>

                <p className="text-xs text-stone-700 font-medium leading-relaxed">
                  {perfume?.middleNotes || "Not specified"}
                </p>
              </div>

              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block mb-2">
                  Base Notes
                </span>

                <p className="text-xs text-stone-700 font-medium leading-relaxed">
                  {perfume?.baseNotes || "Not specified"}
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-100 pt-8">
              <div className="flex flex-col items-center text-center gap-2 p-2">
                <FiTruck className="text-stone-400 text-xl mb-1" />

                <span className="text-[9px] uppercase font-bold tracking-widest text-stone-600">
                  Fast Delivery
                </span>
              </div>

              <div className="flex flex-col items-center text-center gap-2 p-2">
                <FiShield className="text-stone-400 text-xl mb-1" />

                <span className="text-[9px] uppercase font-bold tracking-widest text-stone-600">
                  100% Authentic
                </span>
              </div>

              <div className="flex flex-col items-center text-center gap-2 p-2">
                <FiInfo className="text-stone-400 text-xl mb-1" />

                <span className="text-[9px] uppercase font-bold tracking-widest text-stone-600">
                  Luxury Packing
                </span>
              </div>

              <div className="flex flex-col items-center text-center gap-2 p-2">
                <FiHeadphones className="text-stone-400 text-xl mb-1" />

                <span className="text-[9px] uppercase font-bold tracking-widest text-stone-600">
                  Fast Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================== */}
      {/* --- NEW: REVIEWS SECTION --- */}
      {/* ========================================== */}
      <section className="bg-stone-50 py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-stone-900 mb-2">
              Customer Reviews
            </h2>
            <p className="text-stone-500 text-sm font-light">
              Real experiences from our esteemed clientele.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">

            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-stone-200 pb-8 md:pb-0 md:pr-8 lg:pr-12">
              <div className="text-center mb-8">
                <h3 className="text-6xl font-serif text-stone-900 leading-none">
                  {avgRating}
                </h3>
                <div className="flex justify-center text-amber-400 text-xl mt-3 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {star <= Math.round(avgRating) ? (
                        <FaStar />
                      ) : (
                        <FaRegStar />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-stone-400 uppercase tracking-widest">
                  Based on {reviews.length} reviews
                </p>
              </div>

              {user ? (
                <form
                  onSubmit={submitReview}
                  className="space-y-5 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-stone-100"
                >
                  <h4 className="text-sm font-bold text-stone-800 text-center uppercase tracking-widest mb-4">
                    Share your thoughts
                  </h4>

                  <div className="flex justify-center gap-1.5 text-3xl cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="transition-colors duration-200"
                      >
                        {star <= (hoverRating || rating) ? (
                          <FaStar className="text-amber-400 drop-shadow-sm" />
                        ) : (
                          <FaRegStar className="text-stone-300 hover:text-amber-300" />
                        )}
                      </div>
                    ))}
                  </div>

                  <textarea
                    rows="4"
                    placeholder="Describe your experience with this fragrance..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-sm bg-stone-50 border border-stone-200 rounded-2xl p-4 outline-none focus:border-amber-400 transition-colors resize-none placeholder:text-stone-400"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full bg-stone-900 hover:bg-amber-600 text-white font-bold text-[10px] uppercase tracking-widest py-4 rounded-xl transition-all duration-300 disabled:opacity-50 hover:cursor-pointer"
                  >
                    {isSubmittingReview ? "Posting..." : "Publish Review"}
                  </button>
                </form>
              ) : (
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 text-center">
                  <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUser className="text-3xl text-stone-300" />
                  </div>
                  <p className="text-sm text-stone-600 mb-6 font-light">
                    Please log in to share your authentic experience with this
                    fragrance.
                  </p>
                  <Link
                    href="/login"
                    className="inline-block bg-white text-stone-900 border border-stone-200 hover:border-amber-500 font-bold text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl transition-colors"
                  >
                    Login Here
                  </Link>
                </div>
              )}
            </div>

            <div className="md:col-span-8 space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {reviews.length === 0 ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-stone-400 py-12 bg-white/50 rounded-[2rem] border border-dashed border-stone-200">
                  <FiAward className="text-5xl mb-4 opacity-20" />
                  <p className="text-sm font-light">
                    Be the first to review this masterpiece.
                  </p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={rev._id}
                    className="bg-white p-6 sm:p-8 rounded-[2rem] border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:border-amber-100"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
                      <div className="flex items-center gap-4">
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
                            {new Date(rev.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-amber-400 text-sm bg-amber-50/50 px-3 py-1.5 rounded-full border border-amber-100/50 w-max">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= rev.rating ? <FaStar /> : <FaRegStar />}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-stone-600 text-sm font-light leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf8f5] py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.25em] block mb-3">
              Olfactory Education
            </span>

            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4 tracking-tight">
              The Art of Perfume Oils
            </h2>

            <p className="text-stone-500 font-light text-sm leading-relaxed">
              Master the application and unlock the hidden secrets of
              concentrated premium fragrance oils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white/40 p-8 rounded-[2.5rem] border border-white/80">
              <span className="font-serif text-4xl text-orange-200 block mb-6">
                I
              </span>

              <h3 className="text-lg font-serif text-stone-900 mb-3">
                Why Choose Perfume Oils?
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed">
                Perfume oils last longer and stay closer to your skin, creating
                a luxurious scent experience.
              </p>
            </div>

            <div className="bg-white/40 p-8 rounded-[2.5rem] border border-white/80">
              <span className="font-serif text-4xl text-orange-200 block mb-6">
                II
              </span>

              <h3 className="text-lg font-serif text-stone-900 mb-3">
                How to Make It Last Longer
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed">
                Apply on pulse points after showering and avoid rubbing wrists.
              </p>
            </div>

            <div className="bg-white/40 p-8 rounded-[2.5rem] border border-white/80">
              <span className="font-serif text-4xl text-orange-200 block mb-6">
                III
              </span>

              <h3 className="text-lg font-serif text-stone-900 mb-3">
                The Occasion Guide
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed">
                Citrus for daytime, Woody & Oud for evening and special events.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e7e5e4;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d6d3d1;
        }
      `}</style>
    </div>
  );
};

export default PerfumeDetailClient;
