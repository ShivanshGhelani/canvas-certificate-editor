@echo off
echo 🚀 Starting Certificate Generator Deployment...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Build the project
echo 📦 Building project...
npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed. Please fix errors and try again.
    pause
    exit /b 1
)

REM Deploy to Vercel
echo 🌍 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete!
echo 🔗 Your app should be available at the URL shown above
echo 📋 Don't forget to set up environment variables if this is your first deployment
pause
