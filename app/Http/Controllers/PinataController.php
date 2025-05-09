<?php
namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Favorite;
use App\Models\Pinata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PinataController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $categoryId = $request->input('category');
        $entregaInmediata = $request->input('entrega_inmediata');

        if ($entregaInmediata !== null) {
            $entregaInmediata = (int)$entregaInmediata;
        }

        // dd($entregaInmediata);
        $query = Pinata::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere(function ($q) use ($search) {
                        $q->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(tags, '$[*]')) LIKE ?", ["%{$search}%"]);
                    });
            });
        }

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }
        if ($entregaInmediata !== null) {
            $query->where('entrega_inmediata', $entregaInmediata);
        }

        $pinatas = $query->paginate(8);

        $categories = Category::all();

        $user = Auth::user();

        if ($user) {
            $pinatas->getCollection()->transform(function ($piñata) use ($user) {
                $piñata->is_favorite = Favorite::where('user_id', $user->id)
                                                ->where('pinata_id', $piñata->id)
                                                ->exists();
                return $piñata;
            });
        }

        return Inertia::render('pinatas/pinatas', [
            'pinatas' => $pinatas,
            'categories' => $categories,
            'search' => $search,
            'category' => $categoryId
        ]);
    }
}
