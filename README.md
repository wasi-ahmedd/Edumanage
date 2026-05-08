# EduManage — Student Management System

A full-stack web app with MongoDB, Express, React, and Node.js (MERN).

## Features
- **Auth** — Register & Login with JWT
- **Dashboard** — Total students + students grouped by branch
- **Students** — Add, edit, delete, search by name/USN
- **Attendance** — Mark present/absent per student per date
- **Subjects** — Add & delete subjects with code and credits

---

## Project Structure
```
edumanage/
├── backend/
│   ├── models/         # Mongoose schemas (User, Student, Attendance, Subject)
│   ├── routes/         # Express routes
│   ├── middleware/     # JWT auth middleware
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── pages/      # Login, Register, Dashboard, Students, Attendance, Subjects
    │   ├── components/ # Layout (sidebar + topbar)
    │   └── context/    # AuthContext (JWT + user state)
    └── vite.config.js  # proxies /api → localhost:5000
```

---

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod`) or a MongoDB Atlas URI

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env — set MONGO_URI and JWT_SECRET
npm run dev
# Server starts on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# App opens on http://localhost:5173
```

### .env (backend)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/edumanage
JWT_SECRET=change_this_to_a_long_random_string
```

---

## API Endpoints

| Method | Path                    | Auth | Description              |
|--------|-------------------------|------|--------------------------|
| POST   | /api/auth/register      | No   | Create admin account     |
| POST   | /api/auth/login         | No   | Login, get JWT           |
| GET    | /api/dashboard          | Yes  | Total students by branch |
| GET    | /api/students           | Yes  | List / search students   |
| POST   | /api/students           | Yes  | Add student              |
| PUT    | /api/students/:id       | Yes  | Update student           |
| DELETE | /api/students/:id       | Yes  | Delete student           |
| GET    | /api/attendance?date=   | Yes  | Get attendance for date  |
| POST   | /api/attendance         | Yes  | Mark/update attendance   |
| GET    | /api/subjects           | Yes  | List subjects            |
| POST   | /api/subjects           | Yes  | Add subject              |
| DELETE | /api/subjects/:id       | Yes  | Delete subject           |
