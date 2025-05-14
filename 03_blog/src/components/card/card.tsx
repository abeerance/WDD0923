import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  slug: string;
}

export const Card = ({ title, children, slug }: CardProps) => {
  return (
    <Link href={`/${slug}`} className="p-4 rounded-md shadow-xl flex flex-col gap-l">
      <p>{title}</p>
      {children}
    </Link>
  );
};
