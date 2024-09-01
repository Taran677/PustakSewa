import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateBook({ setBooks }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    available: false,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://pustak-sewa-38dx.vercel.app/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        toast.error("Check you internet connection and try again");
        throw new Error("Check you internet connection and try again");
      }
      const newBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      toast.error("Could not create book!");

      console.error("There was a problem with the create operation:", error);
    }
  };

  return (
    <main className="main flex sm:flex-row flex-col h-5/6 w-full">
      <div className="bookImg flex sm:justify-end items-center my-5 pr-5 w-full sm:w-1/2 justify-center">
        <img
          src={
            formData.image ||
            "https://imgs.search.brave.com/DpeWIbndQmI3LErSGscDt6fULIMATpXodc2fOpMtbyU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzM5L0Jvb2suc3Zn"
          }
          className="w-1/2"
          alt="Book cover"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="book-details flex flex-col justify-center align-start mb-10 px-5 font-sans w-full sm:w-1/2"
      >
        <label className=" text-2xl mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
            required
          />
        </label>

        <label className="text-purple-500 py-5 pt-1">
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
            required
          />
        </label>

        <label className="mb-4">
          Genre:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
            required
          />
        </label>

        <label className="mb-4">
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          />
        </label>

        <label className="mb-4 flex items-center">
          Available:
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="ml-2"
          />
        </label>

        <button
          type="submit"
          className={`btn contactus rounded-md py-2 my-7 mb-0 flex justify-around items-center max-w-44 bg-purple-600 hover:bg-purple-700 text-white`}
        >
          Add Book
        </button>
      </form>
    </main>
  );
}

export default CreateBook;
