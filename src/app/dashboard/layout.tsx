import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";
import NextTopLoader from "nextjs-toploader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full">
      <div className="z-[80] hidden h-full flex-col md:fixed md:inset-y-0 md:flex md:w-72">
        <Sidebar />
      </div>

      <main className="md:pl-72">
        <Navbar />
        <NextTopLoader showSpinner={false} />
        {children}
      </main>
    </div>
  );
}
