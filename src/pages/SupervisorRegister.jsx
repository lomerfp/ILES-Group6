import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function SupervisorRegister() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    institution: '',
    role: 'supervisor'
  })
  const [errors, setErrors] = useState({})

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

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.department.trim()) newErrors.department = 'Department is required'
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password strength
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length === 0) {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const userExists = existingUsers.find(user => user.email === formData.email)

      if (userExists) {
        setErrors({ email: 'An account with this email already exists' })
        return
      }

      // Create new supervisor user
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'supervisor',
        department: formData.department,
        institution: formData.institution,
        createdAt: new Date().toISOString()
      }

      existingUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(existingUsers))

      alert('Supervisor account created successfully! Please login.')
      navigate('/supervisor-login')
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <main>
      <section>
        <h2>Supervisor Registration</h2>
        <p>Create your supervisor account to manage student internships</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
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
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={errors.department ? 'error' : ''}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Business Information Systems">Business Information Systems</option>
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Other">Other</option>
            </select>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="institution">Institution *</label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="Enter your institution/company name"
              className={errors.institution ? 'error' : ''}
            />
            {errors.institution && <span className="error-message">{errors.institution}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Create Supervisor Account</button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center' }}>
          Already have an account? <Link to="/supervisor-login" style={{ color: '#3498db', textDecoration: 'none' }}>Login here</Link>
        </p>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/register" style={{ color: '#7f8c8d', textDecoration: 'none' }}>← Back to General Registration</Link>
        </p>
      </section>
    </main>
  )
}