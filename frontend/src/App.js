import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"
import Articles from "./pages/Articles"

import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"

function App() {

  return (

    <Router>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

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