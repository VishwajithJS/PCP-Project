const express = require("express")

const {
    createArticle,
    getApprovedArticles,
    getPendingArticles,
    approveArticle,
    rejectArticle
} = require("../controllers/articleController")

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = express.Router()

router.post(
    "/",
    authMiddleware,
    createArticle
)

router.get(
    "/approved",
    getApprovedArticles
)

router.get(
    "/pending",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getPendingArticles
)

router.put(
    "/approve/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    approveArticle
)

router.put(
    "/reject/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    rejectArticle
)

module.exports = router