import React from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/ru";
import "moment/locale/az";
import ProjectFolder from "../components/ProjectFolders";
import Plus from "../components/ui/plus";
import NewProjectModal from "../components/NewProjectModal";
import { useState } from "react";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleSearchModal = (value) => {
    console.log(value);
  };

  return (
    <div className="form">
      <Input
        autoFocus
        placeholder={t("project.placeholder")}
        onChange={(e) => onSearch(e.target.value)}
      />

      <div
        className="flex items-center gap-1 w-40 pl-2 rounded-[7px] mt-10 cursor-pointer bg-gray-100 "
        onClick={() => setIsSearchOpen(true)}
      >
        <Plus className="cursor-pointer" />
        <h2 className="text-2xl p-1 text-black">Add new</h2>
      </div>

      <NewProjectModal
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSearch={handleSearchModal}
      />

      <h2 className="pt-10 pl-0.5 text-2xl">All projects</h2>
      <ProjectFolder />
    </div>
  );
};

export default Projects;
