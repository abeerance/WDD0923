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
			className="inline-flex items-center gap-2xs cursor-pointer bg-gray-400/20 pr-s pl-xs py-2xs rounded-full group hover:bg-teal-700/90 transition-colors duration-300"
		>
			<ArrowLeft
				size={18}
				className="text-gray-800 group-hover:text-white transition-colors duration-300"
			/>
			<Text
				variant="body-small"
				className="text-gray-800 group-hover:text-white transition-colors duration-300"
			>
				Back
			</Text>
		</button>
	);
};
