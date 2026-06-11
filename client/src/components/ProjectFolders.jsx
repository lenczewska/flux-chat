import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

const ProjectFolders = ({ projects = [], onDelete }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedButton = Object.values(buttonRefs.current).some(
        (btn) => btn && btn.contains(e.target)
      );
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !clickedButton
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mt-5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group relative border border-[#c7c7c75f] w-60 h-30 rounded-2xl shadow-xl transition-all p-4 flex flex-col justify-between cursor-pointer"
          onClick={() => navigate("/newProjectChat")}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-medium truncate">{project.name}</h3>

              <button
                type="button"
                ref={(el) => (buttonRefs.current[project.id] = el)}
                className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu((prev) =>
                    prev === project.id ? null : project.id
                  );
                }}
                aria-label="Toggle menu"
              >
                <HiDotsVertical className="w-5 h-5 cursor-pointer " />
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          </div>

          <p className="text-xs text-gray-400">{project.createdAt}</p>

          {activeMenu === project.id && (
            <div
              ref={menuRef}
              className="absolute right-0 top-15 left-30 mt-2 w-30 rounded-xl border bg-white shadow-lg dark:bg-[#1e1e1e] dark:border-gray-700 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:rounded-t-xl cursor-pointer"
                onClick={() => {
                  setActiveMenu(null);
                }}
              >
                Option 1
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:rounded-b-xl cursor-pointer"
                onClick={() => {
                  setActiveMenu(null);
                  onDelete?.(project.id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectFolders;