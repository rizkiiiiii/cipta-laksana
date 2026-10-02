<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::orderBy('position')->get();
        return Inertia::render('Admin/Banners/Index', [
            'banners' => $banners
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|max:2048',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive',
            'position' => 'integer'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('banners', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Banner::create($validated);

        return back()->with('success', 'Banner berhasil ditambahkan.');
    }

    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive',
            'position' => 'integer'
        ]);

        if ($request->hasFile('image')) {
            if ($banner->image && str_starts_with($banner->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $banner->image));
            }
            $path = $request->file('image')->store('banners', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $banner->update($validated);

        return back()->with('success', 'Banner berhasil diperbarui.');
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image && str_starts_with($banner->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $banner->image));
        }
        $banner->delete();

        return back()->with('success', 'Banner berhasil dihapus.');
    }
}
