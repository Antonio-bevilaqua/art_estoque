<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTransaction\Purchase;
use App\Models\ProductTransaction\Selling;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class DashboardController extends Controller
{

    public function index(): Response
    {
        $user_id = Auth::user()->id;
        $produtosComBaixoEstoque = Product::where('user_id', $user_id)->orderBy('stock', 'ASC')->orderBy('created_at', 'ASC')->limit(5)->get();
        $ultimasVendas = Selling::where('user_id', $user_id)->with('products')->orderBy('date', 'DESC')->limit(5)->get();
        $ultimasCompras = Purchase::where('user_id', $user_id)->with('products')->orderBy('date', 'DESC')->limit(5)->get();

        return $this->inertiaRender('Dashboard/Dashboard', [
            'vendas' => $ultimasVendas,
            'compras' => $ultimasCompras,
            'produtos' => $produtosComBaixoEstoque,
        ]);
    }
}
