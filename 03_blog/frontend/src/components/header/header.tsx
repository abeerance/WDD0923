import { Logo } from "../logo/logo";
import { Navigation } from "../navigation/navigation";

export const Header = () => {
  return (
    <header className="flex p-l justify-between items-center bg-gray-100 border-b border-b-gray-200">
      <Logo />
      <Navigation />
    </header>
  );
};
