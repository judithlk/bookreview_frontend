"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import {
  AlertDialog,
  // AlertDialogAction,
  // AlertDialogCancel,
  AlertDialogContent,
  // AlertDialogDescription,
  // AlertDialogFooter,
  // AlertDialogHeader,
  // AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useLazySearchBooksQuery } from "@/redux/services/books.service";

import {
  IoSearch,
} from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

import MoonLoader from "react-spinners/MoonLoader";

function debounce(
  this: any, // Add this line to specify the type of `this`
  func: (...args: any[]) => any,
  delay: number
) {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function(this: any) { // Also annotate here if needed
      func.apply(this, args);
    }, delay);
  };
}

export default function SubNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [itIsOpen, setItIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getResults, getResultsState]  = useLazySearchBooksQuery();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>([]);
  // const [errMessage, setErrMessage] = useState<any>(null);

  const fetchSearchResults = async (term: string) => {
      setIsLoading(true);
      try {
        const response: any = await getResults(term);
        // const data = await response.json();
        if (response) {
          setResults(response);
        }
      } catch (error: any) {
        console.log(error);
      }
      setIsLoading(false)
  };

  // Debounced search function
  const debouncedSearch = debounce(fetchSearchResults, 800);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      debouncedSearch(value);
    } else {
      setResults([]); // Clear results if input is empty
    }
  };

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
                    onClick={() => setIsOpen(false)}
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
                    href="/addbook"
                    className="text-blue-800 hover:underline"
                    onClick={() => setIsOpen(false)}
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

      <AlertDialog open={itIsOpen}>
        <AlertDialogContent className="">
          <div className="flex items-center justify-between p-0">
            <h1 className="text-lg"></h1>
            <Button
              variant={"ghost"}
              className="p-0 m-0"
              onClick={() => setItIsOpen(false)}
            >
              <MdOutlineClose className="size-5 fill-gray-600" />
            </Button>
          </div>
          <div className="w-full">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="p-2 rounded w-full border"
            />
          </div>
          <ScrollArea className="h-[250px] w-full p-1 border-none">
            {isLoading ? <div className="w-full flex justify-center mt-4"><MoonLoader size={24} /></div> : <></>}
            {results?.data?.map((result: any) => (
              <Link href={`/book/${result?.title + "-" + result?._id}`} key={result._id} className="block">
              <div className="flex my-3 bg-gray-100 hover:shadow-md cursor-pointer p-2" >
                <div className="relative w-[30%] md:w-[20%] h-[120px]">
                  <Image
                    src={result.imageUrl}
                    alt=""
                    fill
                    className="m-auto object-cover"
                  />
                </div>
                <div className="w-[70%] p-4">
                  
                  <h2>{result.title} - {result.author}</h2>
                  <h2>{result.year}</h2>
                </div>
              </div>
              </Link>
            ))}
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>

      <div
        className={`bg-white py-4 flex flex-wrap justify-evenly items-center border-t`}
      >
        <Button onClick={() => setItIsOpen(true)} variant="ghost">
          <IoSearch className="size-6 fill-[#5D8AA8]" />
        </Button>

        <div>
          <Button onClick={() => setIsOpen(true)} variant="ghost">
            Review a Book
          </Button>
        </div>
      </div>
    </>
  );
}
