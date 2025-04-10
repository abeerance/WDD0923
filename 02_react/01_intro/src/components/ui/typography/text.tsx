import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

export const Text = ({ children }: TextProps) => {
  return <p className="mt-2">{children}</p>;
};
