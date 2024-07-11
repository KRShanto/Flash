import { Avatar } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

export default function UserAvatar() {
  const { user } = useUser();

  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={user?.imageUrl} alt={user?.fullName || "user image"} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
