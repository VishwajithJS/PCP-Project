import { useState, useEffect } from "react"

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [articles, setArticles] = useState([])

  const token = localStorage.getItem("token")

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("token", data.token)
        alert("Login successful ✅")
        window.location.reload()
      } else {
        alert(data.message || "Login failed ❌")
      }

    } catch {
      alert("Backend not running ❌")
    }

    setLoading(false)
  }

  // 📝 CREATE ARTICLE
  const handleCreate = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      })

      if (res.ok) {
        alert("Article submitted (Pending approval) 📝")
        setTitle("")
        setContent("")
      } else {
        const data = await res.json()
        alert(data.message)
      }

    } catch {
      alert("Server error ❌")
    }
  }

  // 📥 FETCH PENDING (ADMIN)
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/articles/pending", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        const data = await res.json()

        if (res.ok) {
          setArticles(data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (token) {
      fetchPending()
    }

  }, [token])

  // ✅ APPROVE
  const approve = async (id) => {
    await fetch(`http://localhost:5000/api/articles/approve/${id}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}` }
    })
    window.location.reload()
  }

  // ❌ REJECT
  const reject = async (id) => {
    await fetch(`http://localhost:5000/api/articles/reject/${id}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}` }
    })
    window.location.reload()
  }

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  // 🔐 LOGIN PAGE
  if (!token) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #1e3c72, #2a5298)"
      }}>

        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "300px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
        }}>

          <h2 style={{ textAlign: "center" }}>Login</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            />

            <button style={{
              width: "100%",
              padding: "10px",
              background: "#2a5298",
              color: "white",
              border: "none"
            }}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>
      </div>
    )
  }

  // 🧠 MAIN DASHBOARD
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>

      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Create Article</h3>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br /><br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        /><br /><br />

        <button>Submit Article</button>
      </form>

      <h3>Pending Articles (Admin)</h3>

      {articles.length === 0 && <p>No pending articles</p>}

      {articles.map(a => (
        <div key={a._id} style={{
          border: "1px solid gray",
          margin: "10px",
          padding: "10px"
        }}>
          <h4>{a.title}</h4>
          <p>{a.content}</p>

          <button onClick={() => approve(a._id)}>Approve</button>
          <button onClick={() => reject(a._id)}>Reject</button>
        </div>
      ))}

    </div>
  )
}

export default App