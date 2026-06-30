import { Navbar } from "@/components/marketing-general/navbars/navbar";
import React from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center mx-20">
      <Navbar />
      {children}
    </div>
  );
}
