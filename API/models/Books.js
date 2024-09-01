const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Make title required
  },
  author: {
    type: String,
    required: true, // Make author required
  },
  genre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  available: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema, "Books");

module.exports = Book;
