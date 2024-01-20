<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\LinesController;
use App\Http\Controllers\StopVehicleController;
use App\Http\Controllers\VehicleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StopsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// auth
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

// samo za ulogovane korisnike
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function () {
        return auth()->user();
    });
    Route::get('/logout', [LogoutController::class, 'logout']);

    Route::group(['prefix' => 'stop'], function () {
        Route::get('/', [StopsController::class, 'index']);
        Route::get('/{stop}', [StopsController::class, 'show']);
        Route::get('/{stop}/lines', [StopsController::class, 'lines']);

        Route::get('/{stop}/vehicles', [StopVehicleController::class, 'vehicles']);
    });

    Route::group(['prefix' => 'line'], function () {
        Route::get('/', [LinesController::class, 'index']);
        Route::get('/{line}', [LinesController::class, 'show']);
        Route::get('/{line},{smer}/stops', [LinesController::class, 'stops']);
        Route::get('/{line},{smer}/vehicles', [LinesController::class, 'vehicles']);
    });

    // search rute
    Route::group(['prefix' => 'search'], function () {
        Route::get('/stop/{naziv}', [StopsController::class, 'search']);
        Route::get('/line/{naziv}', [LinesController::class, 'search']);
    });


    // crud rute samo za usere koji su admin
    Route::group(['middleware' => 'role:admin'], function () {
        Route::apiResource('/vehicle', VehicleController::class);

        Route::post('stop', [StopsController::class, 'store']);
        Route::patch('line/{line}', [LinesController::class, 'patch_line']);
    });

});





