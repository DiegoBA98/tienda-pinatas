<?php

namespace App\Filament\Resources\PinataResource\Pages;

use App\Filament\Resources\PinataResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPinatas extends ListRecords
{
    protected static string $resource = PinataResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
