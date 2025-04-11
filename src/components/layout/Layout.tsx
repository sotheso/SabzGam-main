
import { ReactNode } from "react";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children: ReactNode;
  hideNavbar?: boolean;
};

export function Layout({ children, hideNavbar = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <main className="pb-20">
        {children}
      </main>
      {!hideNavbar && <Navbar />}
    </div>
  );
}
