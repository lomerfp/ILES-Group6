import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('students')
  const [students, setStudents] = useState([])
  const [logs, setLogs] = useState([])
  const [courses, setCourses] = useState([])
  const [newStudent, setNewStudent] = useState({ name: '', email: '', studentId: '', course: '' })
  const [newCourse, setNewCourse] = useState({ name: '', department: '', duration: '' })

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      navigate('/login')
    }

    // Load sample data for students
    setStudents([
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', studentId: 'STU001', course: 'CSC101', status: 'Active' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', studentId: 'STU002', course: 'CSC101', status: 'Active' },
      { id: 3, name: 'Carol Davis', email: 'carol@example.com', studentId: 'STU003', course: 'MIS201', status: 'Completed' }
    ])

    setLogs([
      { id: 1, studentId: 'STU001', activity: 'Code Review', date: '2024-03-10', hours: 2, status: 'Approved' },
      { id: 2, studentId: 'STU002', activity: 'Database Design', date: '2024-03-09', hours: 3, status: 'Pending' },
      { id: 3, studentId: 'STU001', activity: 'System Architecture', date: '2024-03-08', hours: 2.5, status: 'Approved' }
    ])

    setCourses([
      { id: 1, name: 'Web Development', department: 'Computer Science', duration: '12 weeks' },
      { id: 2, name: 'Data Analytics', department: 'Information Systems', duration: '10 weeks' },
      { id: 3, name: 'Mobile App Development', department: 'Computer Science', duration: '14 weeks' }
    ])
  }, [navigate])

  const handleAddStudent = (e) => {
    e.preventDefault()
    if (!newStudent.name || !newStudent.email || !newStudent.studentId || !newStudent.course) {
      alert('Please fill in all fields')
      return
    }

    const student = {
      id: students.length + 1,
      ...newStudent,
      status: 'Active'
    }

    setStudents(prev => [student, ...prev])
    setNewStudent({ name: '', email: '', studentId: '', course: '' })
    alert('Student added successfully!')
  }

  const handleAddCourse = (e) => {
    e.preventDefault()
    if (!newCourse.name || !newCourse.department || !newCourse.duration) {
      alert('Please fill in all fields')
      return
    }

    const course = {
      id: courses.length + 1,
      ...newCourse
    }

    setCourses(prev => [course, ...prev])
    setNewCourse({ name: '', department: '', duration: '' })
    alert('Course added successfully!')
  }

  const handleRemoveStudent = (id) => {
    if (confirm('Are you sure you want to remove this student?')) {
      setStudents(prev => prev.filter(s => s.id !== id))
    }
  }

  const handleRemoveCourse = (id) => {
    if (confirm('Are you sure you want to remove this course?')) {
      setCourses(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleApproveLog = (id) => {
    setLogs(prev => prev.map(log => log.id === id ? { ...log, status: 'Approved' } : log))
    alert('Log approved!')
  }

  const handleRejectLog = (id) => {
    setLogs(prev => prev.map(log => log.id === id ? { ...log, status: 'Rejected' } : log))
    alert('Log rejected!')
  }

  return (
    <main>
      <section>
        <h2>Admin Panel</h2>
        <p>Manage students, internship logs, and courses.</p>
      </section>

      <section>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #ecf0f1', paddingBottom: '10px' }}>
          <button
            onClick={() => setActiveTab('students')}
            style={{
              background: activeTab === 'students' ? '#3498db' : '#95a5a6',
              border: 'none',
              padding: '10px 20px',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            👥 Students
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              background: activeTab === 'logs' ? '#3498db' : '#95a5a6',
              border: 'none',
              padding: '10px 20px',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📝 Logs
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            style={{
              background: activeTab === 'courses' ? '#3498db' : '#95a5a6',
              border: 'none',
              padding: '10px 20px',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📚 Courses
          </button>
        </div>

        {activeTab === 'students' && (
          <>
            <h3>Add New Student</h3>
            <form onSubmit={handleAddStudent} style={{ marginBottom: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Student ID"
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, studentId: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Course Code"
                  value={newStudent.course}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, course: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" style={{ marginTop: '15px' }}>Add Student</button>
            </form>

            <h3>Students List</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Student ID</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.studentId}</td>
                    <td>{student.course}</td>
                    <td style={{ color: student.status === 'Active' ? '#27ae60' : '#95a5a6' }}>
                      {student.status}
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemoveStudent(student.id)}
                        style={{ background: '#e74c3c', padding: '5px 10px', fontSize: '0.9rem' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'logs' && (
          <>
            <h3>Internship Logs Review</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Activity</th>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.studentId}</td>
                    <td>{log.activity}</td>
                    <td>{log.date}</td>
                    <td>{log.hours}</td>
                    <td style={{
                      color: log.status === 'Approved' ? '#27ae60' : log.status === 'Pending' ? '#f39c12' : '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      {log.status}
                    </td>
                    <td>
                      {log.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApproveLog(log.id)}
                            style={{ background: '#27ae60', padding: '5px 10px', fontSize: '0.9rem', marginRight: '5px' }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectLog(log.id)}
                            style={{ background: '#e74c3c', padding: '5px 10px', fontSize: '0.9rem' }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {log.status !== 'Pending' && (
                        <span style={{ color: '#999' }}>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'courses' && (
          <>
            <h3>Add New Course</h3>
            <form onSubmit={handleAddCourse} style={{ marginBottom: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Course Name"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={newCourse.department}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, department: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, duration: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" style={{ marginTop: '15px' }}>Add Course</button>
            </form>

            <h3>Courses List</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.department}</td>
                    <td>{course.duration}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        style={{ background: '#e74c3c', padding: '5px 10px', fontSize: '0.9rem' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </main>
  )
}
