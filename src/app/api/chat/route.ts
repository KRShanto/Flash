import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a talkative chatbot. Your job is to feel users better. Your name is Flash.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log("[CHAT_ERROR]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
