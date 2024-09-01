const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Books");
const Contact = require("./models/contact");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://pustak-sewa.vercel.app", "https://pustak-sewa-38dx.vercel.app", "https://pustak-sewa-kipm.vercel.app", "https://vercel.com/taran677s-projects/pustak-sewa/HrKeeX5GnPrLUjAA3qiqy3ihC3Uh"], 
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Basic route to test server
app.get("/", (req, res) => {
  res.send("Welcome to the Bookstore API");
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the contact with the given email exists
    const contact = await Contact.findOne({ email });

    if (!contact) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, contact.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { contactId: contact._id, email: contact.email },
      process.env.JWT_KEY, 
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Login successful." });
  
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/verifyToken", (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
      res.status(200).json({ message: "Token is valid.", user: decoded });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get a book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ id: `${req.params.id}` });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get contacts
app.get("/contact", async (req, res) => {
  try {
    const contact = await Contact.find();
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new book
app.post("/books", async (req, res) => {
  const { title, author, genre, image, available } = req.body;

  try {
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      return res
        .status(400)
        .json({ message: "A book with this title already exists." });
    }

    // Generate a new ObjectId
    const newId = new mongoose.Types.ObjectId();

    const book = new Book({
      id: newId,
      _id: newId,
      title,
      author,
      genre,
      image,
      available,
    });

    // Save the new book to the database
    await book.save();

    // Send a success response
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Server error", error });
  }
});

app.patch("/books/:id", async (req, res) => {
  try {
    console.log(`${req.params.id}`);
    const book = await Book.findOne({ id: `${req.params.id}` });
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (req.body.title != null) book.title = req.body.title;
    if (req.body.author != null) book.author = req.body.author;
    if (req.body.genre != null) book.genre = req.body.genre;
    if (req.body.image != null) book.image = req.body.image;
    if (req.body.available != null) book.available = req.body.available;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to add a new contact


app.patch("/contacts", async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const contactId = "66d33e5bbd123dcc8295d808"; 

    let updateFields = {};

    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const result = await Contact.updateOne(
      { _id: contactId }, 
      { $set: updateFields }, 
      { new: true, runValidators: true } 
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Contact not found or no changes made" });
    }

    const updatedContact = await Contact.findById(contactId);
    res.status(200).json(updatedContact);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).json({ message: err.message });
  }
});


//This route deletes a book by its ID.

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ id: `${req.params.id}` });
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.deleteOne();
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
