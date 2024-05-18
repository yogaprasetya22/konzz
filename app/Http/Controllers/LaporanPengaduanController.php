<?php

namespace App\Http\Controllers;

use App\Mail\MyMail;
use App\Models\ApprovalTracker;
use App\Models\LaporanPengaduan;
use App\Models\RelasiLaporanKategori;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class LaporanPengaduanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    // public function showHistoryPengaduan(Request $request)
    // {
    //     return response()->json([
    //         'message' => 'Berhasil menampilkan data pengaduan',
    //         'data' => LaporanPengaduan::with(['user'])->where('user_id', $request->user_id)->get(),
    //     ]);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'deskripsi' => 'required',
            'bukti' => 'required|file|max:10240',
            'kategori' => 'required',
            'anonim' => 'required',
            'user_id' => 'required',
        ]);

        $nim = User::where('id', $request->user_id)->first()->mahasiswa->nim;
        $file_bukti = $request->file('bukti');
        $fileName = time() . "_" . $file_bukti->getClientOriginalName();
        $file_bukti->move(public_path(
            'bukti_pengaduan/' . $nim . '/'
        ), $fileName);

        $laporan_pengaduan = LaporanPengaduan::create([
            'deskripsi' => $request->deskripsi,
            'bukti' => $fileName,
            'anonim' => $request->anonim,
            'user_id' => $request->user_id,
        ]);

        $approval_tracker = ApprovalTracker::create([
            'laporan_pengaduan_id' => $laporan_pengaduan->id,
            'status_aproval_id' => 1,
        ]);

        RelasiLaporanKategori::create([
            'approval_tracker_id' => $approval_tracker->id,
            'kategori_laporan_id' =>  $request->kategori,
        ]);


        // Mail::to($laporan_pengaduan->user->email)->send(new MyMail($laporan_pengaduan));
        // buatkan queue untuk pengiriman email


        return response()->json([
            'message' => 'Laporan Pengaduan berhasil dikirim',
            'data' => $laporan_pengaduan,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(LaporanPengaduan $laporanPengaduan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LaporanPengaduan $laporanPengaduan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LaporanPengaduan $laporanPengaduan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LaporanPengaduan $laporanPengaduan)
    {
        //
    }
}
