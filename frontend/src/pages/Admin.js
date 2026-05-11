import { useEffect, useState, useCallback } from "react"

function Admin() {

    const [articles, setArticles] = useState([])

    const fetchPending = useCallback(async () => {

        try {

            const res = await fetch("https://pcp-project.onrender.com/api/articles/pending")

            const data = await res.json()

            setArticles(data)

        } catch (err) {

            console.log(err)
        }

    }, [])

    useEffect(() => {

        fetchPending()

    }, [fetchPending])

    return (

        <div>
            <h1>Admin Panel</h1>

            {articles.map((article) => (

                <div key={article._id}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>

            ))}
        </div>
    )
}

export default Admin