<?php

namespace App\Services\Reports\SingleTypeReport;

use App\Models\ProductTransaction\ProductTransactionModel;
use App\Services\Reports\Report;
use App\Services\Reports\Requests\ReportRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

abstract class SingleTypeReport extends Report
{
    public function get(ReportRequest $request): Collection
    {
        $reportData = $request->validated();
        $searchModel = $this->getSearchBuilder();

        foreach ($this->fields as $field => $data) {
            if (!$this->check($request, $field)) {
                continue;
            }
            $searchModel->where($data['key'], $data['operator'], $reportData[$field]);
        }

        return $searchModel->get();
    }

    abstract protected function getSearchBuilder(): Builder;
}
