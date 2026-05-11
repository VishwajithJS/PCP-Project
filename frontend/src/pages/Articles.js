import { useEffect, useState } from "react"

function Articles() {

    const [articles, setArticles] = useState([])

    useEffect(() => {

        fetchArticles()

    }, [])

    const fetchArticles = async () => {

        try {

            const res = await fetch(
                "https://pcp-project.onrender.com/api/articles"
            )

            const data = await res.json()

            console.log("APPROVED ARTICLES:", data)

            if (Array.isArray(data)) {

                setArticles(data)

            } else {

                setArticles([])
            }

        } catch (err) {

            console.log(err)
            setArticles([])
        }
    }

    return (

        <div className="articles-page">

            <h1 className="articles-title">
                Published Articles
            </h1>

            <div className="articles-grid">

                {articles.map((article) => (

                    <div
                        className="article-card"
                        key={article._id}
                    >

                        <h2>
                            {article.title}
                        </h2>

                        <p>
                            {article.content}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default Articles