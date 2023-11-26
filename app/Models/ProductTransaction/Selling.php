<?php

namespace App\Models\ProductTransaction;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;

/**
 * @property Collection<Product> $products
 */
class Selling extends ProductTransactionModel
{
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'selling_products', 'selling_id', 'product_id');
    }

    protected function calculateValue(): float
    {
        return $this->products->sum('sell_value');
    }

    public function hasProducts(): bool
    {
        return DB::table('selling_products')->where('selling_id', $this->id)->count() > 0;
    }
}
