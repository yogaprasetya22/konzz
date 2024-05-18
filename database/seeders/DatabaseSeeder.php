<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $this->call([
            RoleSeeder::class,
        ]);


        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '1',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);
        $pendidikan =  User::create([
            'name' => 'Pendidikan',
            'email' => 'pendidikan@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '3',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $pendidikan->unit()->create([
            'kontak' => '089612124343',
        ]);

        $lse = User::create([
            'name' => 'lse',
            'email' => 'lse@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '4',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $lse->unit()->create([
            'kontak' => '089612124343',
        ]);

        $lppm = User::create([
            'name' => 'lppm',
            'email' => 'lppm@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '5',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $lppm->unit()->create([
            'kontak' => '089612124343'
        ]);

        $bkal = User::create([
            'name' => 'bkal',
            'email' => 'bkal@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '6',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $bkal->unit()->create([
            'kontak' => '089612124343'
        ]);

        $perpus = User::create([
            'name' => 'perpus',
            'email' => 'perpus@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '7',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $perpus->unit()->create([
            'kontak' => '089612124343'
        ]);


        $sdm = User::create([
            'name' => 'sdm',
            'email' => 'sdm@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '8',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $sdm->unit()->create([
            'kontak' => '089612124343'
        ]);

        $tik = User::create([
            'name' => 'tik',
            'email' => 'tik@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '9',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $tik->unit()->create([
            'kontak' => '089612124343'
        ]);

        $pha = User::create([
            'name' => 'pha',
            'email' => 'pha@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '10',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $pha->unit()->create([
            'kontak' => '089612124343'
        ]);

        $kerjasama_humas_internasionalisasi = User::create([
            'name' => 'kerjasama-humas-internasionalisasi',
            'email' => 'kerjasama-humas-internasionalisasi@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '11',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $kerjasama_humas_internasionalisasi->unit()->create([
            'kontak' => '089612124343'
        ]);

        $bem = User::create([
            'name' => 'bem',
            'email' => 'bem@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '12',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $bem->unit()->create([
            'kontak' => '089612124343'
        ]);

        $rektor =  User::create([
            'name' => 'rektor',
            'email' => 'rektor@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '13',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $rektor->unit()->create([
            'kontak' => '089612124343'
        ]);

        $mahasiswa = User::create([
            'name' => 'mahasiswa',
            'email' => 'mahasiswa@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '2',
            'uuid' => str()->uuid(),
            'created_at' => now(),
        ]);

        $mahasiswa->mahasiswa()->create([
            'prodi_id' => '2',
            'angkatan' => '2022',
        ]);
    }
}
