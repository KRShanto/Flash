"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  BarChart,
  Code,
  Database,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
    href: "/dashboard/chat",
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
    label: "Storage",
    icon: Database,
    href: "/dashboard/storage",
    color: "text-red-500",
  },
  {
    label: "Usage",
    icon: BarChart,
    href: "/dashboard/usage",
    color: "text-cyan-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-slate-500",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-gray-900 py-4 text-white">
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="mb-14 flex items-center pl-3">
          <div className="relative mr-4 h-12 w-12">
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
              className={cn(
                "group flex w-full justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white",
                route.href === pathname
                  ? "bg-white/10 text-white"
                  : "text-zinc-400",
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
