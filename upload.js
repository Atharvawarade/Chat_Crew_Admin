const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({
  dest: "uploads/", // Folder where the file will be stored
  limits: { fileSize: 10 * 1024 * 1024 }, // Set file size limit (10MB)
}).single("file"); // Handle a single file with the field name "file"

app.post("/upload", upload, (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = path.join(__dirname, "uploads", req.file.filename);
  res.json({ filePath: filePath });

  console.log("File uploaded:", req.file.filename);
});

// Serve the uploaded files (optional)
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
