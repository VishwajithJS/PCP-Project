import { useState } from "react"

function Dashboard() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [message, setMessage] = useState("")

    const token = localStorage.getItem("token")

    const submitArticle = async (e) => {

        e.preventDefault()

        try {

            const res = await fetch("https://pcp-project.onrender.com/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content
                })
            })

            const data = await res.json()

            if (!res.ok) {
                setMessage(data.message || "Failed")
                return
            }

            setMessage("✅ Article submitted successfully")

            setTitle("")
            setContent("")

        } catch (err) {

            setMessage("❌ Server error")
        }
    }

    return (

        <div>

            <div className="dashboard-hero">

                <div>
                    <h1 className="dashboard-title">
                        Contributor Dashboard
                    </h1>

                    <p className="dashboard-subtitle">
                        Submit medical knowledge articles for admin approval
                    </p>
                </div>

            </div>

            <div className="dashboard-card">

                <h2 className="form-heading">
                    ✍ Submit New Article
                </h2>

                <form
                    onSubmit={submitArticle}
                    className="modern-form"
                >

                    <input
                        type="text"
                        placeholder="Article Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="modern-input"
                        required
                    />

                    <textarea
                        placeholder="Write your article content..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="modern-textarea"
                        required
                    />

                    <button
                        type="submit"
                        className="modern-btn"
                    >
                        🚀 Submit Article
                    </button>

                </form>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

            </div>

        </div>
    )
}

export default Dashboard