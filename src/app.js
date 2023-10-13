const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { port, dbURI } = require("./index");

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define the Mongoose model for Subscribers
const subscriberSchema = new mongoose.Schema({
  name: String,
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Replace this with your subscriber data
const subscribers = [
  { name: "Subscriber 1" },
  { name: "Subscriber 2" },
  { name: "Subscriber 3" },
];

// Get all subscribers
app.get("/subscribers", (req, res) => {
  res.json(subscribers); // Respond with the subscribers array as JSON
});

// Create a new subscriber and save it to the database
app.post("/subscribers", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
