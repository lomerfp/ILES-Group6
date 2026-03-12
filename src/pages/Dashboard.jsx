import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import StudentDashboard from './StudentDashboard'
import SupervisorDashboard from './SupervisorDashboard'
import RegistrarDashboard from './RegistrarDashboard'

export default function Dashboard() {
  const navigate = useNavigate()
  const role = localStorage.getItem('userRole')
  const currentUser = localStorage.getItem('currentUser')

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [navigate, currentUser])

  if (!currentUser || !role) {
    return <div>Loading...</div>
  }

  // Route to role-specific dashboard for supervisor
  if (role === 'student') {
    return <StudentDashboard />
  } else if (role === 'supervisor') {
    return <SupervisorDashboard />
  } else if (role === 'registrar') {
    return <RegistrarDashboard />
  }

  // Fallback
  return <div>Unknown role. Please log in again.</div>
}

