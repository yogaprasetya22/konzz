<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (Auth::check()) {
            if (Auth::user()->hasRole((int)$role)) {
                return $next($request);
            } else {
                switch (Auth::user()->role_id) {
                    case 1:
                        return redirect("/admin");
                        break;
                    case 2:
                        return redirect("/");
                        break;
                    case 3:
                        return redirect("/pendidikan");
                        break;
                    case 4:
                        return redirect("/lse");
                        break;
                    case 5:
                        return redirect("/lppm");
                        break;
                    case 6:
                        return redirect("/bkal");
                        break;
                    case 7:
                        return redirect("/perpus");
                        break;
                    case 8:
                        return redirect("/sdm");
                        break;
                    case 9:
                        return redirect("/tik");
                        break;
                    case 10:
                        return redirect("/pha");
                        break;
                    case 11:
                        return redirect("/kerjasama-humas-internasionalisasi");
                        break;
                    case 12:
                        return redirect("/bem");
                        break;
                    case 13:
                        return redirect("/rektor");
                        break;
                    default:
                        return redirect("/");
                        break;
                };
            };
        }
        return $next($request);
    }
}
