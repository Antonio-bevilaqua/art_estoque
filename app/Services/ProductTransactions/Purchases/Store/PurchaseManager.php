<?php

namespace App\Services\ProductTransactions\Purchases\Store;

use App\Models\Product;
use App\Models\ProductTransaction\ProductTransactionModel;
use App\Models\ProductTransaction\Purchase;
use App\Services\ProductTransactions\Store\Error\OutOfStockException;
use App\Services\ProductTransactions\Store\ProductTransactionManager;
use Exception;

class PurchaseManager extends ProductTransactionManager
{
    protected static function getNewModel(): ProductTransactionModel
    {
        return new Purchase();
    }

    protected static function handleStockChange(array $products): void
    {
        $addedProducts = [];
        $productsToAdd = [];
        foreach ($products as $product) {
            $index = array_search($product, $addedProducts);
            if ($index === false) {
                $productsToAdd[] = [
                    'id' => $product,
                    'qtd' => 1
                ];
                $addedProducts[] = $product;
                continue;
            }

            $productsToAdd[$index]['qtd']++;
        }

        foreach ($productsToAdd as $product) {
            $search = Product::find($product['id']);
            if (!$search) continue;

            $search->stock += $product['qtd'];
            $search->save();
        }
    }


    /**
     * @throws OutOfStockException
     */
    protected static function removeProducts(ProductTransactionModel $transaction): void
    {
        $addedProducts = [];
        $productsToSub = [];
        foreach ($transaction->products as $product) {
            $index = array_search($product->id, $addedProducts);
            if ($index === false) {
                $productsToSub[] = [
                    'id' => $product->id,
                    'qtd' => 1
                ];
                $addedProducts[] = $product->id;
                continue;
            }

            $productsToSub[$index]['qtd']++;
        }

        foreach ($productsToSub as $product) {
            $search = Product::find($product['id']);
            if (!$search) continue;

            $search->stock -= $product['qtd'];
            if ($search->stock <= 0) {
                throw new OutOfStockException($search->name);
            }
            $search->save();
        }

        $transaction->products()->detach();
    }
}
