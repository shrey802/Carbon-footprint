const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5500;
const User = require("./user.js");

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/CarbonDB")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
    console.log("Database Can't Be Connected");
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
})

// Route handler for login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // Check if the provided email exists in the users collection
    const user = await User.findOne({ email });
  
    if (!user) {
      // User with the provided email not found
      return res.send('<script>alert("User not found."); window.location.href = "/login.html";</script>');
    }
  
    // Compare the provided password with the stored password hash
    const isPasswordCorrect = await user.comparePassword(password);
  
    if (!isPasswordCorrect) {
      // Incorrect password
      return res.send('<script>alert("Incorrect password."); window.location.href = "/login.html";</script>');
    }
  
    // Login success
    return res.send('<script>window.location.href = "/home.html";</script>');
  });

// Your other route handlers and server setup can go here

app.listen(port, () => {
  console.log("App Running on port: ", port);
});