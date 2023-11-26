<?php

namespace App\Services\Reports\SingleTypeReport\PurchasesReport;

use App\Models\ProductTransaction\Purchase;
use App\Services\Reports\SingleTypeReport\SingleTypeReport;
use Illuminate\Database\Eloquent\Builder;

class PurchasesReport extends SingleTypeReport
{
    protected function getSearchBuilder(): Builder
    {
        return Purchase::query();
    }
}
