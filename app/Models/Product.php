<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'is_preorder' => 'boolean',
        'is_customizable' => 'boolean',
        'is_featured' => 'boolean',
        'is_best_seller' => 'boolean',
        'starting_price' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('position');
    }

    public function specifications()
    {
        return $this->hasMany(ProductSpecification::class)->orderBy('position');
    }

    public function customizations()
    {
        return $this->hasMany(ProductCustomization::class)->orderBy('position');
    }
}
