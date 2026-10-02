<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use App\Models\Testimonial;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::where('status', 'active')->orderBy('position')->get();
        
        $categories = Category::where('status', 'active')->get();
        
        $featuredProducts = Product::with('category')
            ->where('status', 'active')
            ->where('is_featured', true)
            ->latest()
            ->take(8)
            ->get();
            
        $bestSellers = Product::with('category')
            ->where('status', 'active')
            ->where('is_best_seller', true)
            ->latest()
            ->take(8)
            ->get();
            
        $testimonials = Testimonial::where('status', 'active')->latest()->take(6)->get();

        return Inertia::render('Public/Home', [
            'banners' => $banners,
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'bestSellers' => $bestSellers,
            'testimonials' => $testimonials
        ]);
    }
}
