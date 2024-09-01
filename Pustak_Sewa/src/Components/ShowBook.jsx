import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function ShowBook({ book, setBook, setLoading, setError }) {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
          setError("Check you internet connection and try again");
          throw new Error("Check you internet connection and try again");
        }
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
        setError(`${error}`);
      }
    }

    fetchBook();
  }, []);

  return (
    <main className="main flex sm:flex-row flex-col h-5/6 w-full">
      <div className="bookImg  flex sm:justify-end items-center my-5 pr-5 w-full sm:w-1/2 justify-center">
        <img src={book.image} className="w-1/2 " alt="err" />
      </div>
      <div className="book-details flex justify-center align-start pl-5 flex-col font-sans">
        <h1 className="font-bold lg:text-5xl md:text-3xl text-2xl">
          {book.title}
        </h1>

        <p className="text-purple-500 py-5 pt-1">
          BY {book.author ? book.author.toUpperCase() : "Unknown"}
        </p>
        <p>
          Category:{" "}
          <span className="text-gray-400 font-normal">{book.genre}</span>
        </p>
        <span
          className={`available rounded-md py-1 my-7 mb-0 flex w-1/5 justify-around items-center items-self-start justify-self-start ${
            book.available ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {book.available ? "Available" : "Unavailable"}
          {book.available ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#28a745"
            >
              <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#dc3545"
            >
              <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          )}
        </span>
        <button
          onClick={() => navigate("/contact")}
          className={`btn contactus rounded-md py-1 my-7 mb-0 flex justify-around items-center items-self-start justify-self-start ${
            book.available
              ? "bg-purple-300 cursor-pointer"
              : "bg-purple-100 cursor-not-allowed"
          }`}
          disabled={!book.available}
        >
          Contact Us
        </button>
      </div>
    </main>
  );
}

export default ShowBook;
