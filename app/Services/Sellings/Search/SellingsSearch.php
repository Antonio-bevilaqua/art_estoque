<?php

namespace App\Services\Purchases\Search;

use App\Models\ProductTransaction\Purchase;
use App\Models\ProductTransaction\Selling;
use App\Services\Search\Field\Field;
use App\Services\Search\SearchBuilder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SellingsSearch extends SearchBuilder
{
    protected function getBuilder(Request $request): Builder
    {
        $userId = Auth::user()->id;
        $query = Selling::select(
            'sellings.*',
            DB::raw("SUM(products.buy_value) AS 'value' "),
            DB::raw("SUM('value' + purchases.taxes - purchases.discount) AS total_value")
        )->join('purchase_products', 'purchase_products.purchase_id', '=', 'purchases.id')
            ->join('products', 'products.id', '=', 'purchase_products.product_id')
            ->where('purchases.user_id', $userId)
            ->groupBy('purchases.id');

        $query = $this->filterTableFields($request, $query);
        $query = $this->filterMinDateField($request, $query);
        $query = $this->filterMaxDateField($request, $query);
        return $this->filterProducts($request, $query);
    }

    private function filterMinDateField(Request $request, Builder $query): Builder
    {
        $date = $this->getField($request, "min_date");
        if ($date !== null && $date !== "") {
            $carbonDate = Carbon::createFromFormat("Y-m-d H:i:s", $date . " 00:00:00");
            $query->where('date', '>=', $carbonDate->format('Y-m-d H:i:s'));
        }
        return $query;
    }

    private function filterMaxDateField(Request $request, Builder $query): Builder
    {
        $date = $this->getField($request, "max_date");
        if ($date !== null && $date !== "") {
            $carbonDate = Carbon::createFromFormat("Y-m-d H:i:s", $date . " 23:59:59");
            $query->where('date', '<=', $carbonDate->format('Y-m-d H:i:s'));
        }
        return $query;
    }

    private function filterProducts(Request $request, Builder $query): Builder
    {
        $products = $this->getField($request, "products");
        if ($products !== null && count($products) > 0) {
            $query->whereHas('products', function ($query) use ($products) {
                $query->whereIn('id', $products);
            });
        }
        return $query;
    }

    protected function getFields(): Collection
    {
        return new Collection([
            new Field("min_discount", ">=", "discount"),
            new Field("max_discount", "<=", "discount"),
            new Field("min_taxes", ">=", "discount"),
            new Field("max_taxes", "<=", "discount"),
            new Field("min_value", ">=", "value"),
            new Field("max_value", "<=", "value"),
            new Field("min_total_value", ">=", "total_value"),
            new Field("max_total_value", "<=", "total_value"),
        ]);
    }
}
