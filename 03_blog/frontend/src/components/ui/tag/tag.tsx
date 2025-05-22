import { cn } from "@/lib/utils";
import { Text, TextVariant } from "../text/text";

enum TagName {
  ADVENTURE = "Adventure",
  BEACH = "Beach",
  HIKING = "Hiking",
  CAMPING = "Camping",
  CITY = "City Break",
  CULTURE = "Culture",
  FOOD = "Food",
  LUXURY = "Luxury",
  BACKPACKING = "Backpacking",
  ROADTRIP = "Road Trip",
}

interface TagProps {
  labelVariant?: TextVariant;
  label: string;
  className?: string;
}

export const Tag = ({ labelVariant = "body-micro", label, className }: TagProps) => {
  return (
    <Text
      as="span"
      variant={labelVariant}
      className={cn(
        "px-xs py-1 bg-gray-100 text-gray-700 rounded-full font-semibold",
        label === TagName.ADVENTURE && "bg-orange-700/70 text-white",
        label === TagName.BEACH && "bg-sky-900/80 text-white",
        label === TagName.HIKING && "bg-green-800/70 text-white",
        label === TagName.CAMPING && "bg-cyan-900/70 text-white",
        label === TagName.CITY && "bg-amber-800/70 text-white",
        label === TagName.CULTURE && "bg-teal-900/80 text-white",
        label === TagName.FOOD && "bg-red-800/80 text-white",
        label === TagName.LUXURY && "bg-purple-800/60 text-white",
        label === TagName.BACKPACKING && "bg-red-blue-800/60 text-white",
        label === TagName.ROADTRIP && "bg-stone-600/70 text-white",
        className
      )}
    >
      {label}
    </Text>
  );
};
