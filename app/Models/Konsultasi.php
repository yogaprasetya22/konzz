<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konsultasi extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function approvalTracker()
    {
        return $this->hasOne(ApprovalTracker::class, 'laporan_pengaduan_id', 'id');
    }

    public function kategori_laporan()
    {
        return $this->belongsTo(KategoriLaporan::class, 'kategori_laporan_id');
    }
}
