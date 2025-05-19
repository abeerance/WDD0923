<?php

namespace App\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TagsController
{
    // Fetch all tags
    public function index(Request $request)
    {
        return response()->json(Tag::all(), 200);
    }


    // Assign tags to an article (using the article ID from the URL)
    public function assign(Request $request, int $id)
    {
        // Validate request payload (only tag IDs now)
        $validatedData = $request->validate([
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'integer|exists:tags,id',
        ]);

        try {
            // Find the article owned by the authenticated user using the ID from the URL
            $article = Auth::user()->articles()->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            // Return a custom error response if the article is not found or not owned by the user
            throw new HttpException(403, 'You are not allowed to edit this article.');
        }

        // Assign tags to the article (syncing removes any existing tags not in the list)
        $article->tags()->sync($validatedData['tag_ids']);

        return response()->json(['article' => $article->fresh('tags')], 200);
    }
}
