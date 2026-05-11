import { Link, useNavigate } from "react-router-dom"

function Layout({ children }) {

    const navigate = useNavigate()

    const role = localStorage.getItem("role")

    const logout = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("role")

        navigate("/")
    }

    return (

        <div className="layout-container">

            <aside className="sidebar">

                <div>

                    <h2 className="logo">
                        📖 MedKB
                    </h2>

                    <p className="sidebar-role">
                        {role}
                    </p>

                    <nav className="sidebar-nav">

                        <Link to="/articles" className="nav-link">
                            📚 Articles
                        </Link>

                        {role === "CONTRIBUTOR" && (
                            <Link to="/dashboard" className="nav-link">
                                📝 Dashboard
                            </Link>
                        )}

                        {role === "ADMIN" && (
                            <Link to="/admin" className="nav-link">
                                🛡 Admin Panel
                            </Link>
                        )}

                    </nav>

                </div>

                <button
                    onClick={logout}
                    className="logout-btn"
                >
                    Logout
                </button>

            </aside>

            <main className="main-content">
                {children}
            </main>

        </div>
    )
}

export default Layout