<?php

namespace App\Http\Controllers;

use App\Models\ApprovalTracker;
use App\Models\KategoriLaporan;
use App\Models\Konsultasi;
use App\Models\Mahasiswa;
use App\Models\RelasiLaporanKategori;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function Laporan()
    {
        $kategori_laporan = KategoriLaporan::all();
        return Inertia::render('Home/Lapor', [
            'title' => 'Lapor',
            'kategori_laporan' => $kategori_laporan,
        ]);
    }
    public function Pusinfo()
    {
        $unit = User::with(['unit', 'role'])->where('role_id', '!=', 2)->where('role_id', '!=', 1)->where('role_id', '!=', 13)->where('role_id', '!=', 14)->get();
        return Inertia::render('Home/PusInfo', [
            'title' => 'Pusat Informasi',
            'unit' => $unit,
        ]);
    }
    public function History()
    {
        $user_id = auth()->user()->id;
        $aprove = RelasiLaporanKategori::with(['kategori_laporan', 'approvalTracker.laporanPengaduan.user.mahasiswa.prodi', 'approvalTracker.laporanPengaduan.user.role', 'approvalTracker.statusAproval'])->whereHas('approvalTracker.laporanPengaduan', function ($query) use ($user_id) {
            $query->where('user_id', $user_id);
        })->latest()->get();
        return Inertia::render('Home/History', [
            'title' => 'History Laporan',
            'data' => $aprove,
        ]);
    }
    public function Tracker($id)
    {
        $RelasiLaporanKategori = RelasiLaporanKategori::with(['kategori_laporan.role', 'approvalTracker.laporanPengaduan.user.mahasiswa.prodi', 'approvalTracker.laporanPengaduan.user.role', 'approvalTracker.statusAproval'])->where('id', $id)->first();
        return Inertia::render('Home/Tracker', [
            'title' => 'Tracker Laporan',
            'data' => $RelasiLaporanKategori,
        ]);
    }

    // public function konsultasi()
    // {
    //     $data 
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'prodi' => ['required', 'string', 'max:255'],
            'angkatan' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => '2',
        ]);

        $user->mahasiswa()->create([
            'prodi_id' => $request->prodi,
            'angkatan' => $request->angkatan,
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function search(Request $request)
    {
        // buatkan validasi untuk pencarian dari name email prodi angkatan  
        $user = User::with(['role', 'mahasiswa.prodi'])->where('name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('email', 'LIKE', '%' . $request->search . '%')
            ->orWhereHas('mahasiswa.prodi', function ($query) use ($request) {
                $query->where('name_prodi', 'LIKE', '%' . $request->search . '%');
            })->orWhereHas('role', function ($query) use ($request) {
                $query->where('name_role', 'LIKE', '%' . $request->search . '%');
            })->orWhereHas('mahasiswa', function ($query) use ($request) {
                $query->where('angkatan', 'LIKE', '%' . $request->search . '%');
            })->latest()->get();

        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $user = User::with(['role', 'mahasiswa.prodi'])->where(
            'id',
            $request->id
        )->first();


        // edit
        $user->name = $request->name;
        $user->email = $request->email;
        $user->mahasiswa->prodi_id = (int)$request->prodi;
        $user->mahasiswa->angkatan = (int)$request->angkatan;
        $user->password = Hash::make($request->password);
        $user->save();
        $user->mahasiswa->save();

        return response()->json([
            $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mahasiswa $mahasiswa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = User::find($request->id);
        $user->mahasiswa->delete();
        $user->delete();
    }

    // konstultasi

    public function Konsultasi()
    {
        $user_id = auth()->user()->id;
        $kategori_laporan = KategoriLaporan::all();
        $konsultasi = Konsultasi::with(['user', 'approvalTracker.statusAproval'])->where('user_id', $user_id)->latest()->get();
        return Inertia::render('Home/Konsultasi', [
            'title' => 'Konsultasi',
            'data' => $konsultasi,
            'kategori_laporan' => $kategori_laporan,
        ]);
    }

    public function KonsultasiStore(Request $request)
    {
        $request->validate([
            'topik_konsultasi' => ['required', 'string', 'max:255'],
            'keterangan' => ['required', 'string'],
            'kategori' => ['required'],
        ]);

        $konsultasi = Konsultasi::create([
            'user_id' => auth()->user()->id,
            'topik_konsultasi' => $request->topik_konsultasi,
            'keterangan' => $request->keterangan,
            'kategori_laporan_id' => $request->kategori,
        ]);

        ApprovalTracker::create([
            'laporan_pengaduan_id' => $konsultasi->id,
            'status_aproval_id' => 1,
        ]);

        return Redirect::route('Konsultasi');
    }

    public function KonsultasiUpdate(Request $request)
    {
        $konsultasi = Konsultasi::find($request->id);
        $konsultasi->topik_konsultasi = $request->topik_konsultasi;
        $konsultasi->keterangan = $request->keterangan;
        $konsultasi->save();
    }

    public function KonsultasiDestroy(Request $request)
    {
        $konsultasi = Konsultasi::find($request->id);
        $konsultasi->delete();
    }

    public function KonsultasiAproval(Request $request)
    {
        $konsultasi = Konsultasi::find($request->id);
        $konsultasi->approvalTracker->status_aproval_id = 2;
        $konsultasi->approvalTracker->save();
    }
}
