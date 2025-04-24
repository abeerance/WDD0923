import { ReactNode } from "react";

interface CardProps {
  title: string;
  children?: ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="p-4 rounded-md shadow-xl flex flex-col gap-l">
      <p>{title}</p>
      {children}
    </div>
  );
};
