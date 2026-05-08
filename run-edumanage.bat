@echo off
setlocal EnableExtensions

cd /d "%~dp0"
title EduManage Setup and Run

echo ==========================================
echo           EduManage Quick Start
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not in PATH.
  echo Install Node.js 18+ and run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not available in PATH.
  pause
  exit /b 1
)

if not exist "backend" (
  echo [ERROR] backend folder not found.
  pause
  exit /b 1
)

if not exist "frontend" (
  echo [ERROR] frontend folder not found.
  pause
  exit /b 1
)

set "DEFAULT_MONGO_URI=mongodb://localhost:27017/edumanage"
set /p MONGO_URI=Enter MongoDB URI [default: %DEFAULT_MONGO_URI%]: 
if "%MONGO_URI%"=="" set "MONGO_URI=%DEFAULT_MONGO_URI%"

set /p JWT_SECRET=Enter JWT secret [default: change_this_to_a_long_random_string]: 
if "%JWT_SECRET%"=="" set "JWT_SECRET=change_this_to_a_long_random_string"

(
  echo PORT=5000
  echo MONGO_URI=%MONGO_URI%
  echo JWT_SECRET=%JWT_SECRET%
) > "backend\.env"

echo.
echo [1/4] Saved backend\.env

if not exist "backend\node_modules" (
  echo [2/4] Installing backend dependencies...
  call npm install --prefix backend
  if errorlevel 1 (
    echo [ERROR] Backend dependency install failed.
    pause
    exit /b 1
  )
) else (
  echo [2/4] Backend dependencies already installed.
)

if not exist "frontend\node_modules" (
  echo [3/4] Installing frontend dependencies...
  call npm install --prefix frontend
  if errorlevel 1 (
    echo [ERROR] Frontend dependency install failed.
    pause
    exit /b 1
  )
) else (
  echo [3/4] Frontend dependencies already installed.
)

echo [4/4] Starting backend and frontend...
echo.
echo If backend fails to connect, make sure MongoDB is running.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.

start "EduManage Backend" cmd /k "cd /d %~dp0backend && npm run dev"
start "EduManage Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Both windows were started.
pause
exit /b 0
