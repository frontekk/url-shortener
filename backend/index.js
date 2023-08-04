import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Url } from "./models/urlModels.js";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.post("/url", async (req, res) => {
  try {
    if (!req.body.url) {
      return res.send("URL not found");
    }

    const inputURL = req.body.url.trim();
    const existingUrl = await Url.findOne({ url: inputURL });
    if (existingUrl) {
      return res.json(existingUrl); // Return existing shortened URL if found
    }
    // Generate a unique shortened URL using nanoid
    const shortUrl = nanoid(7); // Change the length of short URL as desired

    // Save the mapping in the database
    const newUrl = {
      url: inputURL,
      shortUrl: shortUrl,
    };
    const url = await Url.create(newUrl);
    return res.json(url);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/url/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findById(id);
    return res.json(url);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/url", async (req, res) => {
  try {
    const url = await Url.find({});
    return res.json({ count: url.length, data: url });
  } catch (error) {
    console.log(error);
    res.send({ message: error.message });
  }
});

// Handle URL redirection
app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).send("Shortened URL not found");
    }

    return res.redirect(url.url); // Redirect to the original URL
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//handle delete all url
app.delete("/url", async (req, res) => {
  try {
    const url = await Url.deleteMany({});
    return res.json({ message: "All URL deleted" });
  } catch (error) {
    console.log(error);
    res.send({ message: error.message });
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });
