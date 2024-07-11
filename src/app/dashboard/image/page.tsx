"use client";

import Heading from "@/components/Heading";
import { Download, ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { imageFormSchema, resolutionOptions } from "@/lib/constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function ImagePage() {
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof imageFormSchema>>({
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "1024x1024",
    },
    resolver: zodResolver(imageFormSchema),
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof imageFormSchema>) {
    try {
      setImages([]);

      const response = await axios.post("/api/image", data);
      const urls = response.data;

      setImages(urls);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Generate images you can imagine."
        icon={ImageIcon}
        bgColor="bg-pink-700/10"
        iconColor="text-pink-700"
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
                  <FormItem className="col-span-12 lg:col-span-6">
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
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Photo</SelectItem>
                        <SelectItem value="2">2 Photos</SelectItem>
                        <SelectItem value="3">3 Photos</SelectItem>
                        <SelectItem value="4">4 Photos</SelectItem>
                        <SelectItem value="5">5 Photos</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative aspect-square">
                  <Image src={src} alt="Generated image" fill />
                </div>
                <div className="p2">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => window.open(src, "_blank")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
