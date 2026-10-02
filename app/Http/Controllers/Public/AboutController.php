<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Testimonial;

class AboutController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::where('status', 'active')->latest()->get();
        return Inertia::render('Public/About', [
            'testimonials' => $testimonials
        ]);
    }
}
