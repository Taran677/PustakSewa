import React from "react";
import Book from "./Book";
import { useNavigate } from "react-router-dom";

export default function AllBooks({ books, setBook, setError }) {
  const navigate = useNavigate();
  const start = true;
  return (
    <>
      <div className="top flex w-full justify-between items-center">
        {" "}
        <h2 className="booksheading items-center justify-center text-4xl mt-10 w-full flex pt-10 sm:pl-10">
          All Books
        </h2>
      </div>
      <div className="wrapper flex items-center justify-center">
        <div className="bookCollection  grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  px-5 py-10  justify-evenly w-fit f items-stretch relative">
          {books.map((book, index) => {
            return (
              <Book
                key={book._id}
                setBook={setBook}
                books={books}
                index={index}
                book={book}
                start={start}
                setError={setError}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
