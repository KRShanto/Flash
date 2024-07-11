import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount, resolution } = body;

    console.log("[CHAT_REQUEST]: ", body);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    const urls: string[] = [];
    const promises: Promise<void>[] = [];

    for (let i = 0; i < parseInt(amount); i++) {
      const promise = (async () => {
        const response = await openai.images.generate({
          prompt,
          model: "dall-e-3",
          n: 1,
          size: resolution,
        });

        urls.push(response.data[0].url || "");
      })();

      promises.push(promise);
    }

    await Promise.all(promises);

    return NextResponse.json(urls);
  } catch (error) {
    console.log("[CHAT_ERROR]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
