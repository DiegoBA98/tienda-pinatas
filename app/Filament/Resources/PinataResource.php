<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PinataResource\Pages;
use App\Filament\Resources\PinataResource\RelationManagers;
use App\Models\Pinata;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PinataResource extends Resource
{
    protected static ?string $model = Pinata::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = "Administrar Piñatas";

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Datos piñata')
                    ->schema([
                        Forms\Components\TextInput::make('nombre')
                            ->required()
                            ->helperText('Introduce el nombre de la piñata.')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('descripcion')
                            ->required()
                            ->helperText('Proporciona una descripción breve de la piñata.'),
                        Forms\Components\Toggle::make('entrega_inmediata')
                            ->required()
                ])->columns(2),
                Forms\Components\Section::make('Tags y categoria')
                    ->schema([
                        Forms\Components\TextInput::make('tags')
                            ->required()
                            ->helperText('Ingresar los tags de la piñata separados por comas y sin espacios')
                            ->afterStateHydrated(function (callable $set, $state) {
                                if (is_string($state)) {
                                    $set('tags', explode(',', $state));
                                }
                            })
                            ->beforeSave(function ($state) {
                                if (is_array($state)) {
                                    return implode(',', $state);
                                }
                                return $state;
                            }),

                        Forms\Components\Select::make('category_id')
                            ->label('Categoria')
                            ->relationship('category', 'nombre')
                            ->required(),
                ])->columns(2),
                Forms\Components\Section::make('Imagen y precio')
                    ->schema([
                        Forms\Components\FileUpload::make('imagen')
                            ->openable()
                            ->image()
                            ->disk('public')
                            ->directory('img/pinatas')
                            ->visibility('public')
                            ->optimize('webp')
                            ->resize(50),
                        Forms\Components\TextInput::make('precio')
                            ->prefix('$ ')
                            ->numeric()
                            ->minValue(1),
                ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nombre')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.nombre')
                    ->label('Categoria'),
                Tables\Columns\TextColumn::make('tags')
                    ->label('Tags')
                    ->wrap()
                    ->badge()
                    ->width('5%')
                    ->getStateUsing(fn ($record) => $record->tags)
                    ->searchable(),
                Tables\Columns\ImageColumn::make('imagen')
                    ->width(65)
                    ->height(100),
                Tables\Columns\TextColumn::make('precio')
                    ->prefix('$ ')
                    ->numeric(decimalPlaces: 2, locale: 'en')
                    ->sortable(),
                Tables\Columns\ToggleColumn::make('entrega_inmediata'),
            ])
            ->filters([
                SelectFilter::make('entrega_inmediata')
                    ->options([
                        '1' => 'Si',
                        '0' => 'No',
                    ]),
                SelectFilter::make('category_id')
                    ->label('Categoria')
                    ->relationship('category', 'nombre')
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    // Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPinatas::route('/'),
            'create' => Pages\CreatePinata::route('/create'),
            'edit' => Pages\EditPinata::route('/{record}/edit'),
        ];
    }
}
