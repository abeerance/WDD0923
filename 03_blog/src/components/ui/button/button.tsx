"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "label" | "label-small";
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "label",
      leftSection,
      rightSection,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      label: "typo-label",
      "label-small": "typo-label-small",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md cursor-pointer inline-flex items-center px-xs py-2xs",
          variant === "primary" && "bg-blue-950 text-gray-100 hover:bg-blue-800",
          variant === "secondary" && "bg-amber-600 text-gray-100",
          variant === "ghost" && "text-gray-900 underline",
          variant === "destructive" && "bg-red-500 text-gray-100",
          leftSection && "gap-2xs pr-m pl-2xs",
          rightSection && "pl-m gap-2xs pr-2xs",
          sizeClasses[size],
          className
        )}
        onClick={() => {
          console.log("hello world");
        }}
        {...props}
      >
        {leftSection && <span>{leftSection}</span>}
        {children}
        {rightSection && <span>{rightSection}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
