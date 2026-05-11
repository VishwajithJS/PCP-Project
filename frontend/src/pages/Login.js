import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import "./Login.css"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.message)
                return
            }

            localStorage.setItem("token", data.token)

            const user = jwtDecode(data.token)

            if (user.role === "ADMIN") {
                window.location.href = "/admin"
            } else {
                window.location.href = "/dashboard"
            }

        } catch {
            alert("Server error")
        }
    }

    return (
        <div className="login-wrapper">

            <div className="login-card">

                <h1 className="title">🏥 MedKB</h1>
                <p className="subtitle">Medical Knowledge System</p>

                <form onSubmit={handleLogin}>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="login-btn">Login</button>

                </form>

            </div>

        </div>
    )
}

export default Login