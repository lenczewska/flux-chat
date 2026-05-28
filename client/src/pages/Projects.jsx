import React from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/ru";
import "moment/locale/az";

const Projects = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="form">
      <Input
        autoFocus
        placeholder={t("project.placeholder")}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Projects;
