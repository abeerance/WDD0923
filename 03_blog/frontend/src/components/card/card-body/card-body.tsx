import { ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
}

export const CardBody = ({ children }: CardBodyProps) => {
  return <div className="relative w-full aspect-video rounded-t-lg overflow-clip ">{children}</div>;
};
