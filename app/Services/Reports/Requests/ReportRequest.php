<?php

namespace App\Services\Reports\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'initial_date' => ['nullable', 'date_format:Y-m-d'],
            'final_date' => ['nullable', 'date_format:Y-m-d'],
        ];
    }
}
