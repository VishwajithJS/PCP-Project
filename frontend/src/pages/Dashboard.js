import { useState } from "react"
import "../App.css"

function Dashboard() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const token = localStorage.getItem("token")

    const submit = async () => {
        await fetch("http://localhost:5000/api/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        })

        alert("Submitted for approval")
        setTitle("")
        setContent("")
    }

    return (
        <div>

            <h2>Contributor Dashboard</h2>

            {/* Stats */}
            <div className="stats">
                <div className="stat-box">
                    <div className="stat-title">Articles Submitted</div>
                    <div className="stat-value">12</div>
                </div>

                <div className="stat-box">
                    <div className="stat-title">Pending</div>
                    <div className="stat-value">5</div>
                </div>
            </div>

            {/* Form */}
            <div className="card">
                <h3>Submit Article</h3>

                <input
                    className="input"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="input"
                    placeholder="Content"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button className="button primary" onClick={submit}>
                    Submit
                </button>
            </div>

        </div>
    )
}

export default Dashboard