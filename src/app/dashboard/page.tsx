"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import Conversation from "@/../public/animations/conversation.json";
import Code from "@/../public/animations/code.json";
import Video from "@/../public/animations/video.json";
import Music from "@/../public/animations/music.json";
import Image from "@/../public/animations/image.json";
import Link from "next/link";

const tools = [
  {
    title: "Chat with AI",
    description: "Chat with the AI. Ask anything and get the answer",
    animation: Conversation,
    href: "/dashboard/conversation",
  },
  {
    title: "Generate Code",
    description: "Generate code for your project",
    animation: Code,
    href: "/dashboard/code",
  },
  {
    title: "Generate Music",
    description: "Generate a music you like",
    animation: Music,
    href: "/dashboard/music",
  },
  {
    title: "Generate Video",
    description: "Imagine a video and get it generated",
    animation: Video,
    href: "/dashboard/video",
  },
  {
    title: "Generate Image",
    description: "Generate an image you like",
    animation: Image,
    href: "/dashboard/image",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 space-y-4">
        <h2 className="text-center text-2xl font-bold md:text-4xl">
          Your All in AI buddy is here
        </h2>

        <p className="text-center text-sm font-light text-muted-foreground md:text-lg">
          Chat with the smartest AI - Expeience the power of AI
        </p>
      </div>
      {/* 3 column grid */}
      <div className="mt-28 flex flex-wrap justify-center gap-4 md:grid-cols-3 md:gap-8">
        {tools.map((tool, index) => (
          <Link
            href={tool.href}
            key={index}
            className="h-[200px] w-[400px] rounded-lg shadow-md transition hover:shadow-lg"
          >
            <Lottie animationData={tool.animation} className="h-[100px]" />
            <h3 className="text-center text-xl font-bold">{tool.title}</h3>
            <p className="text-center text-sm font-light text-muted-foreground md:text-lg">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
