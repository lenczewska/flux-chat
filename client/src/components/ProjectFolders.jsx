import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectFolders = ({ projects = [], onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4 mt-5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border border-[#c7c7c75f] w-60 rounded-2xl h-30 shadow-xl transition-all p-4 flex flex-col justify-between dark:border cursor-pointer"
          onClick={() => navigate("/newProjectChat")}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-medium">{project.name}</h3>
              <button
                type="button"
                className="text-xs text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(project.id);
                }}
              >
                Удалить
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          </div>
          <p className="text-xs text-gray-400">{project.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectFolders;