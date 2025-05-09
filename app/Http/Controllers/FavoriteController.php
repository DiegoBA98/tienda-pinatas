<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();

        $pinataId = $request->pinata_id;

        Favorite::create([
            'user_id' => $user->id,
            'pinata_id' => $pinataId,
        ]);

    }

    public function destroy($pinata_id)
    {
        $user = Auth::user();

        $favorite = Favorite::where('user_id', $user->id)->where('pinata_id', $pinata_id)->first();

        $favorite->delete();
    }
}
