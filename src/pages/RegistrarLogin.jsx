import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function RegistrarLogin() {
  const navigate = useNavigate()
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
      // Check credentials
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === formData.email && u.password === formData.password && u.role === 'registrar')

      if (user) {
        localStorage.setItem('currentUser', formData.email)
        localStorage.setItem('userRole', 'registrar')
        alert('Registrar login successful! Redirecting to dashboard...')
        navigate('/dashboard')
      } else {
        setErrors({ general: 'Invalid email, password, or you are not registered as a registrar' })
      }
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
          <h2>Reset Registrar Password</h2>
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
        <h2>Registrar Login</h2>
        <p>Sign in to your registrar account to oversee internship programs</p>

        {errors.general && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: '1px solid #f5c6cb'
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Sign In as Registrar</button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setShowResetForm(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#3498db',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            Forgot password?
          </button>
        </div>

        <p style={{ marginTop: '2rem', textAlign: 'center' }}>
          Don't have a registrar account? <Link to="/registrar-register" style={{ color: '#3498db', textDecoration: 'none' }}>Register here</Link>
        </p>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#7f8c8d', textDecoration: 'none' }}>← Back to General Login</Link>
        </p>
      </section>
    </main>
  )
}