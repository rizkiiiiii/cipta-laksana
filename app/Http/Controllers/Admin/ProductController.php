<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->latest();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('sku', 'like', '%' . $request->search . '%');
        }

        $products = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        $categories = Category::orderBy('name')->get();
        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku',
            'starting_price' => 'required|numeric|min:0',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'estimated_production_days' => 'nullable|integer|min:0',
            'is_preorder' => 'boolean',
            'is_customizable' => 'boolean',
            'is_featured' => 'boolean',
            'is_best_seller' => 'boolean',
            'status' => 'required|in:draft,active,inactive',
            'main_image' => 'required|image|max:2048',
            'specifications' => 'nullable|array',
            'customizations' => 'nullable|array',
            'new_images.*' => 'image|max:2048'
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('products', 'public');
            $validated['main_image'] = '/storage/' . $path;
        }

        $product = Product::create($validated);

        if ($request->has('specifications')) {
            foreach ($request->specifications as $spec) {
                if (!empty($spec['key']) && !empty($spec['value'])) {
                    $product->specifications()->create($spec);
                }
            }
        }

        if ($request->has('customizations')) {
            foreach ($request->customizations as $cust) {
                if (!empty($cust['name'])) {
                    $product->customizations()->create($cust);
                }
            }
        }

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $image) {
                $path = $image->store('products/gallery', 'public');
                $product->images()->create(['image' => '/storage/' . $path]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        $categories = Category::orderBy('name')->get();
        $product->load(['images', 'specifications', 'customizations']);
        
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'starting_price' => 'required|numeric|min:0',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'estimated_production_days' => 'nullable|integer|min:0',
            'is_preorder' => 'boolean',
            'is_customizable' => 'boolean',
            'is_featured' => 'boolean',
            'is_best_seller' => 'boolean',
            'status' => 'required|in:draft,active,inactive',
            'main_image' => 'nullable|image|max:2048',
            'specifications' => 'nullable|array',
            'customizations' => 'nullable|array',
            'new_images.*' => 'image|max:2048'
        ]);

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('products', 'public');
            $validated['main_image'] = '/storage/' . $path;
        } else {
            unset($validated['main_image']);
        }

        $product->update($validated);

        if ($request->has('specifications')) {
            $product->specifications()->delete();
            foreach ($request->specifications as $spec) {
                if (!empty($spec['key']) && !empty($spec['value'])) {
                    $product->specifications()->create($spec);
                }
            }
        }

        if ($request->has('customizations')) {
            $product->customizations()->delete();
            foreach ($request->customizations as $cust) {
                if (!empty($cust['name'])) {
                    $product->customizations()->create($cust);
                }
            }
        }

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $image) {
                $path = $image->store('products/gallery', 'public');
                $product->images()->create(['image' => '/storage/' . $path]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }
}
