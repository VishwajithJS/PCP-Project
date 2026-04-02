import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (res.ok) {
            localStorage.setItem("token", data.token)

            const user = jwtDecode(data.token)

            if (user.role === "ADMIN") {
                navigate("/admin")
            } else {
                navigate("/dashboard")
            }

        } else {
            alert(data.message)
        }
    }

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
                borderRadius: "12px",
                width: "320px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}>
                <h2 style={{ textAlign: "center" }}>Login</h2>

                <form onSubmit={handleLogin}>
                    <input placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                    />

                    <input type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                    />

                    <button style={{
                        width: "100%",
                        padding: "10px",
                        background: "#1e3c72",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login