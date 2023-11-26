<?php

namespace App\Services\ProductTransactions\Search;


use App\Services\Search\Field\Field;
use App\Services\Search\SearchBuilder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

abstract class ProductTransactionSearch extends SearchBuilder
{
    abstract protected function getModelQuery(): Builder;

    abstract protected function getTableName(): string;

    protected function getBuilder(Request $request): Builder
    {
        $userId = Auth::user()->id;
        $tableName = $this->getTableName();
        $singularTableName = substr($tableName, 0, -1);
        $joinTableName = $singularTableName . "_products";
        $tableIdColumn = $singularTableName . "_id";

        $query = $this->getModelQuery()->select(
            $tableName . '.*',
            DB::raw("SUM(products.buy_value) AS sum_value "),
            DB::raw("(SUM(products.buy_value) + $tableName.taxes - $tableName.discount) AS total_value ")
        )->join($joinTableName, "$joinTableName.$tableIdColumn", '=', "$tableName.id")
            ->join('products', 'products.id', '=', "$joinTableName.product_id")
            ->where("$tableName.user_id", $userId);

        $query = $this->filterTableFields($request, $query);
        $query = $this->filterMinDateField($request, $query);
        $query = $this->filterMaxDateField($request, $query);
        $query = $this->filterValueFields($request, $query);
        $query = $this->filterTotalValueFields($request, $tableName, $query);
        return $this->filterProducts($request, $query)->groupBy("$tableName.id");
    }

    private function filterMinDateField(Request $request, Builder $query): Builder
    {
        $date = $this->getField($request, "initial_date");
        if ($date !== null && $date !== "") {
            $carbonDate = Carbon::createFromFormat("Y-m-d H:i:s", $date . " 00:00:00");
            $query->where('date', '>=', $carbonDate->format('Y-m-d H:i:s'));
        }
        return $query;
    }

    private function filterMaxDateField(Request $request, Builder $query): Builder
    {
        $date = $this->getField($request, "final_date");
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

    private function filterValueFields(Request $request, Builder $query): Builder
    {
        $minValue = $this->getField($request, "min_value");
        $maxValue = $this->getField($request, "max_value");
        if ($minValue !== null) {
            $query->having("sum_value", ">=", $minValue);
        }
        if ($maxValue !== null) {
            $query->having("sum_value", "<=", $maxValue);
        }
        return $query;
    }

    private function filterTotalValueFields(Request $request, string $tableName, Builder $query): Builder
    {

        $minValue = $this->getField($request, "min_total_value");
        $maxValue = $this->getField($request, "max_total_value");
        if ($minValue !== null) {
            $query->having("total_value", ">=", $minValue);
        }
        if ($maxValue !== null) {
            $query->having("total_value", "<=", $maxValue);
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
            //new Field("min_value", ">=", "value"),
            //new Field("max_value", "<=", "value"),
            //new Field("min_total_value", ">=", "total_value"),
            //new Field("max_total_value", "<=", "total_value"),
        ]);
    }
}
