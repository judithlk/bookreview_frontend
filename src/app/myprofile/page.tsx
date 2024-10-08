"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  // AlertDialogDescription,
  // AlertDialogHeader,
  // AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import withAuth from "@/components/auth/withAuth";

import {
  useGetUserByIdQuery,
  useDeleteUserMutation,
} from "@/redux/services/users.service";
// import { useGetReviewsByUserQuery } from "@/redux/services/reviews.service";

import { MdOutlineClose } from "react-icons/md";

import moment from "moment";

function MyProfile() {
  const [userJs, setUserJs] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("userInfo");
      const token = localStorage.getItem("token");

      if (user) {
        setUserJs(JSON.parse(user)); // Set the user data to state
      }
      setLoading(false); // Set loading to false after fetching the data
    }
  }, []);

  const { data: userData } = useGetUserByIdQuery(userJs?._id);
  const [deleteUser] = useDeleteUserMutation();

  function logOut() {
    localStorage.clear();
    router.push("/");
  }

  async function handleDelete() {
    try {
      await deleteUser(userJs._id);
      localStorage.clear();
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error || error.message,
      });
    }
  }

  // Show a loading state until `localStorage` data is loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="">
          <div className="flex items-center justify-between p-0">
            <h1 className="text-lg">Review a book</h1>
            <Button
              variant={"ghost"}
              className="p-0 m-0"
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineClose className="size-5 fill-gray-600" />
            </Button>
          </div>
          <div className="w-full flex p-3 py-0">
            <div className="w-[25%]">
              <div className="relative text-center w-full h-[100px] md:h-[150px]">
                <Image
                  src="/bookcover.jfif"
                  alt=""
                  layout="fill"
                  sizes=""
                  objectFit="cover"
                  className="m-auto"
                />
              </div>
            </div>
            <div className="w-[75%] p-2 space-y-3">
              <div>
                <h1 className="text-center">
                  Check out the{" "}
                  <Link
                    href="/allbooks"
                    className="text-blue-800 hover:underline"
                  >
                    books in our community
                  </Link>{" "}
                  and leave a review
                </h1>
              </div>
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-[30%] border"></div>
                <h1 className="text-center">OR</h1>
                <div className="w-[30%] border"></div>
              </div>
              <div>
                <h1 className="text-center">
                  <Link
                    href="/add-book"
                    className="text-blue-800 hover:underline"
                  >
                    Add a book
                  </Link>{" "}
                  and be the first to review it
                </h1>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <main className="relative md:w-[80%] m-auto p-5 px-8 bg-white">
        <div className="flex justify-between items-center py-5">
          <h1 className="text-[1.1rem] md:text-xl">
            Welcome, {userData?.username}
          </h1>
          <Button variant="ghost" onClick={() => logOut()}>
            Logout
          </Button>
        </div>
        <div className="bg-gray-100 rounded-md p-4 px-2 space-y-6">
          <div className="relative rounded-full border-4 text-center w-[100px] md:w-[200px] h-[100px] md:h-[200px]">
            <Image
              src={userData?.imageUrl}
              alt="User profile photo"
              fill
              className="rounded-full m-auto object-cover"
            />
          </div>
          <div className="space-y-4 md:space-y-0 md:flex justify-between">
            <div className="space-y-3">
              <h1 className="text-sm sm:text-base">
                Email address: {userData?.email}
              </h1>
              <h1 className="text-sm sm:text-base">
                Active since:{" "}
                {moment(userData?.createdAt).format("DD MMM, YYYY")}
              </h1>
              <h1 className="text-sm sm:text-base">
                Number of Reviews: {userData?.numberOfReviews}
              </h1>
            </div>
            <div className="justify-between">
              <Button variant="ghost" className="text-blue-700 underline">
                Update Profile
              </Button>
              <Button
                variant="ghost"
                className="text-red-700 underline"
                onClick={() => {
                  toast({
                    variant: "destructive",
                    title: "Warning!",
                    description:
                      "You are about to delete your account. NOTE: This action is irreversible!",
                    action: (
                      <Button
                        onClick={() => handleDelete}
                        className="bg-transparent border"
                      >
                        Delete
                      </Button>
                    ),
                  });
                }}
              >
                Delete Profile
              </Button>
            </div>
          </div>
          {/* <div>
            <h2 className="font-semibold text-xl">My reviews</h2>
              {userReviews?.map((review: any) => (
                <div className="my-2 border-b pb-3" key={review._id}>
                <div className="flex justify-between">
                  <div>
                    <h2 className="italic">
                      {review?.createdAt
                        ? moment(review.createdAt).format("DD MMM YYYY")
                        : "No date"}
                    </h2>
                  </div>
                 
                </div>

                <p>{review?.body}</p>

              </div>
              ))}
            <div className="flex space-x-1 items-center">

              <p>No reviews yet.</p>
              <Button
                variant="ghost"
                className="text-blue-700 underline"
                onClick={() => setIsOpen(true)}
              >
                Add a review
              </Button>
            </div>
          </div> */}
        </div>
      </main>

      <Toaster />
    </>
  );
}

export default withAuth(MyProfile);
