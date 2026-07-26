
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf9f6] px-6 py-16 text-[#171717]">
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8dfd3]/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Small Label */}
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-[#8a735c]">
          The Scent Has Disappeared
        </p>

        {/* 404 */}
        <h1 className="font-serif text-[clamp(7rem,25vw,15rem)] font-light leading-[0.75] tracking-[-0.06em] text-[#1d1b19]">
          404
        </h1>

        {/* Divider */}
        <div className="mx-auto my-10 h-px w-16 bg-[#b9a58d]" />

        {/* Heading */}
        <h2 className="font-serif text-3xl font-light tracking-tight sm:text-4xl">
          This fragrance cannot be found.
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6d6862] sm:text-base">
          The page you are looking for may have been moved, renamed, or
          temporarily disappeared. Let us guide you back to something
          beautifully familiar.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[#1d1b19] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#8a735c] hover:shadow-lg"
          >
            Back to Home
          </Link>

          <Link
            href="/shop"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-[#d5cec5] bg-transparent px-7 py-3.5 text-sm font-medium text-[#1d1b19] transition-all duration-300 hover:border-[#1d1b19] hover:bg-white"
          >
            Explore Fragrances
          </Link>
        </div>

        {/* Bottom Quote */}
        <p className="mt-14 font-serif text-sm italic text-[#9a9187]">
          “Every scent tells a story.”
        </p>
      </div>
    </main>
  );
}

