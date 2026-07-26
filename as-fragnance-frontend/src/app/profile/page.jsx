import React from "react";
import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "My Account | AS Fragrance",
  description: "Manage your personal details, shipping information, and track fragrance orders at AS Fragrance.",
  alternates: {
    canonical: "/profile",
  },
  robots: {
    index: false,
    follow: false,
  }
};

export default function ProfilePage() {
  return <ProfileClient />;
}