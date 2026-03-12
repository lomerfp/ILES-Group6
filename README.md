# ILES - Internship Logging & Evaluation System

A modern React-based system for managing internship applications, tracking student activities, collecting supervisor evaluations, and administrative management.

## Features

### 🏠 Home Page
- Welcome landing page with system overview
- Quick navigation links to Login and Registration
- Feature descriptions

### 👤 User Authentication
- **Registration**: New user signup with validation
- **Login**: Secure login with email and password
- **Forgot Password**: Password reset functionality

### 📚 Student Dashboard
- Quick access to internship-related features
- View recent activity logs
- Navigate to evaluation and logging pages

### 📝 Internship Activity Log
- Submit daily internship activities
- Track hours worked
- View submission status (Pending/Approved/Rejected)
- Complete activity history

### ⭐ Evaluation System
- View supervisor feedback and ratings
- Track average rating across all evaluations
- See evaluation history with comments
- Category-based feedback organization

### 🎓 Admin Panel
- **Student Management**: Add/remove students, view student details
- **Log Review**: Approve or reject internship logs
- **Course Management**: Manage available internship courses
- Tab-based interface for easy navigation

## Technology Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite
- **Routing**: React Router DOM (v6)
- **Styling**: CSS3
- **State Management**: React Hooks
- **Storage**: LocalStorage (for demo purposes)

## Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   └── Navigation.jsx         # Header and navigation bar
├── pages/
│   ├── HomePage.jsx           # Home page component
│   ├── Register.jsx           # Registration page
│   ├── Login.jsx              # Login page with password reset
│   ├── Dashboard.jsx          # Student dashboard
│   ├── InternshipLog.jsx      # Activity logging
│   ├── Evaluation.jsx         # View evaluations
│   └── AdminPanel.jsx         # Admin management interface
├── App.jsx                    # Main app with routing
├── App.css                    # Styling
├── index.css                  # Global styles
└── main.jsx                   # Entry point

public/
└── index.html                 # HTML template

vite.config.js                 # Vite configuration
package.json                   # Dependencies and scripts
```

## Usage

### For Students
1. **Register** an account with your details
2. **Login** with your credentials
3. **Dashboard**: View your internship overview
4. **Log Activities**: Submit daily activities with hours worked
5. **View Evaluations**: Check feedback from supervisors

### For Supervisors
- Can view student logs and submit evaluations (admin panel access)

### For Administrators
- Access Admin Panel to manage students, courses, and review logs
- Approve/reject internship activity logs
- Manage course information

## Demo Credentials

For testing purposes:
- **Email**: Any email you register with
- **Password**: Any password (6+ characters)

## Key Features by Component

### HomePage.jsx
- System introduction
- Feature highlights
- Call-to-action buttons

### Register.jsx
- Form validation
- Student ID input
- Course selection
- Company assignment
- Real-time error feedback

### Login.jsx
- Email and password authentication
- Integrated forgot password form
- Session management via localStorage

### Dashboard.jsx
- Quick action cards
- Recent activity table
- Navigation to main features
- Logout functionality

### InternshipLog.jsx
- Date selection
- Activity title and description
- Hours tracking
- Supervisor assignment
- Log history with status indicators

### Evaluation.jsx
- View all evaluations
- Rating display with color coding
- Supervisor feedback
- Summary statistics

### AdminPanel.jsx
- Tabbed interface (Students, Logs, Courses)
- Add/remove students
- Add/remove courses
- Approve/reject logs
- Full CRUD operations

## Styling

The application uses a professional color scheme:
- Primary: #3498db (Blue)
- Header: #2c3e50 (Dark Gray)
- Secondary: #34495e (Medium Gray)
- Success: #27ae60 (Green)
- Warning: #f39c12 (Orange)
- Error: #e74c3c (Red)

## Future Enhancements

- Backend API integration
- Real database (MongoDB/PostgreSQL)
- Email notifications
- File upload support
- Advanced analytics
- PDF report generation
- Supervisor dashboard
- User role management
- Export functionality

## License

This project is open source and available for educational purposes.

## Support

For issues or feature requests, please contact the development team.

---

**ILES System v1.0** - Built with React & Vite
