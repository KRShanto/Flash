import { auth } from "@clerk/nextjs/server";

import prisma from "./db";
import {
  MAX_CHAT_FREE_COUNTS,
  MAX_CODE_FREE_COUNTS,
  MAX_MEDIA_FREE_COUNTS,
} from "./constants";
import { ApiType } from "@prisma/client";

export async function increaseApiCount(type: ApiType) {
  const { userId } = auth();

  if (!userId) return;

  const userApiLimit = await prisma.userApiLimit.findFirst({
    where: {
      userId,
      type,
    },
  });

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: {
        id: userApiLimit.id,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prisma.userApiLimit.create({
      data: {
        count: 1,
        userId,
        type,
      },
    });
  }
}

export async function checkApiLimit(type: ApiType) {
  const { userId } = auth();

  if (!userId) return false;

  const userApiLimit = await prisma.userApiLimit.findFirst({
    where: {
      userId,
      type,
    },
  });

  if (!userApiLimit) {
    return true;
  } else if (type === "Image" || type === "Video" || type === "Music") {
    return userApiLimit.count < MAX_MEDIA_FREE_COUNTS;
  } else if (type === "Chat") {
    return userApiLimit.count < MAX_CHAT_FREE_COUNTS;
  } else if (type === "Code") {
    return userApiLimit.count < MAX_CODE_FREE_COUNTS;
  }

  return false;
}
