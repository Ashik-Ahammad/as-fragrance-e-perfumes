import React from "react";
import AddPerfumesClient from "./AddPerfumesClient";

export const metadata = {
  title: "Entry New Fragrance | AS Fragrance Admin",
  description: "Admin panel to add a new masterpiece perfume or premium attar to the AS Fragrance luxury collection.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AddPerfumesPage() {
  return <AddPerfumesClient />;
}