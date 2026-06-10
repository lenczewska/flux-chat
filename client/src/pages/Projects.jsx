import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import ProjectFolder from "../components/ProjectFolders";
import Plus from "../components/ui/plus";
import NewProjectModal from "../components/NewProjectModal";
import { useAppContext } from "@/context/AppContext";

const Projects = () => {
  const { t } = useTranslation();
  const { theme } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("Projects mounted");
    const handleKeyDown = (e) => {
      console.log("key pressed:", e.key);
      if (e.key === "Enter") setIsModalOpen(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="form">
      {console.log("Projects rendered")}

      <Input
        ref={inputRef}
        placeholder={t("project.placeholder")}
        onKeyDown={(e) => {
          console.log("key:", e.key);
          if (e.key === "Enter") setIsModalOpen(true);
        }}
      />
      <div
        className="inline-flex items-center gap-1 pl-2 pr-2 rounded-[7px] mt-10 cursor-pointer"
        style={{
          backgroundColor: theme === "dark" ? "transparent" : "#f3f4f6",
          border: theme === "dark" ? "1px solid #4b5563" : "none",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="cursor-pointer" />
        <h2
          className="text-lg p-1"
          style={{ color: theme === "dark" ? "white" : "black" }}
        >
          {t("projects.new")}
        </h2>
      </div>

      <NewProjectModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={(project) => setProjects((prev) => [...prev, project])}
      />

      <ProjectFolder projects={projects} />
    </div>
  );
};

export default Projects;
