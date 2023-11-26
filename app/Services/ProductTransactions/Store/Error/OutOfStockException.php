<?php

namespace App\Services\ProductTransactions\Store\Error;

use Exception;

class OutOfStockException extends Exception
{
    public function __construct(string $productName)
    {
        parent::__construct("Ops... estoque insuficiente do produto ".$productName." para esta operação.");
    }

}
