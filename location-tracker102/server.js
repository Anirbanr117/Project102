import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, "mongodb+srv://pubgmobilemercury:<Anirbanr117@>@location-data.1fo2mez.mongodb.net/?retryWrites=true&w=majority&appName=Location-data", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// 📦 Mongoose Schema
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: String,
  address: Object
});

const Location = mongoose.model("Location", locationSchema);

// 📬 POST endpoint
app.post("/api/save-location", async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.json({ message: "Location saved to MongoDB" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving location" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
