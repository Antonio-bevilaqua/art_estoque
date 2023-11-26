<?php

namespace App\Services\Products\Search;

use App\Models\Product;
use App\Services\Search\Field\Field;
use App\Services\Search\SearchBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class ProductsSearch extends SearchBuilder
{
    protected function getBuilder(Request $request): Builder
    {
        $userId = Auth::user()->id;
        $query = Product::where('user_id', $userId);
        return $this->filterTableFields($request, $query);
    }

    protected function getFields(): Collection
    {
        return new Collection([
            new Field("name", "LIKE"),
            new Field("description", "LIKE"),
            new Field("min_buy_value", ">=", "buy_value"),
            new Field("max_buy_value", "<=", "buy_value"),
            new Field("min_sell_value", ">=", "sell_value"),
            new Field("max_sell_value", "<=", "sell_value"),
            new Field("min_stock", ">=", "stock"),
            new Field("max_stock", "<=", "stock"),
        ]);
    }
}
