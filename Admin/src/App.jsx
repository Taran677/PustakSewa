import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import UpdateContact from "./components/UpdateContact";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ShowBook from "./components/ShowBook";
import CreateBook from "./components/CreateBook";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await axios.post(
      "https://pustak-sewa-38dx.vercel.app/verifyToken",
      {
        token,
      }
    );
    return response.status === 200;
  } catch (error) {
    toast.error("Error in authentication");
    return false;
  }
};

function App() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsAuth(authenticated);
      setAuthChecked(true);
    };
    checkAuth();
  }, []);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar books={books} setBooks={setBooks} />

      <Routes>
        <Route
          path="/showbook/:id"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <ShowBook book={book} setBook={setBook} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createBook/new"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CreateBook setBooks={setBooks} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Home
                book={book}
                setBook={setBook}
                setBooks={setBooks}
                books={books}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-contact"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <UpdateContact />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
