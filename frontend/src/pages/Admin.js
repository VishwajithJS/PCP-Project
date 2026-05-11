/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import "../App.css"

function Admin() {

    const [articles, setArticles] = useState([])
    const token = localStorage.getItem("token")

    const fetchPending = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/articles/pending", {
                headers: { "Authorization": `Bearer ${token}` }
            })

            const data = await res.json()
            setArticles(data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPending()
    }, [])

    const approve = async (id) => {

        await fetch(`http://localhost:5000/api/articles/approve/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        fetchPending()
    }

    const reject = async (id) => {

        await fetch(`http://localhost:5000/api/articles/reject/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        fetchPending()
    }

    return (

        <div>

            <h2>Admin Panel</h2>

            {articles.length === 0 && (
                <p>No pending articles</p>
            )}

            {articles.map(a => (

                <div key={a._id} className="card">

                    <h3>{a.title}</h3>

                    <p>{a.content}</p>

                    <button
                        className="button success"
                        onClick={() => approve(a._id)}
                    >
                        Approve
                    </button>

                    <button
                        className="button danger"
                        onClick={() => reject(a._id)}
                        style={{ marginLeft: "10px" }}
                    >
                        Reject
                    </button>

                </div>

            ))}

        </div>
    )
}

export default Admin