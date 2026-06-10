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
              <p className="mb-2" > Project name</p>

              <Input />
            </div>

            <div className="mt-3  ">
              <p className="mb-2"> Describe your project</p>
              <Input />
            </div>
          </form>

          <div className="btns flex justify-end mt-5">
            <button className="crtBtn bg-gray-200 p-1.5 cursor-pointer rounded-lg text-black  ">
              Add project
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
