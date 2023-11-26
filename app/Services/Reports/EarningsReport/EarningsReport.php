<?php

namespace App\Services\Reports\EarningsReport;

use App\Models\ProductTransaction\Purchase;
use App\Models\ProductTransaction\Selling;
use App\Services\Reports\Report;
use App\Services\Reports\Requests\ReportRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class EarningsReport extends Report
{
    public function get(ReportRequest $request): array
    {
        $purchases = $this->build($request, Purchase::query());
        $sellings = $this->build($request, Selling::query());
        return [
            'purchases' => $purchases,
            'sales' => $sellings,
        ];
    }

    protected function build(ReportRequest $request, Builder $builder): Collection
    {
        foreach ($this->fields as $field => $data) {
            if (!$this->check($request, $field)) {
                continue;
            }
            $builder->where($data['key'], $data['operator'], $request->{$field});
        }

        return $builder->get();
    }
}
