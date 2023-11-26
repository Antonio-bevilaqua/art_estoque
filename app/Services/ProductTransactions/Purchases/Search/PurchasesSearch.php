<?php

namespace App\Services\ProductTransactions\Purchases\Search;

use App\Services\ProductTransactions\Search\ProductTransactionSearch;
use App\Models\ProductTransaction\Purchase;
use Illuminate\Database\Eloquent\Builder;

class PurchasesSearch extends ProductTransactionSearch
{
    protected function getModelQuery(): Builder
    {
        return Purchase::query();
    }

    protected function getTableName(): string
    {
        return "purchases";
    }
}
