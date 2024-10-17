"use client";

import { Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function UnderConstruction() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-center shadow-xl">
        <div className="mb-6 flex justify-center">
          <Settings className="animate-spin-slow h-16 w-16 text-blue-600" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Coming Soon</h1>
        <p className="mb-8 text-xl text-gray-600">
          Our website is under construction. We&lsquo;re working hard to bring
          you something amazing.
        </p>
        <div className="mb-8">
          <Progress value={75} className="h-2 w-full" />
          <p className="mt-2 text-sm text-gray-500">
            Development Progress: 75%
          </p>
        </div>
        <p className="text-sm text-gray-500">
          We appreciate your patience as we put the finishing touches on our
          site.
        </p>
      </div>
    </div>
  );
}
