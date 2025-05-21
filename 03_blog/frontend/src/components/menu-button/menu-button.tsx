import { Menu } from "lucide-react";

export const MenuButton = () => {
  return (
    <button className="flex items-center justify-center p-2xs rounded-full bg-gray-200 border border-gray-200 shadow-sm outline-transparent hover:outline-gray-200 transition-all duration-300 cursor-pointer">
      <Menu className="h-5 w-5 text-gray" />
    </button>
  );
};
