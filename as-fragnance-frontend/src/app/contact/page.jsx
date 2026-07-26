import React from "react";
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us | AS Fragrance",
  description: "Have questions about our luxury perfumes or authentic attars? Get in touch with AS Fragrance in Dhaka, Bangladesh. Visit our store or drop a message.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Get In Touch | AS Fragrance Bangladesh",
    description: "Whether you need assistant with your order or help finding your signature scent, our team is ready to answer all your questions.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}