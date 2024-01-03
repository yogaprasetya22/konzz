@echo off

REM Menjalankan perintah php artisan serve di tab baru
echo Menjalankan php artisan serve di tab baru...
start cmd /k php artisan serve

REM Menjalankan perintah npm run dev
echo Menjalankan npm run dev...
call npm run dev
