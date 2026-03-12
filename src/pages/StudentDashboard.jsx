import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [feedbackFiles, setFeedbackFiles] = useState([])
  const [fileName, setFileName] = useState('')
  const [fileDescription, setFileDescription] = useState('')
  const [showUploadForm, setShowUploadForm] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    const role = localStorage.getItem('userRole')
    
    if (!user || role !== 'student') {
      navigate('/login')
      return
    }

    setCurrentUser(user)

    // Load student data
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Load uploaded files
    const files = JSON.parse(localStorage.getItem('studentFiles_' + user) || '[]')
    setUploadedFiles(files)

    // Load feedback files from supervisors/registrars
    const feedback = JSON.parse(localStorage.getItem('studentFeedback_' + user) || '[]')
    setFeedbackFiles(feedback)
  }, [navigate])

  const handleFileUpload = (e) => {
    e.preventDefault()
    
    if (!fileName.trim()) {
      alert('Please enter a file name')
      return
    }

    const newFile = {
      id: Date.now(),
      name: fileName,
      description: fileDescription,
      uploadDate: new Date().toLocaleDateString(),
      uploadTime: new Date().toLocaleTimeString(),
      status: 'Pending Review'
    }

    const updated = [...uploadedFiles, newFile]
    setUploadedFiles(updated)
    localStorage.setItem('studentFiles_' + currentUser, JSON.stringify(updated))

    setFileName('')
    setFileDescription('')
    setShowUploadForm(false)
    alert('File uploaded successfully!')
  }

  const handleDownloadFeedback = (feedback) => {
    alert(`Downloading ${feedback.fileName} from ${feedback.from}...\n\nFeedback:\n${feedback.feedback}`)
  }

  const handleDeleteFile = (fileId) => {
    const updated = uploadedFiles.filter(f => f.id !== fileId)
    setUploadedFiles(updated)
    localStorage.setItem('studentFiles_' + currentUser, JSON.stringify(updated))
    alert('File deleted successfully')
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h2>Student Dashboard</h2>
      <p style={{ color: '#7f8c8d' }}>Welcome, {currentUser}</p>

      {/* Upload Section */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📤 Upload Internship Report</h3>
        
        {!showUploadForm ? (
          <button
            onClick={() => setShowUploadForm(true)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Upload New Report
          </button>
        ) : (
          <form
            onSubmit={handleFileUpload}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '500px'
            }}
          >
            <div>
              <label htmlFor="filename">Report Name *</label>
              <input
                id="filename"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g., Internship_Report_Week1.pdf"
                style={{
                  padding: '0.5rem',
                  border: '1px solid #bdc3c7',
                  borderRadius: '4px',
                  width: '100%'
                }}
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
                placeholder="Brief description of what's included..."
                rows="3"
                style={{
                  padding: '0.5rem',
                  border: '1px solid #bdc3c7',
                  borderRadius: '4px',
                  width: '100%',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                style={{
                  padding: '0.5rem 1rem',
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
      </section>

      {/* Uploaded Files Section */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📄 My Uploaded Reports</h3>
        
        {uploadedFiles.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>No reports uploaded yet</p>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {uploadedFiles.map(file => (
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
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{file.name}</h4>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                      {file.uploadDate} at {file.uploadTime}
                    </p>
                    {file.description && (
                      <p style={{ margin: '0.5rem 0 0 0', color: '#34495e', fontSize: '0.95rem' }}>
                        {file.description}
                      </p>
                    )}
                    <div style={{ marginTop: '0.5rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#fff3cd',
                          color: '#856404',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }}
                      >
                        {file.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginLeft: '1rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feedback Section */}
      <section style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>💬 Feedback from Supervisors & Registrars</h3>
        
        {feedbackFiles.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>No feedback available yet</p>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {feedbackFiles.map((feedback, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  backgroundColor: 'white',
                  border: '1px solid #bdc3c7',
                  borderRadius: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>
                      📥 {feedback.fileName}
                    </h4>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                      From: <strong>{feedback.from}</strong> ({feedback.role})
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#34495e', fontSize: '0.95rem' }}>
                      {feedback.feedback}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownloadFeedback(feedback)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginLeft: '1rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
