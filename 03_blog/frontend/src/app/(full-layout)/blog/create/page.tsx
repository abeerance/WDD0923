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
// TODO: Image upload functionality - will be implemented next week
// import { uploadImageAction } from "@/actions/upload-image/upload-iamge-action";

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
  // TODO: Image upload - will be enabled next week
  // image: z.instanceof(File).optional(), // Optional cover image file
});

// TypeScript type inference from Zod schema
// Ensures type safety for form data throughout the component
type CreateBlogFormData = z.infer<typeof createBlogSchema>;

// TODO: Image upload interface - will be used next week
// Interface defining the structure of uploaded image data returned from server
// interface UploadedImage {
//   id: number;
//   name: string;
//   url: string;
// }

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

  // TODO: Image upload states - will be implemented next week
  // State for storing uploaded image data after successful upload
  // const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  // State for tracking upload progress/loading state
  // const [isUploading, setIsUploading] = useState(false);

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
      title: "",
      lead: "",
      content: {}, // Initialize with empty object
      tags: [],
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

  // TODO: Image upload handlers - will be implemented next week
  /**
   * Handles file selection from file input
   * Updates selectedFile state and form image field
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // TODO: Uncomment when image upload is implemented
      // form.setValue("image", file);
    }
  };

  /**
   * Handles actual image upload to server
   * Creates FormData, calls upload action, and handles response
   * @param file - The image file to upload
   * @returns Promise resolving to uploaded image data or null on failure
   */
  // const handleImageUpload = async (file: File): Promise<UploadedImage | null> => {
  //   console.log("Starting image upload...");
  //   setIsUploading(true);

  //   try {
  //     // Create FormData for multipart file upload
  //     const formData = new FormData();
  //     formData.append("files[]", file);
  //     formData.append("type", "cover"); // Specify this is a cover image
  //     formData.append("title", file.name);

  //     console.log("Calling uploadImageAction...");
  //     const result = await uploadImageAction(formData);
  //     console.log("Upload result:", result);

  //     if (result.success && result.image) {
  //       setUploadedImage(result.image);
  //       toast.success("Image uploaded successfully!");
  //       return result.image;
  //     } else {
  //       console.error("Upload failed:", result.error);
  //       toast.error(result.error || "Upload failed");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     toast.error(error instanceof Error ? error.message : "Failed to upload image");
  //     return null;
  //   } finally {
  //     console.log("Setting isUploading to false");
  //     setIsUploading(false);
  //   }
  // };

  /**
   * Form submission handler
   * Processes form data, handles image upload (when enabled), and creates blog post
   * @param data - Validated form data from react-hook-form
   */
  const onSubmit = async (data: CreateBlogFormData) => {
    try {
      // Ensure editor is initialized before proceeding
      if (!editor) {
        toast.error("Editor not initialized");
        return;
      }

      // TODO: Image upload logic - will be implemented next week
      // let imageId: number | undefined;

      // Upload image if selected (when image upload is enabled)
      // if (selectedFile) {
      //   const uploadResult = await handleImageUpload(selectedFile);
      //   imageId = uploadResult?.id;
      // }

      // Prepare data for blog creation action
      const formData = {
        title: data.title,
        lead: data.lead,
        content: data.content as { type: "doc"; content?: Record<string, unknown>[] }, // Cast to match server action type
        tags: selectedTags,
        // TODO: Include image_id when image upload is implemented
        // image_id: imageId,
      };

      // Call server action to create blog post
      const result = await createBlogAction(formData);

      if (result.success) {
        // Show success message and redirect to dashboard
        toast.success("Blog article created successfully!");
        router.push("/dashboard");
      } else {
        // Show error message if creation failed
        toast.error(result.error || "Failed to create blog article");
      }
    } catch (error) {
      // Handle any unexpected errors during submission
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

          {/* Image Upload Section - selection enabled, upload disabled until next week */}
          <GridItem span={12}>
            <div className="space-y-4">
              <label className="block text-sm font-medium">Cover Image</label>
              {!selectedFile ? (
                // File selection input when no file is selected
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*" // Only accept image files
                    onChange={handleFileSelect}
                    // TODO: Remove disabled when upload is implemented
                    // disabled={isUploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              ) : (
                // Image preview with remove button when file is selected
                <div className="space-y-3">
                  <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                      src={URL.createObjectURL(selectedFile)} // Create preview URL from file
                      alt="Preview"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        // Remove selected file and clear form field
                        setSelectedFile(null);
                        // TODO: Uncomment when image upload is implemented
                        // form.setValue("image", undefined);
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
              label="Create Wandrstay" // Simplified label since image upload is disabled
              textVariant="body-small"
              disabled={form.formState.isSubmitting} // Disable during form submission
              // TODO: Add isUploading to disabled condition when image upload is implemented
              // disabled={form.formState.isSubmitting || isUploading}
            />
          </GridItem>
        </Grid>
      </form>
    </div>
  );
}
