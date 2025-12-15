const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", newsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("News Feed API Running ...!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
