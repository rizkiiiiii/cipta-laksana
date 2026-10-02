<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::latest()->get();
        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|image|max:2048'
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);
        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('articles', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        Article::create($validated);

        return back()->with('success', 'Artikel berhasil ditambahkan.');
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|image|max:2048'
        ]);

        if ($validated['status'] === 'published' && !$article->published_at) {
            $validated['published_at'] = now();
        } elseif ($validated['status'] === 'draft') {
            $validated['published_at'] = null;
        }

        if ($request->hasFile('cover_image')) {
            if ($article->cover_image && str_starts_with($article->cover_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $article->cover_image));
            }
            $path = $request->file('cover_image')->store('articles', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        $article->update($validated);

        return back()->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Article $article)
    {
        if ($article->cover_image && str_starts_with($article->cover_image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $article->cover_image));
        }
        $article->delete();

        return back()->with('success', 'Artikel berhasil dihapus.');
    }
}
