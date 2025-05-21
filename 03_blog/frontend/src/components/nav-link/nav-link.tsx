import Link from "next/link";
import { ReactNode } from "react";
import { Text } from "../ui/text/text";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href} className="cursor-pointer">
      <Text variant="body-small">{children}</Text>
    </Link>
  );
};
