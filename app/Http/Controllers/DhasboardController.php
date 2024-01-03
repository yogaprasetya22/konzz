<?php

namespace App\Http\Controllers;

use App\Models\KategoriLaporan;
use App\Models\RelasiLaporanKategori;
use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class DhasboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function AdminShow()
    {
        $laporanPengaduan = RelasiLaporanKategori::with(['kategori_laporan', 'approvalTracker.laporanPengaduan.user.mahasiswa.prodi', 'approvalTracker.laporanPengaduan.user.role', 'approvalTracker.statusAproval'])->latest()->get();
        $user = User::with(['role', 'mahasiswa.prodi'])->latest()->get();
        $kategori_laporan = KategoriLaporan::all();
        return Inertia::render('Admin/Admin', [
            'title' => 'Admin',
            'user' => $user,
            'data' => $laporanPengaduan,
            'kategori_laporan' => $kategori_laporan,
        ]);
    }

    public function AdminDataUser()
    {
        $user = User::with(['role', 'mahasiswa.prodi'])->where('role_id', 2)->latest()->get();
        return Inertia::render('Admin/DataUser', [
            'title' => 'Admin',
            'data' => $user,
        ]);
    }
    public function AdminDataStaf()
    {
        // $user = User::with(['role', 'mahasiswa.prodi'])->where('role_id', 2)->latest()->get();
        // user selain role_id 2
        $user = User::with(['role', 'unit'])->where('role_id', '!=', 2)->where('role_id', '!=', 1)->latest()->get();
        return Inertia::render('Admin/DataStaf', [
            'title' => 'Admin',
            'data' => $user,
        ]);
    }



    public function Adminsearch(Request $request)
    {
        $user = User::with(['role', 'mahasiswa'])
            ->where('name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('email', 'LIKE', '%' . $request->search . '%')
            ->orWhereHas('role', function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->search . '%');
            })->latest()->get();

        return response()->json($user);
    }





    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'kontak' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            "role_id" => $request->role,
        ]);

        $user->unit()->create([
            'kontak' => $request->kontak,
        ]);

        // return response()->json([
        //     'message' => 'Berhasil menambahkan data staf',
        //     $request->all(),
        // ]);
    }

    public function search(Request $request)
    {
        // buatkan validasi untuk pencarian dari name email role kontak
        $user = User::with(['role', 'unit'])->where('name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('email', 'LIKE', '%' . $request->search . '%')
            ->orWhereHas('role', function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->search . '%');
            })->orWhereHas('unit', function ($query) use ($request) {
                $query->where('kontak', 'LIKE', '%' . $request->search . '%');
            })->latest()->get();

        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $user = User::with(['role', 'unit'])->where('role_id', '!=', 2)->where('role_id', '!=', 1)->where(
            'id',
            $request->id
        )->first();


        // edit
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $request->role;
        $user->unit->kontak = $request->kontak;
        $user->password = Hash::make($request->password);
        $user->save();
        $user->unit->save();

        return response()->json([
            $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = User::find($request->id);
        $user->unit->delete();
        $user->delete();
    }
}
