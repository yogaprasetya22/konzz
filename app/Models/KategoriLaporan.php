<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriLaporan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function laporanPengaduan()
    {
        return $this->hasOne(LaporanPengaduan::class, 'kategori_laporan_id');
    }

    public function konsultasi()
    {
        return $this->hasOne(Konsultasi::class, 'kategori_laporan_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

}
