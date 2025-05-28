"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import { Paragraph } from "@tiptap/extension-paragraph";

interface ViewerProps {
	content: string;
}

const Viewer = ({ content }: ViewerProps) => {
	// since most databases don't store JSON directly, but a JSON string, we need to convert the JSON string into a proper JSON, so that tipap is able to read the content properly. We can do that with the help of the javascript in-built function JSON.parse()
	const contentJson = JSON.parse(content);

	const editor = useEditor({
		//creating a new editor instance, explicitely for viewing
		extensions: [
			StarterKit.configure({
				heading: false,
				bulletList: false,
				orderedList: false,
				listItem: false,
				paragraph: false,
			}), // this indicates that we do not want the starterkit to dictate how our styling is for the "false" set properties
			Heading.configure({
				HTMLAttributes: {
					class: "my-s text-gray-800", // the className given to each heading element
				},
				levels: [1, 2, 3], // the heading elements that need to adhere to the configure attribute
			}),
			Paragraph.configure({
				HTMLAttributes: {
					class: "typo-body-small text-gray-600 leading-relaxed mb-s", // the className given to each paragraph element
				},
			}),
			BulletList.configure({
				HTMLAttributes: {
					class: "list-disc ml-6 my-l [&_p]:mb-2xs", // the className given to each UL element, and it's setting the margin bottom of the P-Tag new since it's too big
				},
			}),
			OrderedList.configure({
				HTMLAttributes: {
					class: "list-decimal my-l [&_p]:mb-2xs", // the className given to each OL element, and it's setting the margin bottom of the P-Tag new since it's too big
				},
			}),
			ListItem.configure({
				HTMLAttributes: {
					class: "text-gray-600", // the className given to each LI element
				},
			}),
		],
		content: contentJson, // the parsed JSON content that we pass to the editor instance
		editable: false, // this marks the editor instance as READ-ONLY and is not editable
	});

	return <EditorContent editor={editor} />;
};

export default Viewer;
