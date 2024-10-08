"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import addBook from "@/api/addBook";
import { useGetGenresQuery } from "@/redux/services/genres.service";

import MoonLoader from "react-spinners/MoonLoader";

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
  const { toast } = useToast();

  const { data: genres } = useGetGenresQuery();

  const [isLoading, setIsLoading] = useState<any>(false);

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await addBook(values);
      toast({
        title: "Success",
        description: "Book added successfully",
      });
      router.push(`/book/${response?.data?.title + "-" + response?.data?._id}`);
    } catch (error: any) {
      // console.log(error.status)
      if(error.status == "401") {

        toast({
          title: "Failed to add review",
          description: "Create an account first",
          action: <Link href="/signin/new-user" className="font-semibold hover:text-blue-800">Go</Link>
        });
      }
    }
    setIsLoading(false);
  }
  return (
    <>
      <main className="relative md:flex w-[95%] m-auto justify-between p-5 px-8 bg-white">
        <div className="space-y-5 w-[82%] sm:w-[80%] lg:w-[60%] m-auto">
          <h1 className="text-2xl font-semibold text-center">Add a book</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-5 sm:space-y-0 sm:flex justify-evenly">
                <div className="space-y-5 ">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="sm:w-[200px] lg:w-[250px]"
                          />
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
                          <Input
                            {...field}
                            className="sm:w-[200px] lg:w-[250px]"
                          />
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
                          <Textarea
                            {...field}
                            className="resize-none sm:w-[200px] lg:w-[250px]"
                          />
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
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="sm:w-[200px] lg:w-[250px]">
                              <SelectValue placeholder="Select genre" />
                            </SelectTrigger>
                            <SelectContent>
                              {genres?.map((genre: any) => (
                                <SelectItem
                                  key={genre?._id}
                                  value={genre?._id}
                                  className="capitalize"
                                >
                                  {genre.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                          <Input
                            {...field}
                            className="sm:w-[200px] lg:w-[250px]"
                          />
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
                            className="sm:w-[200px] lg:w-[250px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                {isLoading ? (
                  <Button type="submit" disabled>
                    <MoonLoader size={22} color="#fff" />
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Toaster />
    </>
  );
}
