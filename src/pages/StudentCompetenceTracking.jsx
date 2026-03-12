import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentCompetenceTracking() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [competences, setCompetences] = useState([])
  const [selectedCompetence, setSelectedCompetence] = useState('')
  const [competenceLevel, setCompetenceLevel] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    const role = localStorage.getItem('userRole')

    if (!user || role !== 'student') {
      navigate('/login')
      return
    }

    setCurrentUser(user)

    // Load student competences
    const studentCompetences = JSON.parse(localStorage.getItem('studentCompetences_' + user) || '[]')
    setCompetences(studentCompetences)
  }, [navigate])

  const competenceOptions = [
    'Technical Skills',
    'Communication Skills',
    'Problem Solving',
    'Teamwork',
    'Time Management',
    'Project Management',
    'Research Skills',
    'Leadership',
    'Adaptability',
    'Critical Thinking',
    'Professional Ethics',
    'Data Analysis',
    'Software Development',
    'System Design',
    'Quality Assurance',
    'Documentation'
  ]

  const levelOptions = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ]

  const handleAddCompetence = () => {
    if (!selectedCompetence || !competenceLevel) {
      alert('Please select both competence and level')
      return
    }

    const newCompetence = {
      id: Date.now(),
      name: selectedCompetence,
      level: competenceLevel,
      dateAdded: new Date().toLocaleDateString(),
      status: 'Self-Assessed'
    }

    const updatedCompetences = [...competences, newCompetence]
    setCompetences(updatedCompetences)
    localStorage.setItem('studentCompetences_' + currentUser, JSON.stringify(updatedCompetences))

    setSelectedCompetence('')
    setCompetenceLevel('')
    setShowAddForm(false)
    alert('Competence added successfully!')
  }

  const handleDeleteCompetence = (competenceId) => {
    const updatedCompetences = competences.filter(c => c.id !== competenceId)
    setCompetences(updatedCompetences)
    localStorage.setItem('studentCompetences_' + currentUser, JSON.stringify(updatedCompetences))
    alert('Competence removed')
  }

  const getCompetenceStats = () => {
    const levels = competences.reduce((acc, comp) => {
      acc[comp.level] = (acc[comp.level] || 0) + 1
      return acc
    }, {})

    return {
      total: competences.length,
      beginner: levels['Beginner'] || 0,
      intermediate: levels['Intermediate'] || 0,
      advanced: levels['Advanced'] || 0,
      expert: levels['Expert'] || 0
    }
  }

  const stats = getCompetenceStats()

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h2>Student Competence Tracking</h2>
      <p style={{ color: '#7f8c8d' }}>Track and develop your professional competencies during internship</p>

      {/* Statistics Overview */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#ecf0f1', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>{stats.total}</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>Total Competences</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#d4edda', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#155724' }}>{stats.beginner}</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>Beginner</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>{stats.intermediate}</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>Intermediate</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#d1ecf1', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#0c5460' }}>{stats.advanced}</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>Advanced</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#721c24' }}>{stats.expert}</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>Expert</p>
        </div>
      </section>

      {/* Add Competence Section */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>🆕 Add New Competence</h3>

        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
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
            Add Competence
          </button>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '500px'
          }}>
            <div>
              <label htmlFor="competence">Select Competence *</label>
              <select
                id="competence"
                value={selectedCompetence}
                onChange={(e) => setSelectedCompetence(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #bdc3c7',
                  borderRadius: '4px',
                  width: '100%'
                }}
              >
                <option value="">Choose a competence</option>
                {competenceOptions.map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="level">Current Level *</label>
              <select
                id="level"
                value={competenceLevel}
                onChange={(e) => setCompetenceLevel(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #bdc3c7',
                  borderRadius: '4px',
                  width: '100%'
                }}
              >
                <option value="">Select your level</option>
                {levelOptions.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddCompetence}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add Competence
              </button>
              <button
                onClick={() => setShowAddForm(false)}
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
          </div>
        )}
      </section>

      {/* Competences List */}
      <section style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📋 My Competences</h3>

        {competences.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>No competences added yet. Start tracking your professional development!</p>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {competences.map(competence => (
              <div
                key={competence.id}
                style={{
                  padding: '1rem',
                  backgroundColor: 'white',
                  border: '1px solid #bdc3c7',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>{competence.name}</h4>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: competence.level === 'Beginner' ? '#d4edda' :
                                       competence.level === 'Intermediate' ? '#fff3cd' :
                                       competence.level === 'Advanced' ? '#d1ecf1' : '#f8d7da',
                        color: competence.level === 'Beginner' ? '#155724' :
                               competence.level === 'Intermediate' ? '#856404' :
                               competence.level === 'Advanced' ? '#0c5460' : '#721c24',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {competence.level}
                    </span>
                    <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                      Added: {competence.dateAdded}
                    </span>
                    <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                      Status: {competence.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCompetence(competence.id)}
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
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}