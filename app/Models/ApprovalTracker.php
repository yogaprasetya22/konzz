<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApprovalTracker extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function laporanPengaduan()
    {
        return $this->belongsTo(LaporanPengaduan::class);
    }

    public function statusAproval()
    {
        return $this->belongsTo(StatusAproval::class, 'status_aproval_id');
    }

    public function relasiLaporanKategori()
    {
        return $this->hasOne(RelasiLaporanKategori::class);
    }
}
