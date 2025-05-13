<?php

namespace App\Filament\Resources\PinataResource\Pages;

use App\Filament\Resources\PinataResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePinata extends CreateRecord
{
    protected static string $resource = PinataResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
