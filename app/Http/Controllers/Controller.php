<?php

namespace App\Http\Controllers;

use App\Models\KategoriLaporan;
use App\Models\LaporanPengaduan;
use App\Models\RelasiLaporanKategori;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;



    public function Index()
    {
        $id = auth()->user()->id;
        $laporanPengaduan = RelasiLaporanKategori::with(['kategori_laporan', 'approvalTracker.laporanPengaduan.user.mahasiswa.prodi', 'approvalTracker.laporanPengaduan.user.role', 'approvalTracker.statusAproval'])->whereHas('approvalTracker.laporanPengaduan', function ($query) use ($id) {
            $query->where('user_id', $id);
        })->latest()->get();
        $user = User::with(['role', 'mahasiswa.prodi'])->latest()->get();
        $kategori_laporan = KategoriLaporan::all();
        return Inertia::render('Home/Visualisasi', [
            'title' => 'Visualisasi',
            'user' => $user,
            'data' => $laporanPengaduan,
            'kategori_laporan' => $kategori_laporan,
        ]);
    }
    public function About()
    {
        return Inertia::render('Home/About', [
            'title' => 'About',
        ]);
    }


    public function RiwayatLaporan(Request $request, $slug)
    {
        $id_user = $request->id_user;
        $name = $request->name;

        $riwayatLaporan = LaporanPengaduan::with(['user.mahasiswa', 'user.role', 'user.mahasiswa.prodi'])->where('user_id', $id_user)->whereHas('user', function ($query) use ($name) {
            $query->where('name', $name);
        })->where('type', $slug)->latest()->get();
        return Inertia::render('Home/Riwayat', [
            'title' => 'Riwayat',
            'riwayat_laporan' => $riwayatLaporan,
        ]);
    }
}
