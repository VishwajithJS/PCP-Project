import { useEffect, useState } from "react"

function Admin() {

    const [articles, setArticles] = useState([])
    const token = localStorage.getItem("token")

    const fetchPending = async () => {
        const res = await fetch("http://localhost:5000/api/articles/pending", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        const data = await res.json()
        setArticles(data)
    }

    useEffect(() => {
        fetchPending()
    }, [])

    const approve = async (id) => {
        await fetch(`http://localhost:5000/api/articles/approve/${id}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        })
        fetchPending()
    }

    const reject = async (id) => {
        await fetch(`http://localhost:5000/api/articles/reject/${id}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        })
        fetchPending()
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Admin Panel</h2>

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

                    <button
                        onClick={() => approve(a._id)}
                        style={{ marginRight: "10px", padding: "6px 12px" }}
                    >
                        Approve
                    </button>

                    <button
                        onClick={() => reject(a._id)}
                        style={{ padding: "6px 12px" }}
                    >
                        Reject
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Admin