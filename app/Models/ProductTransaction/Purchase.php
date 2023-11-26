<?php

namespace App\Models\ProductTransaction;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;

/**
 * @property Collection<Product> $products
 */
class Purchase extends ProductTransactionModel
{
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'purchase_products', 'purchase_id', 'product_id');
    }

    protected function calculateValue(): float
    {
        return $this->products->sum('buy_value');
    }

    public function hasProducts(): bool
    {
        return DB::table('purchase_products')->where('purchase_id', $this->id)->count() > 0;
    }
}
