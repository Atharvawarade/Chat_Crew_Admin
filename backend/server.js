require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ImageKit = require("imagekit");
const cors = require("cors");  // Import the CORS package

const app = express();
const upload = multer({ dest: "uploads/" });

// Configure ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Enable CORS for all routes
app.use(cors());  // Add this line to enable CORS for all routes

// Middleware to serve static files (optional for testing frontend)
app.use(express.static(path.join(__dirname, "../frontend")));

// Handle file upload to ImageKit
app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  // Read the file from the temporary directory
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }

    // Upload to ImageKit
    imagekit.upload(
      {
        file: data,
        fileName: fileName,
        tags: ["uploaded_via_form"],
      },
      (error, result) => {
        // Delete the temporary file
        fs.unlinkSync(filePath);

        if (error) {
          console.error(error);
          return res.status(500).send("ImageKit upload failed");
        }

        console.log(result);
        res.send({
          message: "File uploaded successfully",
          fileUrl: result.url,
        });
      }
    );
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
