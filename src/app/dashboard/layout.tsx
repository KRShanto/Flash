import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 flex-col md:fixed md:inset-y-0 z-[80] ">
        <Sidebar />
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
