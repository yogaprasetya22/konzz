@echo off

REM Menjalankan perintah php artisan serve di tab baru
start cmd /k php artisan serve

REM Menjalankan perintah npm run dev di tab baru
start cmd /k npm run dev

REM Menjalankan perintah php artisan websocket:serve di tab baru
start cmd /k php artisan websocket:serve
