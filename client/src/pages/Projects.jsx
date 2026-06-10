import React from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/ru";
import "moment/locale/az";
import ProjectFolder from "../components/ProjectFolders";
import Plus from "../components/ui/plus";

const Projects = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="form">
      <Input
        autoFocus
        placeholder={t("project.placeholder")}
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="flex items-center gap-3 pt-10 cursor-pointer ">
        <Plus className="cursor-pointer" />
        <h2 className="text-3xl">Add new</h2>
      </div>

      <h2 className="pt-10 pl-0.5 text-3xl">All projects</h2>
      <ProjectFolder />
    </div>
  );
};

export default Projects;
