"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Text, TextVariant } from "../text/text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  textVariant?: TextVariant;
  label: string;
  labelClassName?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      textVariant = "body",
      leftSection,
      rightSection,
      label,
      labelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md cursor-pointer inline-flex items-center justify-center",
          variant === "primary" && "bg-cyan-900/90 text-gray-100 hover:bg-cyan-900/75 px-xs py-2xs",
          variant === "secondary" &&
            "bg-amber-700/90 hover:bg-amber-700/75 text-gray-100 px-xs py-2xs",
          variant === "ghost" && "text-gray-900 underline",
          variant === "destructive" && "bg-red-500 text-gray-100 px-xs py-2xs",
          leftSection && "gap-2xs pr-m pl-2xs",
          rightSection && "pl-m gap-2xs pr-2xs",
          className
        )}
        {...props}
      >
        {leftSection && <span>{leftSection}</span>}
        <Text variant={textVariant} className={cn("font-semibold", labelClassName)}>
          {label}
        </Text>
        {rightSection && <span>{rightSection}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
