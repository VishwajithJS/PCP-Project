import { Link } from "react-router-dom"
import { getUser } from "../utils/auth"

function Layout({ children }) {

    const user = getUser()

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <div style={{
                width: "220px",
                background: "#1e3c72",
                color: "white",
                padding: "20px"
            }}>
                <h2>📚 KB</h2>

                <div style={{ marginTop: "30px" }}>

                    <Link to="/articles" style={{ display: "block", color: "white", marginBottom: "15px" }}>
                        🌍 Articles
                    </Link>

                    {user?.role === "USER" && (
                        <Link to="/dashboard" style={{ display: "block", color: "white", marginBottom: "15px" }}>
                            📝 Create
                        </Link>
                    )}

                    {user?.role === "ADMIN" && (
                        <Link to="/admin" style={{ display: "block", color: "white", marginBottom: "15px" }}>
                            ⚙️ Admin
                        </Link>
                    )}

                </div>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                padding: "20px",
                background: "#f5f7fa"
            }}>
                {children}
            </div>

        </div>
    )
}

export default Layout