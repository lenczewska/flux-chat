import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Select = ({ mode, setMode, theme }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { t } = useTranslation();

  const options = [
    { value: "text", label: t("select.text"), icon: "✦" },
    { value: "photo", label: t("select.image"), icon: "⬡" }, // <-- поменял на photo
  ];

  const selected = options.find((o) => o.value === mode);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: theme === "dark" ? "#6D5FB9" : "#000000",
          color: "white",
        }}
        className="flex items-center cursor-pointer gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
      >
        <span>{selected?.icon}</span>
        <span>{selected?.label}</span>
        <span
          className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-21 rounded-xl overflow-hidden shadow-lg border border-purple-800 dark:border-white/10 bg-white dark:bg-[#1e1028]">
          {options
            .filter((option) => option.value !== mode)
            .map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setMode(option.value);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:opacity-80 hover:cursor-pointer bg-black text-white transition-colors duration-150"
              >
                <span className="bg-black text-white " >{option.icon}</span>
                <span className="bg-black text-white " >{option.label}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Select;
