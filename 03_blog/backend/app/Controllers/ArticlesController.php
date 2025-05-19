<?php

namespace App\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ArticlesController
{
    // Retrieve articles with optional filtering
    public function index(Request $request)
    {
        $query = Article::with(['tags', 'coverImage']);

        // Apply filters
        $query->when($request->filled('id'), fn($q) => $q->where('id', $request->input('id')));
        $query->when($request->filled('title'), fn($q) => $q->where('title', 'like', '%' . $request->input('title') . '%'));
        $query->when($request->filled('user_id'), fn($q) => $q->where('user_id', $request->input('user_id')));
        $query->when($request->filled('tag_ids'), function ($q) use ($request) {
            $tagIds = explode(',', $request->input('tag_ids'));
            $q->whereHas('tags', fn($q) => $q->whereIn('tag_id', $tagIds), '>=', count($tagIds));
        });

        // Apply ordering
        $query->orderBy(
            $request->input('order_by', 'created_at'),
            $request->input('order_dir', 'asc')
        );

        // Apply pagination
        return $query->paginate(
            $request->input('limit', 10),
            ['*'],
            'page',
            $request->input('page', 1)
        );
    }

    // Create a new article
    public function create(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|array',
            'image_id' => 'nullable|integer|exists:images,id',
        ]);

        // Convert content to JSON
        $validatedData['content'] = json_encode($validatedData['content']);

        // Check image ownership if image_id is provided
        if (isset($validatedData['image_id']) && !$this->ownsImage($validatedData['image_id'])) {
            throw ValidationException::withMessages(['image_id' => 'You do not have permission to use this cover image.']);
        }

        // Generate the slug with date prefix
        $slug = $this->generateDateSlug($validatedData['title']);
        $validatedData['slug'] = $slug;

        // Create the article
        $article = Auth::user()->articles()->create($validatedData);

        return response()->json(['article' => $article], 201);
    }

    // Update an existing article
    public function update(Request $request, $id)
    {
        $article = Auth::user()->articles()->findOrFail($id);

        // Validate request data
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|array',
            'image_id' => 'nullable|integer|exists:images,id',
        ]);

        // Convert content to JSON if provided
        if (isset($validatedData['content'])) {
            $validatedData['content'] = json_encode($validatedData['content']);
        }

        // Check image ownership if image_id is provided
        if (isset($validatedData['image_id']) && !$this->ownsImage($validatedData['image_id'])) {
            throw ValidationException::withMessages(['image_id' => 'You do not have permission to use this cover image.']);
        }

        // Update the slug if title is changed
        if (isset($validatedData['title'])) {
            $validatedData['slug'] = $this->generateDateSlug($validatedData['title']);
        }

        // Update the article
        $article->update($validatedData);

        return response()->json(['article' => $article], 200);
    }


    // Delete an article
    public function destroy($id)
    {
        $article = Auth::user()->articles()->findOrFail($id);
        $article->delete();

        return response()->json(['message' => 'Article deleted successfully'], 200);
    }

    // Helper function to check if the user owns the image
    private function ownsImage(int $imageId): bool
    {
        return Auth::user()->images()->where('id', $imageId)->exists();
    }

    /**
     * Generate a slug with the current date as prefix
     *
     * @param string $title
     * @return string
     */
    private function generateDateSlug(string $title): string
    {
        // Format current date as YYYY-MM-DD
        $datePrefix = date('Y-m-d');

        // Generate slug from title
        $titleSlug = Str::slug($title);

        // Combine with date prefix
        return $datePrefix . '/' . $titleSlug;
    }
}
