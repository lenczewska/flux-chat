import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "./components/SideBar";
import ChatBox from "./components/ChatBox";
import Community from "./pages/Community";
import Projects from "./pages/Projects";
import { useAppContext } from "@/context/AppContext";
import "./assets/prism.css";
import Loading from "./pages/Loading";
import Login from "./pages/Login";

function App() {
  const { theme } = useAppContext();
  const { pathname } = useLocation();

  if (pathname === "/loading") return <Loading />;

  return (
    <div >
      <SidebarProvider defaultOpen={true}>
        <Sidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-end gap-2 border-b px-4"></header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/login" element={<Login />} />
              <Route path="/community" element={<Community />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default App;