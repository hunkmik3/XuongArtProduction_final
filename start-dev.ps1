Write-Host "Starting both Next.js and Strapi servers..." -ForegroundColor Green

# Start Strapi in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\xuongart-new'; npm run develop" -WindowStyle Normal

# Wait a bit for Strapi to start
Start-Sleep -Seconds 5

# Start Next.js in a new PowerShell window  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal

Write-Host "Both servers are starting..." -ForegroundColor Yellow
Write-Host "Strapi CMS: http://localhost:1337/admin" -ForegroundColor Cyan
Write-Host "Next.js Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
