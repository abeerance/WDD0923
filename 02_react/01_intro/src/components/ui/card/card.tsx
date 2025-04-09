import { ReactNode } from "react";

interface CardStrictProps {
  title: string;
  description: string;
  buttonLabel: string;
}

export const CardStrict = ({ title, description, buttonLabel }: CardStrictProps) => {
  return (
    <div className="p-4 shadow-sm rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p>{description}</p>
      <button className="p-2.5 rounded-md bg-teal-500 text-white font-semibold mt-6">
        {buttonLabel}
      </button>
    </div>
  );
};

interface CardWithReactNodeProps {
  children: ReactNode;
}

export const CardWithReactNode = ({ children }: CardWithReactNodeProps) => {
  return <div className="p-4 shadow-sm rounded-lg flex flex-col gap-4">{children}</div>;
};
