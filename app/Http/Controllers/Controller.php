<?php

namespace App\Http\Controllers;

use App\Models\LaporanPengaduan;
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
        return Inertia::render('Home/Index', [
            'title' => 'Home',
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
