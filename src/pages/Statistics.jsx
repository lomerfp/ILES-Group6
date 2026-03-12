import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Statistics() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [viewMode, setViewMode] = useState('student') // 'student' or 'supervisor'

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      navigate('/login')
      return
    }

    // Generate mock statistics data
    setStats({
      student: {
        totalLogs: 12,
        logsApproved: 10,
        logsPending: 2,
        totalHours: 87.5,
        averageRating: 4.3,
        totalEvaluations: 8,
        supervisorCount: 2,
        completionRate: 83,
        trends: [
          { month: 'Jan', logs: 2, hours: 16 },
          { month: 'Feb', logs: 3, hours: 24 },
          { month: 'Mar', logs: 4, hours: 30 },
          { month: 'Apr', logs: 3, hours: 17.5 }
        ],
        ratingBreakdown: {
          excellent: 4,
          good: 3,
          average: 1,
          poor: 0
        }
      },
      supervisor: {
        studentsSupervised: 15,
        logsReviewed: 45,
        evaluationsGiven: 42,
        averageReviewTime: '2.3 days',
        approvalRate: 89,
        pendingReview: 3,
        activeStudents: 12,
        completedStudents: 3,
        monthlyData: [
          { month: 'Jan', reviewed: 12, evaluations: 11 },
          { month: 'Feb', reviewed: 14, evaluations: 13 },
          { month: 'Mar', reviewed: 12, evaluations: 12 },
          { month: 'Apr', reviewed: 7, evaluations: 6 }
        ]
      }
    })
  }, [navigate])

  if (!stats) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>

  const currentStats = stats[viewMode]

  return (
    <main>
      <section>
        <h2>📊 Statistics & Analytics</h2>
        
        {/* View Mode Selector */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          borderBottom: '2px solid #ecf0f1',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => setViewMode('student')}
            style={{
              background: viewMode === 'student' ? '#3498db' : '#95a5a6',
              border: 'none',
              padding: '10px 20px',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            👤 Student View
          </button>
          <button
            onClick={() => setViewMode('supervisor')}
            style={{
              background: viewMode === 'supervisor' ? '#3498db' : '#95a5a6',
              border: 'none',
              padding: '10px 20px',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            👨‍💼 Supervisor View
          </button>
        </div>
      </section>

      {viewMode === 'student' && (
        <>
          {/* Student Statistics */}
          <section>
            <h3>Your Activity Overview</h3>
            
            {/* Key Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '15px',
              marginTop: '15px'
            }}>
              <StatCard
                title="Total Logs Submitted"
                value={currentStats.totalLogs}
                subtitle="activities"
                color="#3498db"
              />
              <StatCard
                title="Approved Logs"
                value={currentStats.logsApproved}
                subtitle={`out of ${currentStats.totalLogs}`}
                color="#27ae60"
              />
              <StatCard
                title="Pending Review"
                value={currentStats.logsPending}
                subtitle="awaiting approval"
                color="#f39c12"
              />
              <StatCard
                title="Total Hours"
                value={currentStats.totalHours}
                subtitle="hours worked"
                color="#9b59b6"
              />
              <StatCard
                title="Average Rating"
                value={currentStats.averageRating.toFixed(1)}
                subtitle="out of 5.0"
                color="#e74c3c"
              />
              <StatCard
                title="Completion Rate"
                value={currentStats.completionRate + '%'}
                subtitle="overall progress"
                color="#1abc9c"
              />
            </div>
          </section>

          {/* Evaluations Summary */}
          <section>
            <h3>Evaluation Summary</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginTop: '15px'
            }}>
              <div style={{
                padding: '20px',
                background: '#ecf0f1',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>Total Evaluations</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                  {currentStats.totalEvaluations}
                </p>
              </div>
              <div style={{
                padding: '20px',
                background: '#ecf0f1',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>Supervisors</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                  {currentStats.supervisorCount}
                </p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div style={{ marginTop: '20px', padding: '15px', background: '#ecf0f1', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '15px' }}>Rating Distribution</h4>
              <RatingBar label="Excellent (4.5-5.0)" count={currentStats.ratingBreakdown.excellent} total={currentStats.totalEvaluations} color="#27ae60" />
              <RatingBar label="Good (3.5-4.5)" count={currentStats.ratingBreakdown.good} total={currentStats.totalEvaluations} color="#f39c12" />
              <RatingBar label="Average (2.5-3.5)" count={currentStats.ratingBreakdown.average} total={currentStats.totalEvaluations} color="#e74c3c" />
              <RatingBar label="Poor (Below 2.5)" count={currentStats.ratingBreakdown.poor} total={currentStats.totalEvaluations} color="#c0392b" />
            </div>
          </section>

          {/* Monthly Trend */}
          <section>
            <h3>Monthly Activity Trend</h3>
            <div style={{ marginTop: '15px', overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '400px' }}>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Logs Submitted</th>
                    <th>Hours Worked</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStats.trends.map((trend, idx) => (
                    <tr key={idx}>
                      <td>{trend.month}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: Math.max(trend.logs * 15, 20) + 'px',
                            height: '20px',
                            background: '#3498db',
                            borderRadius: '3px'
                          }}></div>
                          <span>{trend.logs}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: Math.max(trend.hours / 1.5, 20) + 'px',
                            height: '20px',
                            background: '#9b59b6',
                            borderRadius: '3px'
                          }}></div>
                          <span>{trend.hours}h</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {viewMode === 'supervisor' && (
        <>
          {/* Supervisor Statistics */}
          <section>
            <h3>Supervision Overview</h3>
            
            {/* Key Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '15px',
              marginTop: '15px'
            }}>
              <StatCard
                title="Students Supervised"
                value={currentStats.studentsSupervised}
                subtitle="total students"
                color="#3498db"
              />
              <StatCard
                title="Active Students"
                value={currentStats.activeStudents}
                subtitle="currently active"
                color="#27ae60"
              />
              <StatCard
                title="Completed Students"
                value={currentStats.completedStudents}
                subtitle="finished internship"
                color="#1abc9c"
              />
              <StatCard
                title="Logs Reviewed"
                value={currentStats.logsReviewed}
                subtitle="evaluations given"
                color="#9b59b6"
              />
              <StatCard
                title="Approval Rate"
                value={currentStats.approvalRate + '%'}
                subtitle="logged approved"
                color="#27ae60"
              />
              <StatCard
                title="Pending Review"
                value={currentStats.pendingReview}
                subtitle="awaiting action"
                color="#f39c12"
              />
            </div>
          </section>

          {/* Performance Metrics */}
          <section>
            <h3>Performance Metrics</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginTop: '15px'
            }}>
              <div style={{
                padding: '20px',
                background: '#ecf0f1',
                borderRadius: '8px',
                border: '2px solid #3498db'
              }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>Average Review Time</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2c3e50' }}>
                  {currentStats.averageReviewTime}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>per log submission</p>
              </div>
              <div style={{
                padding: '20px',
                background: '#ecf0f1',
                borderRadius: '8px',
                border: '2px solid #27ae60'
              }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>Total Evaluations</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2c3e50' }}>
                  {currentStats.evaluationsGiven}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>feedback provided</p>
              </div>
            </div>
          </section>

          {/* Monthly Review Activity */}
          <section>
            <h3>Monthly Review Activity</h3>
            <div style={{ marginTop: '15px', overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '400px' }}>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Logs Reviewed</th>
                    <th>Evaluations Given</th>
                    <th>Average Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStats.monthlyData.map((data, idx) => (
                    <tr key={idx}>
                      <td><strong>{data.month}</strong></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: Math.max(data.reviewed / 2, 20) + 'px',
                            height: '20px',
                            background: '#3498db',
                            borderRadius: '3px'
                          }}></div>
                          <span>{data.reviewed}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: Math.max(data.evaluations / 1.8, 20) + 'px',
                            height: '20px',
                            background: '#9b59b6',
                            borderRadius: '3px'
                          }}></div>
                          <span>{data.evaluations}</span>
                        </div>
                      </td>
                      <td style={{ color: '#27ae60', fontWeight: 'bold' }}>4.2/5.0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Student Progress Summary */}
          <section>
            <h3>Student Progress Summary</h3>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #ecf0f1 0%, #d5dbdb 100%)',
              borderRadius: '8px',
              marginTop: '15px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                <div>
                  <p style={{ color: '#666', marginBottom: '8px', fontSize: '0.9rem' }}>On Track</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#27ae60' }}>
                    {Math.round(currentStats.activeStudents * 0.8)}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#999' }}>students on schedule</p>
                </div>
                <div>
                  <p style={{ color: '#666', marginBottom: '8px', fontSize: '0.9rem' }}>Need Support</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f39c12' }}>
                    {Math.round(currentStats.activeStudents * 0.2)}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#999' }}>need additional support</p>
                </div>
                <div>
                  <p style={{ color: '#666', marginBottom: '8px', fontSize: '0.9rem' }}>Excellent Progress</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#3498db' }}>
                    {Math.round(currentStats.activeStudents * 0.4)}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#999' }}>exceptional performance</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}

// Helper component for stat cards
function StatCard({ title, value, subtitle, color }) {
  return (
    <div style={{
      padding: '20px',
      background: 'white',
      border: `2px solid ${color}`,
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)'
    }}>
      <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '8px' }}>{title}</p>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: color, margin: '5px 0' }}>
        {value}
      </p>
      <p style={{ color: '#bbb', fontSize: '0.8rem' }}>{subtitle}</p>
    </div>
  )
}

// Helper component for rating bars
function RatingBar({ label, count, total, color }) {
  const percentage = (count / total) * 100
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{label}</span>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>{count} ({percentage.toFixed(0)}%)</span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        background: '#ddd',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: percentage + '%',
          height: '100%',
          background: color,
          transition: 'width 0.3s ease'
        }}></div>
      </div>
    </div>
  )
}
