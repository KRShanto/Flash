"use client";

import Heading from "@/components/Heading";
import { Music } from "lucide-react";
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

export default function MusicPage() {
  const [audio, setAudio] = useState<string | null>();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setAudio(null);

      const response = await axios.post("/api/music", data);

      setAudio(response.data.audio);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Generate musics you can imagine."
        icon={Music}
        bgColor="bg-emerald-500/10"
        iconColor="text-emerald-500"
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
                        placeholder="Ask me any music you want to generate"
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
          {audio && (
            <audio controls className="mt-8 w-full">
              <source src={audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}
