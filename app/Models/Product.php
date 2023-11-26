<?php

namespace App\Models;

use App\Models\ProductTransaction\Purchase;
use App\Models\ProductTransaction\Selling;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @property string $id
 * @property string $description
 * @property double $buy_value
 * @property double $sell_value
 * @property string $picture
 * @property string $picture_link
 * @property int $stock
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Collection<Purchase> $purchases
 * @property Collection<Selling> $sellings
 * @property int $user_id
 */
class Product extends Model
{
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'buy_value',
        'sell_value',
        'picture',
        'stock',
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $appends = [
        'picture_link'
    ];

    protected $casts = [
        'user_id' => 'int'
    ];

    public function getPictureLinkAttribute(): string
    {
        return Storage::disk('products')->url($this->picture);
    }

    public function storePicture(UploadedFile $file): string
    {
        if (!Storage::disk('products')->exists($this->id)) {
            Storage::disk('products')->makeDirectory($this->id);
        }

        $this->removeOldPicture();
        $path = Storage::disk('products')->putFileAs(
            $this->id,
            $file,
            Str::uuid() . '.' . $file->extension(),
        );
        $this->picture = $path;
        $this->save();

        return $path;
    }

    public function removeOldPicture(): void
    {
        if (!$this->picture) {
            return;
        }

        if (!Storage::disk('products')->exists($this->id . "/" . $this->picture)) {
            return;
        }

        Storage::disk('products')->delete($this->id . "/" . $this->picture);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function purchases(): BelongsToMany
    {
        return $this->belongsToMany(Purchase::class, 'purchase_products', 'product_id', 'purchase_id');
    }

    public function sellings(): BelongsToMany
    {
        return $this->belongsToMany(Selling::class, 'selling_products', 'product_id', 'selling_id');
    }

    public function hasPurchases(): bool
    {
        return DB::table('purchase_products')->where('product_id', $this->id)->count() > 0;
    }

    public function hasSellings(): bool
    {
        return DB::table('selling_products')->where('product_id', $this->id)->count() > 0;
    }
}
