<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@furniture.test'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        $settings = [
            ['key' => 'site_name', 'value' => 'Cita Laksana Mebel'],
            ['key' => 'whatsapp_number', 'value' => '6281234567890'],
            ['key' => 'address', 'value' => 'Jl. Furniture No. 1, Jakarta'],
            ['key' => 'email', 'value' => 'hello@arsliving.test'],
            ['key' => 'instagram', 'value' => 'https://instagram.com/arsliving'],
        ];

        foreach ($settings as $setting) {
            \App\Models\Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value']]
            );
        }
    }
}
