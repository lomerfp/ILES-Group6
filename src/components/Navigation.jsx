import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <>
      <header>
        <h1>ILES</h1>
        <p>Internship Logging & Evaluation System</p>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/admin">Admin Panel</Link>
      </nav>
    </>
  )
}
