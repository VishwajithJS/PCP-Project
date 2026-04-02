import { Link, useNavigate } from "react-router-dom"
import { getUser } from "../utils/auth"

function Navbar() {

    const user = getUser()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 30px",
            background: "#1e3c72",
            color: "white"
        }}>
            <h2>📚 KnowledgeBase</h2>

            <div>
                <Link to="/articles" style={{ color: "white", marginRight: "15px" }}>Articles</Link>

                {user?.role === "USER" && (
                    <Link to="/dashboard" style={{ color: "white", marginRight: "15px" }}>Dashboard</Link>
                )}

                {user?.role === "ADMIN" && (
                    <Link to="/admin" style={{ color: "white", marginRight: "15px" }}>Admin</Link>
                )}

                {user && <button onClick={logout}>Logout</button>}
            </div>
        </div>
    )
}

export default Navbar