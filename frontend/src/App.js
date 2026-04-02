import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"
import Articles from "./pages/Articles"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute role="USER">
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute role="ADMIN">
            <Admin />
          </ProtectedRoute>
        } />

        <Route path="/articles" element={<Articles />} />

      </Routes>

    </Router>
  )
}

export default App