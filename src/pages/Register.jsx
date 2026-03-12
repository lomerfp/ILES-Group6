import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState('student') // student, supervisor, registrar only
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    course: '',
    company: '',
    department: '',
    institution: ''
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    if (role === 'student') {
      if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required'
      if (!formData.course.trim()) newErrors.course = 'Course is required'
      if (!formData.company.trim()) newErrors.company = 'Company is required'
    } else if (role === 'supervisor') {
      if (!formData.department.trim()) newErrors.department = 'Department is required'
    } else if (role === 'registrar') {
      if (!formData.institution.trim()) newErrors.institution = 'Institution is required'
    }

    return newErrors
  }

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
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      alert('Registration successful! Redirecting to login...')
      // Save user with role to localStorage
      const userData = {
        ...formData,
        role
      }
      localStorage.setItem('users', JSON.stringify({
        ...JSON.parse(localStorage.getItem('users') || '{}'),
        [formData.email]: userData
      }))
      navigate('/login')
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <main>
      <section>
        <h2>Create Account</h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>Select your role to get started</p>

        {/* Role Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {[
            { value: 'student', label: '👨‍🎓 Student', desc: 'Internship participant' },
            { value: 'supervisor', label: '👨‍💼 Supervisor', desc: 'Supervise students' },
            { value: 'registrar', label: '🏫 Registrar', desc: 'University admin' }
          ].map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRole(option.value)}
              style={{
                padding: '15px',
                background: role === option.value ? '#3498db' : '#ecf0f1',
                color: role === option.value ? 'white' : '#333',
                border: `2px solid ${role === option.value ? '#3498db' : '#ddd'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              <div>{option.label}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '5px' }}>{option.desc}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="studentId">Student ID *</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
            />
            {errors.studentId && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.studentId}</p>}
          </div>

          <div>
            <label htmlFor="email">Email Address *</label>
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

          <div>
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.confirmPassword}</p>}
          </div>

          {/* Role-Specific Fields */}
          {role === 'student' && (
            <>
              <div>
                <label htmlFor="studentId">Student ID *</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                />
                {errors.studentId && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.studentId}</p>}
              </div>

              <div>
                <label htmlFor="course">Course *</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                />
                {errors.course && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.course}</p>}
              </div>

              <div>
                <label htmlFor="company">Internship Company *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g., Tech Corp"
                />
                {errors.company && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.company}</p>}
              </div>
            </>
          )}

          {role === 'supervisor' && (
            <div>
              <label htmlFor="department">Department *</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Computer Science Department"
              />
              {errors.department && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.department}</p>}
            </div>
          )}

          {role === 'registrar' && (
            <div>
              <label htmlFor="institution">Institution *</label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="e.g., University Name"
              />
              {errors.institution && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.institution}</p>}
            </div>
          )}

          <button type="submit">SignUp</button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </section>
    </main>
  )
}
