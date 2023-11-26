<?php /** @noinspection ALL */

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\PurchasesController;
use App\Http\Controllers\SellingsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/inicio', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::prefix('perfil')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });


    Route::prefix('produtos')->group(function () {
        Route::get('/', [ProductsController::class, 'list'])->name('products.list');

        Route::post('/', [ProductsController::class, 'save'])->name('products.save');

        Route::get('/cadastrar', [ProductsController::class, 'new'])->name('products.new');

        Route::get('/{produto}', [ProductsController::class, 'edit'])->name('products.edit');

        Route::put('/{produto}', [ProductsController::class, 'update'])->name('products.update');

        Route::delete('/{produto}', [ProductsController::class, 'delete'])->name('products.delete');
    });

    Route::prefix('compras')->group(function () {
        Route::get('/', [PurchasesController::class, 'list'])->name('purchases.list');

        Route::post('/', [PurchasesController::class, 'save'])->name('purchases.save');

        Route::get('/cadastrar', [PurchasesController::class, 'new'])->name('purchases.new');

        Route::get('/{purchase}', [PurchasesController::class, 'edit'])->name('purchases.edit');

        Route::put('/{purchase}', [PurchasesController::class, 'update'])->name('purchases.update');

        Route::delete('/{purchase}', [PurchasesController::class, 'delete'])->name('purchases.delete');
    });

    Route::prefix('vendas')->group(function () {
        Route::get('/', [SellingsController::class, 'list'])->name('sellings.list');

        Route::post('/', [SellingsController::class, 'save'])->name('sellings.save');

        Route::get('/cadastrar', [SellingsController::class, 'new'])->name('sellings.new');

        Route::get('/{selling}', [SellingsController::class, 'edit'])->name('sellings.edit');

        Route::put('/{selling}', [SellingsController::class, 'update'])->name('sellings.update');

        Route::delete('/{selling}', [SellingsController::class, 'delete'])->name('sellings.delete');
    });

    Route::prefix('relatorios')->group(function () {
        Route::get('/vendas', [ReportsController::class, 'sales'])->name('report.sellings');

        Route::post('/vendas', [ReportsController::class, 'generateSales'])->name('report.sellings.generate');

        Route::get('/compras', [ReportsController::class, 'purchases'])->name('report.purchases');

        Route::post('/compras', [ReportsController::class, 'generatePurchases'])->name('report.purchases.generate');

        Route::get('/faturamento', [ReportsController::class, 'earnings'])->name('report.earnings');

        Route::post('/faturamento', [ReportsController::class, 'generateEarnings'])->name('report.earnings.generate');
    });
});

require __DIR__ . '/auth.php';
