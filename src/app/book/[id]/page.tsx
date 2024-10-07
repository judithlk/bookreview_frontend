"use client";

import React from "react";
// import { useState } from "react";
// import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useToast } from "@/components/ui/use-toast";

import { useGetBookByIdQuery } from "@/redux/services/books.service";
import { useGetReviewsByBookQuery } from "@/redux/services/reviews.service";
import addReview from "@/api/addReview";

import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";

import moment from "moment";

const formSchema = z.object({
  body: z.string().min(1, {
    message: "Review cannot be null",
  }),
});

export default function Book(
  // { params }: { params: { id: string } }
) {
  //   const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  //   const searchParams = useSearchParams()

  const id = pathname.split("-").pop();
  const { data: bookData } = useGetBookByIdQuery(id);
  const { data: bookReviews, refetch } = useGetReviewsByBookQuery(id);

  // const user: any = localStorage.getItem("userInfo");
  // const userJs: any =JSON.parse(user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    try {
      const load = {
        book: id,
        body: values.body,
      };
      const result: any[] = await addReview(load);
      refetch();
      console.log(result);
      // setIsOpen(false);
      // toast({
      //   title: "Success",
      //   description: "Successfully updated product",
      // });
    } catch (error: any) {
      console.log(error);
      // toast({
      //   title: "Error",
      //   description: "Failed to update product",
      // });
    }
  }

  //   const handleDelete = async () => {
  //     try {
  //       await deleteProduct(id)
  //       console.log("done")
  //       toast({
  //         title: "Success",
  //         description: "Successfully deleted",
  //       })
  //       router.replace('/dashboard/products')
  //     } catch (error: any) {
  //         console.log(error);
  //         toast({
  //             title: "Error",
  //             description: "Failed to delete",
  //           })
  //     }
  //   };
  return (
    <>
      <main className="relative w-[95%] md:w-[70%] m-auto p-5 px-8 bg-white">
        <div className="sm:flex  space-y-3 justify-between w-full">
          <div className="relative w-[130px] m-auto sm:m-0 sm:w-[40%] lg:w-[25%] text-center h-[200px] md:h-[350px]">
            <Image
              src={bookData?.imageUrl || "/bookcover.jfif"}
              alt={bookData?.title || "Book title"}
              layout="fill"
              sizes=""
              objectFit="cover"
              className="m-auto"
            />
          </div>
          <div className="sm:w-[55%] lg:w-[65%] space-y-5">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold capitalize">
                {bookData?.title}
              </h1>
              <h2>{bookData?.author}</h2>
              <h3>Synopsis</h3>
              <p>{bookData?.synopsis}</p>
            </div>

            <ScrollArea className="h-[300px] w-full border p-3 rounded-sm">
              <h1 className="mb-3">Reviews</h1>
              <hr />
              {!bookReviews ? (
                <div className="sm:flex sm:space-x-1 justify-center my-2">
                  <h1 className="">No reviews yet. </h1>
                  <h1 className="text-purple-800">
                    Be the first to leave a review.{" "}
                  </h1>
                </div>
              ) : (
                <></>
              )}
              {bookReviews?.map((review: any) => (
                <div className="my-2 border-b pb-3" key={review._id}>
                  <div className="flex justify-between">
                    <div>
                      <h2>{review?.username}</h2>
                      <h2 className="italic">
                        {review?.createdAt
                          ? moment(review.createdAt).format("DD MMM YYYY")
                          : "No date"}
                      </h2>
                    </div>
                    <div className="flex space-x-3 items-center">
                      <Button variant="ghost" className="w-fit p-1">
                        <BiSolidUpvote className="size-6 fill-green-300 hover:fill-green-600 cursor-pointer" />
                        {review.upvotes}
                      </Button>
                      <Button variant="ghost" className="w-fit p-1">
                        <BiSolidDownvote className="size-6 fill-red-300 hover:fill-red-600 cursor-pointer" />
                        {review.downvotes}
                      </Button>
                    </div>
                  </div>

                  <p>{review?.body}</p>

                </div>
              ))}
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex items-center space-x-2"
                  >
                    <FormField
                      control={form.control}
                      name="body"
                      render={({ field }) => (
                        <FormItem className="w-[95%] md:w-[90%]">
                          {/* <FormLabel>Review</FormLabel> */}
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Leave a review"
                              className="resize-none placeholder:italic"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" variant="ghost">
                      <IoMdSend className="size-6 lg:size-8" />
                    </Button>
                  </form>
                </Form>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </>
  );
}
