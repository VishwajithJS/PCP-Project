const express = require("express")

const router = express.Router()

const {
    createArticle,
    getApprovedArticles,
    getPendingArticles,
    approveArticle,
    rejectArticle
} = require("../controllers/articleController")

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.post(
    "/",
    authMiddleware,
    roleMiddleware("CONTRIBUTOR"),
    createArticle
)

router.get(
    "/",
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