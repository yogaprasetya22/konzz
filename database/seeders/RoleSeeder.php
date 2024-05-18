<?php

namespace Database\Seeders;

use App\Models\KategoriLaporan;
use App\Models\Prodi;
use App\Models\Role;
use App\Models\StatusAproval;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $roles = [
            [
                'name_role' => 'admin',
            ],
            [
                'name_role' => 'mahasiswa',
            ],
            [
                'name_role' => 'pendidikan',
            ],
            [
                'name_role' => 'lse',
            ],
            [
                'name_role' => 'lppm',
            ],
            [
                'name_role' => 'bkal',
            ],
            [
                'name_role' => 'perpus',
            ],
            [
                'name_role' => 'sdm',
            ],
            [
                'name_role' => 'tik',
            ],
            [
                'name_role' => 'pha',
            ],
            [
                'name_role' => 'kerjasama-humas-&-internasionalisasi',
            ],
            [
                'name_role' => 'bem',
            ],
            [
                'name_role' => 'rektor',
            ]
        ];

        // create data roles
        Role::insert($roles);



        $prodi = [
            [
                'name_prodi' => 'Manajemen',
            ],
            [
                'name_prodi' => 'Akuntansi',
            ],
            [
                'name_prodi' => 'Ilmu Komunikasi',
            ],
            [
                'name_prodi' => 'Psikologi',
            ],
            [
                'name_prodi' => 'Teknik Sipil',
            ],
            [
                'name_prodi' => 'Arsitektur',
            ],
            [
                'name_prodi' => 'Informatika',
            ],
            [
                'name_prodi' => 'Sistem Informasi',
            ],
            [
                'name_prodi' => 'Desain Produk',
            ],
            [
                'name_prodi' => 'Desain Komunikasi Visual',
            ],
        ];

        Prodi::insert($prodi);

        $status_laporan = [
            [
                'status' => 'Pending',
            ],
            [
                'status' => 'Approved',
            ],
            [
                'status' => 'On Progress',
            ],
            [
                'status' => 'Success',
            ],
            [
                'status' => 'Rejected',
            ],
        ];

        StatusAproval::insert($status_laporan);

        $kategori_laporan =
            [
                [
                    "role_id" => 3,
                    "deskripsi" => "Administrasi Akademik"
                ],
                [
                    "role_id" => 3,
                    "deskripsi" => "Administrasi Blended"
                ],
                [
                    "role_id" => 5,
                    "deskripsi" => "Penelitian & Inovasi"
                ],
                [
                    "role_id" => 5,
                    "deskripsi" => "Pengabdian Masyarakat"
                ],
                [
                    "role_id" => 6,
                    "deskripsi" => "Kemahasiswaan & Alumni"
                ],
                [
                    "role_id" => 6,
                    "deskripsi" => "Pengembangan Karakter"
                ],
                [
                    "role_id" => 6,
                    "deskripsi" => "Pengembangan Bahan Ajar"
                ],
                [
                    "role_id" => 6,
                    "deskripsi" => "Pengembagan Outcome Based Education"
                ],
                [
                    "role_id" => 7,
                    "deskripsi" => "Layanan Pemustakaan"
                ],
                [
                    "role_id" => 7,
                    "deskripsi" => "Layanan Teknis"
                ],
                [
                    "role_id" => 7,
                    "deskripsi" => "Layanan Digital & Sistem Informasi"
                ],
                [
                    "role_id" => 11,
                    "deskripsi" => "Kolaborasi & Kemitraan, Humas, & Internasionalisasi "
                ],
                [
                    "role_id" => 8,
                    "deskripsi" => "Pengembangan Pegawai (Kompetensi, Karir)"
                ],
                [
                    "role_id" => 8,
                    "deskripsi" => "Pengelolaan Pegawai (Kompensasi & Benefit, Rekrutment & Penempatan)"
                ],
                [
                    "role_id" => 9,
                    "deskripsi" => "Operasional TIK (Jaringan & Infrastruktur, Dukungan Teknis & Operasional, Pengembangan Aplikasi, Lab Komputer)"
                ],
                [
                    "role_id" => 10,
                    "deskripsi" => "Pemasaran & Admisi"
                ],
            ];

        KategoriLaporan::insert($kategori_laporan);
    }
}
