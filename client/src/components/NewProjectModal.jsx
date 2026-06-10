import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";

const NewProjectModal = ({ open, onOpenChange, onSearch }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="max-w-[95vw] sm:max-w-125">
        <div className="modalContent">
          <h2 className="text-2xl">Add new project</h2>
          <form action="newProject">
            <div className="mt-2">
              {" "}
              <label for="projectName" className="mb-2">
                Project name
              </label>
              <Input />
            </div>

            <div className="mt-3">
              <label for="projectName">Describe your project</label>
              <Input />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
