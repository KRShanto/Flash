"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

type Route = {
  label: string;
  icon: any;
  href: string;
  color: string;
};

const routes: Route[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/dashboard/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/dashboard/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/dashboard/video",
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/dashboard/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/dashboard/code",
    color: "text-green-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-slate-500",
  },
];

export default function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full text-white bg-gray-900">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-12 h-12 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className="text-2xl font-bold" style={montserrat.style}>
            Flash
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className="text-sm group flex p-3 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
