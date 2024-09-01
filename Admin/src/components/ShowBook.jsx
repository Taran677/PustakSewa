import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBook({ book, setBook }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    available: false,
    image: "",
  });

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
          throw new Error("Check you internet connection and try again");
        }

        const data = await response.json();
        setBook(data);
        setFormData({
          title: data.title,
          author: data.author,
          genre: data.genre,
          available: data.available,
          image: data.image,
        });
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchBook();
  }, [id, setBook]);

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
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Check you internet connection and try again");
      }
      const updatedBook = await response.json();
      setBook(updatedBook);
      navigate(`/`);
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Check you internet connection and try again");
      }
      navigate(`/`);
      window.location.reload();
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  return (
    <main className="main flex sm:flex-row flex-col h-5/6 w-full">
      <div className="bookImg flex sm:justify-end items-center my-5 pr-5 w-full sm:w-1/2 justify-center">
        <img src={formData.image} className="w-1/2" alt="Book cover" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="book-details flex flex-col justify-center align-start mb-10 px-5 font-sans w-full sm:w-1/2"
      >
        <label className="mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
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
          Save Changes
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className={`btn delete rounded-md py-2 my-7 mb-0 flex justify-around items-center max-w-44 bg-red-600 hover:bg-red-700 text-white`}
        >
          Delete Book
        </button>
      </form>
    </main>
  );
}

export default EditBook;
