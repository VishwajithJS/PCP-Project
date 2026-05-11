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
        //eslint-disable-next-line
    }, [])

    const approve = async (id) => {

        await fetch(
            `https://pcp-project.onrender.com/api/articles/approve/${id}${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        fetchPending()
    }

    const reject = async (id) => {

        await fetch(
            `https://pcp-project.onrender.com/api/articles/reject/${id}${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        fetchPending()
    }

    return (

        <div>

            <div className="admin-header">

                <h1 className="admin-title">
                    Admin Approval Panel
                </h1>

                <p className="admin-subtitle">
                    Review and manage submitted medical articles
                </p>

            </div>

            {articles.length === 0 ? (

                <div className="empty-box">
                    No pending articles
                </div>

            ) : (

                <div className="admin-grid">

                    {articles.map((a) => (

                        <div
                            key={a._id}
                            className="admin-card"
                        >

                            <div className="article-badge">
                                Pending Review
                            </div>

                            <h2 className="article-title">
                                {a.title}
                            </h2>

                            <p className="article-content">
                                {a.content}
                            </p>

                            <div className="admin-actions">

                                <button
                                    className="approve-btn"
                                    onClick={() => approve(a._id)}
                                >
                                    ✅ Approve
                                </button>

                                <button
                                    className="reject-btn"
                                    onClick={() => reject(a._id)}
                                >
                                    ❌ Reject
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    )
}

export default Admin