const express = require("express");
const router = express.Router();
const { getNews } = require("../controllers/newsController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/news", authenticateToken, getNews);

module.exports = router;
