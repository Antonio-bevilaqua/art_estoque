<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTransaction\Purchase;
use App\Models\ProductTransaction\Selling;
use App\Services\ProductTransactions\Sellings\Search\SellingsSearch;
use App\Services\ProductTransactions\Sellings\Store\SellingsManager;
use App\Services\ProductTransactions\Store\Requests\ProductTransactionRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class SellingsController extends Controller
{
    public function list(Request $request, SellingsSearch $sellingsSearch): Response
    {
        $searchBuild = $sellingsSearch->build($request);
        $sellings = $searchBuild->orderBy('date', 'desc')->paginate(10);
        $products = Product::where('user_id', Auth::user()->id)->get();

        return $this->inertiaRender('Sellings/List/SellingsList', [
            'products' => $products,
            'sellings' => $sellings,
            'request' => $request->all()
        ]);
    }

    public function new(): Response
    {
        $products = Product::where('user_id', Auth::user()->id)->get();
        return $this->inertiaRender('Sellings/Register/SellingsRegister', [
            'products' => $products,
        ]);
    }

    public function edit(Selling $selling): Response
    {
        $products = Product::where('user_id', Auth::user()->id)->get();
        return $this->inertiaRender('Sellings/Edit/SellingsEdit', [
            'selling' => $selling,
            'products' => $products,
        ]);
    }

    public function save(ProductTransactionRequest $request): RedirectResponse
    {
        if (SellingsManager::storeNew($request)) {
            return $this->returnSuccess(route('sellings.list'), 'Venda cadastrada com sucesso!');
        }

        return $this->returnErrors(route('sellings.new'), SellingsManager::$errors);
    }

    public function update(Selling $selling, ProductTransactionRequest $request): RedirectResponse
    {
        if (SellingsManager::store($request, $selling)) {
            return $this->returnSuccess(route('sellings.list'), 'Venda atualizada com sucesso!');
        }

        return $this->returnErrors(route('sellings.edit', ['selling' => $selling->id]), SellingsManager::$errors);
    }

    public function delete(Selling $selling): RedirectResponse
    {
        if (SellingsManager::delete($selling)) {
            return $this->returnSuccess(route('sellings.list'), 'Venda removida com sucesso!');
        }

        return $this->returnErrors(route('sellings.list'), SellingsManager::$errors);
    }
}
