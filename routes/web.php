<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\PinataController;
use Illuminate\Support\Facades\Route;

//Inicios
Route::get('/', [DashboardController::class, 'index'])->name('home');
Route::get('/dashboard', function () {
    return redirect('/');
})->name('dashboard');

//nosotros
Route::get('/nosotros', [NosotrosController::class, 'index'])->name('nosotros');

//preguntas
Route::get('/preguntas-frecuentes', [DashboardController::class, 'preguntas'])->name('preguntas');

//contacto
Route::get('/contacto', [DashboardController::class, 'contacto'])->name('contacto');

//mis-favoritos
Route::get('/mis-favoritos', [DashboardController::class, 'favoritos'])->middleware('auth')->name('favoritos');

//pinatas
Route::prefix('pinatas')->group(function () {
    Route::get('/', [PinataController::class, 'index'])->name('show.pinatas');

    Route::post('/favorites', [FavoriteController::class, 'store'])->middleware(['auth'])->name('favorite.store');

    Route::delete('/favorites/{pinata_id}', [FavoriteController::class, 'destroy'])->middleware(['auth'])->name('favorite.destroy');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
