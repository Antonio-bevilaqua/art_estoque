<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\Products\Search\ProductsSearch;
use App\Services\Products\Store\ProductManager;
use App\Services\Products\Store\Requests\ProductStoreRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ProductsController extends Controller
{
    public function list(Request $request, ProductsSearch $productsSearch): Response
    {
        $searchBuild = $productsSearch->build($request);
        $products = $searchBuild->orderBy('created_at', 'desc')->paginate(10);

        return $this->inertiaRender('Products/List/ProductsList', [
            'products' => $products,
            'request' => $request->all()
        ]);
    }

    public function new(): Response
    {
        return $this->inertiaRender('Products/Register/ProductRegister');
    }

    public function edit(Product $produto): Response
    {
        return $this->inertiaRender('Products/Edit/ProductEdit', [
            'product' => $produto
        ]);
    }

    public function save(ProductStoreRequest $request): RedirectResponse
    {
        if (ProductManager::storeNew($request)) {
            return $this->returnSuccess(route('products.list'), 'Produto cadastrado com sucesso!');
        }

        return $this->returnErrors(route('products.new'), 'Falha no cadastro do produto, contate o suporte!');
    }

    public function update(Product $produto, ProductStoreRequest $request): RedirectResponse
    {
        if (ProductManager::store($request, $produto)) {
            return $this->returnSuccess(route('products.list'), 'Produto atualizado com sucesso!');
        }

        return $this->returnErrors(route('products.new'), 'Falha na atualização do produto, contate o suporte!');
    }

    public function delete(Product $produto): RedirectResponse
    {
        if ($produto->hasPurchases() || $produto->hasSellings()) {
            return $this->returnErrors(
                route('products.new'),
                'Você não pode remover este produto pois ele possui compras e/ou vendas atreladas a ele!'
            );
        }

        if (ProductManager::delete($produto)) {
            return $this->returnSuccess(route('products.list'), 'Produto removido com sucesso!');
        }

        return $this->returnErrors(route('products.new'), 'Falha na remoção do produto, contate o suporte!');
    }
}
