<?php

use App\Http\Controllers\AdvokasiController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DhasboardController;
use App\Http\Controllers\LaporanPengaduanController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::prefix('pendidikan')->middleware(['auth', 'role:3', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});

Route::prefix('lse')->middleware(['auth', 'role:4', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});

Route::prefix('lppm')->middleware(['auth', 'role:5', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});

Route::prefix('bkal')->middleware(['auth', 'role:6', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});

Route::prefix('perpus')->middleware(['auth', 'role:7', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});


Route::prefix('pengembangan-sdm')->middleware(['auth', 'role:8', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});

Route::prefix('tik')->middleware(['auth', 'role:9', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});

Route::prefix('pha')->middleware(['auth', 'role:10', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});

Route::prefix('kerjasama-humas-internasionalisasi')->middleware(['auth', 'role:11', 'verified'])->group(function () {
    Route::get('/', [AdvokasiController::class, 'AdvokasiAproval']);
    // Route::get('/data', [AdvokasiController::class, 'AdvokasiDataUser']);
    // Route::get('/aproval', [AdvokasiController::class, 'AdvokasiAproval']);
    Route::get('/aproval/{id_laporan}', [AdvokasiController::class, 'Aproval']);
    Route::post('/user/search', [AdvokasiController::class, 'Advokasisearch']);
    Route::post('/update/status/aproval/{id_laporan}', [AdvokasiController::class, 'updateStatus']);
});


Route::get('/', [Controller::class, 'Index'])->name('Index');
Route::get('/about', [Controller::class, 'About'])->name('About');
Route::prefix('/')
    ->middleware(['auth', 'role:2', 'verified'])
    ->group(function () {
        Route::get('/upload-laporan', [MahasiswaController::class, 'Laporan'])->name('Laporan');
        Route::get('/pusat-informasi', [MahasiswaController::class, 'Pusinfo'])->name('Pusinfo');
        Route::get('/history-laporan', [MahasiswaController::class, 'History'])->name('History');
        Route::get('/tracker/{id}', [MahasiswaController::class, 'Tracker'])->name('Tracker');
        Route::get('/lapor/riwayat/{slug}', [Controller::class, 'RiwayatLaporan'])->name('RiwayatLaporan');
        Route::post('/laporan/pengaduan', [LaporanPengaduanController::class, 'store'])->name('store');
    });


Route::prefix('admin')->middleware(['auth', 'role:1', 'verified'])->group(function () {
    Route::get('/', [DhasboardController::class, 'AdminShow'])->name('AdminShow');
    Route::get('/data/staf', [DhasboardController::class, 'AdminDataStaf'])->name('AdminDataStaf');
    Route::get('/data/user', [DhasboardController::class, 'AdminDataUser'])->name('AdminDataUser');
    Route::post('/user/search', [DhasboardController::class, 'Adminsearch'])->name('Adminsearch');
});
Route::prefix('bem')->middleware(['auth', 'role:12', 'verified'])->group(function () {
    Route::get('/', [DhasboardController::class, 'AdminShow']);
    Route::get('/data/staf', [DhasboardController::class, 'AdminDataStaf']);
    Route::get('/data/user', [DhasboardController::class, 'AdminDataUser']);
    Route::post('/user/search', [DhasboardController::class, 'Adminsearch']);
});
Route::prefix('rektor')->middleware(['auth', 'role:13', 'verified'])->group(function () {
    Route::get('/', [DhasboardController::class, 'AdminShow']);
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
