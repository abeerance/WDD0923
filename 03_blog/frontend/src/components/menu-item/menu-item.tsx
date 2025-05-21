import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Text } from "../ui/text/text";

interface MenuItemProps {
  href: string;
  title: string;
  description: string;
}

export const MenuItem = ({ href, title, description }: MenuItemProps) => {
  return (
    <DropdownMenuItem className="group relative p-0 overflow-hidden hover:outline-none">
      <Link
        href={href}
        className="block relative z-10 p-s w-full after:absolute after:inset-0 after:-z-10 after:bg-gray-100 after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 after:rounded-md"
      >
        <Text variant="body-small" className="font-semibold">
          {title}
        </Text>
        <Text variant="body-micro">{description}</Text>
      </Link>
    </DropdownMenuItem>
  );
};
