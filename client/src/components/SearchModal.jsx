import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/ru";
import "moment/locale/az";

const SearchModal = ({ open, onOpenChange, onSearch }) => {
  const { t, i18n } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="max-w-[95vw] sm:max-w-125"> 
        <Input
          autoFocus
          placeholder={t("search.placeholder")}
          onChange={(e) => onSearch(e.target.value)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
