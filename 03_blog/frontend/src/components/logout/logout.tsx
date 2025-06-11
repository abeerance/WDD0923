"use client";

import { signOut, useSession } from "next-auth/react";
import { Text } from "../ui/text/text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MenuItem } from "../menu-item/menu-item";

export const Logout = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return session?.username ? (
    <DropdownMenuItem className="group relative p-0 overflow-hidden hover:outline-none ">
      <button
        className="block relative z-10 p-s w-full after:absolute after:inset-0 after:-z-10 after:bg-gray-100 after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 after:rounded-md cursor-pointer"
        type="button"
        onClick={() => {
          // redirect false to have a custom logout logic
          signOut({ redirect: false }).then(() => {
            toast.success("Logout successful");
            // push to root after logout
            router.push("/");
          });
        }}
      >
        <Text variant="body-small" className="font-semibold flex">
          Logout
        </Text>
        <Text variant="body-micro">See you soon!</Text>
      </button>
    </DropdownMenuItem>
  ) : (
    // needs to be here, because the client component is rerendering when something inside changes. This can't be in the server component, because server components are rendered on build time and not on runtime
    <MenuItem
      href="/signup-login"
      title="Login or sign up"
      description="Let us know your wandrstay"
    />
  );
};
