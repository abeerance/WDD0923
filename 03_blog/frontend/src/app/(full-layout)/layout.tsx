import { Header } from "@/components/header/header";
import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
