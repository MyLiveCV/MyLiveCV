import { ScrollArea } from "@reactive-resume/ui";
import { Outlet } from "react-router-dom";

import { Footer } from "@/client/components/footer";
import { Header } from "@/client/components/header";

export const HomeLayout = () => (
  <ScrollArea orientation="vertical" className="h-screen">
    <Header />
    <Outlet />
    <Footer />
  </ScrollArea>
);
