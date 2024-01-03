<?php

namespace App\Http\Controllers;

use App\Models\ApprovalTracker;
use App\Models\LaporanPengaduan;
use App\Models\RelasiLaporanKategori;
use App\Models\StatusAproval;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdvokasiController extends Controller
{
    public function AdvokasiShow()
    {
        $laporanPengaduan = RelasiLaporanKategori::with(['kategori_laporan', 'approvalTracker.laporanPengaduan.user.mahasiswa.prodi', 'approvalTracker.laporanPengaduan.user.role', 'approvalTracker.statusAproval'])->latest()->get();
        $user = User::with(['role', 'mahasiswa.prodi'])->latest()->get();
        return Inertia::render('Advokasi/index', [
            'title' => 'Advokasi',
            'user' => $user,
            'data' => $laporanPengaduan,
        ]);
    }
    public function AdvokasiDataUser()
    {
        $user = User::with(['role', 'mahasiswa.prodi'])->where('role_id', 2)->latest()->get();

        return Inertia::render('Advokasi/DataUser', [
            'title' => 'Advokasi',
            'data' => $user,

        ]);
    }

    public function AdvokasiAproval()
    {
        $role_id = auth()->user()->role_id;
        $user = User::with(['role', 'mahasiswa.prodi'])->latest()->get();
        $laporanPengaduan = RelasiLaporanKategori::with(['kategori_laporan', 'approvalTracker.laporanPengaduan.user.mahasiswa.prodi', 'approvalTracker.laporanPengaduan.user.role', 'approvalTracker.statusAproval'])->whereHas('kategori_laporan', function ($query) use ($role_id) {
            $query->where('role_id', $role_id);
        })->latest()->get();
        return Inertia::render('Advokasi/Aproval', [
            'title' => 'Advokasi',
            'data' => $user,
            'laporan_pengaduan' => $laporanPengaduan,
        ]);
    }
    public function Aproval($id_laporan, Request $request)
    {
        $name = $request->name;
        $id_user = $request->id_user;
        $laporanPengaduan = [];
        $laporan = RelasiLaporanKategori::with([
            'kategori_laporan', 'approvalTracker.laporanPengaduan.user.mahasiswa.prodi', 'approvalTracker.laporanPengaduan.user.role', 'approvalTracker.statusAproval'
        ])->whereHas('approvalTracker.laporanPengaduan', function ($query) use ($id_laporan) {
            $query->where('id', $id_laporan);
        })->first();
        // buatkan validasi ketika di laporan pengaduan anonim maka user menjadi anonim
        if ($laporan->approvalTracker->laporanPengaduan->anonim == 'false') {
            $laporanPengaduan = $laporan;
        } else {
            $laporanPengaduan = $laporan;
            $laporanPengaduan->approvalTracker->laporanPengaduan->user->name = 'Anonim';
            $laporanPengaduan->approvalTracker->laporanPengaduan->user->mahasiswa->angkatan = 'Anonim';
            $laporanPengaduan->approvalTracker->laporanPengaduan->user->mahasiswa->prodi->name_prodi = 'Anonim';
        }


        if (
            $laporanPengaduan->status_aproval_id == 1
            && $laporanPengaduan->user->name == $name
            && $laporanPengaduan->user_id == $id_user
        ) {
            $laporanPengaduan->status_aproval_id = 2;
            $laporanPengaduan->save();
        }

        return Inertia::render('Advokasi/[...id_laporan]', [
            'title' => 'Advokasi',
            'laporan_pengaduan' => $laporanPengaduan,
            'status' => StatusAproval::all(),
        ]);
    }

    public function updateStatus(Request $request, $id_laporan)
    {
        $id_user = $request->id_user;
        $RelasiLaporanKategori = RelasiLaporanKategori::with([
            'kategori_laporan', 'approvalTracker.laporanPengaduan.user.mahasiswa.prodi', 'approvalTracker.laporanPengaduan.user.role', 'approvalTracker.statusAproval'
        ])->whereHas('approvalTracker', function ($query) use ($id_laporan) {
            $query->where('id', $id_laporan);
        })->first();

        if (
            $RelasiLaporanKategori->approvalTracker->laporanPengaduan->user_id == $id_user
        ) {
            $RelasiLaporanKategori->approvalTracker->status_aproval_id = (int)$request->status_aproval_id;
            $RelasiLaporanKategori->approvalTracker->save();
        }

        return response()->json([
            'message' => 'Berhasil mengubah status',
            'data' => $RelasiLaporanKategori,
        ]);
    }

    public function Advokasisearch(Request $request)
    {
        $user = User::with(['role', 'mahasiswa'])
            ->where('name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('email', 'LIKE', '%' . $request->search . '%')
            ->orWhereHas('role', function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->search . '%');
            })->latest()->get();

        return response()->json($user);
    }
}
