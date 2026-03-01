@echo off
chcp 65001 >nul
cls
echo ========================================
echo    Gas Station Management System
echo ========================================
echo.
echo Starting Backend Server...
echo.

cd /d "%~dp0backend"
start "Backend Server" cmd /k "node index.js"

timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo System is starting...
echo Backend: http://localhost:5000
echo Open index.html in your browser
echo ========================================
echo.
echo Opening browser...
timeout /t 2 /nobreak >nul

start "" "%~dp0index.html"

echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause