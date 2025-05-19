<?php

namespace App\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentsController
{
    // Fetch comments with optional filtering by user_id and article_id
    public function index(Request $request)
    {
        $query = Comment::with(['user', 'article']); // Eager load user and article relationships

        // Filter by user_id
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }

        // Filter by article_id
        if ($request->filled('article_id')) {
            $query->where('article_id', $request->input('article_id'));
        }

        // Order by created_at in descending order
        $query->orderBy('created_at', 'desc');

        // Return paginated results
        return $query->paginate($request->input('limit', 10));
    }

    // Create a new comment
    public function create(Request $request)
    {
        // Validate request payload
        $validatedData = $request->validate([
            'content' => 'required|string|max:500',
            'article_id' => 'required|integer|exists:articles,id',
        ]);

        // Create and return the new comment
        $comment = Auth::user()->comments()->create($validatedData);

        return response()->json(['comment' => $comment], 201);
    }

    // Update an existing comment
    public function update(Request $request, $id)
    {
        $comment = Auth::user()->comments()->findOrFail($id);

        // Validate request payload
        $validatedData = $request->validate([
            'content' => 'sometimes|string|max:500',
        ]);

        // Update the comment with the validated data
        $comment->update($validatedData);

        return response()->json(['comment' => $comment], 200);
    }

    // Delete a comment
    public function destroy($id)
    {
        $comment = Auth::user()->comments()->findOrFail($id);

        // Delete the comment
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
