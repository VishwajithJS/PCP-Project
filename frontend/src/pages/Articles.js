import { useEffect, useState } from "react"
import "../App.css"

function Articles() {

    const [articles, setArticles] = useState([])

    const fetchArticles = async () => {
        const res = await fetch("https://pcp-project.onrender.com/api/articles/published")
        const data = await res.json()
        setArticles(data)
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    return (
        <div>
            <h2>Published Articles</h2>

            {articles.map(a => (
                <div key={a._id} className="card">
                    <h3>{a.title}</h3>
                    <p>{a.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Articles