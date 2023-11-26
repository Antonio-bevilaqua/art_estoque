<?php

namespace App\Services\Reports;

use App\Services\Reports\Requests\ReportRequest;
use Illuminate\Database\Eloquent\Collection;

abstract class Report
{
    protected array $fields = [
        'initial_date' => [
            'operator' => ">=",
            "key" => "date",
        ],
        'final_date' => [
            'operator' => "<=",
            "key" => "date",
        ],
    ];

    public function check(ReportRequest $request, string $key): bool
    {
        if ($request->has($key) && !empty($request->{$key})) return true;

        return false;
    }

    public static function generate(ReportRequest $request): array|Collection
    {
        $class = get_called_class();
        $instance = new $class();
        return $instance->get($request);
    }

    abstract public function get(ReportRequest $request): array|Collection;
}
