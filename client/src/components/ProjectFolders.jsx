import React from "react";

const ProjectFolders = ({ projects = [] }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border  border-[#c7c7c75f] w-60 rounded-2xl h-30 cursor-pointer shadow-xl transition-all p-4 flex flex-col justify-between dark:border  "
        >
          <div>
            <h3 className="text-lg font-medium">{project.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          </div>
         <p className="text-xs text-gray-400">{project.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectFolders;