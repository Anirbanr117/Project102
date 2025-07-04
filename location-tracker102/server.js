import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, mongoose.connect("mongodb+srv://pubgmobilemercury:<Anirbanr117@>@location-data.1fo2mez.mongodb.net/?retryWrites=true&w=majority&appName=Location-data", {
 {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Schema
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: String,
  address: Object
});
const Location = mongoose.model("Location", locationSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API: Save location
app.post("/api/save-location", async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.json({ message: "Saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving" });
  }
});

// API: Get all locations
app.get("/api/locations", async (req, res) => {
  try {
    const locations = await Location.find().sort({ timestamp: -1 });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: "Error fetching" });
  }
});

// Serve dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
