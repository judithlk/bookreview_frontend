"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import SubNavbar from "./SubNavbar";

import {
  IoLibrarySharp,
  IoPerson,
  IoInformationCircleOutline,
  IoSearch,
} from "react-icons/io5";
import { MdRateReview } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/signin");

  const user = localStorage.getItem("userInfo");
  const userJs = JSON.parse(user);

  return (
    <div className={`${hideNavbar ? "hidden" : "block"} bg-[#5D8AA8]`}>
      <div className="flex justify-between items-center m-auto sm:w-[80%] lg:w-[50%] p-3">
        <Link href="/">
          <div className="flex space-x-2 items-center">
            <h1 className="text-[1.8rem]">Rivu</h1>
            <MdRateReview className="size-8" />
          </div>
        </Link>

        {/* <Link href="#">
      <div className="flex space-x-2 items-center">
      <IoPerson className="size-5"/>
      <h1>My Profile</h1>
      </div>
      </Link> */}
        <div className="flex space-x-10">
          <Link href="/allbooks">
            <div className="flex space-x-2 items-center hover:text-gray-300 hover:fill-gray-300">
              <IoLibrarySharp className="size-4" />
              <h1>All Books</h1>
            </div>
          </Link>

          {user ? (
            <Link href="/myprofile">
              <div className="flex space-x-2 items-center hover:text-gray-300 hover:fill-gray-300">
              <IoPerson className="size-4" />
              <h1 className="">{userJs?.username}</h1>{" "}
              </div>
            </Link>
          ) : (
            <Link href="/signin">
              <h1 className="hover:underline">Login/Signup</h1>{" "}
            </Link>
          )}
        </div>
      </div>
      <SubNavbar />
    </div>
  );
}
