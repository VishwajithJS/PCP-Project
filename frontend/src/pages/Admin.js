import { useEffect, useState, useCallback } from "react"

function Admin() {

    const [articles, setArticles] = useState([])

    const fetchPending = useCallback(async () => {

        try {

            const token = localStorage.getItem("token")

            const res = await fetch(
                "https://pcp-project.onrender.com/api/articles/pending",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await res.json()

            if (Array.isArray(data)) {
                setArticles(data)
            } else {
                setArticles([])
            }

        } catch (err) {

            console.log(err)
            setArticles([])
        }

    }, [])

    useEffect(() => {

        fetchPending()

    }, [fetchPending])

    const approveArticle = async (id) => {

        try {

            const token = localStorage.getItem("token")

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

            const token = localStorage.getItem("token")

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

                <h1>Admin Approval Panel</h1>

                <p>
                    Review and manage submitted medical articles
                </p>

            </div>

            <div className="admin-grid">

                {articles.map((article) => (

                    <div className="admin-card" key={article._id}>

                        <span className="status-badge">
                            Pending Review
                        </span>

                        <h2>
                            {article.title}
                        </h2>

                        <p>
                            {article.content}
                        </p>

                        <div className="button-group">

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