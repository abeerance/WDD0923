/**
 * Standard response structure for API calls
 * @template T The expected data type to be returned from the API
 * @property {T | null} data - The successful response data, typed as T or null if request failed
 * @property {string | null} error - Error message if request failed, null if successful
 * @property {number} statusCode - HTTP status code from the response (or 0 for network errors)
 */

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  statusCode: number;
}

/**
 * Reusable backend fetch utility with consistent error handling
 *
 * This function provides a standardized way to make API requests with proper
 * error handling and type safety. It follows the pattern of returning a consistent
 * response structure regardless of success or failure.
 *
 * @template T The expected data type to be returned from the API
 * @param {string} endpoint - The API endpoint to call (will be appended to baseUrl)
 * @param {RequestInit} options - Standard fetch options (method, headers, body, etc.)
 * @returns {Promise<ApiResponse<T>>} A promise that resolves to a standardized response object
 *
 * @example
 * Basic GET request
 * const users = await fetchApi<User[]>('api/users');
 * if (users.error) {
 *   console.error(users.error);
 * } else {
 *   Use users.data safely, TypeScript knows it's User[] | null
 * }
 *
 * @example
 * POST request with body
 * const result = await fetchApi<{success: boolean}>('api/comments', {
 *   method: 'POST',
 *   body: JSON.stringify({ text: 'Great post!' })
 * });
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Define the base URL for all API calls
  const baseUrl = process.env.BACKEND_URL;

  // Construct the full URL by combining base URL with the endpoint
  const url = `${baseUrl}/${endpoint}`;

  try {
    // Attempt to make the network request
    // We merge the provided options with some sensible defaults
    const response = await fetch(url, {
      method: "GET", // Default to GET if not specified
      headers: {
        "Content-Type": "application/json", // Default content type
      },
      ...options, // Spread operator allows overriding defaults
    });

    // Extract the HTTP status code from the response
    const statusCode = response.status;

    // Check if the response status indicates failure (not in the 200-299 range)
    if (!response.ok) {
      // Return a standardized error response
      return {
        data: null, // No data on error
        error: `Request failed with status ${statusCode}`, // Human-readable error
        statusCode, // Include the status code for more specific error handling
      };
    }

    // Parse the JSON response
    // Type assertion to T ensures type safety with the generic parameter
    const data = (await response.json()) as T;

    // Return a successful response
    return {
      data, // Typed data from the API
      error: null, // No error on success
      statusCode, // Include status code (usually 200 OK)
    };
  } catch (error) {
    // Handle any exceptions during the fetch operation
    // These are typically network errors or JSON parsing errors
    return {
      data: null, // No data when an exception occurs
      // Convert Error objects to strings, or handle unknown error types
      error: error instanceof Error ? error.message : "Unknown error occurred",
      statusCode: 0, // Use 0 to indicate a client-side/network error
    };
  }
}
