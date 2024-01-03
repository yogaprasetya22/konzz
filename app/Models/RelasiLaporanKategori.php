<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelasiLaporanKategori extends Model
{
    use HasFactory;
    protected $guarded = ['id'];


    public function approvalTracker()
    {
        return $this->belongsTo(ApprovalTracker::class);
    }

    public function kategori_laporan()
    {
        return $this->belongsTo(KategoriLaporan::class, 'kategori_laporan_id');
    }
 
}
