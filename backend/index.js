import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Url } from "./models/urlModels.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
