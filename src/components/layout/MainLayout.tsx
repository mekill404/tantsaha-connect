import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
      <Navbar />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-5 md:p-10 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default memo(MainLayout);