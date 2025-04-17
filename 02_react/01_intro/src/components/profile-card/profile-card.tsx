import clsx from "clsx";
import { Avatar } from "../ui/avatar/avatar";

interface ProfileCardProps {
  name: string;
  jobTitle: string;
  avatarUrl: string;
  theme?: "light" | "dark";
  showSocial?: boolean;
}

export const ProfileCard = ({
  name,
  jobTitle,
  avatarUrl,
  theme = "light",
  showSocial = false,
}: ProfileCardProps) => {
  return (
    <div
      className={clsx(
        "p-8 rounded-xl",
        theme === "dark" ? "bg-gray-200 text-gray-900" : "bg-gray-800 text-white"
      )}
    >
      <Avatar src={avatarUrl} />
      <h2 className="font-semibold text-lg">{name}</h2>
      <p>{jobTitle}</p>
      {showSocial && (
        <div className="mt-4 flex flex-col gap-2">
          <a href="#">Twitter:</a>
          <a href="#">LinkedIn:</a>
          <a href="#">Github:</a>
        </div>
      )}
    </div>
  );
};
