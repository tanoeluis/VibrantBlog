import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <motion.div 
      className="flex min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar - Hidden on mobile */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        <Header />
        <div className="pb-16 md:pb-0">
          {children}
        </div>
        <MobileNav />
      </main>
    </motion.div>
  );
}
