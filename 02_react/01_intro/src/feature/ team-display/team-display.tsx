import { ProfileCard } from "@/components/profile-card/profile-card";

export interface TeamMember {
  id: string;
  name: string;
  jobTitle: string;
  avatUrl: string;
  theme?: "light" | "dark";
  showSocial?: boolean;
}

interface TeamDisplay {
  data: TeamMember[];
}

export const TeamDisplay = ({ data }: TeamDisplay) => {
  return (
    <div className="w-full flex flex-col gap-4 px-80 py-20">
      <h1 className="text-2xl font-bold">Unser Team</h1>
      <div className="flex gap-8 flex-wrap">
        {data.map((member) => (
          <ProfileCard
            key={member.id}
            name={member.name}
            jobTitle={member.jobTitle}
            avatarUrl={member.avatUrl}
            theme={member.theme}
            showSocial={member.showSocial}
          />
        ))}
      </div>
    </div>
  );
};
