"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Text } from "../ui/text/text";

export const BackButton = () => {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.back()}
			className="flex gap-2xs cursor-pointer"
		>
			<ArrowLeft size={20} />
			<Text variant="body-small">Back</Text>
		</button>
	);
};
