import express from "express";
import mongoose from "mongoose";

const server = express();

mongoose
  .connect(
    "mongodb+srv://shivas2710cool00_db_user:PK9bmeDXdV5edZLf@cluster0.reupciq.mongodb.net/",
    { dbName: "FullStack_Auth_FileUpload" }
  )
  .then(() => console.log("MongoDB Connected Successfully...!"))
  .catch((error) => console.log(error));

const PORT = 7000;

server.listen(PORT, () => {
  console.log(`Server is running at Port :-) ${PORT}`);
});
