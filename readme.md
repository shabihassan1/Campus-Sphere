# 🎓 Campus Sphere

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/NestJS-10.0.0-E0234E?style=for-the-badge&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-15.0-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind-3.3.0-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
</div>

<div align="center">
  <h3>A modern platform for university society management and student engagement</h3>
</div>

<p align="center">
  <img src="screenshot.png" alt="Campus Sphere Screenshot" width="800" />
</p>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

**Campus Sphere** is a comprehensive full-stack platform designed to enhance student engagement with university societies and events. It provides a centralized hub where students can discover societies, join events, and provide valuable feedback, while society presidents can manage their organizations effectively.

Developed by BSCS students at FAST-NUCES Islamabad as a Final Year Project, Campus Sphere addresses the common challenges in university society management with a modern, user-friendly interface and robust backend architecture.

## ✨ Features

### Authentication & User Management
- **Secure Registration & Login**: JWT-based authentication system
- **Password Recovery**: Security question-based password reset
- **Role-Based Access**: Different capabilities for students, society presidents, and admins

### Societies Management
- **Browse & Join**: Discover and become a member of societies
- **Society Creation**: Students can create new societies (becoming president)
- **Member Management**: Presidents can view and manage society members
- **Dynamic UI**: Different views based on user's relationship to society

### Events System
- **Event Discovery**: Browse upcoming events across all societies
- **Event Participation**: Join/leave events with real-time attendee counts
- **Event Creation**: Society presidents can create and manage events
- **Event Details**: View comprehensive information about each event

### Feedback System
- **Submit Feedback**: Rate and comment on societies and events
- **Feedback Filtering**: View feedback by society, event, or as a complete list
- **User Association**: All feedback is linked to real user accounts
- **Visibility Controls**: Appropriate display of feedback based on context

### User Experience
- **Responsive Design**: Fully mobile-responsive interface
- **Toast Notifications**: Clear feedback for all user actions
- **Confirmation Dialogs**: Prevent accidental actions
- **Intuitive Navigation**: Clean, modern UI with logical user flows

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API & Hooks
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Form Validation**: Custom validation with error handling
- **UI Components**: Custom components with Radix UI primitives

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Token)
- **API**: RESTful endpoints with DTO validation
- **Security**: CORS configuration, input validation, error handling

### Testing
- **Frontend**: React Testing Library
- **Backend**: Jest with supertest
- **Coverage**: Comprehensive test coverage for critical paths

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL (v13+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campus-sphere.git
   cd campus-sphere
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   
   # Configure your .env file
   cp .env.example .env
   # Edit .env with your database credentials
   
   # Run migrations
   npm run migration:run
   
   # Start the development server
   npm run start:dev
   ```

   **Backend .env file example:**
   ```
   JWT_SECRET=your_key
   FRONTEND_URL=http://localhost:5173
   PORT=3001
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=name
   DB_PASS=pass
   DB_NAME=campus_sphere
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Configure your .env file
   cp .env.example .env
   # Edit .env with your API URL
   
   # Start the development server
   npm run dev
   ```

   **Frontend .env file example:**
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001/api

## 📂 Project Structure

```
campus-sphere/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service modules
│   │   └── App.tsx          # Main application component
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── societies/       # Societies module
│   │   ├── events/          # Events module
│   │   ├── feedback/        # Feedback module
│   │   ├── users/           # User management
│   │   └── app.module.ts    # Main application module
│   └── package.json         # Backend dependencies
│
└── README.md                # Project documentation
```

## 📝 API Documentation

Our API follows RESTful principles with the following main endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and get token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with security answer

### Societies
- `GET /api/societies` - List all societies
- `POST /api/societies` - Create a new society
- `GET /api/societies/:id` - Get society details
- `PUT /api/societies/:id` - Update society (president only)
- `POST /api/societies/:id/join` - Join a society
- `POST /api/societies/:id/leave` - Leave a society
- `GET /api/societies/:id/members` - Get society members (president only)

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event (president only)
- `POST /api/events/:id/join` - Join an event
- `POST /api/events/:id/leave` - Leave an event

### Feedback
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Create new feedback
- `GET /api/feedback/society/:id` - Get feedback for a society
- `GET /api/feedback/event/:id` - Get feedback for an event

## 🧪 Testing

### Running Tests

**Backend Tests**
```bash
cd backend
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run test:cov    # Generate coverage report
```

**Frontend Tests**
```bash
cd frontend
npm run test        # Run unit tests
npm run test:cov    # Generate coverage report
```

## 📦 Deployment

### Backend Deployment
The NestJS backend can be deployed to:
- AWS Elastic Beanstalk
- Heroku
- Digital Ocean App Platform
- Any Node.js-compatible hosting

### Frontend Deployment
The React frontend can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- GitHub Pages

## 🗺 Roadmap

### Phase 1: Core Features ✅
- Authentication system
- Society management
- Event management
- Feedback system

### Phase 2: Enhanced Features 🔄
- Admin dashboard
- User profile management
- Feedback management (edit/delete)
- Pagination and advanced filtering

### Phase 3: Advanced Features 🔜
- Notifications system
- Email integration
- Calendar integration
- Mobile app version

## 👥 Contributing

We welcome contributions to Campus Sphere! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Developed with ❤️ by BSCS students at FAST-NUCES Islamabad</p>
  <p>© 2025 Campus Sphere</p>
</div>
