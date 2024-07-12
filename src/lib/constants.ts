import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Please enter a prompt",
  }),
});

export const imageFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Please enter a prompt",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const resolutionOptions = ["1024x1024", "1024x1792", "1792x1024"];

export const MAX_MEDIA_FREE_COUNTS = 5;
export const MAX_CHAT_FREE_COUNTS = 50;
export const MAX_CODE_FREE_COUNTS = 20;
