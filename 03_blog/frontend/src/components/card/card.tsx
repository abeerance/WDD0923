import Link from "next/link";
import { ReactNode } from "react";
import { GridItem } from "../ui/grid/grid";

interface CardProps {
  children: ReactNode;
  slug: string;
}

export const Card = ({ children, slug }: CardProps) => {
  return (
    <GridItem
      span={{ sm: 12, md: 6, lg: 4 }}
      className="rounded-xl shadow-md overflow-clip bg-white flex flex-col border border-gray-100 cursor-pointer"
    >
      <Link href={slug}>{children}</Link>
    </GridItem>
  );
};
