<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusAproval extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function approvalTracker()
    {
        return $this->hasOne(ApprovalTracker::class, 'status_aproval_id');
    }

}
