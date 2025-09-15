import express from "express";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";

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

const UserSCHEMA = mongoose.model("user", userSchema);

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

// // // Starting of Setting Up the multer storage path in VS code by file name and its path;

const storage = multer.diskStorage({
  // // Maked the new location to upload the images on public/uploads folder;
  destination: "./public/uploads",
  // // Adding more details with the file such as date, original name of file;
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// // // Ending of Setting Up the multer storage path in VS code by file name and its path;

///////***************************************************************************************************** *//////
///////***************************************************************************************************** *//////

// // // Starting of posting the data on database and cloudinary of the register page route;
server.post(
  "/register",
  upload.single("backendRegisterUploadImage"),
  async (request, response) => {
    // console.log(request.body);
    // // // Now, Open the User Register page on Browser and fill the details with image then have a look on Terminal Output below :-
    /**
     *Restarting 'app.js'
      Server is running at Port :-) 7000
      MongoDB Connected Successfully...!
      [Object: null prototype] {
        backendRegisterName: 'Shiva',
        backendRegisterEmail: 'shiv@gmail.com',
        backendRegisterPassword: '123'
      }
     *
     */
    // console.log(request.file); // // file comes from multer as we have make the diskStorage;
    /**
     *{
        fieldname: 'backendRegisterUploadImage',
        originalname: 'Nutrition.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: './public/uploads',
        filename: 'backendRegisterUploadImage-1757926649799.png',
        path: 'public\\uploads\\backendRegisterUploadImage-1757926649799.png',
        size: 638054
      }
     *
     */

    const uploadUserImage = request.file.path;
    // console.log(uploadUserImage); // // Getting the data of (request.file) especially the image path;

    // // Destructing the data of request.body instead of writing the whole such as (const name = request.body.backendRegisterName) and all;
    const {
      backendRegisterName,
      backendRegisterEmail,
      backendRegisterPassword,
    } = request.body; // // Getting the data of (request.body) especially the user data of register page;

    // // Uploading the files such as images or pdfs  in the Cloudinary;
    const cloudinaryDirectory = await cloudinary.uploader.upload(
      uploadUserImage,
      {
        folder: "FUllStack_Authen",
      }
    );

    // // Now, Creating the User or saving the User details on MongoDB;
    const dataBase = await UserSCHEMA.create({
      userName: backendRegisterName,
      userEmail: backendRegisterEmail,
      userPassword: backendRegisterPassword,
      fileName: uploadUserImage,
      publicID: cloudinaryDirectory.public_id,
      imageURL: cloudinaryDirectory.secure_url,
    });

    // // After filling the User Register details redirecting to login page;
    response.redirect("/");

    // // // Starting of Checking the data in json whether it is getting or not;
    // response.json({
    //   message: "Data saved successfully...!",
    //   success: true,
    //   cloudinaryResponse,
    // });
    // // // Ending of Checking the data in json whether it is getting or not;
  }
);

// // // Ending of posting the data on database and cloudinary of the register page route;

///////***************************************************************************************************** *//////
///////***************************************************************************************************** *//////

///////***************************************************************************************************** *//////
///////***************************************************************************************************** *//////

// // // Starting of posting the data on database and cloudinary and comparing with the saved data for login page route;

server.post("/logIn", (request, response) => {
  console.log(request.body); // Gettting undefined on Terminal and Surfing on Browser;
  /**
   *  Restarting 'app.js'
      Server is running at Port :-) 7000
      MongoDB Connected Successfully...!
      undefined
   */
});

// // // Ending of posting the data on database and cloudinary and comparing with the saved data for login page route;

///////***************************************************************************************************** *//////
///////***************************************************************************************************** *//////

const PORT = 7000;

server.listen(PORT, () => {
  console.log(`Server is running at Port :-) ${PORT}`);
});
