import React from "react";

export default function Hero({
  bookImg1,
  bookImg2,
  bookImg3,
  bookImg4,
  bookImg5,
  illustration,
  setLoading
}) {
  return (
    <header
      className="flex hero w-full sm:flex-row px-10 flex-col"
    >
      <div className="text flex items-start justify-center flex-col sm:w-1/2 tracking-wider">
      <img src={illustration} className="max-h-36" alt="man.svg" />
        <h1
          style={{ lineHeight: "3.5rem" }}
          className="sans text-5xl font-light py-5"
        >
          <span className="text-purple-700">Donate </span> 
           your <span className="text-purple-700">Old</span> books!
        </h1>
        <p className="sans">
        Your one-stop destination for donating and receiving old books. Donate your academic books to NGO, helping others gain access to valuable educational resources.
        </p>
      </div>
      <div className="imgs w-full py-10 flex flex-row justify-center items-center sm:w-1/2 lg:px-16 px-0">
        <div className="flex flex-col justify-start items-start h-full w-1/3 px-2">
          <img
            className="book relative rounded-xl my-2"
            style={{ width: "100%", aspectRatio: "2 / 3", objectFit: "cover" }}
            src={bookImg1}
            alt="book image"
          />{" "}
          <img
            className="book relative rounded-xl my-2"
            style={{ width: "100%", aspectRatio: "2 / 3", objectFit: "cover" }}
            src={bookImg2}
            alt="book image"
          />
        </div>
        <div className="flex flex-col justify-center items-start h-full w-1/3 px-2">
          <img
            className="book relative rounded-xl my-2"
            style={{ width: "100%", aspectRatio: "2 / 3", objectFit: "cover" }}
            src={bookImg3}
            alt="book image"
          />
          <img
            className="book relative rounded-xl my-2"
            style={{ width: "100%", aspectRatio: "2 / 3", objectFit: "cover" }}
            src={bookImg4}
            alt="book image"
          />
        </div>
        <div className="flex flex-col justify-end items-start h-full w-1/3 px-2">
          <img
            className="book relative rounded-xl my-2"
            style={{ width: "100%", aspectRatio: "2 / 3", objectFit: "cover" }}
            src={bookImg5}
            alt="book image"
          />
        </div>
      </div>
    </header>
  );
}
