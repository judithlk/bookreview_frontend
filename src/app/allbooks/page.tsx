"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useGetBooksQuery } from "@/redux/services/books.service";
import { useGetGenresQuery } from "@/redux/services/genres.service";

import { MdChevronRight } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

export default function AllBooks() {
  const { data: booksData } = useGetBooksQuery();
  const { data: genres } = useGetGenresQuery();

  const [genreId, setGenreId] = useState<any>(null);

  const [listByGenre, setListByGenre] = useState<any[]>([]);

  useEffect(() => {
    if (booksData) {
      const filteredBooks = booksData?.filter((book: any) => book.genre === genreId);
      setListByGenre(filteredBooks);
    //   console.log(listByGenre.length);
    }
  }, [genreId, booksData]);

  const colors = [
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-purple-200",
    "bg-cyan-200",
    "bg-red-200",
    "bg-gray-200",
    "bg-amber-300",
    "bg-lime-300",
  ];

  return (
    <>
      <main className="relative w-[98%] sm:w-[95%] m-auto space-y-8 p-5 bg- px-2 sm:px-8 bg-white">
        <div className="flex flex-wrap items-center">
          <h1 className="m-1">Genres</h1>
          {genres?.map((genre: any, x: number = 0) => (
            <div
              className={`${
                colors[x++]
              } px-2 rounded-3xl m-1 capitalize flex space-x-1 items-center cursor-pointer`}
              key={genre._id}
              onClick={() => 
                genreId === genre._id ? setGenreId(null) : setGenreId(genre._id)
              }
            >
              <h2 className="">{genre.title}</h2>
              <IoIosClose
                className={`${
                  genreId === genre._id ? "block" : "hidden"
                } m-0 size-6 fill-gray-500`}
              />
            </div>
          ))}
        </div>

        <div className="space-y-4 w-full">
          {listByGenre.length === 0 && genreId ? (
            <div className="flex space-x-1">
                <h1>No books in this genre yet.</h1>
                <Link href="/addbook" className="text-blue-700 hover:underline">Add a book.</Link>
            </div>
          ) : (
            <></>
          )}
          {!genreId ? <h1 className="text-lg font-semibold"> All Books</h1> : <></>}
          <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-3">
            {booksData?.map((book: any) => (
              <div
                className={`relative ${
                  genreId ? "hidden" : "block"
                } rounded-sm group hover:bg-gray-800 transition duration-300 ease-in-out w-[100%]`}
                key={book?._id}
              >
                <div className="relative">
                  <div className="relative text-center w-full h-[140px] sm:h-[200px] lg:h-[250px]">
                    <Image
                      src={book?.imageUrl}
                      alt={book?.title}
                      fill
                      //   sizes=""
                      //   objectFit="cover"
                      className="m-auto object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-950 opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out text-white p-2">
                    <div className="space-y-2 md:space-y-4">
                      <div className="space-y-2">
                        <h1 className="font-serif font-semibold text-sm md:text-2xl">
                          {book?.title}
                        </h1>
                        <h2 className="text-sm md:text-xl">{book?.author}</h2>
                      </div>
                      <Link
                        href={`/book/${book?.title + "-" + book?._id}`}
                        className="w-fit flex items-center hover:border-b hover:border-white p-0"
                      >
                        <h2 className="font-semibold text-sm md:text-base">Book details</h2>
                        <MdChevronRight className="size-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {listByGenre?.map((book: any) => (
              <div
                className={`relative ${
                  genreId ? "block" : "hidden"
                } rounded-sm group hover:bg-gray-800 transition duration-300 ease-in-out w-[100%]`}
                key={book?._id}
              >
                <div className="relative">
                  <div className="relative text-center w-full h-[120px] sm:h-[200px] lg:h-[240px]">
                    <Image
                      src={book?.imageUrl}
                      alt={book?.title}
                      layout="fill"
                      sizes=""
                      objectFit="cover"
                      className="m-auto"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-950 opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out text-white p-2">
                    <div className="space-y-2 md:space-y-4">
                      <div className="space-y-2">
                        <h1 className="font-serif font-semibold text-sm md:text-2xl">
                          {book?.title}
                        </h1>
                        <h2 className="text-sm md:text-xl">{book?.author}</h2>
                      </div>
                      <Link
                        href={`/book/${book?.title + "-" + book?._id}`}
                        className="w-fit flex items-center hover:border-b hover:border-white p-0"
                      >
                        <h2 className="font-semibold text-sm md:text-base">Book details</h2>
                        <MdChevronRight className="size-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
