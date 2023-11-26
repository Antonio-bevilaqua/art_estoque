<?php

namespace App\Services\ProductTransactions\Store;

use App\Models\ProductTransaction\ProductTransactionModel;
use App\Services\ProductTransactions\Store\Error\OutOfStockException;
use App\Services\ProductTransactions\Store\Requests\ProductTransactionRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

abstract class ProductTransactionManager
{
    public static string $errors = "Falha ao finalizar requisição, contate o suporte!";

    abstract protected static function getNewModel(): ProductTransactionModel;

    abstract protected static function handleStockChange(array $products): void;

    abstract protected static function removeProducts(ProductTransactionModel $transaction): void;

    public static function storeNew(ProductTransactionRequest $request): bool
    {
        $class = get_called_class();
        $transaction = $class::getNewModel();
        $transaction->id = (string)Str::orderedUuid();
        $transaction->user_id = Auth::user()->id;
        return self::store($request, $transaction, true);
    }

    public static function store(ProductTransactionRequest $request, ProductTransactionModel $transaction, bool $new = false): bool
    {
        $class = get_called_class();
        $data = $request->validated();
        try {
            if ($transaction->user_id !== (int)Auth::user()->id) {
                throw new Exception("Transação não pertencente ao usuário!");
            }
            DB::beginTransaction();
            if (!$new) {
                $class::removeProducts($transaction);
            }

            $transaction->fill($data);
            $transaction->save();

            foreach ($data['products'] as $product) {
                $transaction->products()->attach($product);
            }

            if ($request->get('change_stock', false)) {
                $class::handleStockChange($data['products']);
            }
            DB::commit();
            return true;
        } catch (OutOfStockException $e) {
            $class::$errors = $e->getMessage();
            return false;
        } catch (Exception $e) {
            Log::error("Falha ao cadastrar transação: " . $e->getMessage());
            return false;
        }
    }

    public static function delete(ProductTransactionModel $transaction): ?bool
    {
        try {
            if ($transaction->user_id !== (int)Auth::user()->id) {
                throw new Exception("Transação não pertencente ao usuário!");
            }

            DB::beginTransaction();
            $transaction->products()->detach();
            $result = $transaction->delete();
            DB::commit();

            return $result;
        } catch (Throwable $e) {
            Log::error("Falha ao remover transação: " . $e->getMessage());
            return false;
        }
    }
}
