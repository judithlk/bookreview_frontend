"use client";
import { useState } from "react";
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

import withAuth from "@/components/auth/withAuth";

import { useGetUserByIdQuery } from "@/redux/services/users.service";

import { MdOutlineClose } from "react-icons/md";

import moment from "moment";

function MyProfile() {
  const user: any = localStorage.getItem("userInfo");
  const userJs: any = JSON.parse(user);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {data: userData} = useGetUserByIdQuery(userJs._id);

  function logOut() {
    localStorage.clear();
    // toast({
    //   title: "Success",
    //   description: "Successfully logged out",
    // });
    router.push("/");
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
          <h1 className="text-xl">Welcome, khaleesi</h1>
          <Button variant="ghost" onClick={() => logOut()}>Logout</Button>
        </div>
        <div className="bg-gray-100 rounded-md p-4 px-2 space-y-6">
          <div className="relative rounded-full border-4 border-[#FFD700] text-center w-[100px] md:w-[200px] h-[100px] md:h-[200px]">
            <Image
              src="/bookcover.jfif"
              alt=""
              layout="fill"
              sizes=""
              objectFit="cover"
              className="rounded-full m-auto"
            />
          </div>
          <div className="md:flex justify-between">
            <div className="space-y-3">
              <h1 className="text-sm sm:text-base">Email address: {userData?.email}</h1>
              <h1>Active since: {moment(userData?.createdAt).format("DD MMM, YYYY")}</h1>
              <h1>Number of Reviews: {userData?.numberOfReviews}</h1>
            </div>
            <div>
            <Button variant="ghost" className="text-blue-700 underline">
              Update Profile
            </Button>
            <Button variant="ghost" className="text-red-700 underline">
              Delete Profile
            </Button>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-xl">My reviews</h2>
            <div className="flex space-x-1 items-center">
              <p>No reviews yet.</p>
              <Button variant="ghost" className="text-blue-700 underline" onClick={() => setIsOpen(true)}>Add a review</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default withAuth(MyProfile);