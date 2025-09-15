import express from "express";
import mongoose from "mongoose";

const server = express();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dkxfog2vk",
  api_key: "428767453634413",
  api_secret: "q5EivkVE4pv8w7UgOfYpZQU51EU",
});

mongoose
  .connect(
    "mongodb+srv://shivas2710cool00_db_user:PK9bmeDXdV5edZLf@cluster0.reupciq.mongodb.net/",
    { dbName: "FullStack_Auth_FileUpload" }
  )
  .then(() => console.log("MongoDB Connected Successfully...!"))
  .catch((error) => console.log(error));

///////***************************************************************************************************** *//////
///////***************************************************************************************************** *//////

// // // Starting of formation of Models Schema i.e., userSchema as a reference to save it on database of MongoDB;

const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  fileName: String,
  publicID: String,
  imageURL: String,
});

const User = mongoose.model("user", userSchema);

// // // Ending of formation of Models Schema i.e., userSchema as a reference to save it on database of MongoDB;

///////***************************************************************************************************** *//////
///////***************************************************************************************************** *//////

// // // Starting of Rendering of Login & Register Page on Client Side i.e., on Browser;

server.get("/", (request, response) => {
  response.render("login.ejs");
});

server.get("/register", (request, response) => {
  response.render("register.ejs");
});

// // // Ending of Rendering of Login & Register Page on Client Side i.e., on Browser;

///////***************************************************************************************************** *//////
///////***************************************************************************************************** *//////

const PORT = 7000;

server.listen(PORT, () => {
  console.log(`Server is running at Port :-) ${PORT}`);
});
