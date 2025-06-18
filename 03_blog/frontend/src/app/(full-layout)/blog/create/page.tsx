// src/app/(full-layout)/blog/create/page.tsx

"use client";

// Import necessary dependencies for blog creation functionality
import { createBlogAction } from "@/actions/create-blog/create-blog-action";
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
const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"), // Blog title with length constraints
  lead: z.string().min(1, "Lead is required").max(500, "Lead too long"), // Blog lead/summary paragraph
  // Use a more flexible schema that matches Tiptap's JSONContent type
  content: z.record(z.unknown()), // Accept any valid JSON object structure from Tiptap
  tags: z.array(z.string()).min(1, "At least one tag is required"), // Array of selected tags
  image: z.instanceof(File).optional(), // Optional cover image file
});

// TypeScript type inference from Zod schema
// Ensures type safety for form data throughout the component
type CreateBlogFormData = z.infer<typeof createBlogSchema>;

// Interface defining the structure of uploaded image data returned from server
interface UploadedImage {
  id: number;
  name: string;
  url: string;
}

/**
 * Main component for creating new blog posts
 * Handles form validation, rich text editing, tag selection, and submission
 */
export default function CreateBlogPage() {
  const router = useRouter(); // Next.js router for navigation

  // State for managing selected tags
  // Tracks which tags from AVAILABLE_TAGS are currently selected
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // State for managing selected image file before upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // State for storing uploaded image data after successful upload
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  // State for tracking upload progress/loading state
  const [isUploading, setIsUploading] = useState(false);

  // Initialize Tiptap rich text editor
  // Provides WYSIWYG editing capabilities with StarterKit extensions
  const editor = useEditor({
    extensions: [StarterKit], // Basic text formatting extensions (bold, italic, headings, etc.)
    content: "", // Initial empty content
    editorProps: {
      attributes: {
        // Tailwind classes for editor styling - prose classes for typography
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  // React Hook Form setup with Zod validation
  // Manages form state, validation, and submission
  const form = useForm<CreateBlogFormData>({
    resolver: zodResolver(createBlogSchema), // Use Zod schema for validation
    mode: "onSubmit", // Validate only on form submission
    defaultValues: {
      title: "", // initialize title as empty string
      lead: "", // initialize lead as empty string
      content: {}, // Initialize with empty object
      tags: [], // Initialize tags as empty array
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
        form.setValue("content", json as { type: "doc"; content?: Record<string, unknown>[] });
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
  const handleTagToggle = (tag: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // Remove tag if already selected
          : [...prev, tag] // Add tag if not selected
    );
  };

  /**
   * Handles file selection from file input
   * Updates selectedFile state and form image field
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    // this is needed so we have access to the file, which is embedded in an input
    const file = event.target.files?.[0];
    if (file) {
      // sets the state of the selected file
      setSelectedFile(file);
      // set the state of the form for the selected file
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
    // set uploading state as true
    setIsUploading(true);

    try {
      // Create FormData with explicit array structure
      // this is needed, because we are sending a new formdata to the nextjs server. Whenever you are trying to upload an image, you will need a formdata
      const formData = new FormData();
      formData.append("files", file);
      formData.append("type", "article");
      formData.append("title", form.getValues("title"));

      // here we call the upload image server action
      const result = await uploadImageAction(formData);

      // if server action successfull, we have the result, as well as the image object
      if (result.success && result.image) {
        // set the image object as the state for uploadedImage variable
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
      // here we set isUploading to false again, so that we are not in an endless isUploading true loop. The finally will always be executed in a try/catch, wether if it is successful or not
      setIsUploading(false);
    }
  };

  /**
   * Form submission handler for creating blog articles
   *
   * This function orchestrates the complete blog creation process:
   * 1. Validates that the editor is properly initialized
   * 2. Conditionally uploads a new image if the user selected one => we always expect an image
   * 3. Prepares the update data with the new image id. That way we can ensure that every blog has an image.
   * 4. Calls the backend API to create the blog article with the whole form, including the newly created image id as reference
   * 5. Handles success/error responses and navigation
   *
   * @param formData - Validated form data from react-hook-form containing title, lead, content, tags, and optional image
   */
  const onSubmit = async (data: CreateBlogFormData) => {
    try {
      if (!editor) {
        toast.error("Editor not initialized");
        return;
      }

      // Image upload is now required - don't proceed without it
      if (!selectedFile) {
        toast.error("Please select an image before creating the blog");
        return;
      }

      // Upload image first - this is now a blocking operation
      const uploadResult = await handleImageUpload(selectedFile);
      if (!uploadResult) {
        // Error toast is already shown in handleImageUpload
        return; // Stop completely if upload failed
      }

      // at this point we already ensured that the uploadResult was successfull
      // so we can access the id of the result and save it into a new imageId variable
      const imageId = uploadResult.id;

      // Only proceed with blog creation if image upload was successful
      const formData = {
        title: data.title,
        lead: data.lead,
        content: data.content as { type: "doc"; content?: Record<string, unknown>[] },
        tags: selectedTags,
        image_id: imageId,
      };

      // here we call the create blog server action
      const result = await createBlogAction(formData);

      if (result.success) {
        // Only show success toast when blog is actually created
        toast.success("Blog article created successfully!");
        // after a successful upload we route the user automatically to their dashboard
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Failed to create blog article");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("An error occurred while creating the blog article");
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
              Create New Wandrstay
            </Text>
          </GridItem>

          {/* Title Input Field */}
          <GridItem span={12}>
            <Input
              {...form.register("title")} // Register input with react-hook-form
              id="title"
              name="title"
              label="Title"
              placeholder="Enter your blog title..."
              error={form.formState.errors.title?.message} // Display validation errors
            />
          </GridItem>

          {/* Lead/Summary Input Field */}
          <GridItem span={12}>
            <Input
              {...form.register("lead")} // Register input with react-hook-form
              id="lead"
              name="lead"
              label="Lead"
              placeholder="Enter a compelling lead paragraph..."
              error={form.formState.errors.lead?.message} // Display validation errors
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
                    accept="image/*" // Only accept image files
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
                      src={uploadedImage ? uploadedImage.url : URL.createObjectURL(selectedFile!)} // Show uploaded image URL or local preview
                      alt="Preview"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        // Remove selected file and uploaded image, clear form field
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
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-md border transition-colors",
                      selectedTags.includes(tag)
                        ? "bg-blue-500 text-white border-blue-500" // Selected state styling
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50" // Unselected state styling
                    )}
                  >
                    {tag}
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

          {/* Rich Text Content Editor Section */}
          <GridItem span={12}>
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium">
                Content
              </label>

              {/* Editor Toolbar and Content Area */}
              {editor && (
                <div className="border border-gray-400/60 rounded-md overflow-hidden">
                  {/* Toolbar with formatting buttons */}
                  <div className="rounded-t-md p-2 bg-gray-200 flex flex-wrap gap-xs">
                    {/* Bold formatting button */}
                    <Button
                      type="button"
                      textVariant="body-micro"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={cn(
                        "px-3 py-1 text-sm rounded bg-white text-gray-500 hover:bg-gray-600 hover:text-white",
                        editor.isActive("bold") && "bg-cyan-900/90 text-gray-100" // Active state styling
                      )}
                      label="Bold"
                    />
                    {/* Italic formatting button */}
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
                    {/* Heading 1 button */}
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
                    {/* Heading 2 button */}
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
                    {/* Heading 3 button */}
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
                  {/* Actual editor content area */}
                  <EditorContent editor={editor} />
                </div>
              )}
            </div>
          </GridItem>

          {/* Form Action Buttons */}
          <GridItem span={12} className="flex justify-end gap-m">
            {/* Cancel button - navigates back to dashboard */}
            <Button
              type="button"
              variant="destructive"
              label="Cancel"
              textVariant="body-small"
              onClick={() => router.push("/dashboard")}
            />
            {/* Submit button - creates the blog post */}
            <Button
              type="submit"
              label="Create Wandrstay"
              textVariant="body-small"
              disabled={form.formState.isSubmitting || isUploading}
            />
          </GridItem>
        </Grid>
      </form>
    </div>
  );
}
