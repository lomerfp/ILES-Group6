import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState('student') // student, supervisor, registrar only 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length === 0) {
      alert('Login successful! Redirecting to dashboard...')
      localStorage.setItem('currentUser', formData.email)
      localStorage.setItem('userRole', role)
      navigate('/dashboard')
    } else {
      setErrors(newErrors)
    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (resetEmail.trim()) {
      alert(`Password reset link has been sent to ${resetEmail}`)
      setResetEmail('')
      setShowResetForm(false)
    } else {
      alert('Please enter your email address')
    }
  }

  if (showResetForm) {
    return (
      <main>
        <section>
          <h2>Reset Password</h2>
          <p>Enter your email address and we'll send you instructions to reset your password.</p>

          <form onSubmit={handleForgotPassword}>
            <div>
              <label htmlFor="reset-email">Email Address *</label>
              <input
                type="email"
                id="reset-email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit">Send Reset Link</button>
            <button type="button" onClick={() => setShowResetForm(false)} style={{ background: '#95a5a6' }}>
              Back to Login
            </button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section>
        <h2>Login to ILES</h2>
        
        <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#34495e', fontWeight: 'bold' }}>
            Select your role:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setRole('student')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: role === 'student' ? '#3498db' : '#bdc3c7',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: role === 'student' ? 'bold' : 'normal',
                transition: 'all 0.3s'
              }}
            >
              📚 Student
            </button>
            <button
              type="button"
              onClick={() => setRole('supervisor')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: role === 'supervisor' ? '#27ae60' : '#bdc3c7',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: role === 'supervisor' ? 'bold' : 'normal',
                transition: 'all 0.3s'
              }}
            >
              👔 Supervisor
            </button>
            <button
              type="button"
              onClick={() => setRole('registrar')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: role === 'registrar' ? '#e74c3c' : '#bdc3c7',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: role === 'registrar' ? 'bold' : 'normal',
                transition: 'all 0.3s'
              }}
            >
              🏛️ Registrar
            </button>
          </div>
          <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.85rem', color: '#7f8c8d' }}>
            Currently logging in as: <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.password}</p>}
          </div>

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <div className="forgot-password-container">
          <button
            type="button"
            className="forgot-password-btn"
            onClick={() => setShowResetForm(true)}
          >
            Forgot Password?
          </button>
        </div>
      </section>
    </main>
  )
}
