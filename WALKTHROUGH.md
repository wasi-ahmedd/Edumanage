# EduManage Run Walkthrough

This file explains how to run the project after pulling it from GitHub.

## Fastest Option

Double-click:

```text
run-edumanage.bat
```

It will:

- ask for the MongoDB URI
- create `backend/.env`
- install backend and frontend dependencies if needed
- start both servers automatically

If backend does not start, make sure MongoDB is already running on your system.

## 1. Requirements

Make sure these are installed on your system:

- Node.js 18 or later
- MongoDB Community Server
- Git

## 2. Clone or Pull the Project

If you do not have the project yet:

```bash
git clone https://github.com/wasi-ahmedd/Edumanage.git
cd Edumanage
```

If you already have it:

```bash
git pull
```

## 3. Install Dependencies

Open two terminals or run these one by one:

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## 4. Create Backend Environment File

Inside the `backend` folder, create a file named `.env`.

Put this inside it:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/edumanage
JWT_SECRET=your_super_secret_key_here
```

## 5. Start MongoDB

Make sure MongoDB is running before starting the backend.

If MongoDB is installed as a service, start it from Services on Windows.

Or run:

```bash
mongod
```

## 6. Run the Backend

From the `backend` folder:

```bash
npm run dev
```

Backend should start on:

```text
http://localhost:5000
```

## 7. Run the Frontend

From the `frontend` folder:

```bash
npm run dev
```

Frontend should start on:

```text
http://localhost:5173
```

## 8. Use the App

Open the frontend URL in your browser.

If this is the first time using the project:

- Register a new account
- Log in
- Start adding students, subjects, and attendance

## 9. If Something Does Not Work

- Make sure MongoDB is running
- Make sure `.env` exists inside `backend`
- Make sure `npm install` was run in both `backend` and `frontend`
- Make sure port `5000` and `5173` are free

## 10. Useful Commands

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

### Pull latest changes

```bash
git pull
```
