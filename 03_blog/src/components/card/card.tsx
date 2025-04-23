interface CardProps {
  title: string;
}

export const Card = ({ title }: CardProps) => {
  return (
    <div className="p-4 rounded-md shadow-xl">
      <p>{title}</p>
    </div>
  );
};
