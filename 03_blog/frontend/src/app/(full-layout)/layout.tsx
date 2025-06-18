import { Header } from "@/components/header/header";
import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="w-full h-svh flex flex-col">
      <Header />
      <div className="w-full flex-1">{children}</div>
    </main>
  );
}
