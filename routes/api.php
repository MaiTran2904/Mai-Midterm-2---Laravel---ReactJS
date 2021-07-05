<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/* Api Register */
Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return Response()->json(array("token"=>$token));
});
Route::resource('/users', UsersController::class);
Route::post('/login', [UsersController::class, 'getLogin']);
Route::post('/register', [UsersController::class, 'getRegister']);
Route::post('/forgot', [UsersController::class, 'getForgot']);