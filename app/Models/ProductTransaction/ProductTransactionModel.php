<?php

namespace App\Models\ProductTransaction;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * @property string $id
 * @property float $discount
 * @property float $taxes
 * @property float $value
 * @property float $total_value
 * @property int $total_products
 * @property Carbon $date
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $formatted_date
 * @property string $date_only
 * @property int $user_id
 */
abstract class ProductTransactionModel extends Model
{
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'id',
        'discount',
        'taxes',
        'date',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'date'
    ];

    protected $appends = [
        'value',
        'total_value',
        'total_products',
        'formatted_date',
        'date_only'
    ];

    protected $with = [
        'products'
    ];

    protected $casts = [
        'user_id' => 'int'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getValueAttribute(): float
    {
        return $this->calculateValue();
    }

    public function getTotalValueAttribute(): float
    {
        return $this->calculateTotalValue();
    }

    public function getTotalProductsAttribute(): int
    {
        return $this->products()->count();
    }

    protected function calculateTotalValue(): float
    {
        return $this->value + $this->taxes - $this->discount;
    }

    abstract protected function calculateValue(): float;

    public function getFormattedDateAttribute(): string
    {
        return $this->date->format('d/m/Y');
    }

    public function getDateOnlyAttribute(): string
    {
        return $this->date->format('Y-m-d');
    }

    abstract public function products(): BelongsToMany;

    abstract public function hasProducts(): bool;
}
