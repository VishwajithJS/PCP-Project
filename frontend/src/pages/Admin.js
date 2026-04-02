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
        <div style={{ textAlign: "center" }}>
            <h2>Admin Panel</h2>

            {articles.map(a => (
                <div key={a._id}>
                    <h4>{a.title}</h4>
                    <p>{a.content}</p>
                    <button onClick={() => approve(a._id)}>Approve</button>
                    <button onClick={() => reject(a._id)}>Reject</button>
                </div>
            ))}
        </div>
    )
}

export default Admin