import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

export default function BotAvatar() {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage className="p-1" src="/logo.png" />
    </Avatar>
  );
}
