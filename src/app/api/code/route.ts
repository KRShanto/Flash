import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { checkApiLimit, increaseApiCount } from "@/lib/api-limit";

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

    const freeTrail = await checkApiLimit("Code");

    if (!freeTrail) {
      return new NextResponse("You have reached the limit of free code API", {
        status: 403,
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a code generator chatbot. Your name is Flash. You can chat with the user and discuss problems. You can also generate code snippets. Use markdown when generating code snippets.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    await increaseApiCount("Code");

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log("[CODE_ERROR]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
