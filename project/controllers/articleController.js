const Article = require("../models/Article")

exports.createArticle = async (req, res) => {
    try {

        const { title, content } = req.body

        const article = new Article({
            title,
            content,
            author: req.user.id
        })

        await article.save()

        res.status(201).json(article)

    } catch (err) {
        res.status(500).json(err)
    }
}