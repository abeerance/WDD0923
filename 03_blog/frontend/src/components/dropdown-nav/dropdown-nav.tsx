import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MenuButton } from "../menu-button/menu-button";
import { MenuItem } from "../menu-item/menu-item";
import { MenuSeperator } from "../menu-seperator/menu-seperator";
import { auth } from "@/auth";
import { Logout } from "../logout/logout";

export const DropdownNav = async () => {
  const user = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuButton />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="bg-white p-s rounded-lg flex flex-col gap-2xs shadow-lg"
          align="end"
          sideOffset={16}
        >
          <MenuItem href="/about" title="About" description="Find out more" />
          <MenuSeperator />
          {user?.username ? (
            <Logout />
          ) : (
            <MenuItem
              href="/signup-login"
              title="Login or sign up"
              description="Let us know your wandrstay"
            />
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
