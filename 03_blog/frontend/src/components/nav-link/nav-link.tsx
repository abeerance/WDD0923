import Link from "next/link";
import { ReactNode } from "react";
import { Text, TextVariant } from "../ui/text/text";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  textVariant?: TextVariant;
  className?: string;
}

export const NavLink = ({
  href,
  children,
  textVariant = "body-small",
  className,
}: NavLinkProps) => {
  return (
    <Link href={href} className={cn("cursor-pointer", className)}>
      <Text variant={textVariant}>{children}</Text>
    </Link>
  );
};
