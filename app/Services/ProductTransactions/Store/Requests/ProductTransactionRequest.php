<?php

namespace App\Services\ProductTransactions\Store\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductTransactionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'discount' => ['numeric', 'decimal:2'],
            'taxes' => ['numeric', 'decimal:2'],
            'date' => ['required', 'date_format:Y-m-d'],
            'products' => ['required', 'array'],
            'products.*' => ['exists:products,id'],
        ];
    }
}
