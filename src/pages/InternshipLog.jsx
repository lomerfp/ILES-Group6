import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function InternshipLog() {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [formData, setFormData] = useState({
    date: '',
    activity: '',
    description: '',
    hoursWorked: '',
    supervisor: ''
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      navigate('/login')
    }

    // Load sample logs
    setLogs([
      {
        id: 1,
        date: '2024-03-10',
        activity: 'System Architecture Meeting',
        description: 'Discussed new system architecture with the team',
        hoursWorked: 2,
        supervisor: 'John Smith',
        status: 'Approved'
      },
      {
        id: 2,
        date: '2024-03-09',
        activity: 'Database Optimization',
        description: 'Optimized database queries for better performance',
        hoursWorked: 3,
        supervisor: 'Jane Doe',
        status: 'Approved'
      },
      {
        id: 3,
        date: '2024-03-08',
        activity: 'Code Review Session',
        description: 'Participated in code review session',
        hoursWorked: 1.5,
        supervisor: 'John Smith',
        status: 'Pending'
      }
    ])
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.date || !formData.activity || !formData.hoursWorked) {
      alert('Please fill in all required fields')
      return
    }

    const newLog = {
      id: logs.length + 1,
      ...formData,
      hoursWorked: parseFloat(formData.hoursWorked),
      status: 'Pending'
    }

    setLogs(prev => [newLog, ...prev])
    setFormData({
      date: '',
      activity: '',
      description: '',
      hoursWorked: '',
      supervisor: ''
    })
    setShowForm(false)
    alert('Log submitted successfully!')
  }

  return (
    <main>
      <section>
        <h2>Internship Activity Log</h2>
        <p>Log your daily internship activities and hours worked.</p>

        <button onClick={() => setShowForm(!showForm)} style={{ marginTop: '20px' }}>
          {showForm ? 'Cancel' : 'Add New Log'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div>
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="activity">Activity Title *</label>
              <input
                type="text"
                id="activity"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                placeholder="e.g., Code Review"
                required
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe the activity"
              />
            </div>

            <div>
              <label htmlFor="hoursWorked">Hours Worked *</label>
              <input
                type="number"
                id="hoursWorked"
                name="hoursWorked"
                value={formData.hoursWorked}
                onChange={handleChange}
                placeholder="8"
                step="0.5"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="supervisor">Supervisor Name</label>
              <input
                type="text"
                id="supervisor"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                placeholder="Your supervisor's name"
              />
            </div>

            <button type="submit">Submit Log</button>
          </form>
        )}
      </section>

      <section>
        <h3>Your Activity Logs</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Description</th>
              <th>Hours</th>
              <th>Supervisor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No logs yet. Submit your first log!
                </td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td>{log.activity}</td>
                  <td>{log.description}</td>
                  <td>{log.hoursWorked}</td>
                  <td>{log.supervisor}</td>
                  <td style={{ 
                    color: log.status === 'Approved' ? '#27ae60' : log.status === 'Pending' ? '#f39c12' : '#e74c3c',
                    fontWeight: 'bold'
                  }}>
                    {log.status === 'Approved' ? '✓' : log.status === 'Pending' ? '⏳' : '✗'} {log.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  )
}
