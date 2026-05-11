const Article = require("../models/Article")

// CREATE ARTICLE
exports.createArticle = async (req, res) => {

    try {

        const { title, content } = req.body

        const article = await Article.create({
            title,
            content,
            status: "PENDING",
            createdBy: req.user.id
        })

        res.status(201).json(article)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}

// GET APPROVED ARTICLES
exports.getApprovedArticles = async (req, res) => {

    try {

        const articles = await Article.find({
            status: "APPROVED"
        })

        res.json(articles)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}

// GET PENDING ARTICLES
exports.getPendingArticles = async (req, res) => {

    try {

        const articles = await Article.find({
            status: "PENDING"
        })

        res.json(articles)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}

// APPROVE ARTICLE
exports.approveArticle = async (req, res) => {

    try {

        const article = await Article.findByIdAndUpdate(
            req.params.id,
            {
                status: "APPROVED"
            },
            {
                new: true
            }
        )

        res.json(article)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Approve failed"
        })
    }
}

// REJECT ARTICLE
exports.rejectArticle = async (req, res) => {

    try {

        const article = await Article.findByIdAndUpdate(
            req.params.id,
            {
                status: "REJECTED"
            },
            {
                new: true
            }
        )

        res.json(article)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Reject failed"
        })
    }
}