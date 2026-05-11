import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../App.css"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const submit = async (e) => {

        e.preventDefault()

        console.log("LOGIN BUTTON CLICKED")

        try {

            const res = await fetch("https://pcp-project.onrender.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            console.log("RAW RESPONSE:", res)

            const data = await res.json()

            console.log("LOGIN RESPONSE:", data)

            if (!res.ok) {

                setError(data.message || "Login failed")
                return
            }

            localStorage.setItem("token", data.token)
            localStorage.setItem("role", data.role)

            console.log("ROLE SAVED:", data.role)

            if (data.role === "ADMIN") {

                navigate("/admin")

            } else {

                navigate("/dashboard")
            }

        } catch (err) {

            console.log("FULL ERROR:", err)

            setError("Server error")
        }
    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h1 className="login-title">
                    📖 MedKB
                </h1>

                <p className="login-subtitle">
                    Medical Knowledge Management System
                </p>

                <form onSubmit={submit} className="login-form">

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                    {error && (
                        <p className="error-text">
                            {error}
                        </p>
                    )}

                </form>

                <p className="register-text">

                    Don’t have an account?

                    <Link to="/register" className="register-link">
                        Create New User
                    </Link>

                </p>

            </div>

        </div>
    )
}

export default Login