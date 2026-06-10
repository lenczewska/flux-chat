import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useTranslation } from "react-i18next";

const NewProjectModal = ({ open, onOpenChange, onAdd }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

 const handleAdd = () => {
  if (!name.trim()) return;
  onAdd({ 
    name, 
    description, 
    id: Date.now(), 
    createdAt: new Date().toLocaleDateString() 
  });
  setName("");
  setDescription("");
  onOpenChange(false);
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="max-w-[95vw] sm:max-w-125">
        <div className="modalContent">
          <h2 className="text-xl">{t("modal.newProject")}</h2>

          <div className="mt-2">
            <p className="mb-2">{t("modal.projectName")}</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="mt-3">
            <p className="mb-2">{t("modal.describeProject")}</p>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="btns flex justify-end mt-5">
            <button
              className="crtBtn bg-gray-200 p-1.5 cursor-pointer rounded-lg text-black"
              onClick={handleAdd}
            >
              {t("modal.button")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;