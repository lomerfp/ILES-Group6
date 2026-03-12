import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: '#2c3e50',
      color: 'white',
      padding: '30px 20px',
      marginTop: 'auto',
      borderTop: '3px solid #3498db'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '30px',
          paddingBottom: '30px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Company Info */}
          <div>
            <h4 style={{ marginBottom: '10px', color: '#3498db' }}>ILES System</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: '0' }}>
              Professional Internship Logging & Evaluation System designed for efficient tracking and management of internship programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: '10px', color: '#3498db' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/login" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Login
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/register" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Credit */}
          <div style={{
            background: 'rgba(52, 152, 219, 0.1)',
            padding: '15px',
            borderRadius: '8px',
            borderLeft: '4px solid #3498db'
          }}>
            <h4 style={{ marginBottom: '10px', color: '#3498db' }}>Frontend Development</h4>
            <p style={{ fontSize: '0.9rem', margin: '0 0 5px 0' }}>
              <strong style={{ color: '#f39c12' }}>LOMER Francis Peter</strong>
            </p>
            <p style={{ fontSize: '0.85rem', margin: '0', opacity: '0.9' }}>
              Frontend Developer & UI/UX Lead
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          fontSize: '0.85rem',
          color: '#bbb'
        }}>
          <div>
            <p style={{ margin: '0' }}>
              © {currentYear} ILES Group 6. All rights reserved.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                alert('Privacy Policy - Coming Soon')
              }}
              style={{ color: '#3498db', textDecoration: 'none' }}
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                alert('Terms of Service - Coming Soon')
              }}
              style={{ color: '#3498db', textDecoration: 'none' }}
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                alert('Contact - support@iles.com')
              }}
              style={{ color: '#3498db', textDecoration: 'none' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
