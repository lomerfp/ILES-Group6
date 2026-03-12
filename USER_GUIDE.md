# ILES - Internship Logging & Evaluation System

## User Guide

### Frontend Application Overview

ILES (Internship Logging & Evaluation System) is a comprehensive web application built with React 18.2 and Vite, designed to manage internship programs for students, supervisors, and university registrars. The system provides role-based access with specialized dashboards for each user type.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [User Roles](#user-roles)
3. [Registration](#registration)
4. [Login](#login)
5. [Student Dashboard](#student-dashboard)
6. [Supervisor Dashboard](#supervisor-dashboard)
7. [Registrar Dashboard](#registrar-dashboard)
8. [Additional Features](#additional-features)
9. [Technical Implementation](#technical-implementation)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for initial load
- JavaScript enabled

### Accessing the Application

1. Open your web browser
2. Navigate to `http://localhost:8080` (if running locally)
3. Or access the deployed version at your hosting URL

### First Time Setup

1. **Register** as a new user by selecting your role
2. **Login** with your credentials
3. **Access** your role-specific dashboard

---

## User Roles

ILES supports three distinct user roles, each with specialized functionality:

### 1. Student
- Upload internship reports
- View feedback from supervisors and registrars
- Track submission status
- Access personal statistics

### 2. Supervisor
- Review student submissions
- Approve or reject reports
- Provide feedback to students
- Monitor assigned students' progress

### 3. Registrar
- View all students and submissions
- Issue official feedback and certifications
- Access system-wide statistics
- Search and manage student records

---

## Registration

### How to Register

1. Navigate to the **Register** page from the navigation menu
2. Select your role using the role selector buttons:
   - 📚 **Student**
   - 👔 **Supervisor**
   - 🏛️ **Registrar**

3. Fill in the required fields based on your selected role:

   **For Students:**
   - Full Name
   - Email Address
   - Password
   - Student ID
   - Course
   - Company

   **For Supervisors:**
   - Full Name
   - Email Address
   - Password
   - Department

   **For Registrars:**
   - Full Name
   - Email Address
   - Password
   - Institution

4. Click **"Register"** to create your account
5. You'll be redirected to the login page

### Important Notes

- All fields are required for your selected role
- Email addresses must be unique
- Passwords should be secure (minimum 6 characters recommended)
- Role selection determines your dashboard access

---

## Login

### How to Login

1. Navigate to the **Login** page
2. Select your role using the role selector buttons (same as registration)
3. Enter your email address
4. Enter your password
5. Click **"Sign In"**

### Role Selection During Login

- You must select the same role you used during registration
- The system will display your selected role for confirmation
- Incorrect role selection will prevent login

### Forgot Password

1. Click **"Forgot password?"** link on the login page
2. Enter your email address
3. Click **"Send Reset Link"**
4. Check your email for password reset instructions

---

## Student Dashboard

### Overview

The Student Dashboard is your central hub for managing internship activities and tracking progress.

### Key Features

#### 1. Upload Internship Reports

1. Click **"Upload New Report"** button
2. Enter a **Report Name** (e.g., "Internship_Report_Week1.pdf")
3. Add an optional **Description**
4. Click **"Upload"** to submit

#### 2. View Uploaded Reports

- See all your submitted reports in the **"My Uploaded Reports"** section
- Each report shows:
  - File name
  - Upload date and time
  - Description (if provided)
  - Status (Pending Review, Approved ✓, Needs Revision)

#### 3. Manage Reports

- **Delete** reports using the "Delete" button
- Track approval status from your supervisor

#### 4. Download Feedback

- Access the **"Feedback from Supervisors & Registrars"** section
- View feedback documents from supervisors and registrars
- Click **"Download"** to save feedback files
- Feedback includes comments and official evaluations

### Navigation Tips

- Use the main navigation to access other features
- All uploads are stored securely and can be accessed anytime
- Status updates happen in real-time

---

## Supervisor Dashboard

### Overview

The Supervisor Dashboard allows you to manage and evaluate student internship reports.

### Key Features

#### 1. View Assigned Students

- See a list of all students assigned to you
- Click on any student to view their details and submissions

#### 2. Review Student Submissions

- View student profile information (ID, Course, Company)
- Access all submitted reports with timestamps
- Review report descriptions and content

#### 3. Approve/Reject Reports

- For pending reports, use **"Approve"** or **"Reject"** buttons
- Approved reports are marked with "Approved ✓"
- Rejected reports are marked "Needs Revision"

#### 4. Provide Feedback

1. Click **"Add Feedback"** for any student
2. Enter detailed feedback in the text area
3. Click **"Submit Feedback"** to send
4. Feedback is immediately available to the student

### Workflow Tips

- Review reports promptly to keep students on track
- Use detailed feedback to help students improve
- Approved reports contribute to student progress tracking

---

## Registrar Dashboard

### Overview

The Registrar Dashboard provides university-level oversight of the internship program.

### Key Features

#### 1. System Statistics

View real-time statistics:
- **Total Students**: Number of registered students
- **Active Submissions**: Students with submitted reports
- **Total Reports**: Total number of submitted reports

#### 2. Search Students

- Use the search bar to find students by name, email, or student ID
- Results update in real-time as you type

#### 3. Student Management

- Click on any student to view their profile
- See complete submission history
- Review all reports and their statuses

#### 4. Issue Official Feedback

1. Select a student from the list
2. Click **"Issue Official Feedback"**
3. Enter official feedback or certification details
4. Click **"Issue Feedback"** to send
5. Official feedback is marked as coming from the Registrar

### Administrative Tips

- Use statistics to monitor program participation
- Regular feedback issuance helps track student progress
- Search functionality helps locate specific students quickly

---

## Additional Features

### Internship Log

- **Students**: Record daily activities, hours worked, and accomplishments
- **Access**: Available through the navigation menu
- **Purpose**: Track internship progress and create detailed logs

### Evaluation

- **Students**: View feedback and evaluations from supervisors
- **Access**: Through dashboard or navigation
- **Content**: Supervisor comments and performance ratings

### Statistics

- **All Users**: View performance analytics and progress charts
- **Features**:
  - Key metrics cards
  - Evaluation summaries
  - Rating distributions
  - Monthly trends
  - Bar charts and visualizations

### Admin Panel

- **Administrators**: System-wide management and configuration
- **Access**: Restricted to admin users
- **Features**: User management, system settings, data export

---

## Technical Implementation

### Frontend Architecture

- **Framework**: React 18.2 with Hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router v6 with future flags
- **State Management**: React useState and useEffect hooks
- **Styling**: CSS3 with responsive design
- **Data Storage**: localStorage for demo purposes (production would use a database)

### Key Components

#### Pages
- `HomePage.jsx` - Welcome and feature overview
- `Register.jsx` - User registration with role selection
- `Login.jsx` - Authentication with role selection
- `Dashboard.jsx` - Role-based dashboard router
- `StudentDashboard.jsx` - Student-specific interface
- `SupervisorDashboard.jsx` - Supervisor management interface
- `RegistrarDashboard.jsx` - Registrar oversight interface
- `InternshipLog.jsx` - Activity logging
- `Evaluation.jsx` - Feedback viewing
- `Statistics.jsx` - Analytics and reporting
- `AdminPanel.jsx` - Administrative functions

#### Components
- `Navigation.jsx` - Header and navigation bar
- `Footer.jsx` - Professional footer with credits

### Data Structure

#### User Object
```javascript
{
  fullName: string,
  email: string,
  password: string,
  role: 'student' | 'supervisor' | 'registrar',
  // Student-specific fields
  studentId?: string,
  course?: string,
  company?: string,
  // Supervisor-specific fields
  department?: string,
  // Registrar-specific fields
  institution?: string
}
```

#### File Storage
- Student files: `studentFiles_{email}` in localStorage
- Feedback: `studentFeedback_{email}` in localStorage
- User data: `users` array in localStorage

### Security Features

- Role-based access control
- Email uniqueness validation
- Password requirements
- Session management via localStorage
- Protected routes based on user role

---

## Troubleshooting

### Common Issues

#### 1. Cannot Access Dashboard
- **Cause**: Incorrect role selection during login
- **Solution**: Ensure you select the same role used during registration

#### 2. Files Not Uploading
- **Cause**: Network issues or browser restrictions
- **Solution**: Check internet connection, try different browser

#### 3. Feedback Not Appearing
- **Cause**: Supervisor/Registrar hasn't submitted feedback yet
- **Solution**: Contact your supervisor or check back later

#### 4. Statistics Not Loading
- **Cause**: No data available or localStorage cleared
- **Solution**: Ensure you have logged activities and evaluations

#### 5. Page Not Loading
- **Cause**: JavaScript disabled or browser compatibility
- **Solution**: Enable JavaScript, use modern browser

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Tips

- Clear browser cache if experiencing issues
- Use incognito mode for testing
- Close unnecessary browser tabs

---

## Support and Contact

For technical support or questions about the ILES system:

- **Developer**: LOMER Francis Peter (Frontend Developer & UI/UX Lead)
- **Email**: [Contact email if available]
- **Documentation**: This user guide
- **Version**: 1.0.0

---

## Changelog

### Version 1.0.0
- Initial release with role-based dashboards
- File upload/download functionality
- Feedback system implementation
- Statistics and analytics
- Responsive design for all devices

---

*This user guide was last updated on March 12, 2026.*

*ILES - Empowering Internship Management Through Technology*