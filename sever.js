// // const express = require("express");
// // const multer = require("multer");
// // const cors = require("cors");
// // const path = require("path");


// // const fs = require("fs");
// // const uploadDir = "./uploads";

// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir);
// // }


// // require("dotenv").config();

// // const { generateDescription } = require("./descriptionGenerator");

// // const app = express();
// // const upload = multer({ dest: "uploads/" });

// // app.use(cors());
// // app.use(express.json());

// // app.post("/upload", upload.single("image"), async (req, res) => {
// //     try {
// //         const image = req.file;
// //         const prompt = req.body.prompt;

// //         if (!image || !prompt) {
// //             return res.status(400).json({ error: "Image and prompt are required" });
// //         }

// //         // Call AI to generate description
// //         const description = await generateDescription(image.path, prompt);
// //         res.json({ description });

// //     } catch (error) {
// //         console.error("Error generating description:", error);
// //         res.status(500).json({ error: "Failed to generate description" });
// //     }
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// app.use(cors()); // Enable cross-origin requests

// // Set up storage engine for uploaded files
// const storage = multer.diskStorage({
//   destination: "uploads/", // Save files to 'uploads' folder
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
//   },
// });

// const upload = multer({ storage: storage });

// // Ensure 'uploads' folder exists
// const fs = require("fs");
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Upload route
// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
// });

// // Serve uploaded images
// app.use("/uploads", express.static("uploads"));

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });





const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store in the existing "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
