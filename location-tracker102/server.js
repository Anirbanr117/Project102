
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve frontend

app.post("/api/save-location", (req, res) => {
  const { latitude, longitude, timestamp, address } = req.body;
  const entry = { latitude, longitude, timestamp, address };

  fs.appendFile("locations.json", JSON.stringify(entry) + ",\n", (err) => {
    if (err) {
      console.error("Error saving location:", err);
      return res.status(500).json({ message: "Error saving location" });
    }
    console.log("Location saved:", entry);
    res.json({ message: "Location saved successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
