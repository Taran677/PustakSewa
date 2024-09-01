import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import bookImg1 from "./assets/book1.webp";
import bookImg2 from "./assets/book2.png";
import bookImg3 from "./assets/book3.png";
import bookImg4 from "./assets/book4.webp";
import bookImg5 from "./assets/book5.webp";
import bookIllus from "./assets/bookillus.svg";
import illustration from "./assets/illus.svg";
import Books from "./Components/Books";
import { useEffect, useRef, useState } from "react";
import Home from "./Components/Home";
import ShowBook from "./Components/ShowBook";
import Contacts from "./Components/Contacts";
import AllBooks from "./Components/AllBooks";
import LoadingBar from "react-top-loading-bar";
function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const loadingBarRef = useRef(null);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const fetchBooks = async () => {
    setLoading(true);
    loadingBarRef.current.continuousStart();

    try {
      const response = await fetch("http://localhost:3000/books");
      if (!response.ok) {
        throw new Error("Check you internet connection and try again");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setError("There was a problem with the fetch operation.");
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
      loadingBarRef.current.complete();
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Router>
      {loading && (
        <div className="cover w-full h-full fixed opacity-65 bg-white flex items-center justify-center z-50">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <LoadingBar color="purple" height={3} ref={loadingBarRef} />
      <Navbar
        setError={setError}
        setBooks={setBooks}
        setLoading={setLoading}
        books={books}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              bookIllus={bookIllus}
              setLoading={setLoading}
              bookImg1={bookImg1}
              bookImg2={bookImg2}
              bookImg3={bookImg3}
              bookImg4={bookImg4}
              bookImg5={bookImg5}
              illustration={illustration}
              books={books}
              setError={setError}
              book={book}
              setBook={setBook}
            />
          }
        />
        <Route
          path="/showbook/:id"
          element={
            <ShowBook
              setError={setError}
              setLoading={setLoading}
              book={book}
              setBook={setBook}
            />
          }
        />
        <Route
          path="/contact"
          element={<Contacts setError={setError} setLoading={setLoading} />}
        />
        <Route
          path="/books"
          element={
            <AllBooks
              setLoading={setLoading}
              setError={setError}
              books={books}
              setBook={setBook}
            />
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
