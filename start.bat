@echo off
echo Starting SIH Learning Platform...
echo.

echo Setting up backend...
cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

echo Starting backend server...
start cmd /k "python startup.py"

echo Waiting for backend to start...
timeout /t 10

cd ..

echo Installing frontend dependencies...
npm install

echo Starting frontend development server...
start cmd /k "npm run dev"

echo.
echo ========================================
echo SIH Learning Platform is starting up!
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Default Admin Credentials:
echo Username: admin
echo Password: admin123
echo ========================================

pause