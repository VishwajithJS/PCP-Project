import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../App.css"

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CONTRIBUTOR"
    })

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {

        e.preventDefault()

        try {

            const res = await fetch(
                "https://pcp-project.onrender.com/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            )

            const data = await res.json()

            if (!res.ok) {
                setError(data.message)
                return
            }

            setMessage("Registration Successful!")

            setTimeout(() => {
                navigate("/")
            }, 1500)

        } catch (err) {

            setError("Server error")
        }
    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h1 className="login-title">
                    Create User
                </h1>

                <form
                    onSubmit={submit}
                    className="login-form"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="login-input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="login-input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="login-input"
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="role"
                        className="login-input"
                        onChange={handleChange}
                    >
                        <option value="CONTRIBUTOR">
                            Contributor
                        </option>

                        <option value="ADMIN">
                            Admin
                        </option>
                    </select>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Register
                    </button>

                    {message && (
                        <p
                            style={{
                                color: "#22c55e",
                                marginTop: "15px",
                                fontWeight: "bold"
                            }}
                        >
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="error-text">
                            {error}
                        </p>
                    )}

                </form>

                <p className="register-text">

                    Already have an account?

                    <Link
                        to="/"
                        className="register-link"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    )
}

export default Register