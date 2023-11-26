<?php

namespace App\Services\Search\Field;

class Field
{
    public string $requestAttribute;

    public string $modelAttribute;
    public string $operator;

    public function __construct(string $requestAttribute, string $operator = "=", string $modelAttribute = null)
    {
        $this->requestAttribute = $requestAttribute;
        $this->modelAttribute = $modelAttribute ?? $requestAttribute;
        $this->operator = $operator;
    }
}
