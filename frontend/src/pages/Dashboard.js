import { useState } from "react"

function Dashboard() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const token = localStorage.getItem("token")

    const handleCreate = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:5000/api/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        })

        if (res.ok) {
            alert("Submitted 📝")
        }
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Create Article</h2>
            <form onSubmit={handleCreate}>
                <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} /><br /><br />
                <textarea placeholder="Content" onChange={(e) => setContent(e.target.value)} /><br /><br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Dashboard