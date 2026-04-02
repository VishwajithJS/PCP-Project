import { useEffect, useState } from "react"

function Articles() {

    const [articles, setArticles] = useState([])

    const fetchPublished = async () => {
        const res = await fetch("http://localhost:5000/api/articles/published")
        const data = await res.json()
        setArticles(data)
    }

    useEffect(() => {
        fetchPublished()
    }, [])

    return (
        <div style={{ padding: "20px" }}>
            <h2>🌍 Published Articles</h2>

            {articles.length === 0 && <p>No articles yet</p>}

            {articles.map(a => (
                <div key={a._id} style={{
                    background: "white",
                    padding: "15px",
                    margin: "10px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}>
                    <h3>{a.title}</h3>
                    <p>{a.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Articles