import { useEffect, useState } from "react"

function Admin() {

    const [articles, setArticles] = useState([])

    const token = localStorage.getItem("token")

    const fetchPending = async () => {

        try {

            const res = await fetch(
                "https://pcp-project.onrender.com/api/articles/pending",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await res.json()

            setArticles(data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPending()
    }, [])

    const approveArticle = async (id) => {

        try {

            await fetch(
                `https://pcp-project.onrender.com/api/articles/approve/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchPending()

        } catch (err) {
            console.log(err)
        }
    }

    const rejectArticle = async (id) => {

        try {

            await fetch(
                `https://pcp-project.onrender.com/api/articles/reject/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchPending()

        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div className="admin-page">

            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Review submitted medical articles</p>
            </div>

            <div className="admin-grid">

                {articles.map((article) => (

                    <div className="admin-card" key={article._id}>

                        <div className="status-badge">
                            Pending Review
                        </div>

                        <h2>{article.title}</h2>

                        <p>{article.content}</p>

                        <div className="admin-buttons">

                            <button
                                className="approve-btn"
                                onClick={() => approveArticle(article._id)}
                            >
                                ✅ Approve
                            </button>

                            <button
                                className="reject-btn"
                                onClick={() => rejectArticle(article._id)}
                            >
                                ❌ Reject
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default Admin