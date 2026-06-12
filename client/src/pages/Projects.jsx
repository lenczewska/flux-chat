import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProjectFolder from "../components/ProjectFolders";
import Plus from "../components/ui/plus";
import NewProjectModal from "../components/NewProjectModal";
import { useAppContext } from "@/context/AppContext";
import { CiSearch } from "react-icons/ci";

const Projects = () => {
  const { t } = useTranslation();
  const { theme } = useAppContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // состояние для поиска

  useEffect(() => {
    const stored = localStorage.getItem("fluxProjects");
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored projects:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fluxProjects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (project) => {
    setProjects((prev) => [...prev, project]);
    navigate("/newProjectChat");
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  // фильтрация проектов по имени или описанию
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="form pl-18 pr-18 pt-10">
      <div style={{ position: "relative" }}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ border: "1px solid #4A3A6B", color: "white", paddingRight: "36px" }}
          placeholder={t("project.placeholder")}
        />
        <CiSearch
          size={18}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#7B60B1",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        className="inline-flex items-center gap-1 pl-2 pr-2 rounded-[7px] mt-10 cursor-pointer"
        style={{
          backgroundColor: theme === "dark" ? "transparent" : "#f3f4f6",
          border: theme === "dark" ? "1px solid #4A3A6B" : "none",
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
        onAdd={handleAddProject}
      />

      {/* передаём отфильтрованные проекты */}
      <ProjectFolder projects={filteredProjects} onDelete={handleDeleteProject} />
    </div>
  );
};

export default Projects;
