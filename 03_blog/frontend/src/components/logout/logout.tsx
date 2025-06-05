"use client";

import { signOut } from "next-auth/react";
import { Text } from "../ui/text/text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Logout = () => {
  const router = useRouter();

  return (
    <div className="group relative p-0 overflow-hidden hover:outline-none">
      <button
        className="block relative z-10 p-s w-full after:absolute after:inset-0 after:-z-10 after:bg-gray-100 after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 after:rounded-md"
        type="button"
        onClick={() => {
          signOut()
            .then(() => {
              toast.success("Logout successul");
            })
            .then(() => {
              router.push("/");
            });
        }}
      >
        <Text variant="body-small" className="font-semibold">
          Logout
        </Text>
        <Text variant="body-micro">See you soon!</Text>
      </button>
    </div>
  );
};
