<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTransaction\Purchase;
use App\Services\ProductTransactions\Purchases\Search\PurchasesSearch;
use App\Services\ProductTransactions\Purchases\Store\PurchaseManager;
use App\Services\ProductTransactions\Store\Requests\ProductTransactionRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class PurchasesController extends Controller
{
    public function list(Request $request, PurchasesSearch $purchasesSearch): Response
    {
        $searchBuild = $purchasesSearch->build($request);
        $purchases = $searchBuild->orderBy('date', 'desc')->paginate(10);
        $products = Product::where('user_id', Auth::user()->id)->get();

        return $this->inertiaRender('Purchases/List/PurchasesList', [
            'products' => $products,
            'purchases' => $purchases,
            'request' => $request->all()
        ]);
    }

    public function new(): Response
    {
        $products = Product::where('user_id', Auth::user()->id)->get();
        return $this->inertiaRender('Purchases/Register/PurchasesRegister', [
            'products' => $products,
        ]);
    }

    public function edit(Purchase $purchase): Response
    {
        $products = Product::where('user_id', Auth::user()->id)->get();
        return $this->inertiaRender('Purchases/Edit/PurchasesEdit', [
            'purchase' => $purchase,
            'products' => $products,
        ]);
    }

    public function save(ProductTransactionRequest $request): RedirectResponse
    {
        if (PurchaseManager::storeNew($request)) {
            return $this->returnSuccess(route('purchases.list'), 'Compra cadastrada com sucesso!');
        }

        return $this->returnErrors(route('purchases.new'), PurchaseManager::$errors);
    }

    public function update(Purchase $purchase, ProductTransactionRequest $request): RedirectResponse
    {
        if (PurchaseManager::store($request, $purchase)) {
            return $this->returnSuccess(route('purchases.list'), 'Compra atualizada com sucesso!');
        }

        return $this->returnErrors(route('purchases.edit', ['purchase' => $purchase->id]), PurchaseManager::$errors);
    }

    public function delete(Purchase $purchase): RedirectResponse
    {
        if (PurchaseManager::delete($purchase)) {
            return $this->returnSuccess(route('purchases.list'), 'Compra removida com sucesso!');
        }

        return $this->returnErrors(route('purchases.list'), PurchaseManager::$errors);
    }
}
