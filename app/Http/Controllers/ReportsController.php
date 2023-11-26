<?php

namespace App\Http\Controllers;

use App\Services\Reports\EarningsReport\EarningsReport;
use App\Services\Reports\Requests\ReportRequest;
use App\Services\Reports\SingleTypeReport\PurchasesReport\PurchasesReport;
use App\Services\Reports\SingleTypeReport\SallingsReport\SallingsReport;
use Inertia\Response;

class ReportsController extends Controller
{
    public function sales(): Response
    {
        return $this->inertiaRender('Reports/Sales/GenerateSalesReport');
    }

    public function generateSales(ReportRequest $request, SallingsReport $sallingsReport): Response
    {
        $sallings = $sallingsReport->get($request);

        return $this->inertiaRender('Reports/Sales/Generated/GeneratedReport', [
            'sales' => $sallings,
            'request' => $request->all()
        ]);
    }

    public function purchases(): Response
    {
        return $this->inertiaRender('Reports/Purchases/GeneratePurchasesReport');
    }

    public function generatePurchases(ReportRequest $request, PurchasesReport $purchasesReport): Response
    {
        $purchases = $purchasesReport->get($request);

        return $this->inertiaRender('Reports/Purchases/Generated/GeneratedReport', [
            'purchases' => $purchases,
            'request' => $request->all()
        ]);
    }

    public function earnings(): Response
    {
        return $this->inertiaRender('Reports/Earnings/GenerateEarningsReport');
    }

    public function generateEarnings(ReportRequest $request, EarningsReport $earningsReport): Response
    {
        $earnings = $earningsReport->get($request);

        return $this->inertiaRender('Reports/Earnings/Generated/GeneratedReport', [
            'earnings' => $earnings,
            'request' => $request->all()
        ]);
    }
}
