@echo off
echo ================================================================
echo 🚀 Deploying Chemic-AI to Google Cloud Run (#AIRiserVietnam)
echo ================================================================

echo.
echo [1/3] Checking Google Cloud SDK authentication...
call gcloud auth print-access-token >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Not authenticated. Launching 'gcloud auth login'...
    call gcloud auth login
)

echo.
echo [2/3] Building container & deploying directly from source...
call gcloud run deploy chemic-ai ^
    --source . ^
    --region asia-southeast1 ^
    --allow-unauthenticated ^
    --port 8080

echo.
echo ================================================================
echo [✓] Deployment complete!
echo Copy the Service URL printed above into the AI Riser completion form.
echo ================================================================
pause
