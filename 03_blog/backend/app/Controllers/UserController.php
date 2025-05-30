<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class UserController
{
    // Show the authenticated user's profile
    public function show(): ?User
    {
        /** @var User|null $user */
        $user = Auth::user();

        return $user;
    }

    // Get a specific user by ID (public endpoint for author info)
    public function index(Request $request)
    {
        $userId = $request->query('id');

        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Return only public user information (exclude sensitive data)
        return response()->json([
            'id' => $user->id,
            'username' => $user->username,
            'bio' => $user->bio,
            'avatar_id' => $user->avatar_id,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ]);
    }

    // Create a new user
    public function create(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'email' => 'required|email|unique:users,email',
            'username' => 'required|string|max:50|unique:users,username',
            'password' => 'required|string|min:8|confirmed',
            'bio' => 'nullable|string|max:500',
            'avatar_id' => 'nullable|integer|exists:images,id',
        ]);

        // Hash the password before storing it
        $validatedData['password'] = Hash::make($validatedData['password']);

        // Create and return the new user
        $user = User::create($validatedData);

        return response()->json(['user' => $user], 201);
    }

    // Update the authenticated user's profile
    public function update(Request $request)
    {
        $user = Auth::user();

        // Validate the incoming request data
        $validatedData = $request->validate([
            'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
            'username' => ['sometimes', 'string', 'max:50', Rule::unique('users')->ignore($user->id)],
            'password' => 'sometimes|string|min:8|confirmed',
            'bio' => 'nullable|string|max:500',
            'avatar_id' => 'nullable|integer|exists:images,id',
        ]);

        // Hash the password if it is provided
        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        // Update the user's profile
        $user->update($validatedData);

        return response()->json(['user' => $user], 200);
    }

    // Delete the authenticated user's account
    public function destroy()
    {
        $user = Auth::user();

        // Soft delete the user (if soft deletes are enabled)
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
