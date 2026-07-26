import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/app/cart/CartSidebar";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"), // update with live domain

  title: {
    default: "AS Fragrance | Premium Perfume & Attar Shop in Bangladesh",
    template: "%s | AS Fragrance",
  },

  description:
    "Discover the finest collection of luxury perfumes, authentic attars, and premium fragrances at AS Fragrance in Dhaka, Bangladesh. Find your signature scent today.",

  keywords: [
    "AS Fragrance",
    "AS Perfumes",
    "AS Fragrance BD",
    "AS Fragrance Dhaka",
    "best perfume in bangladesh",
    "perfume price in bangladesh",
    "best perfume for men in bd",
    "best perfume for women dhaka",
    "original perfume shop dhaka",
    "authentic perfume shop bangladesh",
    "branded perfume price in bd",
    "long lasting perfume bangladesh",
    "best attar in bangladesh",
    "attar price in bd",
    "premium attar shop dhaka",
    "long lasting attar bd",
    "original arabic attar bangladesh",
    "dubai attar dhaka",
    "best attar for jummah",
    "alcohol free perfume bd",
    "oud attar price in bangladesh",
    "buy perfume online bd",
    "buy attar online bangladesh",
    "best summer perfume dhaka",
    "luxury fragrances bangladesh",
    "best budget perfume in bd",
    "gift perfume for men dhaka",
  ],

  authors: [{ name: "Ashik Ahammad" }],
  creator: "Ashik Ahammad",
  publisher: "AS Fragrance",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AS Fragrance",
    title: "AS Fragrance | Premium Perfume & Attar Shop",
    description:
      "Explore the finest luxury perfumes and authentic attars in Dhaka, Bangladesh.",
    images: [
      {
        url: "/assets/logo-as.png",
        width: 1200,
        height: 630,
        alt: "AS Fragrance Official Logo",
      },
    ],
    emails: ["rahatkhanrabby06@gmail.com"],
    phoneNumbers: ["+8801575606733"],
    countryName: "Bangladesh",
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AS Fragrance",
    "image": "https:localhost:3000/assets/logo-as.png",
    "description": "Best premium perfume and attar shop in Bangladesh.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "BD"
    },
    "telephone": "+8801575606733",
    "sameAs": [
      "https://www.facebook.com/ashshamsu01",
      "https://www.instagram.com/ashshamsu25/",
      "https://wa.me/8801575606733"
    ]
  };

  return (
    <html
      data-theme="light"
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <CartSidebar />
        <main>{children}</main>
        <Footer></Footer>
        <WhatsAppWidget></WhatsAppWidget>
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}