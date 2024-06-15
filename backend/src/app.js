const fs = require("node:fs");
const path = require("node:path");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routers/mainRouter");

const app = express();

// Application-level middlewares.
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// Routing.
app.use("/", mainRouter);

// Serve the `backend/public` folder for public resources.
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP.
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // Serve REACT resources.
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // Redirect all requests to the REACT index file.
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;
