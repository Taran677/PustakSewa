const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String},
  password: { type: String, required: true },
  _id: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema, "Contacts");

module.exports = Contact;
