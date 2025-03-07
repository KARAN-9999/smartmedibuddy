
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NotificationBar from "./NotificationBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <NotificationBar />
      <Footer />
    </div>
  );
};

export default Layout;
