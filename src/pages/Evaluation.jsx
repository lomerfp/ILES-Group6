import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Evaluation() {
  const navigate = useNavigate()
  const [evaluations, setEvaluations] = useState([])

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      navigate('/login')
    }

    // Load sample evaluations
    setEvaluations([
      {
        id: 1,
        supervisor: 'John Smith',
        date: '2024-03-10',
        title: 'System Architecture Meeting',
        rating: 4.5,
        comments: 'Great participation! You provided excellent insights on the system design.',
        category: 'Technical Skills'
      },
      {
        id: 2,
        supervisor: 'Jane Doe',
        date: '2024-03-09',
        title: 'Database Optimization',
        rating: 5,
        comments: 'Outstanding work! Your optimization improved query performance by 40%.',
        category: 'Problem Solving'
      },
      {
        id: 3,
        supervisor: 'John Smith',
        date: '2024-03-08',
        title: 'Code Review Session',
        rating: 4,
        comments: 'Good code review skills. Keep working on more edge cases.',
        category: 'Code Quality'
      }
    ])
  }, [navigate])

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#27ae60'
    if (rating >= 3.5) return '#f39c12'
    return '#e74c3c'
  }

  return (
    <main>
      <section>
        <h2>My Evaluations</h2>
        <p>View feedback and evaluations from your supervisors.</p>
      </section>

      <section>
        <h3>Evaluation History</h3>
        {evaluations.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
            No evaluations yet. Keep working and your supervisors will evaluate your performance.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
            {evaluations.map(evaluation => (
              <div
                key={evaluation.id}
                style={{
                  border: '1px solid #ddd',
                  borderLeft: `4px solid ${getRatingColor(evaluation.rating)}`,
                  padding: '20px',
                  borderRadius: '8px',
                  background: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ marginBottom: '5px', color: '#2c3e50' }}>{evaluation.title}</h4>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '5px 0' }}>
                      <strong>Supervisor:</strong> {evaluation.supervisor}
                    </p>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '5px 0' }}>
                      <strong>Date:</strong> {evaluation.date}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: getRatingColor(evaluation.rating)
                    }}>
                      {evaluation.rating}
                    </div>
                    <p style={{ color: '#666', fontSize: '0.8rem', margin: '5px 0' }}>/ 5.0</p>
                    <p style={{
                      background: '#ecf0f1',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      marginTop: '5px'
                    }}>
                      {evaluation.category}
                    </p>
                  </div>
                </div>

                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  background: 'white',
                  borderRadius: '4px',
                  borderLeft: `3px solid ${getRatingColor(evaluation.rating)}`
                }}>
                  <p style={{ margin: 0, lineHeight: '1.6', color: '#333' }}>
                    <strong>Feedback:</strong> {evaluation.comments}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3>Evaluation Summary</h3>
        {evaluations.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
            <div style={{ padding: '15px', background: '#ecf0f1', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: '5px' }}>Average Rating</p>
              <p style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2c3e50'
              }}>
                {(evaluations.reduce((sum, e) => sum + e.rating, 0) / evaluations.length).toFixed(1)}
              </p>
            </div>
            <div style={{ padding: '15px', background: '#ecf0f1', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: '5px' }}>Total Evaluations</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                {evaluations.length}
              </p>
            </div>
            <div style={{ padding: '15px', background: '#ecf0f1', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: '5px' }}>Supervisors</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                {new Set(evaluations.map(e => e.supervisor)).size}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
