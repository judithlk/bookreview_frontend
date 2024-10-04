import Link from "next/link";
import Image from "next/image";

import { FaTags, FaArrowTrendUp, FaRegClock } from "react-icons/fa6";
import { FaFireAlt, FaFire } from "react-icons/fa";
import { IoHeart, IoHeartDislike } from "react-icons/io5";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const number = [1, 2, 3, 4, 5];

  return (
    <>
      <main className="relative md:flex lg:w-[90%] m-auto justify-between md:p-5 md:px-8">
        <div className="space-y-12 md:w-[72%] lg:w-[72%] p-5 md:px-8 ">
          <div className="space-y-4 w-full overflow-hidden p-5 hover:bg-gray-300 hover:bg-opacity-25">
            <div className="flex space-x-2 items-center p-2 rounded-sm">
              <FaFire className="size-8 fill-white" />
              <h1 className="text-[1.6rem] text-white">Trending Books</h1>
            </div>
            <div className="grid grid-flow-col auto-cols-[minmax(120px,_1fr)] sm:auto-cols-[minmax(180px,_1fr)] gap-4 overflow-x-auto no-scrollbar scroll-smooth">
              {number.map((item, index) => (
                <Link href="#" key={index}>
                  <div className="relative bg-gray-50 p-1 group hover:bg-gray-800 transition duration-300 ease-in-out">
                    <div className="relative">
                      <div className="relative text-center w-full h-[150px] sm:h-[200px]">
                        <Image
                          src="/bookcover.jfif"
                          alt=""
                          fill
                          // sizes=""
                          // objectFit="cover"
                          className="m-auto object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gray-950 opacity-0 group-hover:opacity-90 transition duration-300 ease-in-out"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out text-white p-2">
                        <div className="space-y-3">
                          <h1 className="font-serif text-xl">
                            The Picture of Dorian Gray
                          </h1>
                          <h2>Oscar Wilde</h2>
                          <h2 className="italic">300 reviews</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="flex space-x-2 items-center p-2 rounded-sm">
              <FaRegClock className="size-8 fill-white" />
              <h1 className="text-[1.6rem] text-white">Latest Reviews</h1>
            </div>
            <div className="md:flex justify-between bg-gray-100 p-6 md:p-4 space-y-5">
              <div className="w-[65%] md:w-[25%]">
                <div className="relative text-center w-full h-[180px] sm:h-[250px]">
                  <Image
                    src="/bookcover.jfif"
                    alt=""
                    // layout="fill"
                    // sizes=""
                    // objectFit="cover"
                    fill
                    className="m-auto object-cover"
                  />
                </div>
              </div>
              <div className="md:w-[70%] space-y-4">
                <div>
                  <h1 className="font-serif text-xl font-semibold">
                    Dorian Gray
                  </h1>
                  <h2>Uploaded two weeks ago</h2>
                </div>
                <hr />
                <div className="space-y-3">
                  <h2>
                    "The most amazing book I have read this year!"{" "}
                    <i>- Anonymous reviewer</i>
                  </h2>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">02 Sept, 2024</h3>
                    <div className="flex space-x-3 items-center">
                      <Button variant="ghost" className="w-fit p-1">
                        <BiSolidUpvote className="size-6 fill-green-300 hover:fill-green-600 cursor-pointer" />{" "}
                        Yay{" "}
                      </Button>
                      <Button variant="ghost" className="w-fit p-1">
                        <BiSolidDownvote className="size-6 fill-red-300 hover:fill-red-600 cursor-pointer" />
                        Nay
                      </Button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="space-y-3">
                  <h2>
                    "The most amazing book I have read this year!"{" "}
                    <i>- Anonymous reviewer</i>
                  </h2>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">02 Sept, 2024</h3>
                    <div className="flex space-x-3 items-center">
                      <Button variant="ghost" className="w-fit p-1">
                        <BiSolidUpvote className="size-6 fill-green-300 hover:fill-green-600 cursor-pointer" />{" "}
                        Yay{" "}
                      </Button>
                      <Button variant="ghost" className="w-fit p-1">
                        <BiSolidDownvote className="size-6 fill-red-300 hover:fill-red-600 cursor-pointer" />
                        Nay
                      </Button>
                    </div>
                  </div>
                </div>
                <hr />
                <Link href="#">
                  <h2>More reviews</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[28%] lg:w-[25%] p-5 space-y-16">
          <div className="border border-gray-300 p-5 rounded-lg bg-white">
            <div className="flex space-x-2 items-center">
              <FaTags className="size-7" />
              <h1 className="text-[1.2rem">Browse by Genre</h1>
            </div>
            <div className="pl-10">
              <ol className="list-disc">
                {number.map((item, index) => (
                  <Link href="#" key={index}>
                    <li className="text-lg">Romance</li>
                  </Link>
                ))}
              </ol>
            </div>
          </div>
          <div className="border border-gray-300 p-5 rounded-lg bg-white">
            <div className="flex space-x-2 items-center">
              <FaTags className="size-7" />
              <h1 className="text-[1.2rem">
                Reading lists curated by members of the community.
              </h1>
            </div>
            <div className="pl-10">
              <ol className="list-disc">
                {number.map((item, index) => (
                  <Link href="#" key={index}>
                    <li className="text-lg">Romance</li>
                  </Link>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
