// src/actions/update-blog/update-blog-action.ts

"use server";

// Import authentication utilities and API fetching functions
import { auth } from "@/auth";
import { fetchApi } from "@/utils/fetch/backend-fetch";

/**
 * Interface defining the structure of blog update data
 * This matches the validated form data from the frontend
 */
interface UpdateBlogData {
  id: number; // Blog post ID to update
  title: string; // Blog post title (1-255 characters)
  lead: string; // Blog post summary/lead paragraph (1-500 characters)
  content: {
    // Tiptap editor content in JSON format
    type: "doc"; // Always "doc" for Tiptap document root
    content?: Record<string, unknown>[]; // Array of content nodes (paragraphs, headings, etc.)
  };
  tags: string[]; // Array of selected category tags
  image_id?: number; // Optional ID of uploaded cover image
}

/**
 * Interface defining the response structure from the blog update action
 * Provides consistent error handling and success states
 */
interface UpdateBlogResult {
  success: boolean; // Indicates if the operation completed successfully
  error?: string; // Error message if operation failed
  data?: Record<string, unknown>; // Optional response data from the API
}

/**
 * Server action to update an existing blog article
 *
 * This function handles the complete blog update process:
 * 1. Authenticates the user session
 * 2. Sends updated blog data to the backend API
 * 3. Returns standardized success/error response
 *
 * @param formData - Validated blog update data from the frontend form
 * @returns Promise resolving to UpdateBlogResult with success status and optional error/data
 */
export async function updateBlogAction(formData: UpdateBlogData): Promise<UpdateBlogResult> {
  try {
    // Retrieve the current user session to verify authentication
    // This ensures only logged-in users can update blog posts
    const session = await auth();

    // Check if user is properly authenticated with valid session and access token
    if (!session?.user?.id || !session?.accessToken) {
      return {
        success: false,
        error: "You must be logged in to update a blog article",
      };
    }

    // Extract the blog ID from form data and prepare update data
    const { id, ...updateData } = formData;

    // Make API call to update the blog article
    // Uses the backend API endpoint with proper authentication headers
    const result = await fetchApi<Record<string, unknown>>(`articles/${id}`, {
      method: "PATCH", // HTTP PATCH method for updating existing resources
      headers: {
        "Content-Type": "application/json", // Specify JSON payload format
        Authorization: `Bearer ${session.accessToken}`, // Include user's access token for authentication
      },
      body: JSON.stringify(updateData), // Convert update data to JSON string for transmission
    });

    // Check if the API returned an error response
    if (result.error) {
      return {
        success: false,
        error: result.error, // Pass through the specific error message from the API
      };
    }

    // Return success response with optional data from the API
    return {
      success: true,
      data: result.data || undefined, // Include API response data if available
    };
  } catch (error) {
    // Log unexpected errors for debugging purposes
    // This catches network errors, JSON parsing errors, or other runtime exceptions
    console.error("Update blog action error:", error);

    // Return generic error message to avoid exposing internal error details
    return {
      success: false,
      error: "An unexpected error occurred while updating the blog article",
    };
  }
}
