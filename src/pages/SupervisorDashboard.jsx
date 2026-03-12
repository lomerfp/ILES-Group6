import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SupervisorDashboard() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [assignedStudents, setAssignedStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [studentFiles, setStudentFiles] = useState([])
  const [feedbackText, setFeedbackText] = useState('')
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    const role = localStorage.getItem('userRole')
    
    if (!user || role !== 'supervisor') {
      navigate('/login')
      return
    }

    setCurrentUser(user)

    // Load all users and filter students
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Get students assigned to this supervisor (all students for demo)
    const students = allUsers.filter(u => u.role === 'student')
    setAssignedStudents(students)
  }, [navigate])

  const handleSelectStudent = (student) => {
    setSelectedStudent(student)
    const files = JSON.parse(localStorage.getItem('studentFiles_' + student.email) || '[]')
    setStudentFiles(files)
  }

  const handleSubmitFeedback = (fileId) => {
    if (!feedbackText.trim()) {
      alert('Please enter feedback')
      return
    }

    const feedbackData = {
      fileName: `Feedback_${fileId}_${Date.now()}.pdf`,
      from: currentUser,
      role: 'Supervisor',
      feedback: feedbackText,
      date: new Date().toLocaleDateString()
    }

    // Save feedback to student's feedback list
    const feedback = JSON.parse(localStorage.getItem('studentFeedback_' + selectedStudent.email) || '[]')
    feedback.push(feedbackData)
    localStorage.setItem('studentFeedback_' + selectedStudent.email, JSON.stringify(feedback))

    setFeedbackText('')
    setShowFeedbackForm(false)
    alert('Feedback submitted successfully!')
  }

  const handleApproveFile = (file) => {
    // Update file status to approved
    const updated = studentFiles.map(f => 
      f.id === file.id 
        ? { ...f, status: 'Approved ✓' }
        : f
    )
    setStudentFiles(updated)
    localStorage.setItem('studentFiles_' + selectedStudent.email, JSON.stringify(updated))
    alert('File approved!')
  }

  const handleRejectFile = (file) => {
    // Update file status to rejected
    const updated = studentFiles.map(f =>
      f.id === file.id
        ? { ...f, status: 'Needs Revision' }
        : f
    )
    setStudentFiles(updated)
    localStorage.setItem('studentFiles_' + selectedStudent.email, JSON.stringify(updated))
    alert('File marked for revision!')
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h2>Supervisor Dashboard</h2>
      <p style={{ color: '#7f8c8d' }}>Welcome, {currentUser}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        {/* Students List */}
        <section style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', height: 'fit-content' }}>
          <h3>👥 Assigned Students</h3>
          
          {assignedStudents.length === 0 ? (
            <p style={{ color: '#7f8c8d' }}>No students assigned</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {assignedStudents.map(student => (
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
                    textAlign: 'left'
                  }}
                >
                  <strong>{student.fullName}</strong>
                  {student.studentId && (
                    <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      ID: {student.studentId}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Student Details */}
        <section style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          {!selectedStudent ? (
            <p style={{ color: '#7f8c8d', textAlign: 'center', paddingTop: '2rem' }}>
              Select a student to view their submitted files
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
                    <p style={{ margin: 0 }}>{selectedStudent.email}</p>
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
                <h4>📄 Submitted Reports</h4>
                
                {studentFiles.length === 0 ? (
                  <p style={{ color: '#7f8c8d' }}>No reports submitted yet</p>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div style={{ flex: 1 }}>
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

                          {file.status === 'Pending Review' && (
                            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', // whiteSpace: 'nowrap'
                            }}>
                              <button
                                onClick={() => handleApproveFile(file)}
                                style={{
                                  padding: '0.5rem 1rem',
                                  backgroundColor: '#27ae60',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '0.9rem'
                                }}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectFile(file)}
                                style={{
                                  padding: '0.5rem 1rem',
                                  backgroundColor: '#e74c3c',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '0.9rem'
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Feedback Form */}
              <div>
                <h4>💬 Submit Feedback</h4>
                
                {!showFeedbackForm ? (
                  <button
                    onClick={() => setShowFeedbackForm(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Add Feedback
                  </button>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitFeedback(selectedStudent.email)
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
                      placeholder="Enter your feedback for the student's report..."
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
                        Submit Feedback
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
