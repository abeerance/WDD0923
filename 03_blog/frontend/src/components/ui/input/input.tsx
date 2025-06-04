"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Text } from "../text/text";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, type = "text", label, error, className, ...props }, ref) => {
    // the useState variable and function to wether show or hide the password. Standard is false
    const [showPassword, setShowPassword] = useState(false);
    // an additional variable, to check if it's of type password
    const isPassword = type === "password";
    // an additional inputType to change from password to type
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-2xs relative">
        {label && (
          <label
            htmlFor={id}
            className={cn("block typo-body-micro font-bold", error && "text-red-500")}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            name={name}
            type={inputType}
            data-slot="input"
            aria-invalid={error ? "true" : "false"}
            className={cn([
              // Basic layout
              "relative block w-full appearance-none rounded-lg px-xs py-2xs",
              // Typography
              "text-base/6 text-zinc-950 placeholder:text-zinc-500 typo-body-small",
              // Border
              !error && "border border-zinc-950/10 hover:border-zinc-950/20",
              // Background color
              "bg-transparent",
              // Hide default focus styles
              "focus:outline-2 focus:outline-cyan-800/50 focus:border-transparent",
              // Disabled state
              "data-disabled:border-zinc-950/20",
              // add padding for password toggle
              isPassword && "pr-xl",
              // add error state classNames
              error &&
                "border border-red-500 focus:outline-2 focus:outline-red-700/50 focus:border-transparent text-red-500",
              className,
            ])}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <Text
            variant="body-micro"
            as="span"
            id={`${id}-error`}
            className="text-red-500 absolute -bottom-m"
          >
            {error}
          </Text>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
