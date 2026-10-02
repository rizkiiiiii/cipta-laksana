<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $articles = Article::with('category')
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->paginate(9);

        return Inertia::render('Public/Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function show($slug)
    {
        $article = Article::with('category')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->firstOrFail();

        $relatedArticles = Article::where('article_category_id', $article->article_category_id)
            ->where('id', '!=', $article->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Public/Articles/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }
}
