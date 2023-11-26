<?php

namespace App\Services\Search;

use App\Services\Search\Field\Field;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

abstract class SearchBuilder
{
    protected array $data;

    public function build(Request $request): Builder
    {
        return $this->getBuilder($request);
    }

    protected function getField(Request $request, string $key): mixed
    {
        if (!$request->exists($key) || empty($request->{$key})) {
            return null;
        }

        return $request->{$key};
    }


    protected function filterTableFields(Request $request, Builder $query): Builder
    {
        $fields = $this->getFields();
        /**
         * @var Field $field
         */
        foreach ($fields as $field) {
            $value = $this->getField($request, $field->requestAttribute);
            if ($value === null) continue;

            $pads = strtoupper($field->operator) === "LIKE" ? "%" : "";
            $query->where($field->modelAttribute, $field->operator, $pads . $value . $pads);
        }

        return $query;
    }

    abstract protected function getFields(): Collection;

    abstract protected function getBuilder(Request $request): Builder;
}
