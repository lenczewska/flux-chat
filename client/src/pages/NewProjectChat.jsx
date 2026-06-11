import React from "react";
import { useNavigate } from "react-router-dom";
import Select from "../components/ui/select";
import SendBtn from "../components/ui/sendBtn";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { RxDotsHorizontal } from "react-icons/rx";


const NewProjectChat = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("text");
  const [showMenu, setShowMenu] = useState(false);
  const { selectedChat, theme } = useAppContext();
  const { t, i18n } = useTranslation();
  const createdDate = new Date().toLocaleDateString(i18n.language);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (mode === "text" && !prompt.trim()) return;
    if (mode === "photo" && !file) return;

    try {
      setLoading(true);
      const newMessage = {
        role: "user",
        content:
          mode === "text"
            ? prompt
            : `${t("chatbox.attachedFile")}: ${file.name}\n${fileDescription}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setPrompt("");
      setFile(null);
      setFileDescription("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center w-auto ">
        <h2
          className="text-lg flex items-center pl-7  pb-6 cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          <TfiArrowCircleLeft className="mr-2 w-4 " />
          All projects
        </h2>
      </div>

      <div className="pl-5">
        <h3 className="text-2xl pl-2 pt-3 ">Project name</h3>

        <form
          onSubmit={onSubmit}
          className={`border rounded-2xl w-150 h-20 mt-[20px] max-w-2xl p-2 sm:p-3 sm:pl-4  flex gap-2 sm:gap-4 items-center
          ${
            theme === "dark"
              ? "border-[#80609F]/50 bg-[#0f0f12] text-white"
              : "border-black bg-white text-black"
          }
          shadow-sm`}
        >
          <Select mode={mode} setMode={setMode} theme={theme} />

          {mode === "photo" ? (
            <div className="flex items-center gap-2 w-full">
              {/* Скрытый file input */}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                disabled={loading}
              />

              {/* Кастомная кнопка */}
              <label
                htmlFor="file-upload"
                className={`cursor-pointer px-3 py-1.5 rounded-4xl border hover:opacity-80 text-[13px] text-white
    ${theme === "dark" ? "bg-[#6D5FB9]" : "bg-black"}`}
              >
                {t("chatbox.chooseFile")}
              </label>

              {/* Поле для описания файла */}
              <input
                type="text"
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
                className="flex-1 w-full text-xs sm:text-sm outline-none bg-transparent px-1 sm:px-2"
                disabled={loading}
              />
            </div>
          ) : (
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t("chatbox.placeholder")}
              className="search-inp flex-1 w-full text-xs sm:text-sm outline-none bg-transparent 
               placeholder:text-gray-600 px-1 sm:px-2"
              disabled={loading}
              required
            />
          )}

          <select name="models" id="">
            <optgroup>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </optgroup>
          </select>

          <button
            type="submit"
            disabled={
              loading ||
              (mode === "text" && !prompt.trim()) ||
              (mode === "photo" && !file)
            }
            aria-label={
              loading ? "Остановить генерацию" : "Отправить сообщение"
            }
            className="disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            <SendBtn theme={theme} />
          </button>
        </form>

        <div className="relative last dialogs group flex items-center gap-2 w-150 h-auto mt-10 p-5 border">
          <span className="absolute right-4 text-sm text-gray-500 dark:text-gray-400 transition-opacity duration-200 group-hover:opacity-0">
            {createdDate}
          </span>

          <button
            type="button"
            className="absolute right-4 flex items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <RxDotsHorizontal className="w-10 h-6.25" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border bg-white shadow-lg dark:bg-[#f2f2f2] dark:border-gray-700 z-20">
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:rounded-xl cursor-pointer dark:text-gray-200 "
                onClick={() => setShowMenu(false)}
              >
                Option 1
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:rounded-xl cursor-pointer dark:text-gray-200 "
                onClick={() => setShowMenu(false)}
              >
                Option 2
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProjectChat;
