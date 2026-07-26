import React from "react";
import CartClient from "./CartClient";

export const metadata = {
  title: "Checkout Your Cart | AS Fragrance",
  description: "Review your selected premium perfumes and complete your order. Safe shipping nationwide across Bangladesh.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartClient />;
}