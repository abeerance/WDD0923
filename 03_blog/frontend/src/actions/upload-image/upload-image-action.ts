"use server";

import { auth } from "@/auth";

interface UploadedImage {
  id: number;
  name: string;
  url: string;
}

interface UploadResponse {
  success: boolean;
  image?: UploadedImage;
  error?: string;
}

export async function uploadImageAction(formData: FormData): Promise<UploadResponse> {
  try {
    const user = await auth();
    const token = user?.accessToken;

    if (!token) {
      return {
        success: false,
        error: "No token provided",
      };
    }

    // Create new FormData to ensure proper array structure
    const serverFormData = new FormData();

    // Get the file from the client FormData
    const file = formData.get("files") as File;
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;

    // Change this line - use "files[]" instead of just "files"
    serverFormData.append("files[]", file);
    serverFormData.append("type", type);
    serverFormData.append("title", title); // This will be used for alt_text

    const response = await fetch("http://127.0.0.1:8000/api/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: serverFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Upload failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    // Laravel returns { images: [...] } - get first image
    const image = data.images[0];

    return {
      success: true,
      image: {
        id: image.id,
        name: image.name, // Use 'name' instead of 'alt_text'
        url: image.url,
      },
    };
  } catch (error) {
    console.error("Server action: Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
