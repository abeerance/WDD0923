import { CurrentTime } from "@/components/current-time/current-time";
import { LanguageList } from "@/components/language-list/language-list";
import { SimpleProfile } from "@/components/simple-profile/simple-profile";
import { Button, ButtonReactNode } from "@/components/ui/button/button";
import { Card, CardCombined, CardReactNode } from "@/components/ui/card/card";
import { Text } from "@/components/ui/typography/text";
import { Title } from "@/components/ui/typography/title";
import { TeamDisplay, TeamMember } from "@/feature/ team-display/team-display";

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Max Mustermann",
    jobTitle: "Software Engineer",
    avatUrl:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww",
    showSocial: true,
  },
  {
    id: "2",
    name: "Lisa Lowe",
    jobTitle: "Fullstack Engineer",
    avatUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
    theme: "dark",
  },
  {
    id: "3",
    name: "John Doe",
    jobTitle: "CEO",
    avatUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyfGVufDB8fDB8fHww",
  },
];

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center gap-2">
      <SimpleProfile />
      <CurrentTime />
      <LanguageList />
      <Card
        title="This is the card without ReactNode"
        description="This is a click counter"
        text="This is the without ReactNode Text"
        minusButtonLabel="-"
        additionButtonLabel="+"
      />
      <CardReactNode>
        <Title>A simple click counter with ReactNode</Title>
        <Title headingLevel={4}>This will display another Click counter card</Title>
        <Text>Current count: 0</Text>
        <div className="self-end flex gap-4">
          <Button label="-" />
          <ButtonReactNode>+</ButtonReactNode>
        </div>
        <button className="bg-red-500 text-white self-start p-2.5 rounded">
          This is outside the div
        </button>
      </CardReactNode>
      <CardCombined
        title="This is the combined base Card"
        description="This will be a simple counter in the future"
        text="We are coming along with the React"
      >
        <div className="self-end flex gap-4">
          <Button label="-" />
          <ButtonReactNode>+</ButtonReactNode>
        </div>
        <button className="bg-red-500 text-white self-start p-2.5 rounded">
          This is outside the div
        </button>
      </CardCombined>
      <TeamDisplay data={teamMembers} />
    </div>
  );
}
