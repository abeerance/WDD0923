import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title = ({ children, headingLevel = 3 }: TitleProps) => {
  const headingClass = headingLevel !== 3 ? "font-semibold text-lg" : "font-bold text-2xl";
  // Here we are checking, if the headingClass is not equals 3, because 3 is the fallback value of the optional property in the TitleProps interface

  return <h3 className={headingClass}>{children}</h3>;
};
