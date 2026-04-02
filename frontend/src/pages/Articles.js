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
        <div style={{ textAlign: "center" }}>
            <h2>Published Articles 🌍</h2>

            {articles.map(a => (
                <div key={a._id}>
                    <h4>{a.title}</h4>
                    <p>{a.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Articles