import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"
import Articles from "./pages/Articles"

import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"

function App() {
  return (
    <Router>

      <Routes>

        {/* LOGIN — NO LAYOUT */}
        <Route path="/" element={<Login />} />

        {/* CONTRIBUTOR */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="CONTRIBUTOR">
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Layout>
                <Admin />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ARTICLES (PUBLIC but inside layout) */}
        <Route
          path="/articles"
          element={
            <Layout>
              <Articles />
            </Layout>
          }
        />

      </Routes>

    </Router>
  )
}

export default App