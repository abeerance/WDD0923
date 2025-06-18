"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Text } from "../ui/text/text";
import { MenuSeperator } from "../menu-seperator/menu-seperator";

export const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.username) {
    return (
      <>
        <MenuSeperator />
        <DropdownMenuItem className="group relative p-0 overflow-hidden hover:outline-none ">
          <button
            className="block relative z-10 p-s w-full after:absolute after:inset-0 after:-z-10 after:bg-gray-100 after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 after:rounded-md cursor-pointer"
            type="button"
            onClick={() => {
              // redirect false to have a custom logout logic
              router.push("/dashboard");
            }}
          >
            <Text variant="body-small" className="font-semibold flex">
              Dashboard
            </Text>
            <Text variant="body-micro">Your wandrstays</Text>
          </button>
        </DropdownMenuItem>
      </>
    );
  }

  return null;
};
