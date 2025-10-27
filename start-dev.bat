@echo off
echo Starting both Next.js and Strapi servers...

start "Strapi CMS" cmd /k "cd xuongart-new && npm run develop"
timeout /t 5 /nobreak > nul
start "Next.js Frontend" cmd /k "npm run dev"

echo Both servers are starting...
echo Strapi CMS: http://localhost:1337/admin
echo Next.js Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
