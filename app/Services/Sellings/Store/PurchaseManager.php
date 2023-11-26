<?php

namespace App\Services\Purchases\Store;

use App\Models\ProductTransaction\Purchase;
use App\Services\ProductTransactions\Purchases\Store\Requests\PurchaseStoreRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class PurchaseManager
{

    public static function storeNew(PurchaseStoreRequest $request): bool
    {
        $purchase = new Purchase();
        $purchase->id = (string)Str::orderedUuid();
        $purchase->user_id = Auth::user()->id;
        return self::store($request, $purchase, true);
    }

    public static function store(PurchaseStoreRequest $request, Purchase $purchase, bool $new = false): bool
    {
        $data = $request->validated();
        try {
            if ($purchase->user_id !== (int)Auth::user()->id) {
                throw new Exception("Compra não pertencente ao usuário!");
            }
            DB::beginTransaction();
            if (!$new) {
                $purchase->products()->detach();
            }

            $purchase->fill($data);
            $purchase->save();

            foreach ($data['products'] as $product) {
                $purchase->products()->attach($product);
            }
            DB::commit();
            return true;
        } catch (Throwable $e) {
            Log::error("Falha ao cadastrar compra: " . $e->getMessage());
            return false;
        }
    }

    public static function delete(Purchase $purchase): ?bool
    {
        try {
            if ($purchase->user_id !== (int)Auth::user()->id) {
                throw new Exception("Compra não pertencente ao usuário!");
            }

            DB::beginTransaction();
            $purchase->products()->detach();
            $result = $purchase->delete();
            DB::commit();

            return $result;
        } catch (Throwable $e) {
            Log::error("Falha ao remover compra: " . $e->getMessage());
            return false;
        }
    }
}
