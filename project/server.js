const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const articleRoutes = require("./routes/articleRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log(err)
    })

app.get("/", (req, res) => {
    res.send("Knowledge Base API Running")
})

app.use("/api/auth", authRoutes)
app.use("/api/articles", articleRoutes)

app.use((err, req, res, next) => {

    console.log("SERVER ERROR:")
    console.log(err)

    res.status(500).json({
        message: err.message
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})