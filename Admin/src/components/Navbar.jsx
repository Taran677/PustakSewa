import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Trigger a toast

export default function Navbar({ books, setBooks }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Function to handle the search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  // Fetch books from API (assuming you want to fetch on component mount)
  const fetchBooks = async () => {
    try {
      const response = await fetch("https://pustak-sewa-38dx.vercel.app/books");
      if (!response.ok) {
        throw new Error("Check you internet connection and try again");
      }
      const data = await response.json();
      if (data) {
        toast.success("Books fetched successfully");
      }
      setBooks(data);
    } catch (error) {
      toast.error("Error fetching books from server");
      console.error("There was a problem with the fetch operation:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle clicks outside the search input to hide the list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setFilteredBooks([]); // Clear the filtered books to hide the list
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="p-4 font-sans sticky top-0 z-50 left-0 right-0"
      style={{
        boxShadow: "0 0 1rem grey",
        backdropFilter: "blur(2rem)",
        background: "#FFFFFF99",
      }}
    >
      <div className="container mx-auto flex justify-around min-w-full items-center sm:flex-row flex-col">
        <div className="flex flex-row justify-between w-full">
          <div
            className="text-black text-xl flex font-light justify-start items-center flex-row cursor-pointer w-full my-1"
            onClick={() => navigate("/")}
          >
            <span className="flex px-2 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 50 50"
              >
                <path d="M 17 5 C 14.250484 5 12 7.2504839 12 10 L 12 12 L 10 12 C 7.2504839 12 5 14.250484 5 17 L 5 40 C 5 42.749516 7.2504839 45 10 45 L 33 45 C 35.749516 45 38 42.749516 38 40 L 38 38 L 40 38 C 42.749516 38 45 35.749516 45 33 L 45 10 C 45 7.2504839 42.749516 5 40 5 L 17 5 z M 17 7 L 40 7 C 41.668484 7 43 8.3315161 43 10 L 43 33 C 43 34.668484 41.668484 36 40 36 L 38 36 L 36 36 L 17 36 C 15.331516 36 14 34.668484 14 33 L 14 23 C 14 21.883334 14.883334 21 16 21 L 19 21 L 19 27 C 19 29.197334 20.802666 31 23 31 L 29 31 L 31 31 L 34 31 C 36.197334 31 38 29.197334 38 27 L 38 17 C 38 14.250484 35.749516 12 33 12 L 14 12 L 14 10 C 14 8.3315161 15.331516 7 17 7 z M 10 14 L 12 14 L 14 14 L 33 14 C 34.668484 14 36 15.331516 36 17 L 36 27 C 36 28.116666 35.116666 29 34 29 L 31 29 L 31 23 C 31 20.802666 29.197334 19 27 19 L 21 19 L 19 19 L 16 19 C 13.802666 19 12 20.802666 12 23 L 12 33 C 12 35.749516 14.250484 38 17 38 L 36 38 L 36 40 C 36 41.668484 34.668484 43 33 43 L 10 43 C 8.3315161 43 7 41.668484 7 40 L 7 17 C 7 15.331516 8.3315161 14 10 14 z M 21 21 L 27 21 C 28.116666 21 29 21.883334 29 23 L 29 29 L 23 29 C 21.883334 29 21 28.116666 21 27 L 21 21 z"></path>
              </svg>
            </span>
            <span className="flex px-2 justify-center items-center">LOGO</span>
          </div>
          <div
            className="change-contact min-w-max px-10 font-sans py-1 cursor-pointer hover:text-purple-400"
            onClick={() => navigate("/update-contact")}
          >
            Contact Info
          </div>
          <div
            className=" font-sans p-1 aspect-square rounded-full mx-3 mr-5 bg-purple-500 cursor-pointer hover:bg-purple-400"
            onClick={() => navigate("/createBook/new")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#f0f0f0"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </div>
        </div>
        <div className="relative sm:w-1/3 w-full my-1" ref={searchContainerRef}>
          <input
            type="text"
            placeholder="Search Books"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full py-2 px-4 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-slate-100 text-sm"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 bg-gray-700 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 -960 960 960"
              width="1rem"
              fill="#f0f0f0"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>

          {filteredBooks.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md z-10">
              {filteredBooks.map((book) => (
                <li
                  key={book.id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    navigate(`/showbook/${book._id}`);
                    window.location.reload();
                  }}
                >
                  {book.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
