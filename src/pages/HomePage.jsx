import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main>
      <section>
        <h2>Welcome to ILES</h2>
        <p>Professional internship management and evaluation system.</p>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      </section>

      <section>
        <h2>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div style={{ padding: '15px', background: '#ecf0f1', borderRadius: '8px' }}>
            <h3>📝 Log Activities</h3>
            <p>Submit and track your internship activities with ease.</p>
          </div>
          <div style={{ padding: '15px', background: '#ecf0f1', borderRadius: '8px' }}>
            <h3>⭐ Get Evaluated</h3>
            <p>Receive detailed feedback from your supervisor.</p>
          </div>
          <div style={{ padding: '15px', background: '#ecf0f1', borderRadius: '8px' }}>
            <h3>⚙️ Admin Management</h3>
            <p>Complete system management for administrators.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
