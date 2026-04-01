const express = require("express")
const router = express.Router()

const articleController = require("../controllers/articleController")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

// Contributor
router.post("/", authMiddleware, articleController.createArticle)

// Admin
router.get("/pending", authMiddleware, roleMiddleware("ADMIN"), articleController.getPendingArticles)

router.put("/approve/:id", authMiddleware, roleMiddleware("ADMIN"), articleController.approveArticle)

router.put("/reject/:id", authMiddleware, roleMiddleware("ADMIN"), articleController.rejectArticle)

// Public
router.get("/published", articleController.getPublishedArticles)

module.exports = router