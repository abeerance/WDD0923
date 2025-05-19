<?php

use App\Controllers\ArticlesController;
use App\Controllers\AuthController;
use App\Controllers\CommentsController;
use App\Controllers\TagsController;
use App\Controllers\UploadsController;
use App\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Guest endpoints
Route::post('/user', [UserController::class, 'create']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/articles', [ArticlesController::class, 'index']);
Route::get('/comments', [CommentsController::class, 'index']); // Fetch comments (supports filtering)
Route::get('/tags', [TagsController::class, 'index']);
Route::get('/uploads', [UploadsController::class, 'index']);

// User endpoints (protected)
Route::middleware(['auth:sanctum'])->group(function () {
    // User routes
    Route::get('/user/me', [UserController::class, 'show']);
    Route::patch('/user', [UserController::class, 'update']);
    Route::delete('/user', [UserController::class, 'destroy']);

    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Article routes
    Route::post('/articles', [ArticlesController::class, 'create']);
    Route::patch('/articles/{id}', [ArticlesController::class, 'update']);
    Route::delete('/articles/{id}', [ArticlesController::class, 'destroy']);

    // Comment routes
    Route::post('/comments', [CommentsController::class, 'create']);
    Route::patch('/comments/{id}', [CommentsController::class, 'update']); // Update comment by ID
    Route::delete('/comments/{id}', [CommentsController::class, 'destroy']); // Delete comment by ID

    // Tag routes
    Route::put('/articles/{id}/tags', [TagsController::class, 'assign']); // Assign tags to an article

    // Upload routes
    Route::post('/uploads', [UploadsController::class, 'create']);
    Route::delete('/uploads/{id}', [UploadsController::class, 'destroy']);
});
