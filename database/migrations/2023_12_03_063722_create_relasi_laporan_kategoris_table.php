<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('relasi_laporan_kategoris', function (Blueprint $table) {
            $table->id();
            $table->foreignId('approval_tracker_id');
            $table->foreignId('kategori_laporan_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relasi_laporan_kategoris');
    }
};
