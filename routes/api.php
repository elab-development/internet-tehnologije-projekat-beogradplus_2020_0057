<?php

use App\Http\Controllers\LinesController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix'=> '/user'], function () {
    Route::get('/stop', [StopsController::class, 'index']);
    Route::get('/stop/{stop}', [StopsController::class, 'show']);
    Route::get('/stop/{stop}/lines', [StopsController::class, 'lines']);
    Route::get('/stop/{stop}/vehicles', [StopsController::class, 'vehicles']);

    Route::get('/line', [LinesController::class, 'index']);
    Route::get('/line/{line}', [LinesController::class, 'show']);
    Route::get('/line/{line}/{smer}/stops', [LinesController::class, 'stops']);
    Route::get('/line/{line}/vehicles', [LinesController::class, 'vehicles']);
});

Route::group(['prefix'=> 'search'], function () {
    Route::get('/stop/{naziv}', [StopsController::class,'search']);
    Route::get('/line/{naziv}', [LinesController::class,'search']);
});

// samo za ulogovane korisnike
Route::group([
    'prefix'=> 'admin', 
    //'middleware'=> 'auth'
    ], function () {
    Route::apiResource('/vehicle', VehicleController::class);

    Route::post('stop', [StopsController::class, 'store']);
    Route::patch('line/{line}', [LinesController::class,'patch_line']);

});





