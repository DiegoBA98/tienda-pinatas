<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Pinata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $pinatasInmediatas = Pinata::where('entrega_inmediata', 1)
            ->orderBy('created_at', 'DESC')
            ->take(8)
            ->get();
        $pinatasNoInmediatas = Pinata::where('entrega_inmediata', 0)
            ->orderBy('created_at', 'DESC')
            ->take(8)
            ->get();

        $user = Auth::user();

        if ($user) {
            $pinatasInmediatas->transform(function ($piñata) use ($user) {
                $piñata->is_favorite = Favorite::where('user_id', $user->id)
                                                ->where('pinata_id', $piñata->id)
                                                ->exists();
                return $piñata;
            });
            $pinatasNoInmediatas->transform(function ($piñata) use ($user) {
                $piñata->is_favorite = Favorite::where('user_id', $user->id)
                                                ->where('pinata_id', $piñata->id)
                                                ->exists();
                return $piñata;
            });
        }

        return Inertia::render('dashboard',[
            'pinatasInmediatas' => $pinatasInmediatas,
            'pinatasNoInmediatas' => $pinatasNoInmediatas
        ]);
    }

    public function preguntas()
    {
        return Inertia::render('preguntas/preguntas');
    }

    public function contacto()
    {
        return Inertia::render('contacto/contacto');
    }

    public function favoritos()
    {
        $user = Auth::user();

        $favoritos = $user->pinatasFavoritas()->paginate(8);

        $favoritos->getCollection()->transform(function ($piñata) use ($user) {
                $piñata->is_favorite = Favorite::where('user_id', $user->id)
                                                ->where('pinata_id', $piñata->id)
                                                ->exists();
                return $piñata;
            });

        return Inertia::render('favoritos/favoritos', [
            'pinatas' => $favoritos,
        ]);
    }
}
