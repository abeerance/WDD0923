import { ReactNode } from "react";
import { Button } from "../button/button";
import { Text } from "../typography/text";
import { Title } from "../typography/title";

interface CardProps {
  title: string;
  description: string;
  text: string;
  additionButtonLabel: string;
  minusButtonLabel: string;
}

export const Card = ({
  title,
  description,
  text,
  additionButtonLabel,
  minusButtonLabel,
}: CardProps) => {
  return (
    <div className="mt-12 py-4 px-6 border border-black/10 rounded-lg shadow-md flex flex-col gap-1.5">
      <Title>{title}</Title>
      <Title headingLevel={4}>{description}</Title>
      <Text>{text}</Text>
      <div className="self-end flex gap-4">
        <Button label={minusButtonLabel} />
        <Button label={additionButtonLabel} />
      </div>
    </div>
  );
};

interface CardReactNodeProps {
  children: ReactNode;
}

export const CardReactNode = ({ children }: CardReactNodeProps) => {
  return (
    <div className="mt-12 py-4 px-6 border border-black/10 rounded-lg shadow-md flex flex-col gap-1.5">
      {children}
    </div>
  );
};

interface CardCombinedProps {
  title: string;
  description: string;
  text: string;
  children: ReactNode;
}

// Best case scenario, because this is a mix of strict typing and open
export const CardCombined = ({ title, description, text, children }: CardCombinedProps) => {
  return (
    <div className="mt-12 py-4 px-6 border border-black/10 rounded-lg shadow-md flex flex-col gap-1.5">
      <Title>{title}</Title>
      <Title headingLevel={4}>{description}</Title>
      <Text>{text}</Text>
      {children}
    </div>
  );
};
