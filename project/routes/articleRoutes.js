const express = require("express")
const router = express.Router()

const articleController = require("../controllers/articleController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, articleController.createArticle)

module.exports = router