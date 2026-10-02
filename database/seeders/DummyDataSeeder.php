<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSpecification;
use App\Models\ProductCustomization;
use App\Models\ArticleCategory;
use App\Models\Article;
use App\Models\Testimonial;
use App\Models\Banner;
use App\Models\Setting;
use Illuminate\Support\Str;

class DummyDataSeeder extends Seeder
{
    public function run(): void
    {
        // Settings
        Setting::insert([
            ['key' => 'site_name', 'value' => 'Cita Laksana Mebel Clone'],
            ['key' => 'whatsapp_number', 'value' => '6281234567890'],
            ['key' => 'address', 'value' => 'Jl. Furniture No. 1, Jakarta'],
            ['key' => 'email', 'value' => 'hello@furniture.test'],
            ['key' => 'instagram', 'value' => 'https://instagram.com/furniture'],
        ]);

        // Categories
        $categories = [
            ['name' => 'Sofa', 'slug' => 'sofa', 'description' => 'Sofa premium yang nyaman untuk ruang tamu Anda.', 'image' => '/placeholder/sofa.jpg'],
            ['name' => 'Kursi', 'slug' => 'kursi', 'description' => 'Kursi elegan dan ergonomis.', 'image' => '/placeholder/chair.jpg'],
            ['name' => 'Meja', 'slug' => 'meja', 'description' => 'Meja kokoh dan indah.', 'image' => '/placeholder/table.jpg'],
            ['name' => 'Lemari', 'slug' => 'lemari', 'description' => 'Solusi penyimpanan yang bergaya.', 'image' => '/placeholder/cabinet.jpg'],
            ['name' => 'Ranjang', 'slug' => 'ranjang', 'description' => 'Ranjang nyaman untuk tidur yang nyenyak.', 'image' => '/placeholder/bed.jpg'],
            ['name' => 'Dekorasi', 'slug' => 'dekorasi', 'description' => 'Dekorasi estetik.', 'image' => '/placeholder/decoration.jpg'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Generate 20 Products
        $catIds = Category::pluck('id')->toArray();
        for ($i = 1; $i <= 20; $i++) {
            $catId = $catIds[array_rand($catIds)];
            $name = 'Furnitur Premium ' . $i;
            $product = Product::create([
                'category_id' => $catId,
                'name' => $name,
                'slug' => Str::slug($name) . '-' . rand(100, 999),
                'sku' => 'SKU-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'starting_price' => rand(25, 150) * 100000,
                'short_description' => 'Furnitur modern yang indah dibuat dengan material berkualitas tinggi.',
                'description' => 'Ini adalah deskripsi panjang dari produk yang merincikan pengerjaannya, material premium, dan bagaimana furnitur ini dapat mempercantik ruang interior Anda. Sempurna untuk rumah bergaya modern maupun klasik.',
                'main_image' => '/placeholder/product.jpg',
                'estimated_production_days' => rand(14, 30),
                'is_preorder' => true,
                'is_customizable' => true,
                'is_featured' => $i <= 5,
                'is_best_seller' => $i > 5 && $i <= 10,
                'status' => 'active',
            ]);

            ProductImage::create(['product_id' => $product->id, 'image' => '/placeholder/product-1.jpg', 'position' => 1]);
            ProductImage::create(['product_id' => $product->id, 'image' => '/placeholder/product-2.jpg', 'position' => 2]);

            ProductSpecification::create(['product_id' => $product->id, 'label' => 'Material', 'value' => 'Kayu Jati Solid', 'position' => 1]);
            ProductSpecification::create(['product_id' => $product->id, 'label' => 'Dimensi', 'value' => '200x90x85 cm', 'position' => 2]);
            
            ProductCustomization::create(['product_id' => $product->id, 'name' => 'Ukuran', 'description' => 'Dapat disesuaikan dengan ruangan Anda.', 'position' => 1]);
            ProductCustomization::create(['product_id' => $product->id, 'name' => 'Finishing Kayu', 'description' => 'Natural, Gelap, atau Walnut.', 'position' => 2]);
        }

        // Article Categories & Articles
        $artCat = ArticleCategory::create(['name' => 'Inspirasi', 'slug' => 'inspirasi']);
        for ($i = 1; $i <= 5; $i++) {
            Article::create([
                'article_category_id' => $artCat->id,
                'title' => 'Artikel Inspirasi ' . $i,
                'slug' => 'artikel-inspirasi-' . $i,
                'excerpt' => 'Tips dan trik untuk desain interior Anda.',
                'content' => 'Konten artikel penuh yang membahas cara memilih furnitur yang tepat, mencocokkan warna, dan merawat kualitas kayu agar tahan lama.',
                'cover_image' => '/placeholder/article.jpg',
                'status' => 'published',
                'published_at' => now()->subDays(rand(1, 30)),
            ]);
        }

        // Testimonials
        for ($i = 1; $i <= 5; $i++) {
            Testimonial::create([
                'customer_name' => 'Pelanggan ' . $i,
                'customer_title' => 'Desainer Interior',
                'testimonial' => 'Kualitasnya sangat memukau. Sangat puas dengan sofa kustom untuk klien saya!',
                'rating' => 5,
                'status' => 'active',
            ]);
        }

        // Banners
        Banner::create([
            'title' => 'Furnitur Dibuat Khusus Untuk Anda',
            'subtitle' => 'Kualitas Premium & Desain Kustom',
            'image' => '/placeholder/hero-1.jpg',
            'button_text' => 'Jelajahi Koleksi',
            'button_url' => '/products',
            'position' => 1,
            'status' => 'active',
        ]);
        Banner::create([
            'title' => 'Dibuat Sesuai Pesanan',
            'subtitle' => 'Disesuaikan khusus untuk Anda',
            'image' => '/placeholder/hero-2.jpg',
            'button_text' => 'Konsultasi Bersama Kami',
            'button_url' => '/contact',
            'position' => 2,
            'status' => 'active',
        ]);
    }
}
