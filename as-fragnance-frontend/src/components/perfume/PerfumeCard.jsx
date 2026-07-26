import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

const PerfumeCard = ({ perfume }) => {

  const displayFeatures = perfume?.features?.slice(0, 2) || [];

  const hasValidImage = typeof perfume?.imageUrl === 'string' && perfume.imageUrl.trim().length > 0;
  const finalImageUrl = hasValidImage ? perfume.imageUrl : "/assets/defaultPerfumeImage.png";

  return (
    <Link href={`/shop/${perfume?._id}`} className="block group outline-none h-full">

      <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/80 hover:border-orange-400/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.18)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col h-full relative transform group-hover:-translate-y-3 group-hover:scale-[1.02] active:scale-95">

        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl group-hover:bg-orange-400/20 transition-all duration-500 pointer-events-none z-0"></div>

        <div className="relative h-[300px] sm:h-[340px] w-full bg-stone-50/40 overflow-hidden border-b border-white/40 z-10">

          <Image
            src={finalImageUrl}
            alt={perfume?.perfumeTitle || "Perfume Image"}
            fill
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 z-10"
          />

          <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.02)_100%)] group-hover:bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(249,115,22,0.05)_100%)] transition-all duration-500 pointer-events-none"></div>

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>

          <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-30">
            <span className="px-3.5 py-1.5 bg-white/50 backdrop-blur-md border border-white/60 text-stone-800 text-[9px] font-bold uppercase tracking-widest rounded-xl shadow-xs">
              {perfume?.category}
            </span>

            <div className="px-3.5 py-1.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl shadow-xs flex items-center gap-1.5 justify-center">
               <span className={`w-2 h-2 rounded-full ${perfume?.stock === "InStock" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" : "bg-rose-500"}`}></span>
               <span className="text-stone-800 text-[9px] font-bold uppercase tracking-wider">
                 {perfume?.stock === "InStock" ? "In Stock" : perfume?.stock === "PreOrder" ? "Pre Order" : "Sold Out"}
               </span>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-30 flex flex-col gap-2">
             {perfume?.topNotes && (
               <div>
                 <span className="text-orange-300 font-bold uppercase tracking-widest text-[9px] block mb-0.5">Top Notes</span>
                 <p className="text-white text-xs line-clamp-1 font-light tracking-wide">{perfume.topNotes}</p>
               </div>
             )}
             {perfume?.baseNotes && (
               <div>
                 <span className="text-orange-300 font-bold uppercase tracking-widest text-[9px] block mb-0.5">Base Notes</span>
                 <p className="text-white text-xs line-clamp-1 font-light tracking-wide">{perfume.baseNotes}</p>
               </div>
             )}
          </div>
        </div>

        <div className="p-6 flex flex-col grow bg-white/40 backdrop-blur-xl relative overflow-hidden z-10">

          <div className="absolute -bottom-10 -right-10 w-48 h-48 z-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-6">
             <Image
               src="https://i.ibb.co.com/kjwcHGr/floral.png"
               alt="luxury texture"
               fill
               sizes="150px"
               className="object-contain grayscale mix-blend-multiply"
             />
          </div>

          <div className="relative z-10 flex flex-col grow">

            <div className="flex justify-between items-center gap-3 mb-4">
              <h3 className="text-xl font-serif text-stone-900 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
                {perfume?.perfumeTitle}
              </h3>

              <div className="flex items-center shrink-0 bg-white/80 border border-white/10 px-3.5 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-orange-200 group-hover:bg-orange-50/80 transition-all duration-300">
                <span className="text-base font-semibold text-stone-950 group-hover:text-orange-600 transition-colors tracking-tight">
                  ৳{Number(perfume?.price || 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-500 font-light line-clamp-2 leading-relaxed mb-5">
              {perfume?.description}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {displayFeatures.map((feature, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 bg-white/70 border border-stone-100 text-stone-600 rounded-xl font-medium uppercase tracking-wider group-hover:border-orange-100 group-hover:bg-white"
                >
                  <FiCheckCircle className="text-orange-500 text-xs shrink-0" />
                  <span className="line-clamp-1">{feature.title}</span>
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-stone-100/60 flex items-center justify-between">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest group-hover:text-orange-600 transition-colors duration-300">
                Discover Fragrance
              </span>

              <div className="w-9 h-9 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-stone-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 transform group-hover:rotate-45 shadow-xs">
                <FiArrowUpRight className="text-base" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default PerfumeCard;