import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Book({ book, books, setBook, index, setError }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!books) {
      setError("No Books Found");
      navigate("/");
    }
  }, []);
  return (
    <div
      onClick={() => {
        setBook(books[index]);
        navigate(`/showbook/${book._id}`);
      }}
      className="bookFromStore relative right-16 min-w-72 flex cursor-pointer p-5 justify-between rounded-lg m-5 flex-col"
    >
      <img
        src={book.image}
        className=" rounded-xl pt-5 my-2 object-contain pb-1 aspect-square w-64 bg-gray-200"
        alt="error"
        style={{ boxShadow: "none" }}
        loading="lazy"
      />
      <span className="authorTitle flex flex-col">
        {" "}
        <h3 className="booknameCard text-xl w-full break-words overflow-y-scroll">
          {book.title}
        </h3>
        <p className="authorCard py-1">
          Category:{" "}
          <span className="text-purple-500">{book.genre || "Unknown"}</span>
        </p>
        <p className="authorCard py-1">
          By <span className="text-purple-500">{book.author || "Unknown"}</span>
        </p>
      </span>
      <span
        className={`avaliability rounded-md py-1 my-1 mb-0 flex w-3/5 justify-around items-center items-self-end justify-self-end ${
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
    </div>
  );
}
