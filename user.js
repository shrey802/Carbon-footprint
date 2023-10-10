const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique for each user
  },
  pass: {
    type: String,
    required: true,
  },
});

// Create a model for the User schema
const User = mongoose.model('User', userSchema);

module.exports = User;
