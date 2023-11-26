<?php

namespace App\Services\ProductTransactions\Sellings\Search;

use App\Models\ProductTransaction\Selling;
use App\Services\ProductTransactions\Search\ProductTransactionSearch;
use Illuminate\Database\Eloquent\Builder;

class SellingsSearch extends ProductTransactionSearch
{
    protected function getModelQuery(): Builder
    {
        return Selling::query();
    }

    protected function getTableName(): string
    {
        return "sellings";
    }
}
