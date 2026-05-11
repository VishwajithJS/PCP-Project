import { Link, useNavigate } from "react-router-dom"
import { getUser } from "../utils/auth"
import "../App.css"

function Layout({ children }) {

    const user = getUser()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div className="layout">

            <div className="sidebar">

                <div>
                    <div className="logo">🏥 MedKB</div>

                    <Link to="/articles" className="nav-link">Articles</Link>

                    {user?.role === "CONTRIBUTOR" && (
                        <Link to="/dashboard" className="nav-link">Submit</Link>
                    )}

                    {user?.role === "ADMIN" && (
                        <Link to="/admin" className="nav-link">Admin Panel</Link>
                    )}
                </div>

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>

            </div>

            <div className="content">
                {children}
            </div>

        </div>
    )
}

export default Layout