<?php

namespace App\Services\Products\Store;

use App\Models\Product;
use App\Services\Products\Store\Requests\ProductStoreRequest;
use App\Services\ProductTransactions\Store\Error\OutOfStockException;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;


class ProductManager
{
    public string $errors = "Falha ao finalizar requisição, contate o suporte!";
    public static function storeNew(ProductStoreRequest $request): bool
    {
        $product = new Product();
        $product->id = (string)Str::orderedUuid();
        $product->user_id = Auth::user()->id;
        return self::store($request, $product);
    }

    public static function store(ProductStoreRequest $request, Product $product): bool
    {
        $data = $request->validated();
        try {
            if ($product->user_id !== (int)Auth::user()->id) {
                throw new Exception("Produto não pertencente ao usuário!");
            }
            $product->fill($data);
            $product->save();


            if ($request->hasFile('image')) {
                $product->storePicture($request->file('image'));
            }

            return true;
        } catch (Exception $e) {
            Log::error("Falha ao cadastrar produto: " . $e->getMessage());
            return false;
        }
    }

    public static function delete(Product $product): ?bool
    {
        try {
            if ($product->user_id !== (int)Auth::user()->id) {
                throw new Exception("Produto não pertencente ao usuário!");
            }
            return $product->delete();
        } catch (Throwable $e) {
            Log::error("Falha ao remover produto: " . $e->getMessage());
            return false;
        }
    }
}
