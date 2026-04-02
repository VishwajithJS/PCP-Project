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

        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* USER */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="USER">
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

        {/* PUBLIC ARTICLES */}
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