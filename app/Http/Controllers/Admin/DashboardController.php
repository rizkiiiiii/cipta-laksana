<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Article;
use App\Models\ContactMessage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_categories' => Category::count(),
            'total_articles' => Article::count(),
            'total_messages' => ContactMessage::count(),
            'unread_messages' => ContactMessage::where('status', 'unread')->count(),
            'total_product_views' => Product::sum('views_count'),
        ];

        $recentProducts = Product::with('category')->latest()->take(5)->get();
        $recentMessages = ContactMessage::latest()->take(5)->get();
        
        $topViewedProducts = Product::with('category')
            ->orderByDesc('views_count')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentProducts' => $recentProducts,
            'recentMessages' => $recentMessages,
            'topViewedProducts' => $topViewedProducts,
        ]);
    }
}
