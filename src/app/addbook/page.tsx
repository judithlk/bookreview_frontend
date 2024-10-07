"use client";

// import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import addBook from "@/api/addBook";

const formSchema = z.object({
  title: z.string().min(1, { message: "Book title cannot be null" }),
  author: z.string().min(1, {
    message: "Author cannot be null",
  }),
  synopsis: z.string(),
  genre: z.string(),
  year: z.string(),
  bookCover: z.instanceof(File),
});

export default function AddBook() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      synopsis: "",
      genre: "",
      year: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      const response = await addBook(values);
      if(response.data) {
        router.push(`/book/${response?.data?.title + "-" + response?.data?._id}`);
      } else if(response.message) {
        console.log(response.message)
      }
    } catch (error: any) {
      console.error("Failed to add book:", error);
    }
  }
  return (
    <>
      <main className="relative md:flex w-[95%] m-auto justify-between p-5 px-8 bg-white">
        <div className="space-y-4 w-[60%] m-auto">
          <h1>Add a book</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex justify-between">
                <div className="space-y-5 ">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="synopsis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Synopsis</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bookCover"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Book Cover</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              if (e.target.files) {
                                field.onChange(e.target.files[0]); // Ensure the file object is set correctly
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button type="submit">Sign up</Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}
