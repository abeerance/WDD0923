<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController
{
    // Login using username and password
    public function login(Request $request)
    {
        // Validate the request
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $username = $request->input('username');
        $password = $request->input('password');

        // Find the user by username
        $user = User::where('username', $username)->first();
        if (!$user) {
            return abort(404, 'No such user');
        }

        // Check if the password is correct
        if (!Hash::check($password, $user->password)) {
            return abort(401, 'Wrong password');
        }

        // Create a token for the user
        $token = $user->createToken('bearer');

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user,
        ], 200);
    }

    // Logout and revoke all tokens
    public function logout()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // Revoke all tokens for the authenticated user
        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
