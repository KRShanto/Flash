"use client";

import Heading from "@/components/Heading";
import { Code, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import ReactMarkdown from "react-markdown";

// TODO: reuse the chat and code components
export default function ConversationPage() {
  const { user } = useUser();

  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // add user message
      setMessages((prev) => [...prev, { role: "user", content: data.prompt }]);

      const response = await axios.post("/api/code", {
        prompt: data.prompt,
      });

      // add assistant message
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data },
      ]);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code snippets for your projects."
        icon={Code}
        bgColor="bg-green-700/10"
        iconColor="text-green-700"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 text-base outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Ask me any code you want to generate"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" loading={isLoading} size={20} />
                ) : (
                  <>
                    <Bot className="mr-2 h-6 w-6 text-green-500" />
                    Generate
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* TODO: display something when messages are empty */}
        <div className="mt-4 space-y-4">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-full flex-col gap-2 rounded-lg p-4",
                  message.role === "user"
                    ? "border border-black/10 bg-white"
                    : "bg-muted",
                )}
              >
                <h3 className="flex items-center gap-2">
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <span className="text-lg font-semibold">
                    {message.role === "user" ? user?.fullName : "Flash"}
                  </span>
                </h3>
                <ReactMarkdown
                  components={{
                    code: ({ node, ...props }) => (
                      <code {...props} className="rounded-lg bg-black/10 p-1" />
                    ),
                    pre: ({ node, ...props }) => (
                      <div className="my-2 w-full overflow-auto rounded-lg bg-black/10 p-2">
                        <pre {...props} />
                      </div>
                    ),
                  }}
                  className="overflow-hidden text-sm leading-7"
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}