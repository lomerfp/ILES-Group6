import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegistrarDashboard() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [allStudents, setAllStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [studentFiles, setStudentFiles] = useState([])
  const [feedbackText, setFeedbackText] = useState('')
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    const role = localStorage.getItem('userRole')
    
    if (!user || role !== 'registrar') {
      navigate('/login')
      return
    }

    setCurrentUser(user)

    // Load all students
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const students = allUsers.filter(u => u.role === 'student')
    setAllStudents(students)
  }, [navigate])

  const handleSelectStudent = (student) => {
    setSelectedStudent(student)
    const files = JSON.parse(localStorage.getItem('studentFiles_' + student.email) || '[]')
    setStudentFiles(files)
  }

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      alert('Please enter feedback')
      return
    }

    const feedbackData = {
      fileName: `Official_Feedback_${Date.now()}.pdf`,
      from: currentUser,
      role: 'Registrar',
      feedback: feedbackText,
      date: new Date().toLocaleDateString()
    }

    // Save feedback to student's feedback list
    const feedback = JSON.parse(localStorage.getItem('studentFeedback_' + selectedStudent.email) || '[]')
    feedback.push(feedbackData)
    localStorage.setItem('studentFeedback_' + selectedStudent.email, JSON.stringify(feedback))

    setFeedbackText('')
    setShowFeedbackForm(false)
    alert('Official feedback submitted successfully!')
  }

  const filteredStudents = allStudents.filter(student =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.studentId && student.studentId.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getStatistics = () => {
    const totalStudents = allStudents.length
    const studentsWithSubmissions = allStudents.filter(s => {
      const files = JSON.parse(localStorage.getItem('studentFiles_' + s.email) || '[]')
      return files.length > 0
    }).length
    const totalSubmissions = allStudents.reduce((count, s) => {
      const files = JSON.parse(localStorage.getItem('studentFiles_' + s.email) || '[]')
      return count + files.length
    }, 0)

    return { totalStudents, studentsWithSubmissions, totalSubmissions }
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  const stats = getStatistics()

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h2>Registrar Dashboard</h2>
      <p style={{ color: '#7f8c8d' }}>Welcome, {currentUser}</p>

      {/* Statistics Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: '#e8f4f8', borderRadius: '8px', borderLeft: '4px solid #3498db' }}>
          <p style={{ margin: '0 0 0.5rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>Total Students</p>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#3498db' }}>{stats.totalStudents}</h3>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#e8f8f0', borderRadius: '8px', borderLeft: '4px solid #27ae60' }}>
          <p style={{ margin: '0 0 0.5rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>Active Submissions</p>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#27ae60' }}>{stats.studentsWithSubmissions}</h3>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f0e8', borderRadius: '8px', borderLeft: '4px solid #e67e22' }}>
          <p style={{ margin: '0 0 0.5rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>Total Reports</p>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#e67e22' }}>{stats.totalSubmissions}</h3>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        {/* Students List */}
        <section style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', height: 'fit-content' }}>
          <h3>👥 All Students</h3>
          
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '1rem',
              border: '1px solid #bdc3c7',
              borderRadius: '4px'
            }}
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
            {filteredStudents.length === 0 ? (
              <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>No students found</p>
            ) : (
              filteredStudents.map(student => (
                <button
                  key={student.email}
                  onClick={() => handleSelectStudent(student)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: selectedStudent?.email === student.email ? '#3498db' : 'white',
                    color: selectedStudent?.email === student.email ? 'white' : '#2c3e50',
                    border: '1px solid #bdc3c7',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.9rem'
                  }}
                >
                  <strong>{student.fullName}</strong>
                  {student.studentId && (
                    <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      {student.studentId}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </section>

        {/* Student Details */}
        <section style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          {!selectedStudent ? (
            <p style={{ color: '#7f8c8d', textAlign: 'center', paddingTop: '2rem' }}>
              Select a student to view their profile and submission history
            </p>
          ) : (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h3>{selectedStudent.fullName}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>Student ID</p>
                    <p style={{ margin: 0 }}>{selectedStudent.studentId || 'N/A'}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>Email</p>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{selectedStudent.email}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>Course</p>
                    <p style={{ margin: 0 }}>{selectedStudent.course || 'N/A'}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>Company</p>
                    <p style={{ margin: 0 }}>{selectedStudent.company || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Submitted Files */}
              <div style={{ marginBottom: '2rem' }}>
                <h4>📄 Submission History</h4>
                
                {studentFiles.length === 0 ? (
                  <p style={{ color: '#7f8c8d' }}>No reports submitted</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {studentFiles.map(file => (
                      <div
                        key={file.id}
                        style={{
                          padding: '1rem',
                          backgroundColor: 'white',
                          border: '1px solid #bdc3c7',
                          borderRadius: '4px'
                        }}
                      >
                        <div>
                          <h5 style={{ margin: '0 0 0.5rem 0' }}>{file.name}</h5>
                          <p style={{ margin: '0 0 0.25rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                            Uploaded: {file.uploadDate} at {file.uploadTime}
                          </p>
                          {file.description && (
                            <p style={{ margin: '0.5rem 0 0 0', color: '#34495e', fontSize: '0.9rem' }}>
                              {file.description}
                            </p>
                          )}
                          <div style={{ marginTop: '0.5rem' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                backgroundColor: file.status === 'Approved ✓' ? '#d4edda' : file.status === 'Needs Revision' ? '#f8d7da' : '#fff3cd',
                                color: file.status === 'Approved ✓' ? '#155724' : file.status === 'Needs Revision' ? '#721c24' : '#856404',
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {file.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Official Feedback Form */}
              <div>
                <h4>📋 Official Feedback</h4>
                
                {!showFeedbackForm ? (
                  <button
                    onClick={() => setShowFeedbackForm(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#e67e22',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Issue Official Feedback
                  </button>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitFeedback()
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}
                  >
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Issue official feedback/certification for the student..."
                      rows="5"
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #bdc3c7',
                        borderRadius: '4px',
                        fontFamily: 'Arial, sans-serif'
                      }}
                    />

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="submit"
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#27ae60',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Issue Feedback
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFeedbackForm(false)}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#95a5a6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}
