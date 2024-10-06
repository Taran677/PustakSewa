import React, { useRef } from "react";
import Book from "./Book";
import { useNavigate } from "react-router-dom";

export default function Books({ books, setBook }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const handlescrollleft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -328.5716, behavior: "smooth" });
    }
  };

  const handlescrollright = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 328.57116, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="top flex w-full justify-between items-center">
        <h2 className="booksheading text-4xl mt-10 flex pt-10 pl-10">
          Explore Books
        </h2>
        <button className="btn flex items-center justidy-center rounded-full bg-purple-300 px-3 py-2 mr-10 mt-20 text-purple-900">
          <span
            className="viewall"
            onClick={() => {
              navigate("/books");
            }}
          >
            View All Books
          </span>
          <span classsname="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 -960 960 960"
              width="1rem"
              fill="rgb(88, 28, 135)"
            >
              <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
            </svg>
          </span>
        </button>
      </div>
      <div
        ref={scrollRef}
        className="bookCollection flex sm:flex-row px-5 py-10 h-5/6 md:justify-evenly justify-between overflow-x-scroll flex-nowrap items-stretch relative"
        id="scrollbar1"
      >
        <button
          onClick={handlescrollleft}
          className="btnscrollleft p-2 flex items-center justify-center rounded-full sticky w-10 h-10 z-50 bg-purple-500 text-white lg:left-5 translate-y-48 sm:left-2 left-0 rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
        {books.slice(5, 14).map((book, index) => {
          return (
            <Book
              key={book._id}
              setBook={setBook}
              books={books}
              index={index}
              book={book}
            />
          );
        })}
        <div  onClick={() => {
          
              navigate("/books");
            }} className="viewall bookFromStore relative right-16 min-w-72 flex cursor-pointer p-5 rounded-lg m-5 flex-col items-center justify-center min-h-80 bg-purple-300">
          {" "}
          <span
            className="viewall"
           
          >
            View All Books
          </span>
          <span classsname="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 -960 960 960"
              width="1rem"
              fill="rgb(88, 28, 135)"
            >
              <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
            </svg>
          </span>
        </div>
        <button
          onClick={handlescrollright}
          className="btnscrollright p-2 flex items-center justify-center rounded-full sticky w-10 h-10 z-50 bg-purple-500 text-white lg:right-5 translate-y-48 sm:right-2 right-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
