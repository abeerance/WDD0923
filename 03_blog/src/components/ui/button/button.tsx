import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  children: ReactNode;
}

export const Button = ({ variant = "primary", children }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "py-2 px-3 rounded-md text-sm cursor-pointer",
        variant === "primary" && "bg-blue-950 text-gray-100 hover:bg-blue-800",
        variant === "secondary" && "bg-amber-600 text-gray-100",
        variant === "ghost" && "text-gray-900 underline",
        variant === "destructive" && "bg-red-500 text-gray-100"
      )}
    >
      {children}
    </button>
  );
};
