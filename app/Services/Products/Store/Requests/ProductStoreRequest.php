<?php

namespace App\Services\Products\Store\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'description' => ['string', 'max:255'],
            'buy_value' => ['numeric', 'decimal:2'],
            'sell_value' => ['numeric', 'decimal:2'],
            'image' => ['nullable', 'image'],
            'stock' => ['numeric', 'integer'],
        ];
    }
}
