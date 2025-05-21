import Link from "next/link";
import { Text } from "../ui/text/text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import { Logo } from "../logo/logo";

export const Header = () => {
  return (
    <header className="flex p-l justify-between items-center bg-gray-100 border-b border-b-gray-200">
      <Logo />
      <nav className="flex gap-m items-center">
        <Link href="/blog" className="cursor-pointer">
          <Text variant="body-small">Blog</Text>
        </Link>
        <Link href="/categories" className="cursor-pointer">
          <Text variant="body-small">Categories</Text>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center p-2xs rounded-full bg-gray-200 border border-gray-200 shadow-sm outline-transparent hover:outline-gray-200 transition-all duration-300 cursor-pointer">
              <Menu className="h-5 w-5 text-gray" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              className="bg-white p-s rounded-lg flex flex-col gap-2xs shadow-lg"
              align="end"
              sideOffset={16}
            >
              <DropdownMenuItem className="group relative p-0 overflow-hidden hover:outline-none">
                <Link
                  href={"/about"}
                  className="block relative z-10 p-s w-full after:absolute after:inset-0 after:-z-10 after:bg-gray-100 after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 after:rounded-md"
                >
                  <Text variant="body-small" className="font-semibold">
                    About
                  </Text>
                  <Text variant="body-micro">Find out more</Text>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="w-full h-[1px] bg-gray-200" />
              <DropdownMenuItem className="group relative p-0 overflow-hidden hover:outline-none">
                <Link
                  href={"/signup-login"}
                  className="block relative z-10 p-s w-full after:absolute after:inset-0 after:-z-10 after:bg-gray-100 after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 after:rounded-md"
                >
                  <Text variant="body-small" className="font-semibold">
                    Login or signup
                  </Text>
                  <Text variant="body-micro">Let us know your wandrstay</Text>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </nav>
    </header>
  );
};
