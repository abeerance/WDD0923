// src/components/edit-blog/edit-blog.tsx

"use client";

import { updateBlogAction } from "@/actions/update-blog/update-blog-action";
import { Button } from "@/components/ui/button/button";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { Input } from "@/components/ui/input/input";
import { Text } from "@/components/ui/text/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { uploadImageAction } from "@/actions/upload-image/upload-image-action";
import { Article } from "@/types/data";

// Predefined list of available tags for blog categorization
// Users can select multiple tags to categorize their blog posts
const AVAILABLE_TAGS = [
  "Adventure",
  "Beach",
  "Hiking",
  "Camping",
  "City Break",
  "Culture",
  "Food",
  "Luxury",
  "Backpacking",
  "Road Trip",
  "Photography",
  "Wildlife",
  "Mountains",
  "Desert",
  "Islands",
];

// Zod schema for form validation
// Defines the structure and validation rules for blog creation form
const updateBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"), // Blog title with length constraints
  lead: z.string().min(1, "Lead is required").max(500, "Lead too long"), // Blog lead/summary paragraph
  // Use a more flexible schema that matches Tiptap's JSONContent type
  content: z.record(z.unknown()), // Accept any valid JSON object structure from Tiptap
  tags: z.array(z.string()).min(1, "At least one tag is required"), // Array of selected tags
  image: z.instanceof(File).optional(), // Optional cover image file
});

// TypeScript type inference from Zod schema
// Ensures type safety for form data throughout the component
type UpdateBlogFormData = z.infer<typeof updateBlogSchema>;

// Interface defining the structure of uploaded image data returned from server
interface UploadedImage {
  id: number;
  name: string;
  url: string;
}

interface EditBlogProps {
  data: Article;
}

/**
 * Main component for updating blog posts
 * Handles form validation, rich text editing, tag selection, and submission
 */
export const EditBlog = ({ data }: EditBlogProps) => {
  const router = useRouter(); // Next.js router for navigation

  // Extract tag names from Tag objects
  // because we are getting the type Tag[] from the backend, we map through the existing tags and create a new variable, which is of type string[], so that our form validation and form submission can work with the correct types we provided
  const initialTagNames = data.tags?.map((tag) => tag.name) || [];

  // State for managing selected tags
  // Tracks which tags from AVAILABLE_TAGS are currently selected
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTagNames);

  // State for managing selected image file before upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // State for storing uploaded image data after successful upload
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  // State for tracking upload progress/loading state
  const [isUploading, setIsUploading] = useState(false);

  // Set existing image as "uploaded" image initially
  // this useEffect ensures, that we set the initial image in a side effect to have it then visible on the pageload
  useEffect(() => {
    if (data.cover_image?.url && data.cover_image?.id) {
      setUploadedImage({
        id: data.cover_image.id,
        name: data.cover_image.name || "Current image",
        url: data.cover_image.url,
      });
    }
  }, [data.cover_image]);

  // Initialize Tiptap rich text editor
  // Provides WYSIWYG editing capabilities with StarterKit extensions
  const editor = useEditor({
    extensions: [StarterKit], // Basic text formatting extensions (bold, italic, headings, etc.)
    content: JSON.parse(data.content), // Content we get from the backend. This is needed, because from the backend we get a string of an object. To make the RichtText render it properly, we need to convert the string into a json object with the help of JSON.parse
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  // React Hook Form setup with Zod validation
  // Manages form state, validation, and submission
  const form = useForm<UpdateBlogFormData>({
    resolver: zodResolver(updateBlogSchema), // Use Zod schema for validation
    mode: "onSubmit", // Validate only on form submission
    defaultValues: {
      title: data.title || "",
      lead: data.lead || "",
      content: JSON.parse(data.content) || {},
      tags: initialTagNames,
    },
  });

  // Effect to sync Tiptap editor content with form state
  // Whenever editor content changes, update the form's content field
  useEffect(() => {
    if (editor) {
      const updateContent = () => {
        // Get editor content as JSON structure (more reliable than HTML)
        const json = editor.getJSON();
        // Store the full JSON document structure in form state with type assertion
        form.setValue("content", json as Record<string, unknown>);
      };

      // Listen for editor updates and sync with form
      editor.on("update", updateContent);

      // Cleanup listener on component unmount or editor change
      return () => {
        editor.off("update", updateContent);
      };
    }
  }, [editor, form]);

  // Effect to sync selected tags with form state
  // Whenever selectedTags state changes, update the form's tags field
  useEffect(() => {
    form.setValue("tags", selectedTags);
  }, [selectedTags, form]);

  /**
   * Handles toggling of tag selection
   * Adds tag if not selected, removes if already selected
   * @param tag - The tag string to toggle
   */
  const handleTagToggle = (tagName: string) => {
    setSelectedTags((prev: string[]) => {
      if (prev.includes(tagName)) {
        return prev.filter((t) => t !== tagName);
      } else {
        return [...prev, tagName];
      }
    });
  };

  /**
   * Handles file selection from file input
   * Updates selectedFile state and form image field
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("image", file);
    }
  };

  /**
   * Handles actual image upload to server
   * Creates FormData, calls upload action, and handles response
   * @param file - The image file to upload
   * @returns Promise resolving to uploaded image data or null on failure
   */
  const handleImageUpload = async (file: File): Promise<UploadedImage | null> => {
    setIsUploading(true);

    try {
      // Create FormData with explicit array structure
      const formData = new FormData();
      formData.append("files", file);
      formData.append("type", "article");
      formData.append("title", form.getValues("title"));

      const result = await uploadImageAction(formData);

      if (result.success && result.image) {
        setUploadedImage(result.image);
        return result.image;
      } else {
        toast.error(result.error || "Upload failed");
        // since we always want an image for a blog article, we enforce an early return of the function, so that it does not post an incorrect blog article to the backend
        return null;
      }
    } catch (error) {
      // since we always want an image for a blog article, we enforce an early return of the function, so that it does not post an incorrect blog article to the backend
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Form submission handler for updating existing blog articles
   *
   * This function orchestrates the complete blog update process:
   * 1. Validates that the editor is properly initialized
   * 2. Conditionally uploads a new image if the user selected one
   * 3. Prepares the update data with either existing or new image ID
   * 4. Calls the backend API to update the article
   * 5. Handles success/error responses and navigation
   *
   * @param formData - Validated form data from react-hook-form containing title, lead, content, tags, and optional image
   */
  const onSubmit = async (formData: UpdateBlogFormData) => {
    try {
      // Ensure the Tiptap editor is properly initialized before proceeding
      // The editor is required to get the latest content in JSON format
      if (!editor) {
        toast.error("Editor not initialized");
        return;
      }

      // Start with the existing article's cover image ID as default
      // This preserves the current image if no new image was selected
      let imageId = data.cover_image?.id;

      // Handle new image upload only if user selected a replacement image
      // This is an optional step - articles can be updated without changing the image
      if (selectedFile) {
        // Upload the new image file to the server
        const uploadResult = await handleImageUpload(selectedFile);
        if (!uploadResult) {
          // If image upload fails, stop the entire update process
          // The user will see an error toast from handleImageUpload
          return;
        }
        // Use the newly uploaded image ID instead of the existing one
        imageId = uploadResult.id;
      }

      // Prepare the complete update payload for the backend API
      const updateData = {
        id: data.id, // Article ID is required for the PATCH endpoint
        title: formData.title, // Updated title from form input
        lead: formData.lead, // Updated lead paragraph from form input
        content: formData.content as { type: "doc"; content?: Record<string, unknown>[] }, // Tiptap JSON content structure
        tags: selectedTags, // Current tag selection as string array
        image_id: imageId, // Either existing image ID or newly uploaded image ID
      };

      // Call the server action to update the article in the database
      const result = await updateBlogAction(updateData);

      if (result.success) {
        // Show success confirmation to the user
        toast.success("Blog article updated successfully!");
        // Navigate back to the dashboard where user can see their updated article
        router.push("/dashboard");
      } else {
        // Display specific error message from the backend
        // This could be validation errors, authorization issues, etc.
        toast.error(result.error || "Failed to update blog article");
      }
    } catch (error) {
      // Handle any unexpected errors that occur during the update process
      // This includes network errors, JSON parsing errors, or other runtime exceptions
      console.error("Error updating blog:", error);
      toast.error("An error occurred while updating the blog article");
    }
  };

  return (
    <div className="min-h-screen py-2xl">
      {/* Main form element with onSubmit handler */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Here we call the onSubmit function and with the help of form.handleSubmit, which references the react-hook-form state, the onSubmit function gets all the current values of the form in the form of a data object which is being propped */}
        <Grid>
          {/* Page Header */}
          <GridItem span={12}>
            <Text as="h1" variant="headline-2" className="mb-l">
              Edit Wandrstay
            </Text>
          </GridItem>

          {/* Title Input Field */}
          <GridItem span={12}>
            <Input
              {...form.register("title")}
              id="title"
              name="title"
              label="Title"
              placeholder="Enter your blog title..."
              error={form.formState.errors.title?.message}
            />
          </GridItem>

          {/* Lead/Summary Input Field */}
          <GridItem span={12}>
            <Input
              {...form.register("lead")}
              id="lead"
              name="lead"
              label="Lead"
              placeholder="Enter a compelling lead paragraph..."
              error={form.formState.errors.lead?.message}
            />
          </GridItem>

          {/* Image Upload Section */}
          <GridItem span={12}>
            <div className="space-y-4">
              <label className="block text-sm font-medium">Cover Image</label>
              {!selectedFile && !uploadedImage ? (
                // File selection input when no file is selected
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              ) : (
                // Image preview with remove button when file is selected or uploaded
                <div className="space-y-3">
                  <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                      src={uploadedImage ? uploadedImage.url : URL.createObjectURL(selectedFile!)}
                      alt="Preview"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setUploadedImage(null);
                        form.setValue("image", undefined);
                      }}
                      className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </GridItem>

          {/* Tags Selection Section */}
          <GridItem span={12}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Tags</label>
              {/* Render all available tags as toggleable buttons */}
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tagName) => (
                  <button
                    key={tagName}
                    type="button"
                    onClick={() => handleTagToggle(tagName)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-md border transition-colors",
                      selectedTags.includes(tagName)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {tagName}
                  </button>
                ))}
              </div>
              {/* Display validation error for tags if present */}
              {form.formState.errors.tags && (
                <Text as="span" variant="body-micro" className="text-red-500">
                  {form.formState.errors.tags.message}
                </Text>
              )}
            </div>
          </GridItem>

          <GridItem span={12}>
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium">
                Content
              </label>

              {editor && (
                <div className="border border-gray-400/60 rounded-md overflow-hidden">
                  <div className="rounded-t-md p-2 bg-gray-200 flex flex-wrap gap-xs">
                    <Button
                      type="button"
                      textVariant="body-micro"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={cn(
                        "px-3 py-1 text-sm rounded bg-white text-gray-500 hover:bg-gray-600 hover:text-white",
                        editor.isActive("bold") && "bg-cyan-900/90 text-gray-100"
                      )}
                      label="Bold"
                    />
                    <Button
                      type="button"
                      textVariant="body-micro"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={cn(
                        "px-3 py-1 text-sm rounded bg-white text-gray-500 hover:bg-gray-600 hover:text-white",
                        editor.isActive("italic") && "bg-cyan-900/90 text-gray-100"
                      )}
                      label="Italic"
                    />
                    <Button
                      type="button"
                      textVariant="body-micro"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                      className={cn(
                        "px-3 py-1 text-sm rounded bg-white text-gray-500 hover:bg-gray-600 hover:text-white",
                        editor.isActive("heading", { level: 1 }) && "bg-cyan-900/90 text-gray-100"
                      )}
                      label="H1"
                    />
                    <Button
                      type="button"
                      textVariant="body-micro"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={cn(
                        "px-3 py-1 text-sm rounded bg-white text-gray-500 hover:bg-gray-600 hover:text-white",
                        editor.isActive("heading", { level: 2 }) && "bg-cyan-900/90 text-gray-100"
                      )}
                      label="H2"
                    />
                    <Button
                      type="button"
                      textVariant="body-micro"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                      className={cn(
                        "px-3 py-1 text-sm rounded bg-white text-gray-500 hover:bg-gray-600 hover:text-white",
                        editor.isActive("heading", { level: 3 }) && "bg-cyan-900/90 text-gray-100"
                      )}
                      label="H3"
                    />
                  </div>
                  <EditorContent editor={editor} />
                </div>
              )}
            </div>
          </GridItem>

          <GridItem span={12} className="flex justify-end gap-m">
            <Button
              type="button"
              variant="destructive"
              label="Cancel"
              textVariant="body-small"
              onClick={() => router.push("/dashboard")}
            />
            <Button
              type="submit"
              label="Update Wandrstay"
              textVariant="body-small"
              disabled={form.formState.isSubmitting || isUploading}
            />
          </GridItem>
        </Grid>
      </form>
    </div>
  );
};
