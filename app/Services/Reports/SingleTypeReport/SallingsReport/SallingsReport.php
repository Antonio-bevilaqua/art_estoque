<?php

namespace App\Services\Reports\SingleTypeReport\SallingsReport;

use App\Models\ProductTransaction\Selling;
use App\Services\Reports\SingleTypeReport\SingleTypeReport;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class SallingsReport extends SingleTypeReport
{
    protected function getSearchBuilder(): Builder
    {
        return Selling::where('user_id', Auth::user()->id);
    }
}
